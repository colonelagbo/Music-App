import React from 'react';
import headerImage from './assets/header-image.png'; 
import homeIcon from './assets/home-icon.png';


function App() {

  const handleHomeClick = () => {
    
    console.log('Home button clicked');
  };

 

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="w-full">
        <img 
          src={headerImage} 
          alt="Header"
          className="h-56 2xl:h-full  w-full object-cover" 
        />
<button
          onClick={handleHomeClick}
          className="absolute top-4 right-4 w-12 h-12 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform hover:scale-110"
        >
          <img 
            src={homeIcon} 
            alt="Home"
            className="w-full h-full object-cover bg-white"
          />
        </button>

      </header>
      

      {/* Rest of your application content */}
    </div>
  );
}

export default App;