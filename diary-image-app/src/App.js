// Other imports remain the same
import React, { useState, useEffect, useRef } from 'react';
import { FaKeyboard, FaMicrophone, FaPenFancy } from 'react-icons/fa';
import './App.css';
import AlertModal from './AlertModal';

const moodLabels = ["Anger", "Neutral", "Fear", "Sadness", "Surprise", "Happiness"];

const imageDirectories = {
  "Anger": "images/Anger",
  "Neutral": "images/Neutral",
  "Fear": "images/Fear",
  "Sadness": "images/Sadness",
  "Surprise": "images/Surprise",
  "Happiness": "images/Happiness"
};

const imageCounts = {
  "Anger": 10,
  "Neutral": 3,
  "Fear": 8,
  "Sadness": 20,
  "Surprise": 8,
  "Happiness": 11
};

function getRandomImageForMood(moodValue) {
  let moodIndex = Math.floor((moodValue / 100) * moodLabels.length);
  moodIndex = moodValue === 100 ? moodLabels.length - 1 : Math.min(moodIndex, moodLabels.length - 1);
  
  const moodLabel = moodLabels[moodIndex];
  const directory = imageDirectories[moodLabel];
  const imageCount = imageCounts[moodLabel] || 1;
  const randomIndex = Math.floor(Math.random() * imageCount) + 1;

  return `${process.env.PUBLIC_URL}/${directory}/image${randomIndex}.jpg`;
}

function getYouTubeVideoId(url) {
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
}

function App() {
  const dateList = generateDateList();
  const [diaryEntries, setDiaryEntries] = useState(initializeDiaryEntries(dateList));
  const [selectedDate, setSelectedDate] = useState(dateList[0]);
  const [prompt, setPrompt] = useState(diaryEntries[dateList[0]].description);
  const [speechResult, setSpeechResult] = useState('');
  const [mood, setMood] = useState(25);
  const [imageUrl, setImageUrl] = useState(diaryEntries[dateList[0]].imageUrl);
  const [activeInputMode, setActiveInputMode] = useState('typing');
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [isSpeechOpen, setIsSpeechOpen] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Re-added this state
  const [drawingDataUrl, setDrawingDataUrl] = useState(null);
  const recognitionRef = useRef(null);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

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

  function initializeDiaryEntries(dateList) {
    return dateList.reduce((entries, date) => {
      entries[date] = { description: '', mood: 25, imageUrl: null };
      return entries;
    }, {});
  }

  const handleDateClick = (date) => {
    setDiaryEntries((prevEntries) => ({
      ...prevEntries,
      [selectedDate]: {
        description: prompt,
        mood: mood,
        imageUrl: imageUrl,
      },
    }));

    setSelectedDate(date);
    setPrompt(diaryEntries[date]?.description || '');
    setMood(diaryEntries[date]?.mood || 25);
    setImageUrl(diaryEntries[date]?.imageUrl || null);
  };

  const handleEnter = () => {
    const image = getRandomImageForMood(mood);
    setImageUrl(image);

    setDiaryEntries((prevEntries) => ({
      ...prevEntries,
      [selectedDate]: {
        description: prompt,
        mood: mood,
        imageUrl: image,
        drawing: drawingDataUrl,
        speech: speechResult,
      },
    }));

    alert('Entry saved successfully!');
  };

  const handleInputModeChange = (mode) => {
    if (activeInputMode !== mode) {
      clearResults();
    }

    setActiveInputMode(mode);

    if (mode === 'speech') {
      setIsSpeechOpen(true);
    } else if (mode === 'draw') {
      setIsDrawingOpen(true);
    }
  };

  const clearResults = () => {
    setPrompt('');
    setSpeechResult('');
    setDrawingDataUrl(null);
  };

  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setSpeechResult((prevResult) => prevResult + ' ' + transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.start();
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsSpeechOpen(false);
  };

  const handleCanvasMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.beginPath();
    ctx.moveTo(
      (e.clientX - rect.left) * scaleX,
      (e.clientY - rect.top) * scaleY
    );
    isDrawing.current = true;
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.lineTo(
      (e.clientX - rect.left) * scaleX,
      (e.clientY - rect.top) * scaleY
    );
    ctx.stroke();
  };

  const handleCanvasMouseUp = () => {
    isDrawing.current = false;
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    setDrawingDataUrl(dataUrl);
    setIsDrawingOpen(false);
  };

  return (
    <div className="app-layout">
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
            title="Draw"
            onClick={() => handleInputModeChange('draw')}
          />
        </div>

        {activeInputMode === 'typing' && (
          <textarea
            className="description-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write your description here..."
          />
        )}

        {activeInputMode === 'speech' && (
          <div className="speech-result">
            <h3>Speech-to-Text Result</h3>
            <p>{speechResult}</p>
          </div>
        )}

        {activeInputMode === 'draw' && drawingDataUrl && (
          <div className="drawing-result">
            <h3>Drawing Result</h3>
            <img src={drawingDataUrl} alt="Drawing" className="drawing-preview" />
          </div>
        )}

        <button className="generate-button" onClick={handleEnter}>
          Enter
        </button>

        <div className="image-display">
          {imageUrl ? (
            <img src={imageUrl} alt="Mood" className="generated-image" />
          ) : (
            <div className="placeholder">Your image will appear here</div>
          )}
        </div>

        <div className="mood-slider-container">
          <div className="mood-labels">
            {moodLabels.map((label) => (
              <span key={label} className="mood-label">
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
            onChange={(e) => setMood(Number(e.target.value))}
          />
          <div className="mood-value">Mood: {mood}</div>
        </div>

        {selectedMusic && (
          <div className="music-suggestion">
            <h3>Suggested Playlist: {selectedMusic.title}</h3>
            <a href={selectedMusic.playlistUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={`https://img.youtube.com/vi/${getYouTubeVideoId(selectedMusic.playlistUrl)}/hqdefault.jpg`}
                alt={`${selectedMusic.title} playlist`}
                className="music-thumbnail"
              />
            </a>
          </div>
        )}

        <AlertModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message="It seems that you've been feeling fear or sadness for more than 7 days in the past two weeks. Consider talking to a psychiatrist."
          link="https://www.google.com/search?q=%E5%BF%83%E7%90%86%E9%86%AB%E7%94%9F"
        />

        {isSpeechOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Speak now...</h2>
              <button onClick={startSpeechRecognition}>Start</button>
              <button onClick={stopSpeechRecognition}>Done</button>
            </div>
          </div>
        )}

        {isDrawingOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <canvas
                ref={canvasRef}
                className="drawing-canvas"
                width={550}
                height={300}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
              />
              <button onClick={saveDrawing}>Done</button>
            </div>
          </div>
        )}

        {/* Mood Count Display at the bottom right */}
        <div className="mood-count-display">Mood: {mood}</div>
      </div>
    </div>
  );
}

export default App;
