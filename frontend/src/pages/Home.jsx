import { useEffect, useState } from 'react'
import { getDoctors, getNews, getPromotions } from '../services/api'

export default function Home() {
  const [doctors, setDoctors] = useState([])
  const [news, setNews] = useState([])
  const [promos, setPromos] = useState([])

  useEffect(() => {
    getDoctors().then(setDoctors).catch(() => {})
    getNews().then(setNews).catch(() => {})
    getPromotions().then(setPromos).catch(() => {})
  }, [])

  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">RS Sragen — Layanan Kesehatan Terpercaya</h1>
          <p className="hero-sub">Pelayanan medis komprehensif, fasilitas modern, dan tim dokter profesional untuk kesehatan Anda.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/contact">Buat Janji</a>
            <a className="btn btn-outline" href="/schedule">Lihat Jadwal</a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/src/assets/hero.png" alt="hero" />
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Pelayanan Unggulan</h2>
          <a href="/facilities">Lihat semua</a>
        </div>
        <div className="cards">
          <div className="card">
            <h3>Rawat Inap</h3>
            <p>Ruang inap nyaman dengan layanan 24 jam.</p>
          </div>
          <div className="card">
            <h3>Poliklinik</h3>
            <p>Spesialis lengkap untuk berbagai kebutuhan.</p>
          </div>
          <div className="card">
            <h3>Laboratorium</h3>
            <p>Hasil cepat dan akurat untuk diagnosis.</p>
          </div>
          <div className="card">
            <h3>IGD</h3>
            <p>Pelayanan gawat darurat 24 jam.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Dokter Kami</h2>
          <a href="/doctors">Lihat semua</a>
        </div>
        <div className="cards">
          {doctors.length ? doctors.slice(0,4).map(d => (
            <div className="card" key={d.id}>
              <h3>{d.name}</h3>
              <div style={{fontSize:13}}>{d.specialty}</div>
            </div>
          )) : <div>Tidak ada data dokter.</div>}
        </div>
      </section>

      <section className="section two-column">
        <div>
          <div className="section-title"><h2>Berita Terbaru</h2><a href="/news">Lainnya</a></div>
          <div className="cards">
            {news.length ? news.slice(0,4).map(n => (
              <article className="card" key={n.id}>
                <h3>{n.title}</h3>
                <p style={{fontSize:13}}>{n.summary}</p>
              </article>
            )) : <div>Tidak ada berita.</div>}
          </div>
        </div>

        <aside>
          <div className="section-title"><h2>Promo</h2><a href="/promotions">Lihat semua</a></div>
          <div className="cards">
            {promos.length ? promos.slice(0,3).map(p => (
              <div className="card" key={p.id}>
                <h3>{p.title}</h3>
                <p style={{fontSize:13}}>{p.description}</p>
              </div>
            )) : <div>Tidak ada promosi.</div>}
          </div>
        </aside>
      </section>
    </div>
  )
}
