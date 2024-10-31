import React from 'react';
import './DrawingModal.css';

const DrawingModal = ({
  isOpen,
  onClose,
  canvasRef,
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  clearCanvas,
  saveDrawing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="drawing-modal-overlay">
      <div className="drawing-modal">
        <h2>Draw Your Mood</h2>
        <canvas
          ref={canvasRef}
          className="drawing-canvas"
          width={500}
          height={300}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
        />
        <div className="drawing-modal-buttons">
          <button onClick={saveDrawing}>Save</button>
          <button onClick={clearCanvas}>Re-imagine</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DrawingModal;
