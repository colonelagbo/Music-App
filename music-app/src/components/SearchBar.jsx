import React, { useState } from 'react';
import SearchBar from './SearchBar';

function DeezerSearch() {
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await fetch("https://api.deezer.com/search?q=eminem");
      if (!response.ok) {
        throw new Error('Failed to fetch data from Deezer API');
      }
      const data = await response.json();
      setSearchResults(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSearchResults(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500">{error}</p>}
      {searchResults && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Search Results:</h2>
          <ul className="space-y-2">
            {searchResults.map((item) => (
              <li key={item.id} className="border p-2 rounded">
                <img src={item.album.cover_small} alt={item.title} className="inline-block mr-2" />
                <span className="font-semibold">{item.title}</span> by {item.artist.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DeezerSearch;