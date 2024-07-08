// src/App.js
import React from 'react';
import MusicPlayer from './MusicPlayer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Web-based Music Player</h1>
      </header>
      <main>
        <MusicPlayer />
      </main>
      <footer>
        <p>&copy; 2024 Music Player App</p>
      </footer>
    </div>
  );
}

export default App;

