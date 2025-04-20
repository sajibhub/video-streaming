import React from 'react';

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Streaming Video Player</h2>
      <video
        controls
        style={{ width: '100%', maxWidth: 720 }}
        onContextMenu={(e) => e.preventDefault()}
        src="http://localhost:3001/video"
      />

    </div>
  );
};

export default App;
