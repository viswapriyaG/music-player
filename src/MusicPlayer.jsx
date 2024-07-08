import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import './MusicPlayer.css'; // Import CSS file for styling

const MusicPlayer = () => {
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      name: 'My Playlist',
      tracks: [
        { title: 'Song 1', src: '"C:\Users\vishw\Downloads\Justin Timberlake - Mirrors (Official Video).mp3"' },
        { title: 'Song 2', src: 'path/to/song2.mp3' },
        { title: 'Song 3', src: 'path/to/song3.mp3' },
      ],
    },
  ]);

  const [currentPlaylist, setCurrentPlaylist] = useState(playlists[0]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentTrack) {
      currentTrack.sound.on('load', () => {
        setDuration(currentTrack.sound.duration());
      });

      const timer = setInterval(() => {
        if (isPlaying) {
          setCurrentTime(currentTrack.sound.seek());
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentTrack, isPlaying]);

  const playTrack = (trackSrc) => {
    if (currentTrack && currentTrack.src === trackSrc && isPlaying) {
      setIsPlaying(false);
      currentTrack.sound.pause();
    } else {
      if (currentTrack && isPlaying) {
        currentTrack.sound.stop();
      }

      const sound = new Howl({
        src: [trackSrc],
        volume: 1.0,
        onload: () => {
          setDuration(sound.duration());
        },
        onplay: () => {
          setIsPlaying(true);
        },
        onpause: () => {
          setIsPlaying(false);
        },
        onend: () => {
          setIsPlaying(false);
        },
      });

      sound.play();
      setCurrentTrack({ src: trackSrc, sound });
      setIsPlaying(true);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="music-player-container">
      <div>
        <h2>{currentPlaylist.name}</h2>
        <ul>
          {currentPlaylist.tracks.map((track, index) => (
            <li key={index}>
              {track.title}
              <button onClick={() => playTrack(track.src)}>
                {currentTrack && currentTrack.src === track.src && isPlaying ? 'Pause' : 'Play'}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {currentTrack && (
        <div>
          <p>Current Time: {formatTime(currentTime)}</p>
          <p>Total Duration: {formatTime(duration)}</p>
        </div>
      )}
      <div className="footer">© Music Player App</div>
    </div>
  );
};

export default MusicPlayer;
