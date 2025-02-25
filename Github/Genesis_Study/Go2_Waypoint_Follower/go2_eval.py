import argparse
import os
import pickle
import torch
from go2_env import Go2Env
from rsl_rl.runners import OnPolicyRunner
import genesis as gs

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-e", "--exp_name", type=str, default="go2-genesis-training", help="Experiment name (log directory)")
    parser.add_argument("--ckpt", type=int, default=300, help="Checkpoint number")
    args = parser.parse_args()

    gs.init()

    log_dir = f"logs/{args.exp_name}"
    cfg_path = os.path.join(log_dir, "cfgs.pkl")
    model_path = os.path.join(log_dir, f"model_{args.ckpt}.pt")

    # Ensure the configuration and model exist
    if not os.path.exists(cfg_path):
        raise FileNotFoundError(f"Configuration file not found: {cfg_path}")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model checkpoint not found: {model_path}")

    # Load environment configurations
    with open(cfg_path, "rb") as f:
        env_cfg, obs_cfg, reward_cfg, command_cfg, train_cfg = pickle.load(f)
    
    reward_cfg["reward_scales"] = {}

    # Initialize environment
    env = Go2Env(
        num_envs=1,  # Only one environment during evaluation
        env_cfg=env_cfg,
        obs_cfg=obs_cfg,
        reward_cfg=reward_cfg,
        command_cfg=command_cfg,
        show_viewer=True,
        eval_mode=True,  # Set to True to enable waypoint visualization
        device="cuda"
    )

    # Initialize policy runner
    runner = OnPolicyRunner(env, train_cfg, log_dir, device="cuda:0")
    runner.load(model_path)
    policy = runner.get_inference_policy(device="cuda:0")

    # Run evaluation loop
    obs, _ = env.reset()
    with torch.no_grad():
        while True:
            actions = policy(obs)
            print("Actions before step:", actions)
            obs, _, rews, dones, infos = env.step(actions)

if __name__ == "__main__":
    main()