import { useEffect, useState } from 'react'
import { getFacilities, IMAGE_URL } from '../services/api'

export default function Facilities(){
  const [fac, setFac] = useState([])
  useEffect(()=>{ getFacilities().then(setFac).catch(()=>{}) }, [])
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Fasilitas Kami</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fac.length ? fac.map(f=> (
          <div key={f.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition">
            {f.gambar ? (
              <img src={`${IMAGE_URL}${f.gambar}`} alt={f.nama} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
            )}
            <div className="p-4">
              <div className="font-bold text-lg mb-2">{f.nama}</div>
              <div className="text-sm text-gray-600 line-clamp-3">{f.deskripsi}</div>
            </div>
          </div>
        )) : <div className="col-span-full text-center text-gray-500">Tidak ada data fasilitas.</div>}
      </div>
    </div>
  )
}
