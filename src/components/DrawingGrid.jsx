// DrawingGrid.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import '../styles/DrawingGrid.css';

function DrawingGrid({ onDraw }) {
  const [lines, setLines] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const linesRef = useRef([]); 

  useEffect(() => {
    linesRef.current = lines; 
    onDraw(lines); 
  }, [lines, onDraw]);

  const sketch = (p5) => {
    let grid = [];
    const gridSize = 19; 

    const createGrid = () => {
      for (let x = gridSize; x < p5.width; x += gridSize) {
        for (let y = gridSize; y < p5.height; y += gridSize) {
          grid.push(p5.createVector(x, y));
        }
      }
    };

    p5.setup = () => {
      p5.createCanvas(450, 450);
      createGrid();
    };

    p5.draw = () => {
      p5.background(0, 0, 9);
    
      grid.forEach(point => {
        p5.stroke(36, 216, 243);
        p5.strokeWeight(4);
        p5.point(point.x, point.y);
      });

      lines.forEach(line => {
        p5.stroke('white');
        p5.strokeWeight(4);
        p5.line(line[0].x, line[0].y, line[1].x, line[1].y);
      });
    };

    p5.mousePressed = () => {
      let closestPoint = grid.find(point => p5.dist(p5.mouseX, p5.mouseY, point.x, point.y) < gridSize / 2);
      if (closestPoint) {
        if (selectedPoint) {
          setLines(prevLines => [...prevLines, [selectedPoint, closestPoint]]);
          setSelectedPoint(null);
        } else {
          setSelectedPoint(closestPoint);
        }
      }
    };
  };

  return (
    <div className="canvas-container"> 
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
}

export default DrawingGrid;
