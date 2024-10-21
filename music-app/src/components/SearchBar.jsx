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
        'X-RapidAPI-Key': 'a29ce1bfc6msh5af6332cc5abfbfp1b2562jsn617b8859a29b', 
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
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
      setError('An error occurred while fetching data: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="max-w-xl mx-auto mb-8 relative">
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
      {results.length > 0 && (
        <div className="absolute w-full bg-white rounded-lg shadow-md max-h-80 overflow-y-auto">
          <SearchResults results={results} />
        </div>
      )}
    </div>
  );
};

const SearchIcon = () => (
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Search className="h-6 w-6 text-gray-400" />
  </div>
);

const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder="Search Song/Artist/Album Name"
    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-lg"
  />
);

const SearchResults = ({ results }) => (
  <ul className="py-2">
    {results.slice(0, 10).map((item) => (
      <li key={item.id} className="px-6 py-3 hover:bg-gray-100 cursor-pointer">
        <div className="flex items-center">
          <img src={item.album.cover_medium} alt={item.title} className="w-14 h-14 rounded-md mr-4" />
          <div>
            <h3 className="text-base font-medium">{item.title}</h3>
            <p className="text-base text-gray-500">{item.artist.name}</p>
          </div>
        </div>
      </li>
    ))}
  </ul>
);



export default SearchBar;