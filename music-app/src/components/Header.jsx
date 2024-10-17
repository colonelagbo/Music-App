import React from 'react';

function Header() {
  return (
    <header className="relative h-64 bg-cover bg-center" style={{backgroundImage: "url('/assests/header.png')"}}>
      <div className="absolute top-0 right-0 m-4">
        <button className="p-2 rounded-full bg-white shadow-md">
          <img src="/assets/home-icon.png" alt="Home" className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

export default Header;