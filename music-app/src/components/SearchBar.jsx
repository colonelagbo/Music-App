import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        mode: 'no-cors' 
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data.data || []);
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative mb-4">
        <div className="flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search Song/Artist/Album Name"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <SearchResults results={results} />
    </div>
  );
};

const SearchResults = ({ results }) => (
  <ul className="mt-4">
    {results.map((item) => (
      <li key={item.id} className="mb-2 flex items-center">
        <img src={item.album.cover_small} alt={item.title} className="w-10 h-10 mr-2" />
        <span>{item.title} by {item.artist.name}</span>
      </li>
    ))}
  </ul>
);

export default SearchBar;