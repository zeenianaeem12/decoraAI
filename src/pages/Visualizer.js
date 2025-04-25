import React, { useRef, useState, useEffect } from "react";

// Helper function to find GCD for ratio simplification
const gcd = (a, b) => {
  return b === 0 ? a : gcd(b, a % b);
};

const Visualizer = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [current, setCurrent] = useState({ x: 0, y: 0 });
  const [img, setImg] = useState(null);
  const [selection, setSelection] = useState(null);

  // Load image on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const newImg = new Image();
    newImg.src = imageUrl;

    newImg.onload = () => {
      canvas.width = newImg.width;
      canvas.height = newImg.height;
      ctx.drawImage(newImg, 0, 0);
      setImg(newImg);
    };
  }, [imageUrl]);

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const drawAll = (start, end, highlight = false) => {
    if (!img) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    if (highlight && start && end) {
      const width = end.x - start.x;
      const height = end.y - start.y;

      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fillRect(start.x, start.y, width, height);

      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(start.x, start.y, width, height);
    }
  };

  const handleMouseDown = (e) => {
    const pos = getMousePos(e);
    setStart(pos);
    setCurrent(pos);
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    setCurrent(pos);
    drawAll(start, pos, true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);

    const selWidth = Math.abs(current.x - start.x);
    const selHeight = Math.abs(current.y - start.y);

    if (selWidth === 0 || selHeight === 0) return;

    const divisor = gcd(selWidth, selHeight);
    const ratioW = Math.round(selWidth / divisor);
    const ratioH = Math.round(selHeight / divisor);
    const ratioString = `${ratioW}:${ratioH}`;

    setSelection({
      aspectRatio: ratioString,
      start: {
        x: Math.round(start.x),
        y: Math.round(start.y),
      },
      end: {
        x: Math.round(current.x),
        y: Math.round(current.y),
      },
    });

    drawAll(start, current, true);
  };

  const handleClear = () => {
    setSelection(null);
    if (img) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, 0, 0);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: "1px solid black", cursor: "crosshair" }}
      />
      {selection && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Aspect Ratio:</h3>
          <p>{selection.aspectRatio}</p>

          <h4>Start Coordinates:</h4>
          <p>X: {selection.start.x}, Y: {selection.start.y}</p>

          <h4>End Coordinates:</h4>
          <p>X: {selection.end.x}, Y: {selection.end.y}</p>
        </div>
      )}
      <button onClick={handleClear} style={{ marginTop: "1rem" }}>
        Clear Selection
      </button>
    </div>
  );
};

export default Visualizer;
