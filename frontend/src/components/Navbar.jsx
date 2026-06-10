import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import logoImg from '../assets/logo_rs.jpg'
import { IoMenu, IoClose } from 'react-icons/io5'

export default function Navbar() {
  const [linktree, setLinktree] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    api.get('/settings/linktree').then(res => setLinktree(res.data.linktree_url)).catch(() => {})
  }, [])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)  
  }

  return (
    <header className="navbar">
      <div style={{display:'flex',alignItems:'center',gap:12,flex:1}}>
        <img src={logoImg} alt="logo" style={{width:56,height:56,borderRadius:8}} />
        <div className="brand">RSU PKU Muhammadiyah Sragen</div>
      </div>
      <button 
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileMenuOpen ? <IoClose /> : <IoMenu />}
      </button>
      <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeMobileMenu}>Home</NavLink>
        <NavLink to="/doctors" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeMobileMenu}>Dokter</NavLink>
        <NavLink to="/facilities" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeMobileMenu}>Fasilitas</NavLink>
        <NavLink to="/schedule" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeMobileMenu}>Jadwal</NavLink>
        <NavLink to="/news" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeMobileMenu}>Berita</NavLink>
        <NavLink to="/promotions" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeMobileMenu}>Promo</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeMobileMenu}>Kontak</NavLink>
        <a className="cta" href={linktree || "/contact"} target={linktree ? "_blank" : "_self"} rel="noreferrer" onClick={closeMobileMenu}>Booking</a>
      </nav>
    </header>
  )
}
