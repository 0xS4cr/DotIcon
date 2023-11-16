// DownloadButton.jsx
import React from 'react';
import '../styles/DownloadButton.css';

const DownloadButton = ({ shapes }) => {
  const downloadSVG = () => {
    if (shapes.length === 0) {
      alert("No Icon to download");
      return;
    }

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("viewBox", "0 0 450 450");
    svg.setAttribute("width", "450");
    svg.setAttribute("height", "450");

    shapes.forEach(shape => {
      for (let i = 1; i < shape.length; i++) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", shape[i - 1].x.toString());
        line.setAttribute("y1", shape[i - 1].y.toString());
        line.setAttribute("x2", shape[i].x.toString());
        line.setAttribute("y2", shape[i].y.toString());
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "4");
        svg.appendChild(line);
      }
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
