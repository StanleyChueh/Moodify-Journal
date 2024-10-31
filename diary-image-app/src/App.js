import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaKeyboard, FaMicrophone, FaPenFancy } from 'react-icons/fa';
import './App.css';
import AlertModal from './AlertModal';
import DrawingModal from './DrawingModal';

// Constants
const moodLabels = ["Anger", "Neutral", "Fear", "Sadness", "Surprise", "Happiness"];
const moodEmojis = ["😠", "😐", "😨", "😢", "😲", "😊"];
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

// Define the function to get a random image based on mood
function getRandomImageForMood(moodValue) {
  let moodIndex = Math.floor((moodValue / 100) * moodLabels.length);
  moodIndex = moodValue === 100 ? moodLabels.length - 1 : Math.min(moodIndex, moodLabels.length - 1);

  const moodLabel = moodLabels[moodIndex];
  const directory = imageDirectories[moodLabel];
  const imageCount = imageCounts[moodLabel] || 1;
  const randomIndex = Math.floor(Math.random() * imageCount) + 1;

  return `${process.env.PUBLIC_URL}/${directory}/image${randomIndex}.jpg`;
}

// Define the function to get YouTube video ID
function getYouTubeVideoId(url) {
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
}

// Generate a list of dates for the past 30 days
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

// Initialize diary entries
function initializeDiaryEntries(dateList) {
  return dateList.reduce((entries, date) => {
    entries[date] = { description: '', mood: 25, imageUrl: null };
    return entries;
  }, {});
}

// Initialize mood analysis
function initializeMoodAnalysis() {
  return moodLabels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});
}

function App() {
  const dateList = generateDateList();
  const [diaryEntries, setDiaryEntries] = useState(initializeDiaryEntries(dateList));
  const [selectedDate, setSelectedDate] = useState(dateList[0]);
  const [prompt, setPrompt] = useState(diaryEntries[dateList[0]].description);
  const [speechResult, setSpeechResult] = useState(diaryEntries[dateList[0]].speechResult);
  const [mood, setMood] = useState(25);
  const [imageUrl, setImageUrl] = useState(diaryEntries[dateList[0]].imageUrl);
  const [activeInputMode, setActiveInputMode] = useState('typing');
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [isSpeechOpen, setIsSpeechOpen] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moodAnalysis, setMoodAnalysis] = useState(initializeMoodAnalysis());
  const [lastModalShowDate, setLastModalShowDate] = useState(null);
  const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false);
  const [savedDrawing, setSavedDrawing] = useState(diaryEntries[selectedDate].drawing || null);
  const recognitionRef = useRef(null);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [isRecording, setIsRecording] = useState(false); 

  // Wrap updateMoodAnalysis in useCallback
  const updateMoodAnalysis = useCallback(() => {
    const last14Days = dateList.slice(0, 14);
    const newMoodAnalysis = initializeMoodAnalysis();

    let sadnessCount = 0;
    let fearCount = 0;

    last14Days.forEach((date) => {
      const entry = diaryEntries[date];
      if (entry && entry.mood !== null) {
        const moodIndex = Math.floor(entry.mood / (100 / moodLabels.length));
        const moodLabel = moodLabels[moodIndex];
        if (moodLabel) {
          newMoodAnalysis[moodLabel] += 1;

          if (moodLabel === "Sadness") {
            sadnessCount += 1;
          } else if (moodLabel === "Fear") {
            fearCount += 1;
          }
        }
      }
    });

    setMoodAnalysis(newMoodAnalysis);

    const today = new Date();
    const daysSinceLastModal = lastModalShowDate
      ? Math.floor((today - lastModalShowDate) / (1000 * 60 * 60 * 24))
      : 8;

    if ((sadnessCount > 7 || fearCount > 7) && daysSinceLastModal >= 7) {
      setIsModalOpen(true);
      setLastModalShowDate(new Date());
    }
  }, [dateList, diaryEntries, lastModalShowDate]);

  useEffect(() => {
    updateMoodAnalysis();
  }, [diaryEntries, updateMoodAnalysis]);

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

  const handleClear = () => {
    if (activeInputMode === 'typing') {
      setPrompt('');
    } else if (activeInputMode === 'speech') {
      setSpeechResult('');
    }
  };

  const handleDateClick = (date) => {
    setDiaryEntries((prevEntries) => ({
      ...prevEntries,
      [selectedDate]: {
        ...prevEntries[selectedDate],
        description: prompt,
        mood: mood,
        imageUrl: imageUrl,
        drawing: savedDrawing,
        speechResult: speechResult,
      },
    }));

    setSelectedDate(date);
    setPrompt(diaryEntries[date]?.description || '');
    setMood(diaryEntries[date]?.mood || 25);
    setImageUrl(diaryEntries[date]?.imageUrl || null);
    //setSavedDrawing(diaryEntries[date]?.drawing || null);
    setSpeechResult(diaryEntries[date]?.speechResult || ''); 
  };

  const handleEnter = () => {
    if (activeInputMode === 'speech') {
      if (isRecording) {
        stopSpeechRecognition();
        setDiaryEntries((prevEntries) => ({
          ...prevEntries,
          [selectedDate]: {
            ...prevEntries[selectedDate],
            speechResult: speechResult, // Save speech result for the selected date
          },
        }));
        alert('Recording stopped and entry saved successfully!');
      } else {
        startSpeechRecognition();
        alert('Recording started...');
      }
    } else{
    const image = getRandomImageForMood(mood);
    setImageUrl(image);

    setDiaryEntries((prevEntries) => ({
      ...prevEntries,
      [selectedDate]: {
        description: prompt,
        mood: mood,
        imageUrl: image,
        speechResult: speechResult,
      },
    }));
    alert('Entry saved successfully!');
    }
  };

  const handleInputModeChange = (mode) => {
    setActiveInputMode(mode);
    if (isRecording) {
      stopSpeechRecognition(); 
    }

    setActiveInputMode(mode);

    if (mode === 'speech') {
      setIsSpeechOpen(true);
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
      setIsSpeechOpen(false);
    }

    if (mode === 'draw') {
      setIsDrawingModalOpen(true);
    } else {
      setIsDrawingModalOpen(false);
    }
  };

  const clearResults = () => {
    setPrompt('');
    setSpeechResult('');
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
    setIsRecording(true);
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleCanvasMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (canvas) {
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
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      ctx.lineTo(
        (e.clientX - rect.left) * scaleX,
        (e.clientY - rect.top) * scaleY
      );
      ctx.stroke();
    }
  };

  const handleCanvasMouseUp = () => {
    isDrawing.current = false;
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL(); // Convert canvas to base64 image data
      setSavedDrawing(dataUrl); // Store the image data for the selected date
      setDiaryEntries((prevEntries) => ({
        ...prevEntries,
        [selectedDate]: {
          ...prevEntries[selectedDate],
          drawing: dataUrl,
        },
      }));
      alert('Drawing saved successfully!');
    }
    setIsDrawingOpen(false); // Close the drawing modal after saving
  };

  const handleReimagine = () => {
    setSavedDrawing(null); // Clear the saved drawing for re-imagining
    setDiaryEntries((prevEntries) => ({
      ...prevEntries,
      [selectedDate]: {
        ...prevEntries[selectedDate],
        drawing: null,
      },
    }));
    alert('The drawing has been cleared for re-imagining!');
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
            onClick={() => {
              handleInputModeChange('draw');
              setIsDrawingModalOpen(true);
            }}
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
        <div className="button-container">
          <button className="button enter-button" onClick={handleEnter}>
            Enter
          </button>

          <button className="button clear-button" onClick={handleClear}>
              Clear
          </button>
        </div>
        
        <div className="image-display">
          {imageUrl ? (
            <img src={imageUrl} alt="Mood" className="generated-image" />
          ) : (
            <div className="placeholder">Your image will appear here</div>
          )}
        </div>

        <div className="mood-slider-container">
          <div className="mood-emojis">
            {moodEmojis.map((emoji, index) => (
              <span key={index} className="mood-emoji">
                {emoji}
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
        </div>

        {selectedMusic && (
          <div className="music-suggestion">
            <h3>Suggested Playlist:</h3>
            <a href={selectedMusic.playlistUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={`https://img.youtube.com/vi/${getYouTubeVideoId(selectedMusic.playlistUrl)}/hqdefault.jpg`}
                alt={`${selectedMusic.title} playlist`}
                className="music-thumbnail"
              />
            </a>
          </div>
        )}

        <div className="mood-analysis">
          <h3>Past 14 Days Mood Analysis</h3>
          <ul>
            {Object.keys(moodAnalysis).map((mood, index) => (
              <li key={mood}>
                {moodLabels[index]} {moodEmojis[index]}: {moodAnalysis[mood]}
              </li>
            ))}
          </ul>
        </div>

        <AlertModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message="It seems that you've been feeling fear or sadness for more than 7 days in the past two weeks. Consider talking to a psychiatrist."
          link="https://www.google.com/search?q=%E5%BF%83%E7%90%86%E9%86%AB%E7%94%9F"
        />
      </div>

      {/* Add DrawingModal here */}
      <DrawingModal
        isOpen={isDrawingModalOpen}
        onClose={() => setIsDrawingModalOpen(false)}
        canvasRef={canvasRef}
        handleCanvasMouseDown={handleCanvasMouseDown}
        handleCanvasMouseMove={handleCanvasMouseMove}
        handleCanvasMouseUp={handleCanvasMouseUp}
        saveDrawing={saveDrawing}
        reimagineDrawing={handleReimagine}
        savedDrawing={savedDrawing} // Pass the saved drawing to the modal
      />
    </div>
  );
}

export default App;