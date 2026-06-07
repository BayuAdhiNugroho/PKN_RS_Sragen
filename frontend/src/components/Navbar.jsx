import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import logoImg from '../assets/hero.png'

export default function Navbar() {
  const [linktree, setLinktree] = useState('')

  useEffect(() => {
    api.get('/settings/linktree').then(res => setLinktree(res.data.linktree_url)).catch(() => {})
  }, [])

  return (
    <header className="navbar">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <img src={logoImg} alt="logo" style={{width:56,height:56,borderRadius:8}} />
        <div className="brand">RS Sragen</div>
      </div>
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/doctors">Dokter</NavLink>
        <NavLink to="/facilities">Fasilitas</NavLink>
        <NavLink to="/schedule">Jadwal</NavLink>
        <NavLink to="/news">Berita</NavLink>
        <NavLink to="/promotions">Promo</NavLink>
        <NavLink to="/contact">Kontak</NavLink>
        <a className="cta" href={linktree || "/contact"} target={linktree ? "_blank" : "_self"} rel="noreferrer">Booking</a>
      </nav>
    </header>
  )
}
