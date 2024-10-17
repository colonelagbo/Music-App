import React, { useState } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center border-b-2 border-gray-300 py-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for tracks..."
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button type="submit" className="flex-shrink-0 text-gray-600 hover:text-gray-800">
            <Search size={24} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;