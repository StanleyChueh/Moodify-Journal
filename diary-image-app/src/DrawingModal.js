import React, { useEffect, useState } from 'react';
import './DrawingModal.css';

function DrawingModal({
  isOpen,
  onClose,
  canvasRef,
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  saveDrawing,
  reimagineDrawing,
  savedDrawing,
}) {
  const [selectedColor, setSelectedColor] = useState('#000000'); // Default color is black

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#800080', '#00FFFF', '#FFC0CB', '#8B4513']; // Added more colors

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = color; // Update drawing color
    }
  };

  useEffect(() => {
    // Load the saved drawing specific to the date if it exists
    const canvas = canvasRef.current;
    if (canvas && savedDrawing) {
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = savedDrawing;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before loading
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Load the saved image
      };
    } else if (canvas) {
      // Clear the canvas if there's no saved drawing
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [isOpen, savedDrawing]); // Reloads when modal opens or savedDrawing changes

  return (
    <div className={`drawing-overlay ${isOpen ? 'active' : ''}`}>
      <div className="drawing-modal-content">
        <div className="modal-decoration"></div> {/* Optional decoration */}
        <h2>Draw Your Mood</h2>
        <canvas
          ref={canvasRef}
          className="drawing-canvas"
          width="700"
          height="700"
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
        />
        <div className="color-palette">
          <h3>Select Color:</h3>
          {colors.map((color, index) => (
            <button
              key={index}
              style={{
                backgroundColor: color,
                width: '30px',
                height: '30px',
                margin: '2px',
                border: selectedColor === color ? '2px solid #000' : '1px solid #ccc',
                cursor: 'pointer',
                borderRadius: '50%', // Make color buttons circular
              }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
        <div className="drawing-buttons">
          <button onClick={saveDrawing}>Save</button>
          <button onClick={reimagineDrawing}>Re-imagine</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default DrawingModal;
