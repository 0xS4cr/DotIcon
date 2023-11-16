// DrawingGrid.jsx
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../styles/DrawingGrid.css';

function DrawingGrid({ onDraw }) {
  const sketchRef = useRef();
  const p5Instance = useRef(null);
  const shapesRef = useRef([]);

  const sketch = (p) => {
    const gridSize = 19;
    let currentShape = [];
    let drawing = false;

    p.setup = () => {
      p.createCanvas(450, 450);
    };

    p.draw = () => {
      p.background(0, 0, 9);
      drawGrid(p);
      drawShapes(p, shapesRef.current);

      if (drawing) {
        drawCurrentShape(p, currentShape);
      }
    };

    function drawGrid(p) {
      for (let x = gridSize; x < p.width; x += gridSize) {
        for (let y = gridSize; y < p.height; y += gridSize) {
          p.stroke(36, 216, 243);
          p.strokeWeight(4);
          p.point(x, y);
        }
      }
    }

    function drawShapes(p, shapes) {
      shapes.forEach(shape => {
        p.stroke('white');
        p.strokeWeight(4);
        p.noFill();
        p.beginShape();
        shape.forEach(pt => p.vertex(pt.x, pt.y));
        p.endShape();
      });
    }

    function drawCurrentShape(p, shape) {
        p.stroke('red');
        p.strokeWeight(4);
        p.noFill();
        p.beginShape();
        shape.forEach(pt => p.vertex(pt.x, pt.y));
        p.endShape();
    }

    p.mousePressed = () => {
      if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
        currentShape = [snapToGrid(p.mouseX, p.mouseY)];
        drawing = true;
      }
    };

    p.mouseDragged = () => {
      if (drawing) {
        currentShape.push(snapToGrid(p.mouseX, p.mouseY));
      }
    };

    p.mouseReleased = () => {
      if (drawing) {
        shapesRef.current.push(currentShape);
        onDraw(shapesRef.current);
        drawing = false;
      }
    };

    function snapToGrid(x, y) {
      const snappedX = Math.round(x / gridSize) * gridSize;
      const snappedY = Math.round(y / gridSize) * gridSize;
      return p.createVector(snappedX, snappedY);
    }
  };

  useEffect(() => {
    p5Instance.current = new p5(sketch, sketchRef.current);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  return <div ref={sketchRef} className="canvas-container" />;
}

export default DrawingGrid;
