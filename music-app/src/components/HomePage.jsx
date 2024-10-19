import React, { useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import TrackList from './TrackList';
import Footer from './Footer';


function HomePage({ onTrackSelect, onNavigateHome  }) {
  const [tracks, setTracks] = useState([]);

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
    <div className="flex flex-col min-h-screen bg-[#275862]">
      <Header onNavigateHome={onNavigateHome} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        <TrackList tracks={tracks} onTrackSelect={onTrackSelect} />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;