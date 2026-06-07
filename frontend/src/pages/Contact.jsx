import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Contact(){
  const [contact, setContact] = useState(null)
  
  useEffect(()=>{ 
    api.get('/contact').then(res => setContact(res.data)).catch(()=>{}) 
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Hubungi Kami</h1>
      
      {contact ? (
        <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-blue-600 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Alamat</h2>
            <p className="text-gray-700">{contact.alamat || 'Belum ada data alamat'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Telepon</h2>
              <p className="text-gray-700">{contact.telepon || '-'}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Email</h2>
              <p className="text-gray-700">{contact.email || '-'}</p>
            </div>
          </div>
          {contact.maps_link && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Lokasi Kami</h2>
              <div className="w-full h-64 bg-gray-200 rounded overflow-hidden">
                <iframe 
                  src={contact.maps_link} 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      ) : <div className="text-center text-gray-500">Memuat informasi kontak...</div>}
    </div>
  )
}
