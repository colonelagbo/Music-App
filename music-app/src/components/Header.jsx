import React from 'react';


function Header({ onNavigateHome }) {
  return (
    <header className="relative h-64 bg-cover bg-center" style={{backgroundImage: "url('/src/assets/images/header-image.jpg')"}}>
      <div className="absolute top-0 right-0 m-4">
      <button onClick={onNavigateHome} className="p-2 rounded-full bg-white shadow-md">
          <img src="/src/assets/images/home-icon.jpg" alt="Home" className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

export default Header;                    