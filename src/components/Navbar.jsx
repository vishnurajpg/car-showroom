import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserContext } from '../context/UserContext'

function Navbar() {
  // menu open or close (for mobile)
  const [menuOpen, setMenuOpen] = useState(false)
  const { userName, login, logout } = useContext(UserContext)
  const wishlist = useSelector((state) => state.wishlist)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <h2 className="logo">🚗 CarZone</h2>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/cars" onClick={closeMenu}>Cars</NavLink></li>
        <li><NavLink to="/test-drive" onClick={closeMenu}>Test Drive</NavLink></li>
        <li><NavLink to="/wishlist" onClick={closeMenu}>Wishlist ({wishlist.length})</NavLink></li>
        <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
        <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
        <li>
          {userName ? (
            <button className="btn small" onClick={logout}>Hi {userName} | Logout</button>
          ) : (
            <button className="btn small" onClick={login}>Login</button>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
