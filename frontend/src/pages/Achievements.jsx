import { useEffect, useState } from 'react'
import { getAchievements, IMAGE_URL } from '../services/api'

export default function Achievements(){
  const [items, setItems] = useState([])
  useEffect(()=>{ getAchievements().then(setItems).catch(()=>{}) }, [])
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Prestasi Rumah Sakit</h1>
      <div className="space-y-6">
        {items.length ? items.map(i=> (
          <article key={i.id} className="border rounded-lg p-6 shadow hover:shadow-md transition flex flex-col md:flex-row gap-6">
            {i.gambar && (
              <img src={`${IMAGE_URL}${i.gambar}`} alt={i.judul} className="w-full md:w-32 h-32 object-cover rounded" />
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{i.judul}</h2>
              <div className="text-blue-600 font-semibold mb-2">{i.tahun}</div>
              <p className="text-gray-700">{i.deskripsi}</p>
            </div>
          </article>
        )) : <div className="text-center text-gray-500">Tidak ada prestasi.</div>}
      </div>
    </div>
  )
}
