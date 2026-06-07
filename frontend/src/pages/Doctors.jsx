import { useEffect, useState } from 'react'
import { getDoctors, IMAGE_URL } from '../services/api'

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  useEffect(()=>{ getDoctors().then(setDoctors).catch(()=>{}) }, [])
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Daftar Dokter</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.length ? doctors.map(d => (
          <div key={d.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition">
            {d.foto ? (
              <img src={`${IMAGE_URL}${d.foto}`} alt={d.nama} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
            )}
            <div className="p-4">
              <div className="font-bold text-lg">{d.nama}</div>
              <div className="text-blue-600 text-sm font-medium mb-2">{d.spesialis}</div>
              <div className="text-sm text-gray-600 line-clamp-3">{d.deskripsi || 'Tidak ada deskripsi'}</div>
            </div>
          </div>
        )) : <div className="col-span-full text-center text-gray-500">Tidak ada data dokter.</div>}
      </div>
    </div>
  )
}
