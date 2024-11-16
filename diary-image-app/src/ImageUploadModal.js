import React from 'react';
import './Modal.css'; // Create a separate file for unified styling

function ImageUploadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Upload Image for Mood</h2>
        <label>
          Select Mood:
          <select>
            <option value="Anger">Anger</option>
            <option value="Neutral">Neutral</option>
            <option value="Fear">Fear</option>
            <option value="Sadness">Sadness</option>
            <option value="Surprise">Surprise</option>
            <option value="Happiness">Happiness</option>
          </select>
        </label>
        <input type="file" accept="image/*" />
        <div className="modal-buttons">
          <button>Save</button>
          <button>Remove</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadModal;
