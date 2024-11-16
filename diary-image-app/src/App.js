import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaKeyboard, FaMicrophone, FaPenFancy } from 'react-icons/fa';
import './App.css';
import AlertModal from './AlertModal';
import DrawingModal from './DrawingModal';
import ReviewMemoriesModal from './ReviewMemoriesModal';
import Chatbot from './components/Chatbot';

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
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [happyMemories, setHappyMemories] = useState([]);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [happyDays, setHappyDays] = useState([]);

  const checkForGoodMemories = useCallback(() => {
    const last14Days = dateList.slice(0, 14);
    const foundHappyDays = last14Days.filter((date) => {
      const entry = diaryEntries[date];
      return entry && entry.mood >= 85; // Check for happiness range
    });
    setHappyDays(foundHappyDays);
  }, [dateList, diaryEntries]);
  
  const handleMoodChange = (newMood) => {
    setMood(newMood);
  
    // Check if the newMood corresponds to "fear" (34-50) or "sadness" (51-67)
    if ((newMood >= 34 && newMood <= 50) || (newMood >= 51 && newMood <= 67)) {
      // Check for past happy memories when selecting fear or sadness
      const last14Days = dateList.slice(0, 14);
      const foundHappyDays = last14Days.filter((date) => {
        const entry = diaryEntries[date];
        return entry && entry.mood >= 85; // Check if the mood is "happy"
      });
  
      if (foundHappyDays.length > 0) {
        setHappyDays(foundHappyDays); // Update state with happy days
        setIsReviewModalOpen(true); // Open the review modal
      } else {
        setIsReviewModalOpen(false); // Close the modal if no happy days are found
      }
    } else {
      setIsReviewModalOpen(false); // Ensure the modal is closed for other mood selections
    }
  };  
  
  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    setIsLanguageModalOpen(false); // Close modal
    startSpeechRecognition(languageCode); // Start speech-to-text with the selected language
  };

  const handleOpenReviewModal = () => {
    checkForGoodMemories();
    setIsReviewModalOpen(true);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsReviewModalOpen(false);
  };

  useEffect(() => {
    if ((mood >= 34 && mood <= 50) || (mood >= 51 && mood <= 67)) {
      handleReviewMemories();
    }
  }, [mood]);
  
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
    setSavedDrawing(diaryEntries[date]?.drawing || null);
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
    if (isRecording) stopSpeechRecognition();
    setActiveInputMode(mode);
    if (mode === 'speech') setIsLanguageModalOpen(true); 

    setActiveInputMode(mode);

    if (mode === 'speech') {
      //setIsSpeechOpen(true);
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
      //setIsSpeechOpen(false);
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

  const startSpeechRecognition = (languageCode) => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = languageCode;
    recognition.interimResults = false;
    recognition.continuous = true;
    recognitionRef.current = recognition;

    let lastTranscript = ""; 

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {  // Append only if the result is final
              transcript += result[0].transcript.trim();
          }
      }

      // Avoid duplicating words by comparing with the last appended text
      if (transcript && transcript !== lastTranscript) {
          setSpeechResult((prevResult) => prevResult + ' ' + transcript);
          lastTranscript = transcript;  // Update last transcript to the new one
      }
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
    //setIsDrawingOpen(false); // Close the drawing modal after saving
  };

  const handleReimagine = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      // Clear the entire canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    // Reset the savedDrawing state to clear the drawing in the state
    setSavedDrawing(null);
    setDiaryEntries((prevEntries) => ({
      ...prevEntries,
      [selectedDate]: {
        ...prevEntries[selectedDate],
        drawing: null,
      },
    }));
    alert('The drawing has been cleared for re-imagining!');
  };
  
  const handleReviewMemories = () => {
    const last14Days = dateList.slice(0, 14);
    const happyDays = last14Days.filter(date => {
      const entry = diaryEntries[date];
      return entry && entry.mood >= 85; // Assuming 85-100 is happiness
    });

    if (happyDays.length > 0) {
      setHappyMemories(happyDays);
      setIsMemoryModalOpen(true);
    }
  };

  useEffect(() => {
    if (mood < 51) { // Assuming 0-50 is sadness or fear
      handleReviewMemories();
    }
  }, [mood]);
  
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
        
        {isLanguageModalOpen && (
          <div className="language-modal">
            <h3>Choose Language for Speech-to-Text</h3>
            <button onClick={() => handleLanguageSelect('en-US')}>English</button>
            <button onClick={() => handleLanguageSelect('zh-TW')}>Taiwanese</button>
          </div>
        )}

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
            onChange={(e) => handleMoodChange(Number(e.target.value))}
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

      {isReviewModalOpen && (
        <ReviewMemoriesModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          happyDays={happyDays}
          onSelectDate={handleSelectDate}
        />
      )}
    </div>

  );
}

export default App;