import React, { useState, useEffect, useRef } from 'react';
import { FaKeyboard, FaMicrophone, FaPenFancy } from 'react-icons/fa'; // Import icons
import './App.css';
import AlertModal from './AlertModal';

// Updated mood labels (including "Neutral")
const moodLabels = ["Anger", "Neutral", "Fear", "Sadness", "Surprise", "Happiness"];

// Image directories and count of images for different moods (public directory)
const imageDirectories = {
    "Anger": "images/Anger",
    "Neutral": "images/Neutral",
    "Fear": "images/Fear",
    "Sadness": "images/Sadness",
    "Surprise": "images/Surprise",
    "Happiness": "images/Happiness"
};

// Image count for each mood folder
const imageCounts = {
    "Anger": 10,
    "Neutral": 3,
    "Fear": 8,
    "Sadness": 20,
    "Surprise": 8,
    "Happiness": 11
};

// Get a random image for the current mood
function getRandomImageForMood(moodValue) {
    let moodIndex = Math.floor((moodValue / 100) * moodLabels.length);
    moodIndex = moodValue === 100 ? moodLabels.length - 1 : moodIndex >= moodLabels.length ? moodLabels.length - 1 : moodIndex;
    
    const moodLabel = moodLabels[moodIndex];
    const directory = imageDirectories[moodLabel];
    const imageCount = imageCounts[moodLabel] || 1;
    const randomIndex = Math.floor(Math.random() * imageCount) + 1;

    return `${process.env.PUBLIC_URL}/${directory}/image${randomIndex}.jpg`;
}

// Extract YouTube video ID from the URL
function getYouTubeVideoId(url) {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : null;
}

function App() {
    const dateList = generateDateList();
    const [diaryEntries, setDiaryEntries] = useState(initializeDiaryEntries(dateList));
    const [selectedDate, setSelectedDate] = useState(dateList[0]);
    const [prompt, setPrompt] = useState(diaryEntries[dateList[0]].description);
    const [mood, setMood] = useState(25);  // Set initial mood to Neutral
    const [imageUrl, setImageUrl] = useState(diaryEntries[dateList[0]].imageUrl);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [moodAnalysis, setMoodAnalysis] = useState(initializeMoodAnalysis());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeInputMode, setActiveInputMode] = useState('typing'); // Track input mode
    const [isDrawingOpen, setIsDrawingOpen] = useState(false); // For drawing overlay
    const recognitionRef = useRef(null); // For speech-to-text
    const canvasRef = useRef(null); // For drawing
    const isDrawing = useRef(false); // Track drawing state

    // Generate dates from today and the past 30 days
    function generateDateList() {
        const today = new Date();
        const dateList = [];
        for (let i = 0; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            dateList.push(dateString);
        }
        return dateList;
    }

    // Initialize diary entries with generated dates
    function initializeDiaryEntries(dateList) {
        return dateList.reduce((entries, date) => {
            entries[date] = { description: '', mood: 25, imageUrl: null };
            return entries;
        }, {});
    }

    // Initialize mood analysis count
    function initializeMoodAnalysis() {
        return moodLabels.reduce((acc, label) => {
            acc[label] = 0;
            return acc;
        }, {});
    }

    // Handle speech-to-text functionality
    const startSpeechRecognition = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setPrompt((prevPrompt) => prevPrompt + ' ' + transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition ended.');
        };

        recognition.start();
        recognitionRef.current = recognition;
    };

    const stopSpeechRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    // Handle drawing functionality
    const handleCanvasMouseDown = (e) => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        isDrawing.current = true;
    };

    const handleCanvasMouseMove = (e) => {
        if (!isDrawing.current) return;
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const handleCanvasMouseUp = () => {
        isDrawing.current = false;
    };

    // Handle input mode change
    const handleInputModeChange = (mode) => {
        setActiveInputMode(mode);
        if (mode === 'speech') {
            startSpeechRecognition();
        } else {
            stopSpeechRecognition();
        }
        if (mode === 'draw') {
            setIsDrawingOpen(true);
        }
    };

    // Handle switching between dates
    const handleDateClick = (date) => {
        // Save current data before switching
        setDiaryEntries((prevEntries) => ({
            ...prevEntries,
            [selectedDate]: {
                description: prompt,
                mood: mood,
                imageUrl: imageUrl,
            },
        }));

        // Set new date data
        setSelectedDate(date);
        setPrompt(diaryEntries[date].description);
        setMood(diaryEntries[date].mood);
        setImageUrl(diaryEntries[date].imageUrl);
    };

    // Get music suggestion based on mood
    useEffect(() => {
        const musicSuggestions = [
            { moodRange: [0, 16], title: "Angry Music", playlistUrl: "https://www.youtube.com/watch?v=r8OipmKFDeM" },
            { moodRange: [17, 33], title: "Neutral Music", playlistUrl: "https://www.youtube.com/watch?v=CFGLoQIhmow&t=2486s" },
            { moodRange: [34, 50], title: "Fear Music", playlistUrl: "https://www.youtube.com/watch?v=P_tsPLT0irs" },
            { moodRange: [51, 67], title: "Sad Music", playlistUrl: "https://www.youtube.com/watch?v=A_MjCqQoLLA" },
            { moodRange: [68, 84], title: "Surprise Music", playlistUrl: "https://www.youtube.com/watch?v=HQmmM_qwG4k&t=2s" },
            { moodRange: [85, 100], title: "Happy Music", playlistUrl: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" },
        ];

        const currentMusic = musicSuggestions.find(
            (music) => mood >= music.moodRange[0] && mood <= music.moodRange[1]
        );
        setSelectedMusic(currentMusic);
    }, [mood]);

    // Handle "Enter" action
    const handleEnter = () => {
        const image = getRandomImageForMood(mood);
        setImageUrl(image);

        // Save current diary entry
        setDiaryEntries((prevEntries) => ({
            ...prevEntries,
            [selectedDate]: {
                description: prompt,
                mood: mood,
                imageUrl: image,
            },
        }));
        alert('Entry saved successfully!');
    };

    return (
        <div className="app-layout">
            {/* Sidebar for Diary Entries */}
            <div className="sidebar">
                <h2 className="sidebar-title">Diary AI</h2>
                <ul className="diary-list">
                    {dateList.map((date, index) => (
                        <li
                            key={date}
                            className={`diary-item ${date === selectedDate ? 'active' : ''}`}
                            onClick={() => handleDateClick(date)}
                        >
                            {index === 0 ? 'Today' : date}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="main-content">
                <h1 className="main-title">{selectedDate}'s Mood</h1>
                <div className="input-icons">
                    <FaKeyboard 
                        className={`input-icon ${activeInputMode === 'typing' ? 'active' : ''}`} 
                        title="Type" 
                        onClick={() => handleInputModeChange('typing')} 
                    />
                    <FaMicrophone 
                        className={`input-icon ${activeInputMode === 'speech' ? 'active' : ''}`} 
                        title="Voice to Text" 
                        onClick={() => handleInputModeChange('speech')} 
                    />
                    <FaPenFancy 
                        className={`input-icon ${activeInputMode === 'draw' ? 'active' : ''}`} 
                        title="Handwriting" 
                        onClick={() => handleInputModeChange('draw')} 
                    />
                </div>
                <textarea
                    className="description-input"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Write your description here..."
                    name="description"
                />
                <button 
                    className="generate-button" 
                    name="generate-button"
                    onClick={handleEnter}
                >
                    Enter
                </button>

                {/* Image Container */}
                <div className="image-display">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Mood" className="generated-image" />
                    ) : (
                        <div className="placeholder">Your image will appear here</div>
                    )}
                </div>

                {/* Mood Slider with Emotion Labels */}
                <div className="mood-slider-container">
                    <div className="mood-labels">
                        {moodLabels.map((label, index) => (
                            <span key={index} className="mood-label">
                                {label}
                            </span>
                        ))}
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={mood}
                        className="mood-slider"
                        onChange={(e) => setMood(e.target.value)}
                    />
                </div>

                {/* YouTube Music Link and Thumbnail */}
                {selectedMusic && (
                    <div className="music-suggestion">
                        <h3>Suggested Playlist: {selectedMusic.title}</h3>
                        <a
                            href={selectedMusic.playlistUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={`https://img.youtube.com/vi/${getYouTubeVideoId(selectedMusic.playlistUrl)}/hqdefault.jpg`}
                                alt={`${selectedMusic.title} playlist`}
                                className="music-thumbnail"
                            />
                        </a>
                    </div>
                )}

                {/* Mood Analysis Box */}
                <div className="mood-analysis">
                    <h3>Past 14 Days Mood Analysis</h3>
                    <ul>
                        {Object.keys(moodAnalysis).map((mood) => (
                            <li key={mood}>
                                {mood}: {moodAnalysis[mood]}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Alert Modal for Help */}
                <AlertModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    message="It seems that you've been feeling fear or sadness for more than 7 days in the past two weeks. Consider talking to a psychiatrist."
                    link="https://www.google.com/search?q=%E5%BF%83%E7%90%86%E9%86%AB%E7%94%9F"
                />

                {/* Drawing Overlay */}
                {isDrawingOpen && (
                    <div className="drawing-overlay">
                        <canvas
                            ref={canvasRef}
                            className="drawing-canvas"
                            onMouseDown={handleCanvasMouseDown}
                            onMouseMove={handleCanvasMouseMove}
                            onMouseUp={handleCanvasMouseUp}
                        />
                        <button className="close-drawing" onClick={() => setIsDrawingOpen(false)}>Done</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
