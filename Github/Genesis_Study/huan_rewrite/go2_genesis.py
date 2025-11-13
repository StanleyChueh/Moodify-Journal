import numpy as np
import torch
import os
import argparse
import genesis as gs 
from go2_env import Go2Env  # Ensure this is the correct import for your GO2 simulation environment
from rsl_rl.modules.actor_critic import ActorCritic  # ✅ Correct import


def load_policy(model_path, device):
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Trained model not found: {model_path}")

    # ✅ Use the same architecture as your trained model
    num_actor_obs = 45  # Found in `obs_cfg`
    num_critic_obs = 45  # Usually the same as `num_actor_obs`
    num_actions = 12  # Found in `env_cfg`

    # ✅ Match the architecture with the trained model
    actor_hidden_dims = [512, 256, 128]  # Same as saved model
    critic_hidden_dims = [512, 256, 128]  # Same as saved model

    model = ActorCritic(
        num_actor_obs,
        num_critic_obs,
        num_actions,
        actor_hidden_dims=actor_hidden_dims,
        critic_hidden_dims=critic_hidden_dims
    )

    # ✅ Load trained weights
    model.load_state_dict(torch.load(model_path, map_location=device))  
    model.to(device)  # ✅ Move model to correct device
    model.eval()  # ✅ Set model to evaluation mode
    return model

def main(task):
    T = 2000  # 20 seconds
    VIEWER = True  # Enable visualization

    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    # ✅ Initialize Genesis before creating environment
    gs.init(logging_level="warning")


    # ✅ Define environment configurations
    obs_cfg = {
        "num_obs": 45,
        "obs_scales": {
            "lin_vel": 2.0,
            "ang_vel": 0.25,
            "dof_pos": 1.0,
            "dof_vel": 0.05,
        },
    }
    reward_cfg = {
        "tracking_sigma": 0.25,
        "base_height_target": 0.3,
        "reward_scales": {
            "tracking_lin_vel": 1.0,
            "tracking_ang_vel": 0.2,
            "lin_vel_z": -1.0,
            "base_height": -50.0,
            "action_rate": -0.005,
            "similar_to_default": -0.1,
        },
    }
    command_cfg = {
        "num_commands": 3,
        "lin_vel_x_range": [0.5, 0.5],
        "lin_vel_y_range": [0, 0],
        "ang_vel_range": [0, 0],
    }

    # Path to your trained walking model
    model_path = "/home/stanley/Genesis/logs/go2-walking/model_100.pt"

    print(f"Loading trained RL policy from: {model_path}")

    policy = load_policy(model_path,device)  # ✅ Correct way to load the model

    # ✅ Configure environment for the selected task
    env_cfg = {
        "num_envs": 1,  # Single simulation environment
        "base_init_pos": [0.0, 0.0, 0.42],  # Initial robot position
        "base_init_quat": [1.0, 0.0, 0.0, 0.0],  # No initial rotation
        "episode_length_s": 20.0,  # Duration of simulation
        "resampling_time_s": 4.0,
        "action_scale": 0.25,  # Action scaling factor
        "task": task,  # Assign the selected task
        "num_actions": 12,  
        "termination_if_pitch_greater_than": 1.0,  # ✅ Added missing key
        "termination_if_roll_greater_than": 1.0, 
        "dof_names": [  # ✅ Added missing 'dof_names'
            "FR_hip_joint",
            "FR_thigh_joint",
            "FR_calf_joint",
            "FL_hip_joint",
            "FL_thigh_joint",
            "FL_calf_joint",
            "RR_hip_joint",
            "RR_thigh_joint",
            "RR_calf_joint",
            "RL_hip_joint",
            "RL_thigh_joint",
            "RL_calf_joint",
        ],
        "kp": 20.0,  # ✅ Added missing 'kp'
        "kd": 0.5, 
        "clip_actions": 1.0, 
        "default_joint_angles": {
            "FR_hip_joint": 0.0,
            "FR_thigh_joint": 0.8,
            "FR_calf_joint": -1.5,
            "FL_hip_joint": 0.0,
            "FL_thigh_joint": 0.8,
            "FL_calf_joint": -1.5,
            "RR_hip_joint": 0.0,
            "RR_thigh_joint": 1.0,
            "RR_calf_joint": -1.5,
            "RL_hip_joint": 0.0,
            "RL_thigh_joint": 1.0,
            "RL_calf_joint": -1.5,
        },
    }

    # ✅ Create `Go2Env` with all required arguments
    env = Go2Env(num_envs=1, env_cfg=env_cfg, obs_cfg=obs_cfg, reward_cfg=reward_cfg, command_cfg=command_cfg,show_viewer=True)

    # Reset environment
    obs, _ = env.reset()  # ✅ Extract only the first element (actual observation)
    obs = obs.to(device) 

    print(f"Type of obs: {type(obs)}")  # ✅ Ensure `obs` is a Tensor
    print(f"Shape of obs: {obs.shape if isinstance(obs, torch.Tensor) else 'N/A'}")

    # Run the simulation
    for _ in range(T):
        with torch.no_grad():  # Disable gradient calculations for inference
            action = policy.act(obs)  # ✅ Only extract the returned action
        obs, _, reward, done, info = env.step(action)  # Apply action
        obs = obs.to(device)
        if done.any():
            obs, _ = env.reset()  # ✅ Ensure `obs` is correctly assigned after reset
            obs = obs.to(device)

if __name__ == "__main__":
    # Define valid tasks
    VALID_TASKS = ['stairs', 'walk_octagon', 'walk_straight', 'big_box']

    # Parse arguments
    parser = argparse.ArgumentParser(description="Run trained RL policy for GO2 locomotion tasks")
    parser.add_argument('--task', type=str, required=True, choices=VALID_TASKS, 
                        help=f"Task to perform. Choose from {VALID_TASKS}.")
    args = parser.parse_args()

    # Run simulation with RL policy
    main(args.task)