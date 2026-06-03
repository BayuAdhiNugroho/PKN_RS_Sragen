import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <img src="/src/assets/hero.png" alt="logo" style={{width:56,height:56,borderRadius:8}} />
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
        <a className="cta" href="/contact">Booking</a>
      </nav>
    </header>
  )
}
