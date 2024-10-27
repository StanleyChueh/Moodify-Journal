import React from 'react';
import './AlertModal.css';

function AlertModal({ isOpen, onClose, message, link }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Time to Get Some Help!</h2>
                <p className="modal-message">{message}</p>
                <a href={link} target="_blank" rel="noopener noreferrer" className="modal-link">
                    Visit a Psychiatrist
                </a>
                <button className="modal-close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default AlertModal;

