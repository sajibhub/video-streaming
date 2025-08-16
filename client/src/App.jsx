import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [selfHost, setSelfHost] = useState(false);

  const switchHost = () => {
    setSelfHost(!selfHost);
  };

  const videoSrc = selfHost
    ? `${import.meta.env.VITE_API_URL}/self-hosted`
    : `${import.meta.env.VITE_API_URL}/stream-external`;

  const videoTitle = selfHost
    ? 'Now Playing: Self-Hosted Video'
    : 'Now Playing: External Video (Cloudinary)';

  return (
    <div className="app-container">
      <h2 className="video-title">{videoTitle}</h2>

      <video
        key={selfHost ? 'self' : 'external'} // forces reload on switch
        className="video-player"
        controls
        autoPlay
        muted
        onContextMenu={(e) => e.preventDefault()}
        src={videoSrc}
      />

      <div className="controls">
        <button onClick={switchHost} className="switch-button">
          Switch to {selfHost ? 'External Host' : 'Self Host'}
        </button>
      </div>
    </div>
  );
};

export default App;
