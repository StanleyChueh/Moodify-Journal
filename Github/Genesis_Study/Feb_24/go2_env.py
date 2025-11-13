import torch
import math
import genesis as gs
from genesis.utils.geom import quat_to_xyz, transform_by_quat, inv_quat, transform_quat_by_quat


def gs_rand_float(lower, upper, shape, device):
    return (upper - lower) * torch.rand(size=shape, device=device) + lower


class Go2Env:
    def __init__(self, num_envs, env_cfg, obs_cfg, reward_cfg, command_cfg, show_viewer=False, eval_mode=False,device="cuda"):
        self.device = torch.device(device)

        self.num_envs = num_envs
        self.num_obs = obs_cfg["num_obs"]
        self.num_privileged_obs = None
        self.num_actions = env_cfg["num_actions"]
        self.num_commands = command_cfg["num_commands"]

        self.simulate_action_latency = True  # there is a 1 step latency on real robot
        self.dt = 0.02  # control frequency on real robot is 50hz
        self.max_episode_length = math.ceil(env_cfg["episode_length_s"] / self.dt)

        self.env_cfg = env_cfg
        self.obs_cfg = obs_cfg
        self.reward_cfg = reward_cfg
        self.command_cfg = command_cfg

        self.eval_mode = eval_mode

        self.obs_scales = obs_cfg["obs_scales"]
        self.reward_scales = reward_cfg["reward_scales"]

        print("Initializing Genesis Scene...")
        # create scene
        self.scene = gs.Scene(
            sim_options=gs.options.SimOptions(dt=self.dt, substeps=2),
            viewer_options=gs.options.ViewerOptions(
                max_FPS=int(0.5 / self.dt),
                camera_pos=(2.0, 0.0, 2.5),
                camera_lookat=(0.0, 0.0, 0.5),
                camera_fov=40,
            ),
            vis_options=gs.options.VisOptions(n_rendered_envs=1),
            rigid_options=gs.options.RigidOptions(
                dt=self.dt,
                constraint_solver=gs.constraint_solver.Newton,
                enable_collision=True,
                enable_joint_limit=True,
            ),
            show_viewer=show_viewer,
        )

        # add plain
        self.scene.add_entity(gs.morphs.URDF(file="urdf/plane/plane.urdf", fixed=True))

        # add robot
        print("Adding robot")
        self.base_init_pos = torch.tensor(self.env_cfg["base_init_pos"], device=self.device)
        self.base_init_quat = torch.tensor(self.env_cfg["base_init_quat"], device=self.device)
        self.inv_base_init_quat = inv_quat(self.base_init_quat)
        self.robot = self.scene.add_entity(
            gs.morphs.URDF(
                file="urdf/go2/urdf/go2.urdf",
                pos=self.base_init_pos.cpu().numpy(),
                quat=self.base_init_quat.cpu().numpy(),
            ),
        )

        print("Setting waypoints...")
        self.waypoints = torch.tensor([
            [[1.0, 1.0, -0.05], [2.0, 2.0, -0.05]]
        ] * self.num_envs, device=self.device)
        self.current_waypoint_idx = torch.zeros(self.num_envs, dtype=torch.long, device=self.device)

        if self.eval_mode:
            print("Adding waypoint markers for evaluation...")
            self.waypoint_markers = []
            for env_id in range(self.num_envs):
                for wp in self.waypoints[env_id]:
                    marker = self.scene.add_entity(
                        gs.morphs.Sphere(radius=0.1, pos=wp.cpu().numpy(), fixed=True)
                    )
                    self.waypoint_markers.append(marker)
                print(f"Added {len(self.waypoints[env_id])} waypoints for environment {env_id}.")
        # else:
        #     print("training")
        #     self.waypoint_markers = None  # Do not create markers during training

        # build
        self.scene.build(n_envs=num_envs)

        # names to indices
        self.motor_dofs = [self.robot.get_joint(name).dof_idx_local for name in self.env_cfg["dof_names"]]

        # PD control parameters
        self.robot.set_dofs_kp([self.env_cfg["kp"]] * self.num_actions, self.motor_dofs)
        self.robot.set_dofs_kv([self.env_cfg["kd"]] * self.num_actions, self.motor_dofs)

        # prepare reward functions and multiply reward scales by dt
        self.reward_functions, self.episode_sums = dict(), dict()
        for name in self.reward_scales.keys():
            self.reward_scales[name] *= self.dt
            self.reward_functions[name] = getattr(self, "_reward_" + name)
            self.episode_sums[name] = torch.zeros((self.num_envs,), device=self.device, dtype=gs.tc_float)

        # initialize buffers
        self.base_lin_vel = torch.zeros((self.num_envs, 3), device=self.device, dtype=gs.tc_float)
        self.base_ang_vel = torch.zeros((self.num_envs, 3), device=self.device, dtype=gs.tc_float)
        self.projected_gravity = torch.zeros((self.num_envs, 3), device=self.device, dtype=gs.tc_float)
        self.global_gravity = torch.tensor([0.0, 0.0, -1.0], device=self.device, dtype=gs.tc_float).repeat(
            self.num_envs, 1
        )
        self.obs_buf = torch.zeros((self.num_envs, self.num_obs), device=self.device, dtype=gs.tc_float)
        self.rew_buf = torch.zeros((self.num_envs,), device=self.device, dtype=gs.tc_float)
        self.reset_buf = torch.ones((self.num_envs,), device=self.device, dtype=gs.tc_int)
        self.episode_length_buf = torch.zeros((self.num_envs,), device=self.device, dtype=gs.tc_int)
        self.commands = torch.zeros((self.num_envs, self.num_commands), device=self.device, dtype=gs.tc_float)
        self.commands_scale = torch.tensor(
            [self.obs_scales["lin_vel"], self.obs_scales["lin_vel"], self.obs_scales["ang_vel"]],
            device=self.device,
            dtype=gs.tc_float,
        )
        self.actions = torch.zeros((self.num_envs, self.num_actions), device=self.device, dtype=gs.tc_float)
        self.last_actions = torch.zeros_like(self.actions)
        self.dof_pos = torch.zeros_like(self.actions)
        self.dof_vel = torch.zeros_like(self.actions)
        self.last_dof_vel = torch.zeros_like(self.actions)
        self.base_pos = torch.zeros((self.num_envs, 3), device=self.device, dtype=gs.tc_float)
        self.base_quat = torch.zeros((self.num_envs, 4), device=self.device, dtype=gs.tc_float)
        self.default_dof_pos = torch.tensor(
            [self.env_cfg["default_joint_angles"][name] for name in self.env_cfg["dof_names"]],
            device=self.device,
            dtype=gs.tc_float,
        )
        self.extras = dict()  # extra information for logging

        self.base_euler = torch.zeros((self.num_envs, 3), device=self.device, dtype=gs.tc_float)
        print("Initialization complete.")

    def get_next_waypoint(self, envs_idx):
        """
        Returns the next waypoint for the given environments.
        Waypoints should be stored in `self.waypoints` as a tensor of shape (num_envs, num_waypoints, 3).
        """

        # Ensure waypoints exist
        if not hasattr(self, "waypoints"):
            raise AttributeError("Go2Env has no attribute 'waypoints'. Ensure waypoints are properly initialized.")

        # Ensure current waypoint index exists
        if not hasattr(self, "current_waypoint_idx"):
            self.current_waypoint_idx = torch.zeros(self.num_envs, dtype=torch.long, device=self.device)

        # Get the next waypoint based on the current index
        next_waypoint = self.waypoints[envs_idx, self.current_waypoint_idx[envs_idx]]

        return next_waypoint

    def _resample_commands(self, envs_idx):
        """
        Compute velocity commands that move the robot toward the next waypoint.
        """
        target_waypoint = self.get_next_waypoint(envs_idx)  # Get the next waypoint
        direction = target_waypoint - self.base_pos[envs_idx]  # Compute direction vector

        # Compute linear velocities (x, y) in the robot's frame
        lin_vel_x = torch.clamp(direction[:, 0], -0.5, 0.5)  # Increase range
        lin_vel_y = torch.clamp(direction[:, 1], -0.5, 0.5)  # Increase range

        # Compute angular velocity: turn towards the waypoint
        angle_to_waypoint = torch.atan2(direction[:, 1], direction[:, 0])
        current_heading = self.base_euler[envs_idx, 2]  # Extract yaw from Euler angles
        ang_vel = torch.clamp(angle_to_waypoint - current_heading, -0.2, 0.2)  # Reduce rotation speed

        # Assign computed velocities
        self.commands[envs_idx, 0] = lin_vel_x
        self.commands[envs_idx, 1] = lin_vel_y
        self.commands[envs_idx, 2] = ang_vel

        # Check if waypoint reached and update
        self.update_waypoint_progress(envs_idx)
    
    def update_waypoint_progress(self, envs_idx, threshold=0.2):
        """
        Checks if the robot is close to the current waypoint and updates to the next waypoint.
        Args:
            envs_idx (Tensor): Indices of environments to check.
            threshold (float): Distance threshold to consider waypoint reached.
        """
        # Compute distance to the current waypoint
        current_waypoint = self.get_next_waypoint(envs_idx)
        distance = torch.norm(self.base_pos[envs_idx] - current_waypoint, dim=1)

        # Find environments where the waypoint has been reached
        reached = distance < threshold

        # Increment waypoint index for reached environments
        self.current_waypoint_idx[envs_idx[reached]] += 1

        # Prevent index from going out of range
        num_waypoints = self.waypoints.shape[1]
        self.current_waypoint_idx = torch.clamp(self.current_waypoint_idx, max=num_waypoints - 1)

    def step(self, actions):
        print("current waypoint idx",self.current_waypoint_idx)
        print("current base pos",self.base_pos)

        if self.eval_mode and self.waypoint_markers:
            for env_id in range(self.num_envs):
                current_wp_idx = self.current_waypoint_idx[env_id].item()
                if current_wp_idx < self.waypoints.shape[1]:
                    new_pos = self.waypoints[env_id, current_wp_idx].cpu().numpy()
                    marker_index = env_id * self.waypoints.shape[1] + current_wp_idx
                    if isinstance(new_pos, torch.Tensor):
                        new_pos = new_pos.detach().cpu().numpy()  # Convert tensor to NumPy array

                    self.waypoint_markers[marker_index].set_pos(new_pos.reshape(1, -1))  # Ensure 2D shape

                    print("Visualizing waypoint...")

        self.actions = torch.clip(actions, -self.env_cfg["clip_actions"], self.env_cfg["clip_actions"])
        exec_actions = self.last_actions if self.simulate_action_latency else self.actions
        target_dof_pos = exec_actions * self.env_cfg["action_scale"] + self.default_dof_pos
        self.robot.control_dofs_position(target_dof_pos, self.motor_dofs)
        self.scene.step()

        # update buffers
        self.episode_length_buf += 1
        self.base_pos[:] = self.robot.get_pos()
        self.base_quat[:] = self.robot.get_quat()
        self.base_euler = quat_to_xyz(
            transform_quat_by_quat(torch.ones_like(self.base_quat) * self.inv_base_init_quat, self.base_quat)
        )
        inv_base_quat = inv_quat(self.base_quat)
        self.base_lin_vel[:] = transform_by_quat(self.robot.get_vel(), inv_base_quat)
        self.base_ang_vel[:] = transform_by_quat(self.robot.get_ang(), inv_base_quat)
        self.projected_gravity = transform_by_quat(self.global_gravity, inv_base_quat)
        self.dof_pos[:] = self.robot.get_dofs_position(self.motor_dofs)
        self.dof_vel[:] = self.robot.get_dofs_velocity(self.motor_dofs)

        # resample commands
        envs_idx = (
            (self.episode_length_buf % int(self.env_cfg["resampling_time_s"] / self.dt) == 0)
            .nonzero(as_tuple=False)
            .flatten()
        )
        self._resample_commands(envs_idx)

        # check termination and reset
        self.reset_buf = self.episode_length_buf > self.max_episode_length
        self.reset_buf |= torch.abs(self.base_euler[:, 1]) > self.env_cfg["termination_if_pitch_greater_than"]
        self.reset_buf |= torch.abs(self.base_euler[:, 0]) > self.env_cfg["termination_if_roll_greater_than"]

        time_out_idx = (self.episode_length_buf > self.max_episode_length).nonzero(as_tuple=False).flatten()
        self.extras["time_outs"] = torch.zeros_like(self.reset_buf, device=self.device, dtype=gs.tc_float)
        self.extras["time_outs"][time_out_idx] = 1.0

        self.reset_idx(self.reset_buf.nonzero(as_tuple=False).flatten())

        # compute reward
        self.rew_buf[:] = 0.0
        for name, reward_func in self.reward_functions.items():
            rew = reward_func() * self.reward_scales[name]
            self.rew_buf += rew
            self.episode_sums[name] += rew

        # compute observations
        self.obs_buf = torch.cat(
            [
                self.base_ang_vel * self.obs_scales["ang_vel"],  # 3
                self.projected_gravity,  # 3
                self.commands * self.commands_scale,  # 3
                (self.dof_pos - self.default_dof_pos) * self.obs_scales["dof_pos"],  # 12
                self.dof_vel * self.obs_scales["dof_vel"],  # 12
                self.actions,  # 12
            ],
            axis=-1,
        )

        self.last_actions[:] = self.actions[:]
        self.last_dof_vel[:] = self.dof_vel[:]

        return self.obs_buf, None, self.rew_buf, self.reset_buf, self.extras

    def get_observations(self):
        return self.obs_buf

    def get_privileged_observations(self):
        return None

    def reset_idx(self, envs_idx):
        if len(envs_idx) == 0:
            return

        # reset dofs
        self.dof_pos[envs_idx] = self.default_dof_pos
        self.dof_vel[envs_idx] = 0.0
        self.robot.set_dofs_position(
            position=self.dof_pos[envs_idx],
            dofs_idx_local=self.motor_dofs,
            zero_velocity=True,
            envs_idx=envs_idx,
        )

        # reset base
        self.base_pos[envs_idx] = self.base_init_pos
        self.base_quat[envs_idx] = self.base_init_quat.reshape(1, -1)
        self.robot.set_pos(self.base_pos[envs_idx], zero_velocity=False, envs_idx=envs_idx)
        self.robot.set_quat(self.base_quat[envs_idx], zero_velocity=False, envs_idx=envs_idx)
        self.base_lin_vel[envs_idx] = 0
        self.base_ang_vel[envs_idx] = 0
        self.robot.zero_all_dofs_velocity(envs_idx)

        # reset waypoint index
        self.current_waypoint_idx[envs_idx] = 0

        # reset buffers
        self.last_actions[envs_idx] = 0.0
        self.last_dof_vel[envs_idx] = 0.0
        self.episode_length_buf[envs_idx] = 0
        self.reset_buf[envs_idx] = True

        # fill extras
        self.extras["episode"] = {}
        for key in self.episode_sums.keys():
            self.extras["episode"]["rew_" + key] = (
                torch.mean(self.episode_sums[key][envs_idx]).item() / self.env_cfg["episode_length_s"]
            )
            self.episode_sums[key][envs_idx] = 0.0

        self._resample_commands(envs_idx)

    def reset(self):
        self.reset_buf[:] = True
        self.reset_idx(torch.arange(self.num_envs, device=self.device))
        return self.obs_buf, None

    # ------------ reward functions----------------
    def _reward_waypoint_tracking(self):
        envs_idx = torch.arange(self.num_envs, device=self.device)
        waypoint = self.get_next_waypoint(envs_idx)
        dist_to_waypoint = torch.norm(self.base_pos - waypoint, dim=1)
        return torch.exp(-dist_to_waypoint)  # Reward is higher when closer

    def _reward_tracking_lin_vel(self):
        # Tracking of linear velocity commands (xy axes)
        lin_vel_error = torch.sum(torch.square(self.commands[:, :2] - self.base_lin_vel[:, :2]), dim=1)
        return torch.exp(-lin_vel_error / self.reward_cfg["tracking_sigma"])

    def _reward_tracking_ang_vel(self):
        # Tracking of angular velocity commands (yaw)
        ang_vel_error = torch.square(self.commands[:, 2] - self.base_ang_vel[:, 2])
        return torch.exp(-ang_vel_error / self.reward_cfg["tracking_sigma"])

    def _reward_lin_vel_z(self):
        # Penalize z axis base linear velocity
        return torch.square(self.base_lin_vel[:, 2])

    def _reward_action_rate(self):
        # Penalize changes in actions
        return torch.sum(torch.square(self.last_actions - self.actions), dim=1)

    def _reward_similar_to_default(self):
        # Penalize joint poses far away from default pose
        return torch.sum(torch.abs(self.dof_pos - self.default_dof_pos), dim=1)

    def _reward_base_height(self):
        # Penalize base height away from target
        return torch.square(self.base_pos[:, 2] - self.reward_cfg["base_height_target"])