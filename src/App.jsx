import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoadScript } from '@react-google-maps/api'
import Home from './pages/Home'
import Search from './pages/Search'
import Property from './pages/PropertyProfile'
import { FavouritesProvider } from './context/FavContext'

function App() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDKJKDcTMgfwZ1tFT0EbrwPSNixIaB3GWw">
      <FavouritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/property/:id" element={<Property />} />
          </Routes>
        </Router>
      </FavouritesProvider>
    </LoadScript>
  )
}

export default App