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

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY // use env variable here
      }
    };

    try {
      const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`, options);
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
      {/* Conditionally render the SearchResults container only if there are results */}
      {results.length > 0 && <SearchResults results={results} />}
    </div>
  );
};

const SearchResults = ({ results }) => (
  <div className="bg-white rounded-xl shadow-lg p-16 max-w-screen-xl mx-auto">
    <ul className="mt-4 space-y-6">
      {results.map((item) => (
        <li key={item.id} className="flex items-center space-x-6">
          <img
            src={item.album.cover_big}
            alt={item.title}
            className="w-32 h-32 rounded-lg"
          />
          <div className="text-2xl font-semibold">
            <span>{item.title}</span> <br />
            <span className="text-gray-600">by {item.artist.name}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default SearchBar;
