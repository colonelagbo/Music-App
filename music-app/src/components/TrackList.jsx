import React from 'react';

function TrackList({ tracks, onTrackSelect }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">Music Playlist</h2>
      {tracks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => onTrackSelect(track)}
            >
              <img src={track.album.cover_medium} alt={track.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate text-gray-900">{track.title}</h3>
                <p className="text-gray-600 truncate">{track.artist.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white">No tracks found. Try searching for some music!</p>
      )}
    </div>
  );
}

export default TrackList;