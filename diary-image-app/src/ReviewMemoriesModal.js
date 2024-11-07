import React from 'react';

function ReviewMemoriesModal({ isOpen, onClose, happyDays, onSelectDate }) {
  if (!isOpen || happyDays.length === 0) return null; // Do not render if no happy memories

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cheer up🙌</h2>
        <ul>
          {happyDays.map((date) => (
            <li key={date}>
              <button onClick={() => onSelectDate(date)}>{date}</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ReviewMemoriesModal;
