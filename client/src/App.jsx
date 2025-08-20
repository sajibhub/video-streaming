import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [selfHost, setSelfHost] = useState(false);
  const videoRef = useRef(null);
  
  const switchHost = () => {
    setSelfHost(!selfHost);
  };

  const videoSrc = selfHost
    ? `${import.meta.env.VITE_API_URL}/stream-self-hosted`
    : `${import.meta.env.VITE_API_URL}/stream-external`;
    
  const videoTitle = selfHost
    ? 'Self-Hosted Video'
    : 'External Video (Cloudinary)';
    
  const videoSubtitle = selfHost
    ? 'High-quality streaming from our servers'
    : 'Premium content delivery via Cloudinary';

  return (
    <div className="app-container">
      <div className="video-header">
        <div className="header-content">
          <h1 className="app-title">Premium Video Experience</h1>
          <div className="video-info">
            <h2 className="video-title">{videoTitle}</h2>
            <p className="video-subtitle">{videoSubtitle}</p>
          </div>
        </div>
        
        <div className="host-indicator">
          <div className={`indicator-dot ${selfHost ? 'self-host' : 'external-host'}`}></div>
          <span className="indicator-text">{selfHost ? 'Self-Hosted' : 'Cloudinary'}</span>
        </div>
      </div>
      
      <div className="video-container">
        <video
          ref={videoRef}
          key={selfHost ? 'self' : 'external'}
          className="video-player"
          controls
          autoPlay
          playsInline
          preload="metadata"
          onContextMenu={(e) => e.preventDefault()}
          src={videoSrc}
        />
        
        <div className="video-overlay">
          <div className="overlay-gradient"></div>
        </div>
      </div>
      
      <div className="controls-container">
        <div className="controls">
          <button 
            onClick={switchHost} 
            className={`switch-button ${selfHost ? 'self-host' : 'external-host'}`}
          >
            <div className="button-icon-container">
              <svg className="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="button-text">
              Switch to {selfHost ? 'External Host' : 'Self Host'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;