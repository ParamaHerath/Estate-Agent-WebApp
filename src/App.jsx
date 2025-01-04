import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Property from './pages/PropertyProfile'
import { FavoritesProvider } from './context/FavoritesContext'


function App() {
  
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/property/:id" element={<Property />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  )
}

export default App