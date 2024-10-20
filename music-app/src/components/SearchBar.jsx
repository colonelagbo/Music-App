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
      const response = await fetch('https://cors-anywhere.herokuapp.com/http://api.deezer.com/search/track/autocomplete?limit=1&q=eminem');
      const data = await response.json();
debugger;
      setResults(data.data || []);
    } catch (err) {
      setError('An error occurred while fetching data');
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
          <SearchIcon />
          <SearchInput
            value={query}
            onChange={handleInputChange}
          />
        </div>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <SearchResults results={results} />
    </div>
  );
};

const SearchIcon = () => (
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Search className="h-5 w-5 text-gray-400" />
  </div>
);

const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder="Search Song/Artist/Album Name"
    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  />
);

const SearchResults = ({ results }) => (
  <ul className="mt-4">
    {results.map((item) => (
      <li key={item.id} className="mb-2">
        <img src={item.album.cover_small} alt={item.title} className="inline-block mr-2" />
        {item.title} by {item.artist.name}
      </li>
    ))}
  </ul>
);

export default SearchBar;