import { useEffect, useState } from 'react'
import { getNews, IMAGE_URL } from '../services/api'
import { IoNewspaperOutline } from 'react-icons/io5'

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNews().then(data => {
      setNews(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="page-banner">
        <h1>Berita Terkini</h1>
        <p>Informasi terbaru seputar kegiatan dan layanan RSU PKU Muhammadiyah Sragen</p>
      </div>

      <div className="section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner"><div className="spinner" /></div>
          ) : news.length > 0 ? (
            <div className="cards-grid cards-grid-3">
              {news.map(n => (
                <article key={n.id} className="card">
                  {n.gambar ? (
                    <img src={`${IMAGE_URL}${n.gambar}`} alt={n.judul} className="card-img" />
                  ) : (
                    <div className="card-img-placeholder"><IoNewspaperOutline /></div>
                  )}
                  <div className="card-body">
                    <div className="card-date">
                      {new Date(n.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <h3>{n.judul}</h3>
                    <p style={{ fontSize: '0.88rem', lineHeight: 1.7 }}>{n.isi}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <IoNewspaperOutline size={48} />
              <p>Belum ada berita tersedia</p>
              <span>Nantikan informasi terbaru dari kami</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
