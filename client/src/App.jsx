import React, { useState } from 'react';

const App = () => {
  const [selfHost, setSelfHost] = useState(false);

  const switchHost = () => {
    setSelfHost(!selfHost);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
      }}
    >
      <h2 style={{ marginBottom: '20px', color: '#333' }}>
        {selfHost ? 'Now Playing: Self-Hosted Video' : 'Now Playing: External Video (Cloudinary)'}
      </h2>
      <video
        controls
        style={{
          width: '80%',
          maxWidth: '720px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          marginBottom: '20px',
        }}
        onContextMenu={(e) => e.preventDefault()}
        src={selfHost ? 'http://localhost:3001/self-hosted' : 'http://localhost:3001/stream-external'}
      />
      <button
        onClick={switchHost}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        Switch to {selfHost ? 'External Host' : 'Self Host'}
      </button>
      <style>
        {`
          @media (min-width: 768px) {
            video {
              width: 60%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default App;
