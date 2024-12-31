import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Property from './pages/Property'
import './App.css'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/property/:id" element={<Property />} />
      </Routes>
    </Router>
  )
}

export default App