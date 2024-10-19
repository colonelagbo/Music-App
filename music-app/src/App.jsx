import React, { useState } from 'react';
import HomePage from './components/HomePage';
import MusicPlayer from './components/MusicPlayer';


function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [tracks, setTracks] = useState([]);

  const handleSearch = async (query) => {
    try {
      const results = await searchTracks(query);
      setTracks(results);
    } catch (error) {
      console.error('Error searching tracks:', error);
      setTracks([]); // Clear tracks on error
    }
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
  };

  const navigateToHome = () => {
    setCurrentTrack(null);
  };

  return (
    <div>
      {currentTrack ? (
        <MusicPlayer 
          track={currentTrack} 
          onSearch={handleSearch} 
          onNavigateHome={navigateToHome}
        />
      ) : (
        <HomePage 
          tracks={tracks} 
          onTrackSelect={handleTrackSelect} 
          onSearch={handleSearch}
          onNavigateHome={navigateToHome}
        />
      )}
    </div>
  );
}

export default App;