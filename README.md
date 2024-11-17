# Diary AI

Diary AI is a web application that encourages diary writing by converting daily entries into visual representations, including images and music playlists based on mood. Users can choose between typing, drawing, or using speech-to-text for entries, while mood analysis helps them track emotional trends over time.

## Features

- **Multi-Input Modes**: Create diary entries by typing, drawing, or using speech-to-text functionality.
- **Language Support for Speech-to-Text**: Choose between **English** and **Traditional Chinese (Taiwanese)** for voice input.
- **Mood-Based Image Generation**: Automatically generate mood-specific images to visually enhance your entries.
- **Mood Slider with Emoji Representation**: Adjust your mood using an interactive slider with emojis reflecting emotional states.
- **Mood Analysis**: Gain insights into your emotional trends with a summarized emoji-based analysis of the past 14 days.
- **Suggested Music Playlists**: Receive curated music playlists tailored to your current mood.

## Screenshots

![image](https://github.com/user-attachments/assets/a03d0ece-9546-4c85-9e18-6930ce802f18)


Try it!:https://stanleychueh.github.io/Moodify-Journal/
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/diary-ai.git
   cd diary-ai
2. Install dependencies:
   ```bash
   npm install
3. Start the application:
   ```bash
   npm start
### Usage

- **Multi-Input Modes**: Click on a date in the sidebar to view or create an entry.
- **Choose Input Mode**:
  - **Typing**: Click the keyboard icon to type your diary entry.
  - **Speech-to-Text**: Click the microphone icon,and start speaking.
  - **Drawing**: Click the pen icon to open the drawing canvas and create a visual entry.
  - **Set Mood**: Use the mood slider to select your current mood, represented by emojis. The app will suggest a playlist based on your mood selection.
  - **View Mood Analysis**: Check the right sidebar for an emoji-based summary of your mood trends over the last 14 days.

### Project Structure
## Project Structure

```plaintext
.
├── public
│   └── images                    # Directory for mood-based images
├── src
│   ├── components
│   │   ├── AlertModal.js         # Component for mood alert modal
│   │   └── DrawingModal.js       # Component for drawing modal
│   ├── App.js                    # Main application component
│   ├── App.css                   # Main CSS file for styling
│   ├── index.js                  # Entry point
│   └── ...
├── README.md                     # Project documentation
└── package.json                  # Project configuration and dependencies
```
### Configuration
#### To set up mood-based image generation, add images in public/images under folders named according to the moods:
  - **Anger**, **Neutral**, **Fear**, **Sadness**, **Surprise**, **Happiness**,
  Each folder should contain relevant images that the app will display based on mood selection.

### Dependencies
  - **React**:JavaScript library for building the user interface.
  - **react-icons**:For displaying icons for moods and actions.
  - **CSS**:Custom styling for the layout and components.

### License
This project is open-source and available under the MIT License.



