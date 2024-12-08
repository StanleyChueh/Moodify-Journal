import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaKeyboard, FaMicrophone, FaPenFancy } from 'react-icons/fa';
import './App.css';
import AlertModal from './AlertModal';
import DrawingModal from './DrawingModal';
import ReviewMemoriesModal from './ReviewMemoriesModal';
import catGif from './cat.gif';
import PatrickStar from './spongebob-patrick-star.gif'
import { FaBars } from 'react-icons/fa'; 

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

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

function ImageUploadModal({
  isOpen,
  onClose,
  onSave,
  onRemoveImage,
  onResetToDefault,
  selectedMoodForImage,
  setSelectedMoodForImage,
  uploadedImage, // Receive uploadedImage as a prop
  setUploadedImage, // Receive setUploadedImage as a prop
  selectedMoodForPlaylist, // Add here
  setSelectedMoodForPlaylist, // Add here
}) {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // Update global state for uploadedImage
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="image-upload-modal yellow-theme">
        <h3>Upload Image for Mood</h3>
        <label>
          Select Option:
          <select
            value={selectedMoodForImage} // Use the correct state
            onChange={(e) => setSelectedMoodForImage(e.target.value)} // Update selectedMoodForImage
          >
            {moodLabels.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </label>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {uploadedImage && (
          <div className="uploaded-preview">
            <img src={uploadedImage} alt="Uploaded preview" />
          </div>
        )}
        <div className="modal-buttons">
          <button className="button save-button" onClick={() => onSave(selectedMoodForImage, uploadedImage)}>
            Save
          </button>
          <button
              className="button remove-button"
              onClick={() => onRemoveImage(selectedMoodForImage)} // Uses the correct prop
          >
              Remove
          </button>
          <button className="button reset-button" onClick={onResetToDefault}>
            Default
          </button>
          <button className="button cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function getRandomImageForMood(moodValue, customMoodImages) {
  const moodIndex = Math.min(
      Math.floor((moodValue / 100) * moodLabels.length),
      moodLabels.length - 1
  );
  const moodLabel = moodLabels[moodIndex];
  console.log("Mood label:", moodLabel); // Debug log

  const customImages = customMoodImages[moodLabel] || [];
  const folderImages = Array.from(
      { length: imageCounts[moodLabel] || 0 },
      (_, index) =>
          `${process.env.PUBLIC_URL}/${imageDirectories[moodLabel]}/image${index + 1}.jpg`
  );

  const allImages = [...customImages, ...folderImages];
  console.log("Available images:", allImages); // Debug log

  if (allImages.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * allImages.length);
  const selectedImage = allImages[randomIndex];
  console.log("Selected image:", selectedImage); // Debug log
  return selectedImage;
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

function PlaylistModal({
  isOpen,
  onClose,
  onSave,
  selectedMoodForPlaylist,
  setSelectedMoodForPlaylist,
  youtubeLink,
  setYoutubeLink,
}) {
  if (!isOpen) return null;

  return (
    <div className="playlist-modal">
      <h3>Customize Playlist</h3>
      <label>
        Select Option:
        <select
          value={selectedMoodForPlaylist}
          onChange={(e) => setSelectedMoodForPlaylist(e.target.value)}
        >
          <option value="Background Music">Background Music</option> {/* Add this */}
          {moodLabels.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </select>
      </label>
      <label>
        YouTube Link:
        <input
          type="url"
          placeholder="Paste YouTube link here"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />
      </label>
      <button onClick={() => onSave(selectedMoodForPlaylist, youtubeLink)}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
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
  //const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [happyMemories, setHappyMemories] = useState([]);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [happyDays, setHappyDays] = useState([]);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [selectedMoodForPlaylist, setSelectedMoodForPlaylist] = useState("Anger");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);
  const [selectedMoodForImage, setSelectedMoodForImage] = useState("Anger");
  const [isOtherFunctionModalOpen, setIsOtherFunctionModalOpen] = useState(false);
  const [isRemoveImageModalOpen, setIsRemoveImageModalOpen] = useState(false);
  const [moodToRemoveImages, setMoodToRemoveImages] = useState("Anger");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [backgroundMusic, setBackgroundMusic] = useState("https://youtu.be/CFGLoQIhmow?si=SQ5DQVCCAmKdOt3K"); // Default YouTube link
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false); // Tracks music playback
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  const [isRewardPopupOpen, setIsRewardPopupOpen] = useState(false); // Tracks reward pop-up visibility
  const [userPoints, setUserPoints] = useState(0); // Tracks user points
  const [isPointPopupOpen, setIsPointPopupOpen] = useState(false); // Controls point card pop-up visibility
  const [checkedDays, setCheckedDays] = useState(new Set()); // Tracks days with points already awarded
  const [youtubePlayer, setYoutubePlayer] = useState(null); // Reference to YouTube IFrame player
  const [isMoodAnalysisModalOpen, setIsMoodAnalysisModalOpen] = useState(false); // For Mood Analysis
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false); // For Alert Modal
  const [customMoodImages, setCustomMoodImages] = useState({
    Anger: [],
    Neutral: [],
    Fear: [],
    Sadness: [],
    Surprise: [],
    Happiness: [],
  });  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleBackgroundMusic = () => {
    if (!youtubePlayer) return;
  
    if (isBackgroundMusicPlaying) {
      youtubePlayer.pauseVideo(); // Pause music
    } else {
      youtubePlayer.playVideo(); // Play music
    }
    setIsBackgroundMusicPlaying(!isBackgroundMusicPlaying); // Toggle playback state
  };  

  const handleSaveCustomImage = (mood, image) => {
    if (!image) {
      alert("No image selected. Please upload an image before saving.");
      return; // Exit early if no image is provided
    }
  
    // Update the custom mood images state
    setCustomMoodImages((prevImages) => ({
      ...prevImages,
      [mood]: [...(prevImages[mood] || []), image], // Add the new image to the existing list
    }));
  
    // Save the updated images to LocalStorage for persistence
    try {
      const updatedImages = {
        ...customMoodImages,
        [mood]: [...(customMoodImages[mood] || []), image],
      };
      localStorage.setItem("customMoodImages", JSON.stringify(updatedImages));
    } catch (error) {
      console.error("Error saving image to localStorage:", error);
      alert("An error occurred while saving the image. Please try again.");
      return; // Exit if an error occurs
    }
  
    // Reset the uploaded image preview
    setUploadedImage(null);
  
    // Close the modal
    setIsImageUploadModalOpen(false);
  
    alert(`Image for mood "${mood}" saved successfully!`);
  };  

  const [customPlaylists, setCustomPlaylists] = useState({
    Anger: "",
    Neutral: "",
    Fear: "",
    Sadness: "",
    Surprise: "",
    Happiness: "",
  });  

  const handleSaveCustomPlaylist = (mood, link) => {
    if (mood === "Background Music") {
      setBackgroundMusic(link); // Update the background music
      localStorage.setItem("backgroundMusic", link); // Save to LocalStorage for persistence
    } else {
      setCustomPlaylists((prevPlaylists) => ({
        ...prevPlaylists,
        [mood]: link,
      }));
      localStorage.setItem(
        "customPlaylists",
        JSON.stringify({
          ...customPlaylists,
          [mood]: link,
        })
      );
    }
    setIsPlaylistModalOpen(false); // Close modal
    setYoutubeLink(""); // Clear input
  };  

  const LoyaltyCard = ({ userPoints }) => {
    const totalPoints = 10; // Total points on the loyalty card
    const filledPoints = Math.min(userPoints, totalPoints); // Prevent overflow of points

    return (
        <div className="loyalty-card">
            <h3>Loyalty Card</h3>
            <div className="points-grid">
                {Array.from({ length: totalPoints }, (_, index) => (
                    <div
                        key={index}
                        className={`point ${index < filledPoints ? "filled" : ""}`}
                    >
                        {index === totalPoints - 1 ? "FREE" : ""}
                    </div>
                ))}
            </div>
            <p>Earn 10 points and get a reward!</p>
        </div>
    );
};

  const checkForGoodMemories = useCallback(() => {
    const last14Days = dateList.slice(0, 14);
    const foundHappyDays = last14Days.filter((date) => {
      const entry = diaryEntries[date];
      return entry && entry.mood >= 85; // Check for happiness range
    });
    setHappyDays(foundHappyDays);
  }, [dateList, diaryEntries]);
  
  const handleMoodChange = (newMood) => {
    // Update the mood state
    setMood((prevMood) => {
      if (newMood === 100 && prevMood === 100) {
        return 99.9; // Temporarily change the state to force a re-render if needed
      }
      return newMood;
    });
  
    // Update the mood for the selected date in diaryEntries
    setDiaryEntries((prevEntries) => ({
      ...prevEntries,
      [selectedDate]: {
        ...prevEntries[selectedDate],
        mood: newMood,
      },
    }));
  
    // Check if the newMood corresponds to "fear" (34-50) or "sadness" (51-67)
    if ((newMood >= 34 && newMood <= 50) || (newMood >= 51 && newMood <= 67)) {
      // Check for past happy memories when selecting fear or sadness
      const last14Days = dateList
        .slice(0, 14)
        .sort((a, b) => new Date(b) - new Date(a)); // Ensure dates are sorted
  
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
  
  const toggleMusic = () => {
    if (!youtubePlayer) return; // Ensure player is ready
  
    if (isMusicPlaying) {
      youtubePlayer.pauseVideo(); // Pause music
    } else {
      youtubePlayer.playVideo(); // Play music
    }
  
    setIsMusicPlaying(!isMusicPlaying); // Update state
  };  
  
  const handleLanguageSelect = (languageCode) => {
    //setSelectedLanguage(languageCode);
    setIsLanguageModalOpen(false); // Close modal
    startSpeechRecognition(languageCode); // Start speech-to-text with the selected language
  };

  const handleOpenReviewModal = () => {
    checkForGoodMemories();
    setIsReviewModalOpen(true);
  };

  const handleSelectDate = (date) => {
    // Save the current day's data before switching
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

    // Set the selected date
    setSelectedDate(date);

    // Update the state with data from the selected date
    const entry = diaryEntries[date];
    setPrompt(entry?.description || '');
    setMood(entry?.mood || 25); // Default mood to 25 if none is saved
    setImageUrl(entry?.imageUrl || null);
    setSavedDrawing(entry?.drawing || null);
    setSpeechResult(entry?.speechResult || '');

    // Close the review memories modal after navigating to the selected date
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
    // Load YouTube iframe API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
    // Initialize YouTube player
    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player("background-music-player", {
        height: "0", // Hidden
        width: "0",  // Hidden
        videoId: getYouTubeVideoId(backgroundMusic), // Load default or custom background music
        events: {
          onReady: (event) => setYoutubePlayer(event.target), // Save player instance
        },
      });
    };
  
    // Update YouTube player when `backgroundMusic` changes
    if (youtubePlayer && backgroundMusic) {
      youtubePlayer.loadVideoById(getYouTubeVideoId(backgroundMusic)); // Load new video ID
    }
  }, [backgroundMusic, youtubePlayer]); // Dependencies: `backgroundMusic` and `youtubePlayer`
  
  useEffect(() => {
    const savedBackgroundMusic = localStorage.getItem("backgroundMusic");
    if (savedBackgroundMusic) {
      setBackgroundMusic(savedBackgroundMusic); // Load saved background music
    }
  }, []);  

  useEffect(() => {
    updateMoodAnalysis();
  }, [diaryEntries, updateMoodAnalysis]);

  useEffect(() => {
    const moodIndex = Math.min(
      Math.floor((mood / 100) * moodLabels.length),
      moodLabels.length - 1 // Stay within bounds
    );
    const moodLabel = moodLabels[moodIndex] || "Neutral"; // Fallback mood
  
    const defaultPlaylists = {
      Anger: "https://youtu.be/FLTchCiC0T0?si=_LEx70RIBrG3HC_Z",
      Neutral: "https://youtu.be/pTweN7F2PFA?si=5v6Ney7A9MTtJ086",
      Fear: "https://www.youtube.com/watch?v=0qanF-91aJo",
      Sadness: "https://youtu.be/FFlPgTPvRJc?si=9SzqK2Vf7KaeAsFk",
      Surprise: "https://www.youtube.com/watch?v=HQmmM_qwG4k&t=2s",
      Happiness: "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
    };
  
    const playlistUrl = customPlaylists[moodLabel] || defaultPlaylists[moodLabel];
  
    setSelectedMusic({
      title: `${moodLabel} Playlist`,
      playlistUrl,
    });
  }, [mood, customPlaylists]);

  useEffect(() => {
    const savedImages = localStorage.getItem("customMoodImages");
    if (savedImages) {
      setCustomMoodImages(JSON.parse(savedImages));
    }
  }, []);  
  
  useEffect(() => {
    if (!isImageUploadModalOpen) {
      setUploadedImage(null); // Reset preview when modal is closed
    }
  }, [isImageUploadModalOpen]);  

  useEffect(() => {
    // Save diary entries to LocalStorage
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
  }, [diaryEntries]);
  
  useEffect(() => {
    // Save mood analysis to LocalStorage
    localStorage.setItem('moodAnalysis', JSON.stringify(moodAnalysis));
  }, [moodAnalysis]);
  
  useEffect(() => {
    // Save custom playlists to LocalStorage
    localStorage.setItem('customPlaylists', JSON.stringify(customPlaylists));
  }, [customPlaylists]);  

  useEffect(() => {
    // Load diary entries from LocalStorage
    const savedDiaryEntries = localStorage.getItem('diaryEntries');
    if (savedDiaryEntries) {
      setDiaryEntries(JSON.parse(savedDiaryEntries));
    }
  
    // Load mood analysis from LocalStorage
    const savedMoodAnalysis = localStorage.getItem('moodAnalysis');
    if (savedMoodAnalysis) {
      setMoodAnalysis(JSON.parse(savedMoodAnalysis));
    }
  
    // Load custom playlists from LocalStorage
    const savedPlaylists = localStorage.getItem('customPlaylists');
    if (savedPlaylists) {
      setCustomPlaylists(JSON.parse(savedPlaylists));
    }
  }, []); // Run once on component mount
  
  useEffect(() => {
    const cat = document.querySelector(".cat");
    const adjustSpeed = () => {
      cat.style.animationDuration = `${Math.random() * 3 + 3}s`; // Randomize speed
    };
    cat.addEventListener("animationiteration", adjustSpeed); // Change speed on each loop
    return () => {
      cat.removeEventListener("animationiteration", adjustSpeed);
    };
  }, []);  

  useEffect(() => {
    // Save selected date
    localStorage.setItem('selectedDate', selectedDate);
  }, [selectedDate]);
  
  useEffect(() => {
    // Load selected date
    const savedSelectedDate = localStorage.getItem('selectedDate');
    if (savedSelectedDate) {
      setSelectedDate(savedSelectedDate);
    }
  }, []);  

  const FAQModal = ({ onClose }) => (
    <div className="faq-modal">
      <h3>Frequently Asked Questions</h3>
      <ul>
        <li>
          <span>Q1: What is this app about?</span>
          <p>This app allows users to document their daily moods...</p>
        </li>
        {/* Other FAQ items */}
      </ul>
      <hr className="faq-divider" />
      <div className="author-info">
        <h4>About the Author</h4>
        <p>
          Created by: <strong>Your Name</strong>
        </p>
        <p>
          Email: <a href="mailto:your.email@example.com">your.email@example.com</a>
        </p>
      </div>
      <div className="report-issue">
        <h4>Report an Issue</h4>
        <p>
          Found a problem? Submit an issue on our{" "}
          <a href="https://github.com/your-repo/issues" target="_blank" rel="noopener noreferrer">
            GitHub Issues Page
          </a>.
        </p>
      </div>
      <button onClick={onClose}>Close</button> {/* Calls the onClose function */}
    </div>
  );  

  const handleCloseFAQModal = () => {
    setIsFAQModalOpen(false);
  };

  const handleClear = () => {
    if (activeInputMode === 'typing') {
      setPrompt('');
    } else if (activeInputMode === 'speech') {
      setSpeechResult('');
    }
  };

  const handleCloseModal = () => {
    setUploadedImage(null); // Clear the preview
    setIsImageUploadModalOpen(false); // Close the modal
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
    // Check if the selected day already received a point
    if (!checkedDays.has(selectedDate)) {
        setUserPoints((prevPoints) => {
            const newPoints = prevPoints + 1;

            // Show reward and reset points when reaching every 5 points
            if (newPoints % 6 === 0) {
                setTimeout(() => {
                    setIsRewardPopupOpen(true); // Show reward pop-up
                }, ); // Small delay for better user experience

                // Reset points back to 0 for the next round
                return 0;
            }

            return newPoints;
        });

        // Mark the day as checked
        setCheckedDays((prevCheckedDays) => new Set(prevCheckedDays).add(selectedDate));

        // Show the point card pop-up
        setIsPointPopupOpen(true);
    } else {
        alert("You have already checked your point for this day!");
    }

    // Handle mood image pop-up
    const image = getRandomImageForMood(mood, customMoodImages); // Get image based on mood
    setImageUrl(image); // Save the image URL for the diary entry
    setPopupImage(image); // Set the image for the pop-up
    setIsImagePopupOpen(true); // Open the pop-up modal

    // Handle speech input mode
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
    } else {
        // Update diary entry with text input mode
        setDiaryEntries((prevEntries) => ({
            ...prevEntries,
            [selectedDate]: {
                description: prompt,
                mood: mood, // Update mood in the diary entry
                imageUrl: image,
                speechResult: speechResult,
            },
        }));
        // No need for a separate alert since the modal will indicate success
    }
  };



  const handleInputModeChange = (mode) => {
    setActiveInputMode(mode);
    if (isRecording) stopSpeechRecognition();
    setActiveInputMode(mode);
    if (mode === 'speech') setIsLanguageModalOpen(true); 

    setActiveInputMode(mode);

    if (mode === 'speech') {
      setIsLanguageModalOpen(true); 
      //tartSpeechRecognition();
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
  
  const confirmRemoveImage = (mood, index) => {
    const customImages = customMoodImages[mood] || [];
  
    // Check if the image belongs to custom images
    if (index < customImages.length) {
      // Remove from custom images
      const updatedImages = customImages.filter((_, i) => i !== index);
      setCustomMoodImages((prevImages) => ({
        ...prevImages,
        [mood]: updatedImages,
      }));
  
      // Update LocalStorage
      localStorage.setItem(
        "customMoodImages",
        JSON.stringify({
          ...customMoodImages,
          [mood]: updatedImages,
        })
      );
    } else {
      // For hardcoded images, no action is needed as they are not dynamically updated
      alert("Hardcoded images cannot be removed dynamically!");
    }
  };  

  const handleRemoveImage = (mood) => {
    setMoodToRemoveImages(mood); // Set the selected mood
    setIsRemoveImageModalOpen(true); // Open the Remove Image modal

    // Update LocalStorage if necessary
    localStorage.setItem(
        "customMoodImages",
        JSON.stringify({
            ...customMoodImages,
            [mood]: null,
        })
    );
};

  const handleResetToDefault = () => {
    const confirmed = window.confirm("Are you sure you want to reset all custom images?");
    if (!confirmed) return;
  
    // Reset all custom images to empty arrays
    setCustomMoodImages({
      Anger: [],
      Neutral: [],
      Fear: [],
      Sadness: [],
      Surprise: [],
      Happiness: [],
    });
  
    // Remove from LocalStorage
    localStorage.removeItem("customMoodImages");
  };  

  
  const handleReviewMemories = () => {
    const last14Days = dateList.slice(0, 14);
    const happyDays = last14Days.filter(date => {
      const entry = diaryEntries[date];
      return entry && entry.mood >= 85; // Assuming 85-100 is happiness
    });

    if (happyDays.length > 0) {
      //setHappyMemories(happyDays);
      setIsMemoryModalOpen(true);
    }
  };

  const handleCatClick = () => {
    // Trigger FAQ modal or functionality
    //alert("Here's the FAQ!"); // For testing
    setIsFAQModalOpen(true); // Open the FAQ modal
  };  

  useEffect(() => {
    if (mood < 51) { // Assuming 0-50 is sadness or fear
      handleReviewMemories();
    }
  }, [mood]);
  
  const windowSize = useWindowSize();

  const autoResizeTextarea = (textarea) => {
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust to fit content
  };  
  
  return (
    <div className="app-layout">
      {/* Toggle Button Only for Mobile */}
      <button className="toggle-menu" onClick={toggleSidebar}>
        <FaBars />
      </button>
      {/* Sidebar with Date List */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2 className="sidebar-title">Diary AI</h2>
        <div className="diary-list-container">
          <ul className="diary-list">
            {dateList.map((date, index) => (
              <li
                key={date}
                className={`diary-item ${date === selectedDate ? 'active' : ''}`}
                onClick={() => {
                  handleDateClick(date);
                  setIsSidebarOpen(false); // Close sidebar after selection only on mobile
                }}
              >
                {index === 0 ? 'Today' : date}
              </li>
            ))}
          </ul>
        </div>
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
          className="description-input mobile-dynamic" // Shared styling
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto"; // Reset height to auto
            e.target.style.height = `${e.target.scrollHeight}px`; // Adjust to scroll height
          }}
          placeholder="How's your day?"
        />
        )}

        {activeInputMode === 'speech' && (
          <textarea
            className="description-input" // Shared styling
            value={speechResult}
            readOnly // Read-only since it's updated dynamically
            placeholder="Speech-to-text result..."
          />
        )}

        <div className="button-container">
          <button className="button enter-button" onClick={handleEnter}>
            Enter
          </button>
          <button className="button clear-button" onClick={handleClear}>
            Clear
          </button>
          <button
            className="button customize-playlist-button"
            onClick={() => setIsPlaylistModalOpen(true)}
          >
            Music
          </button>
          <button
            className="button customize-image-button"
            onClick={() => setIsImageUploadModalOpen(true)} // Opens the ImageUploadModal
          >
            Image
          </button>
        </div>

        {/* Mobile Layout */}
        {windowSize.width <= 768 && (
          <div className="mobile-controls">
            <div className="button-row">
              {/* Mood Analysis Button */}
              <button
                className="button mood-analysis-button"
                onClick={() => setIsMoodAnalysisModalOpen(true)}
              >
                Past Mood Analysis
              </button>

              {/* Play Music Button */}
              <button
                className="button play-music-button"
                onClick={toggleMusic}
              >
                {isMusicPlaying ? "Pause Music" : "Background Music"}
              </button>
            </div>

            {/* Mood Analysis Modal */}
            {isMoodAnalysisModalOpen && (
              <div className="mood-analysis-modal">
                <div className="modal-content">
                  <h3>Past 14 Days Mood Analysis</h3>
                  <ul>
                    {Object.keys(moodAnalysis).map((mood, index) => (
                      <li key={mood}>
                        {moodLabels[index]} {moodEmojis[index]}: {moodAnalysis[mood]}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="close-modal"
                    onClick={() => setIsMoodAnalysisModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <PlaylistModal
          isOpen={isPlaylistModalOpen}
          onClose={() => setIsPlaylistModalOpen(false)}
          onSave={handleSaveCustomPlaylist}
          selectedMoodForPlaylist={selectedMoodForPlaylist}
          setSelectedMoodForPlaylist={setSelectedMoodForPlaylist}
          youtubeLink={youtubeLink}
          setYoutubeLink={setYoutubeLink}
        />

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
            <a href={selectedMusic.playlistUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={`https://img.youtube.com/vi/${getYouTubeVideoId(selectedMusic.playlistUrl)}/hqdefault.jpg`}
                alt={`${selectedMusic.title} playlist`}
                className="music-thumbnail"
              />
            </a>
          </div>
        )}

        {/* Desktop Layout */}
        {windowSize.width > 768 && (
          <div className="desktop-mood-analysis">
            {/* Static Mood Analysis for Desktop */}
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
          </div>
        )}

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

      <ImageUploadModal
        isOpen={isImageUploadModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCustomImage}
        onRemoveImage={handleRemoveImage}
        onResetToDefault={handleResetToDefault}
        selectedMoodForImage={selectedMoodForImage}
        setSelectedMoodForImage={setSelectedMoodForImage}
        uploadedImage={uploadedImage} // Pass uploadedImage as a prop
        setUploadedImage={setUploadedImage} // Pass setUploadedImage as a prop
        selectedMoodForPlaylist={selectedMoodForPlaylist} // Pass as prop
        setSelectedMoodForPlaylist={setSelectedMoodForPlaylist} // Pass as prop
      />

      {isRemoveImageModalOpen && (
          <div className="modal-overlay">
              <div className="modal-content">
                  <h3>Select Image to Remove for {moodToRemoveImages}</h3>
                  <div className="image-grid">
                      {[
                          // Combine custom images and hardcoded images for the selected mood
                          ...(customMoodImages[moodToRemoveImages] || []),
                          ...Array.from(
                              { length: imageCounts[moodToRemoveImages] || 0 },
                              (_, index) =>
                                  `${process.env.PUBLIC_URL}/${imageDirectories[moodToRemoveImages]}/image${index + 1}.jpg`
                          ),
                      ].map((image, index) => (
                          <div key={index} className="image-item">
                              <img src={image} alt={`Image ${index + 1}`} />
                              <button
                                  className="remove-btn"
                                  onClick={() => confirmRemoveImage(moodToRemoveImages, index)}
                              >
                                  Remove
                              </button>
                          </div>
                      ))}
                  </div>
                  <button
                      className="button cancel-button"
                      onClick={() => setIsRemoveImageModalOpen(false)}
                  >
                      Cancel
                  </button>
              </div>
          </div>
      )}

      <div className="top-right-controls">
        {windowSize.width > 768 && ( // Only render the button on non-mobile screens
          <button onClick={toggleBackgroundMusic} className="music-toggle-button">
            {isBackgroundMusicPlaying ? (
              <span> Pause Music</span>
            ) : (
              <span>🎶 Play Music</span>
            )}
          </button>
        )}
      </div>

      <div id="background-music-player"></div>
      <div className="cat-animation" onClick={handleCatClick}> 
        <img src={catGif} alt="Running Cat" className="cat" />
      </div>
      
      {isFAQModalOpen && (
        <div className="modal-overlay">
          <div className="faq-modal">
            <h3>Frequently Asked Questions</h3>
            <ul>
              <li>
                <span>Q1: What is this app about?</span>
                <p>This app allows users to document their daily moods, add visual elements like drawings or images, and listen to mood-specific playlists.</p>
              </li>
              <li>
                <span>Q2: How do I record my mood?</span>
                <p>You can type in your diary entry, use voice-to-text functionality, or upload a drawing to reflect your mood.</p>
              </li>
              <li>
                <span>Q3: How do I customize playlists?</span>
                <p>Use the "Music" button to add a YouTube link for a mood-specific playlist or background music.</p>
              </li>
              <li>
                <span>Q4: How do I save images for moods?</span>
                <p>Use the "Image" button to upload and save custom images for each mood.</p>
              </li>
              <li>
                <span>Q5: How do I switch between input modes?</span>
                <p>Click the icons at the top (keyboard, microphone, or pen) to type, speak, or draw your mood.</p>
              </li>
              <li>
                <span>Q6: What happens when I click the cat GIF?</span>
                <p>Clicking the cat opens this FAQ to help you better understand how to use the app.</p>
              </li>
            </ul>
            <hr className="faq-divider" />
            <div className="author-info">
              <h4>About the Author</h4>
              <p>
                Created by: <strong>Stanley Chueh</strong>
              </p>
              <p>
                Email: <a href="mailto:stanleychueh28@gmail.com">stanleychueh28@gmail.com</a>
              </p>
              <p>
                For more information, visit my{" "}
                <a href="https://github.com/StanleyChueh/Moodify-Journal" target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>.
              </p>
            </div>
            <div className="report-issue">
              <h4>Report an Issue</h4>
              <p>
                Found a problem? Please let me know by submitting an issue on my{" "}
                <a href="https://github.com/StanleyChueh/Moodify-Journal/issues" target="_blank" rel="noopener noreferrer">
                  GitHub Issues Page
                </a>.
              </p>
            </div>
            <button className="cancel-button" onClick={handleCloseFAQModal}>
              Close
            </button>
          </div>
        </div>
      )}
      {isImagePopupOpen && (
          <div className="popup">
              <div className="popup-content">
                  {/* Mood Representation Section */}
                  {popupImage ? (
                      <>
                          <img src={popupImage} alt="Mood Representation" className="generated-image" />
                      </>
                  ) : (
                      <p>No image available for this mood</p>
                  )}

                  {/* Loyalty Card Section */}
                  <div className="point-card">
                      <h4>Points Earned</h4>
                      <p>You have earned <strong>1 point</strong> for today's entry!</p>
                      <p>Total Points: <strong>{userPoints}</strong></p>

                      {/* Reward Message when reaching 5 points */}
                      {userPoints === 5 && (
                          <div className="reward-message">
                              <h4>🎉 Congratulations! 🎉</h4>
                              <p>You’ve reached 5 points!</p>
                              <img
                                  src={PatrickStar} // Use the imported GIF here
                                  alt="Reward"
                                  className="reward-gif"
                              />
                          </div>
                      )}
                  </div>

                  {/* Close Button */}
                  <button
                      className="button cancel-button"
                      onClick={() => setIsImagePopupOpen(false)}
                  >
                      Close
                  </button>
              </div>
          </div>
      )}

    </div>

  );
}

export default App;