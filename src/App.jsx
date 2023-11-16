import React, { useState, useCallback } from 'react';
import DrawingGrid from './components/DrawingGrid';
import DownloadButton from './components/DownloadButton';
import Footer from './components/Footer';
import './styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import dotIcon from '../src/assets/doticon.png';

function App() {
  const [shapes, setShapes] = useState([]);

  const handleDraw = useCallback((newShapes) => {
    setShapes(newShapes);
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className='title_container'>
        <h1>DotIcon</h1>
        <h2>Simple icon <br />
          by joining the dots <br />
          and download it</h2>
        <h3>Sorry go to desktop for use this <br /> mobile coming soon :D </h3>  
      </div>
      <div className='img_container'>
        <img src={dotIcon} alt="illustration de doticon" />
      </div>
      <div className='drawing_container'>
        <DrawingGrid onDraw={handleDraw} />
        <button onClick={refreshPage} className='reset_button' >
          <FontAwesomeIcon icon={faRedoAlt} />
        </button>
        <DownloadButton shapes={shapes} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
