import { useEffect, useState } from 'react'
import api, { getDoctors, getNews, getPromotions, IMAGE_URL } from '../services/api'
import heroImg from '../assets/logo_rs.jpg'

export default function Home() {
  const [doctors, setDoctors] = useState([])
  const [news, setNews] = useState([])
  const [promos, setPromos] = useState([])
  const [linktree, setLinktree] = useState('')

  useEffect(() => {
    getDoctors().then(setDoctors).catch(() => {})
    getNews().then(setNews).catch(() => {})
    getPromotions().then(setPromos).catch(() => {})
    api.get('/settings/linktree').then(res => setLinktree(res.data.linktree_url)).catch(() => {})
  }, [])

  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">RSU PKU Muhammadiyah Sragen — Layanan Kesehatan Terpercaya</h1>
          <p className="hero-sub">Pelayanan medis komprehensif, fasilitas modern, dan tim dokter profesional untuk kesehatan Anda.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={linktree || '/contact'} target={linktree ? "_blank" : "_self"} rel="noreferrer">Buat Janji</a>
            <a className="btn btn-outline" href="/schedule">Lihat Jadwal</a>
          </div>
          <div className="hero-badges">
            <div className="badge">
              <strong>24/7 Siaga</strong>
              <span>Unit gawat darurat selalu siap.</span>
            </div>
            <div className="badge">
              <strong>70+ Dokter</strong>
              <span>Spesialis berpengalaman dari berbagai bidang.</span>
            </div>
            <div className="badge">
              <strong>Fasilitas Lengkap</strong>
              <span>Ruang perawatan, lab, dan poliklinik modern.</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="hero" />
        </div>
      </section>

      <section className="section section-highlight">
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
              {d.foto && <img src={`${IMAGE_URL}${d.foto}`} alt={d.nama} className="w-full h-40 object-cover rounded mb-2" />}
              <h3>{d.nama}</h3>
              <div style={{fontSize:13}}>{d.spesialis}</div>
            </div>
          )) : <div>Tidak ada data dokter.</div>}
        </div>
      </section>

      <section className="section">
        <div className="section-title"><h2>Berita Terbaru</h2><a href="/news">Lainnya</a></div>
        <div className="cards">
          {news.length ? news.slice(0,4).map(n => (
            <article className="card flex gap-4" key={n.id}>
              {n.gambar && <img src={`${IMAGE_URL}${n.gambar}`} alt={n.judul} className="w-24 h-24 object-cover rounded" />}
              <div>
                <h3>{n.judul}</h3>
                <p style={{fontSize:13}} className="line-clamp-2">{n.isi}</p>
              </div>
            </article>
          )) : <div>Tidak ada berita.</div>}
        </div>
      </section>

      <section className="section">
        <div className="section-title"><h2>Promo</h2><a href="/promotions">Lihat semua</a></div>
        <div className="cards">
          {promos.length ? promos.slice(0,3).map(p => (
            <div className="card" key={p.id}>
              {p.gambar && <img src={`${IMAGE_URL}${p.gambar}`} alt={p.judul} className="w-full h-32 object-cover rounded mb-2" />}
              <h3>{p.judul}</h3>
              <p style={{fontSize:13}} className="line-clamp-2">{p.deskripsi}</p>
            </div>
          )) : <div>Tidak ada promosi.</div>}
        </div>
      </section>
    </div>
  )
}
