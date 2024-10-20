import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MusicPlayer from './components/MusicPlayer.jsx'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import Footer from './components/Footer.jsx'
import TrackList from './components/TrackList.jsx'
import HomePage from './components/HomePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <MusicPlayer/> */}
    {/* <Header/> */}

{/* <SearchBar/> */}
{/* <Footer/> */}
{/* <TrackList/> */}
{/* <MusicPlayer/> */}
{/* <HomePage/> */}

  </StrictMode>,
)
