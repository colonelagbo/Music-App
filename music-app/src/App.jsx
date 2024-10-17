import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import { searchTracks } from './api/deezerApi';

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleSearch = async (query) => {
    try {
      const results = await searchTracks(query);
      setTracks(results);
    } catch (error) {
      console.error('Error searching tracks:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        <TrackList tracks={tracks} onTrackSelect={setCurrentTrack} />
      </main>
      <Footer />
      {currentTrack && <MusicPlayer track={currentTrack} />}
    </div>
  );
}

export default App;