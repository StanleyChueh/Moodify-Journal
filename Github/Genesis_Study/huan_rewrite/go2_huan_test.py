import os
import argparse
import torch
import pickle

import genesis as gs
from go2_env import Go2Env
from rsl_rl.runners import OnPolicyRunner
from rsl_rl.algorithms.ppo import PPO  # Using PPO for training

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-e", "--exp_name", type=str, default="go2-genesis-training")
    parser.add_argument("--timesteps", type=int, default=1_000_000)  # Training steps
    args = parser.parse_args()

    gs.init(logging_level="warning")

    log_dir = f"logs/{args.exp_name}"
    os.makedirs(log_dir, exist_ok=True)

    # ✅ Define environment configurations
    env_cfg = {
        "num_envs": 64,  
        "base_init_pos": [0.0, 0.0, 0.42],  
        "base_init_quat": [1.0, 0.0, 0.0, 0.0],  
        "episode_length_s": 20.0,  
        "resampling_time_s": 4.0,
        "action_scale": 0.25,  
        "num_actions": 12,  
        "termination_if_pitch_greater_than": 1.0,  
        "termination_if_roll_greater_than": 1.0,  
        "dof_names": [
            "FR_hip_joint", "FR_thigh_joint", "FR_calf_joint",
            "FL_hip_joint", "FL_thigh_joint", "FL_calf_joint",
            "RR_hip_joint", "RR_thigh_joint", "RR_calf_joint",
            "RL_hip_joint", "RL_thigh_joint", "RL_calf_joint",
        ],
        "kp": 20.0,  
        "kd": 0.5,  
        "clip_actions": 1.0,  
        "default_joint_angles": {
            "FR_hip_joint": 0.0, "FR_thigh_joint": 0.8, "FR_calf_joint": -1.5,
            "FL_hip_joint": 0.0, "FL_thigh_joint": 0.8, "FL_calf_joint": -1.5,
            "RR_hip_joint": 0.0, "RR_thigh_joint": 1.0, "RR_calf_joint": -1.5,
            "RL_hip_joint": 0.0, "RL_thigh_joint": 1.0, "RL_calf_joint": -1.5,
        },
    }

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

    # ✅ Save configs for future evaluation
    with open(f"{log_dir}/cfgs.pkl", "wb") as f:
        pickle.dump((env_cfg, obs_cfg, reward_cfg, command_cfg), f)

    # ✅ Create environment
    env = Go2Env(
        num_envs=64,  
        env_cfg=env_cfg,  
        obs_cfg=obs_cfg,  
        reward_cfg=reward_cfg,  
        command_cfg=command_cfg,  
        show_viewer=False
    )

    # ✅ Define training algorithm (PPO)
    algo_cfg = {
        "clip_param": 0.2,
        "entropy_coef": 0.01,
        "value_loss_coef": 0.5,
        "num_learning_epochs": 5,  # PPO trains the same data multiple times
        "gamma": 0.99,
        "lam": 0.95,
    }

    # ✅ Initialize PPO with correct arguments
    algo = PPO(env, **algo_cfg)  # Pass correct arguments

    # ✅ Pass `num_mini_batch` and `lr` separately via `OnPolicyRunner`
    runner = OnPolicyRunner(env, algo, log_dir, device="cuda:0", learning_rate=3e-4, num_mini_batches=8)

    # ✅ Train the model
    runner.learn(num_timesteps=args.timesteps)

    # ✅ Save trained model
    runner.save(f"{log_dir}/model_final.pt")


if __name__ == "__main__":
    main()
