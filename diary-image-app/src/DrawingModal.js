import React, { useEffect } from 'react';

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
        <h2>Draw Your Mood</h2>
        <canvas
          ref={canvasRef}
          className="drawing-canvas"
          width="400"
          height="400"
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
        />
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
