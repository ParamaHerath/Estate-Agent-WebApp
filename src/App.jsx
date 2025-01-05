// Root component that sets up routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoadScript } from '@react-google-maps/api'
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import Property from './pages/PropertyProfile/PropertyProfile'
import { FavouritesProvider } from './context/FavContext/FavContext'
import ScrollToTop from './context/ScrollContext/ScrollToTop'

function App() {
  return (
    // Loading Google Maps API higher up, ensuring proper map loadinging without requiring page refrshing
    <LoadScript googleMapsApiKey="AIzaSyDKJKDcTMgfwZ1tFT0EbrwPSNixIaB3GWw">
      {/* Managing global state for favorite properties, higher up */}
      <FavouritesProvider>
        <Router>
          {/* Ensuring page scrolls to top on route changes */}
          <ScrollToTop />
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