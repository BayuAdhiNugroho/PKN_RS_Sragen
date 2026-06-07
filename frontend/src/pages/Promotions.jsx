import { useEffect, useState } from 'react'
import { getPromotions, IMAGE_URL } from '../services/api'

export default function Promotions(){
  const [promos, setPromos] = useState([])
  useEffect(()=>{ getPromotions().then(setPromos).catch(()=>{}) }, [])
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Promo & Layanan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promos.length ? promos.map(p=> (
          <div key={p.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition">
            {p.gambar ? (
              <img src={`${IMAGE_URL}${p.gambar}`} alt={p.judul} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{p.judul}</h2>
              <div className="text-xs text-blue-600 mb-2">
                Berlaku s/d {new Date(p.tanggal_berakhir).toLocaleDateString('id-ID')}
              </div>
              <p className="text-sm text-gray-700">{p.deskripsi}</p>
            </div>
          </div>
        )) : <div className="col-span-full text-center text-gray-500">Tidak ada promosi aktif.</div>}
      </div>
    </div>
  )
}
