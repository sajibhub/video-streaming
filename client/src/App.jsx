import React, { useState } from 'react';
import './App.css'; // Make sure this path points to where your CSS is saved

const App = () => {
  const [selfHost, setSelfHost] = useState(false);

  const switchHost = () => {
    setSelfHost(!selfHost);
  };

  return (
    <div className="app-container">
      <h2 className="video-title">
        {selfHost
          ? 'Now Playing: Self-Hosted Video'
          : 'Now Playing: External Video (Cloudinary)'}
      </h2>

      <video
        className="video-player"
        controls
        onContextMenu={(e) => e.preventDefault()}
        src={
          selfHost
            ? 'http://localhost:3001/self-hosted'
            : 'http://localhost:3001/stream-external'
        }
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
