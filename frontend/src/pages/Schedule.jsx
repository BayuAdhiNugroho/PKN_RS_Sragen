import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDoctors, IMAGE_URL } from '../services/api'
import { IoCalendarOutline, IoPersonOutline } from 'react-icons/io5'

export default function Schedule() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDoctors().then(docs => {
      // Filter out doctors that don't have schedules
      const docsWithSchedules = docs.filter(d => d.schedules && d.schedules.length > 0)
      setDoctors(docsWithSchedules)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

  const renderScheduleTable = (schedules) => {
    return (
      <div className="schedule-table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              {days.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {days.map(day => {
                const daySchedules = schedules.filter(s => s.hari === day)
                return (
                  <td key={day}>
                    {daySchedules.length > 0 ? (
                      daySchedules.map((ds, idx) => (
                        <div key={idx} style={{ marginBottom: idx < daySchedules.length - 1 ? '8px' : 0 }}>
                          {ds.jam_mulai} - {ds.jam_selesai}
                          {ds.nama_poli && <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '2px' }}>{ds.nama_poli}</div>}
                        </div>
                      ))
                    ) : (
                      <span style={{ color: 'var(--text-light)', opacity: 0.5 }}>-</span>
                    )}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <div className="page-banner" style={{ padding: '80px 24px', textAlign: 'left', background: 'white' }}>
        <div className="container">
          <h1 style={{ color: 'var(--text-heading)', fontSize: '2.5rem', marginBottom: '16px' }}>Cari Jadwal Dokter</h1>
          <p style={{ color: 'var(--text)', opacity: 0.9, fontSize: '1.1rem', maxWidth: '800px' }}>
            Untuk mencari dokter Anda dapat memilih nama dokter atau mencari berdasarkan spesialis dan atau subspesialis di halaman pencarian. Berikut adalah jadwal praktek dokter kami.
          </p>
        </div>
      </div>

      <div className="section" style={{ paddingTop: '20px', background: 'var(--bg-alt)' }}>
        <div className="container">
          {loading ? (
            <div className="loading-spinner"><div className="spinner" /></div>
          ) : doctors.length > 0 ? (
            <div>
              {doctors.map(d => (
                <div key={d.id} className="doctor-card-horizontal" style={{ marginBottom: '32px' }}>
                  <div className="doctor-card-img-container">
                    {d.foto ? (
                      <img src={`${IMAGE_URL}${d.foto}`} alt={d.nama} />
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '4rem', opacity: 0.5 }}>
                        <IoPersonOutline />
                      </div>
                    )}
                  </div>
                  <div className="doctor-card-content">
                    <span className="doctor-card-specialty" style={{ background: 'var(--primary)', color: 'white' }}>{d.spesialis}</span>
                    <h3 className="doctor-card-name" style={{ marginBottom: '24px' }}>{d.nama}</h3>
                    
                    {renderScheduleTable(d.schedules)}
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                      <Link to={`/doctor/${d.id}`} className="btn btn-primary">
                        LIHAT PROFIL
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <IoCalendarOutline size={48} />
              <p>Tidak ada jadwal praktek tersedia</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
