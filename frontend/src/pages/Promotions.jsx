import { useEffect, useState } from 'react'
import { getPromotions, IMAGE_URL } from '../services/api'
import { IoGiftOutline } from 'react-icons/io5'

export default function Promotions() {
  const [promos, setPromos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPromotions().then(data => {
      setPromos(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="page-banner">
        <h1>Promo & Layanan Spesial</h1>
        <p>Nikmati berbagai promo dan penawaran spesial dari RSU PKU Muhammadiyah Sragen</p>
      </div>

      <div className="section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner"><div className="spinner" /></div>
          ) : promos.length > 0 ? (
            <div className="cards-grid cards-grid-3">
              {promos.map(p => (
                <div key={p.id} className="card">
                  {p.gambar ? (
                    <img src={`${IMAGE_URL}${p.gambar}`} alt={p.judul} className="card-img" />
                  ) : (
                    <div className="card-img-placeholder"><IoGiftOutline /></div>
                  )}
                  <div className="card-body">
                    <span className="card-tag">Promo</span>
                    <h3>{p.judul}</h3>
                    <p style={{ fontSize: '0.88rem' }}>{p.deskripsi}</p>
                    {p.tanggal_berakhir && (
                      <div className="card-date" style={{ marginTop: 8 }}>
                        Berlaku s/d {new Date(p.tanggal_berakhir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <IoGiftOutline size={48} />
              <p>Tidak ada promosi aktif saat ini</p>
              <span>Nantikan promo menarik dari kami</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
