import { useEffect, useState } from 'react'
import { getNews, IMAGE_URL } from '../services/api'

export default function News(){
  const [news, setNews] = useState([])
  useEffect(()=>{ getNews().then(setNews).catch(()=>{}) }, [])
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Berita Terkini</h1>
      <div className="space-y-6">
        {news.length ? news.map(n=> (
          <article key={n.id} className="border rounded-lg p-6 shadow hover:shadow-md transition flex flex-col md:flex-row gap-6">
            {n.gambar && (
              <img src={`${IMAGE_URL}${n.gambar}`} alt={n.judul} className="w-full md:w-48 h-48 md:h-32 object-cover rounded" />
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{n.judul}</h2>
              <div className="text-sm text-gray-500 mb-4">{new Date(n.tanggal).toLocaleDateString()}</div>
              <p className="text-gray-700">{n.isi}</p>
            </div>
          </article>
        )) : <div className="text-center text-gray-500">Tidak ada berita.</div>}
      </div>
    </div>
  )
}
