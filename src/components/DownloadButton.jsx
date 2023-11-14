// DownloadButton.jsx
import React from 'react';
import '../styles/DownloadButton.css';

const DownloadButton = ({ lines }) => {
  const downloadSVG = () => {
    if (lines.length === 0) {
      alert("No Icon to download");
      return;
    }

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("viewBox", "0 0 450 450");
    svg.setAttribute("width", "450");
    svg.setAttribute("height", "450");

    const addedPoints = new Set();

    lines.forEach(([point1, point2]) => {
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", point1.x.toString());
      line.setAttribute("y1", point1.y.toString());
      line.setAttribute("x2", point2.x.toString());
      line.setAttribute("y2", point2.y.toString());
      line.setAttribute("stroke", "black");
      line.setAttribute("stroke-width", "4");
      svg.appendChild(line);

      [point1, point2].forEach(point => {
        const key = `${point.x},${point.y}`;
        if (!addedPoints.has(key)) {
          addedPoints.add(key);
          const circle = document.createElementNS(svgNS, "circle");
          circle.setAttribute("cx", point.x.toString());
          circle.setAttribute("cy", point.y.toString());
          circle.setAttribute("r", "2");
          circle.setAttribute("fill", "black");
          svg.appendChild(circle);
        }
      });
    });

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = "doticon.svg";
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button className="download-btn" onClick={downloadSVG}>
      Download SVG
    </button>
  );
};

export default DownloadButton;
