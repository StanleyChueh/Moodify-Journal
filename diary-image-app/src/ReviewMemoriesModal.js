import React from 'react';
import './ReviewMemoriesModal.css'; // Add this for styling

function ReviewMemoriesModal({ isOpen, onClose, happyDays, onSelectDate }) {
  if (!isOpen || happyDays.length === 0) return null; // Do not render if no happy memories

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Cheer up <span role="img" aria-label="hands">🙌</span></h2>
        <p className="modal-message">
          "We all have tough days. Here's a happy memory to brighten your day!"
        </p>
        <div className="memory-list">
          {happyDays.map((date) => (
            <button
              key={date}
              className="memory-button"
              onClick={() => onSelectDate(date)}
            >
              {date}
            </button>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ReviewMemoriesModal;
