import { useEffect, useState } from 'react'
import { getAchievements, IMAGE_URL } from '../services/api'
import { IoTrophyOutline } from 'react-icons/io5'

export default function Achievements() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAchievements().then(data => {
      setItems(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="page-banner">
        <h1>Prestasi Rumah Sakit</h1>
        <p>Pencapaian dan penghargaan yang telah diraih RSU PKU Muhammadiyah Sragen</p>
      </div>

      <div className="section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner"><div className="spinner" /></div>
          ) : items.length > 0 ? (
            <div className="cards-grid cards-grid-3">
              {items.map(i => (
                <article key={i.id} className="card">
                  {i.gambar ? (
                    <img src={`${IMAGE_URL}${i.gambar}`} alt={i.judul} className="card-img" />
                  ) : (
                    <div className="card-img-placeholder"><IoTrophyOutline /></div>
                  )}
                  <div className="card-body">
                    {i.tahun && <span className="card-tag">{i.tahun}</span>}
                    <h3>{i.judul}</h3>
                    <p style={{ fontSize: '0.88rem' }}>{i.deskripsi}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <IoTrophyOutline size={48} />
              <p>Belum ada data prestasi</p>
              <span>Nantikan informasi pencapaian terbaru kami</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
