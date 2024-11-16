// src/components/Chatbot.js
import React, { useState } from 'react';
import './Chatbot.css'; // Create or modify CSS for styling if needed.

function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (userMessage.trim() === '') return;

    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: 'user', text: userMessage }]);
    setUserMessage('');

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();

      // Add chatbot response to chat history
      setChatHistory([...chatHistory, { sender: 'user', text: userMessage }, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory([...chatHistory, { sender: 'bot', text: 'Error contacting the server.' }]);
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;
