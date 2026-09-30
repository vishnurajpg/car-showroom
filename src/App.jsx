import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Cars from './pages/cars/Cars'
import CarList from './pages/cars/CarList'
import CarDetails from './pages/cars/CarDetails'
import TestDrive from './pages/TestDrive'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* nested routes */}
        <Route path="/cars" element={<Cars />}>
          <Route index element={<CarList />} />
          <Route path=":id" element={<CarDetails />} />
        </Route>

        <Route path="/test-drive" element={<TestDrive />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<div className="page"><h1>404 - Page not found</h1></div>} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
