import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Footer from './Footer';
import { SkipBack, SkipForward, Play, Pause, Volume2, ChevronUp, ChevronDown } from 'lucide-react';

function MusicPlayer({ track, onSearch, onNavigateHome, onTrackSelect }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, [track]);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSearch = async (query) => {
    const results = await onSearch(query);
    setSearchResults(results);
    setShowResults(true);
  };

  const handleTrackSelect = (newTrack) => {
    onTrackSelect(newTrack);
    setShowResults(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#275862]">
      <Header onNavigateHome={onNavigateHome} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        
        {showResults && (
          <div className="bg-white rounded-lg shadow-lg p-4 mt-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">Search Results</h3>
              <button onClick={() => setShowResults(false)} className="text-gray-500 hover:text-gray-700">
                <ChevronUp size={24} />
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
          <div className="flex flex-col md:flex-row items-center">
            <img src={track.album.cover_medium} alt={track.title} className="w-64 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2">{track.title}</h2>
              <p className="text-gray-600 mb-1">Artist: {track.artist.name}</p>
              <p className="text-gray-600 mb-4">Album: {track.album.title}</p>
              <p className="text-gray-600 mb-2">
                {formatTime(currentTime)} / {formatTime(track.duration)}
              </p>
              <div className="flex items-center justify-center space-x-4">
                <button className="text-black" onClick={() => console.log('Skip back')}>
                  <SkipBack size={24} />
                </button>
                <button className="text-black" onClick={togglePlayPause}>
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button className="text-black" onClick={() => console.log('Skip forward')}>
                  <SkipForward size={24} />
                </button>
                <div className="flex items-center">
                  <Volume2 size={24} className="text-black mr-2" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <audio 
        ref={audioRef} 
        src={track.preview} 
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
}

export default MusicPlayer;