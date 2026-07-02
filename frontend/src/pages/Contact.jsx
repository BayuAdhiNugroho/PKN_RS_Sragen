import { useEffect, useState } from 'react'
import api from '../services/api'
import { IoLocationOutline, IoCallOutline, IoMailOutline, IoTimeOutline } from 'react-icons/io5'

export default function Contact() {
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/contact').then(res => {
      setContact(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="page-banner">
        <h1>Hubungi Kami</h1>
        <p>Kami siap melayani Anda. Jangan ragu untuk menghubungi kami.</p>
      </div>

      <div className="section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner"><div className="spinner" /></div>
          ) : (
            <div className="contact-grid">
              <div className="contact-info-card">
                <h3 style={{ marginBottom: 24, fontSize: '1.2rem' }}>Informasi Kontak</h3>

                <div className="contact-info-item">
                  <div className="contact-info-icon"><IoLocationOutline /></div>
                  <div className="contact-info-text">
                    <h4>Alamat</h4>
                    <p>{contact?.alamat || 'Jl. Raya Sukowati No. 534, Sragen, Jawa Tengah'}</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon"><IoCallOutline /></div>
                  <div className="contact-info-text">
                    <h4>Telepon</h4>
                    <p>{contact?.telepon || '(0271) 123-4567'}</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon"><IoMailOutline /></div>
                  <div className="contact-info-text">
                    <h4>Email</h4>
                    <p>{contact?.email || 'info@rsupkusragen.id'}</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon"><IoTimeOutline /></div>
                  <div className="contact-info-text">
                    <h4>Jam Operasional</h4>
                    <p>UGD: 24 Jam<br />Poliklinik: Senin - Sabtu, 07.00 - 21.00</p>
                  </div>
                </div>
              </div>

              <div className="contact-map">
                {contact?.maps_link ? (
                  <iframe
                    src={contact.maps_link}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi RSU PKU Muhammadiyah Sragen"
                  />
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.5!2d111.02!3d-7.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjUnNDguMCJTIDExMcKwMDEnMTIuMCJF!5e0!3m2!1sid!2sid!4v1"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi RSU PKU Muhammadiyah Sragen"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
