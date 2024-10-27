import os

# Define the base path to your image dataset
base_path = "/home/stanley/Diary_AI_ws/src/diary_v2/image_dataset"

# List of mood folders
moods = ["Anger", "Neutral", "Fear", "Sadness", "Surprise", "Happiness"]

# Loop through each mood folder
for mood in moods:
    folder_path = os.path.join(base_path, mood)
    if os.path.exists(folder_path):
        images = [f for f in os.listdir(folder_path) if f.endswith(('.jpg', '.jfif'))]
        images.sort()  # Sort the images to rename them in order

        # Rename images sequentially
        for index, image in enumerate(images):
            new_name = f"image{index+1}.jpg"
            old_path = os.path.join(folder_path, image)
            new_path = os.path.join(folder_path, new_name)
            os.rename(old_path, new_path)
        print(f"Renamed images in {mood} folder.")
    else:
        print(f"{mood} folder does not exist.")

