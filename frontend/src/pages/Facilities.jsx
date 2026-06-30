import { useEffect, useState } from 'react'
import { getFacilities, IMAGE_URL } from '../services/api'

export default function Facilities(){
  const [fac, setFac] = useState([])
  const [searchText, setSearchText] = useState('')
  const [availability, setAvailability] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  useEffect(()=>{ getFacilities().then(setFac).catch(()=>{}) }, [])

  const filteredFacilities = fac
    .filter((item) => item.status_aktif !== false)
    .filter((item) => {
      const keyword = searchText.trim().toLowerCase()
      if (!keyword) return true

      return [item.nama, item.deskripsi]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(keyword))
    })
    .filter((item) => {
      if (availability === 'available') return Number(item.jumlah_tersedia || 0) > 0
      if (availability === 'unavailable') return Number(item.jumlah_tersedia || 0) === 0
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return Number(a.harga_mulai || 0) - Number(b.harga_mulai || 0)
      if (sortBy === 'price-high') return Number(b.harga_mulai || 0) - Number(a.harga_mulai || 0)
      return String(a.nama || '').localeCompare(String(b.nama || ''), 'id-ID')
    })

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Fasilitas Kami</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cari Fasilitas</label>
            <input
              type="text"
              placeholder="Ketik nama fasilitas..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ketersediaan</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">Semua</option>
              <option value="available">Tersedia</option>
              <option value="unavailable">Tidak Tersedia</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="name">Nama A-Z</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
            </select>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Menampilkan {filteredFacilities.length} dari {fac.filter((item) => item.status_aktif !== false).length} fasilitas aktif
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.length ? filteredFacilities.map(f=> (
          <div key={f.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition">
            {f.gambar ? (
              <img src={`${IMAGE_URL}${f.gambar}`} alt={f.nama} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
            )}
            <div className="p-4">
              <div className="font-bold text-lg mb-2">{f.nama}</div>
              <div className="text-sm text-gray-600 line-clamp-3">{f.deskripsi}</div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-medium text-blue-700">
                  {f.harga_mulai ? `Mulai Rp ${Number(f.harga_mulai).toLocaleString('id-ID')}` : 'Harga belum tersedia'}
                </span>
                <span className={Number(f.jumlah_tersedia || 0) > 0 ? 'text-green-700' : 'text-red-600'}>
                  {Number(f.jumlah_tersedia || 0) > 0 ? `${f.jumlah_tersedia} tersedia` : 'Tidak tersedia'}
                </span>
              </div>
            </div>
          </div>
        )) : <div className="col-span-full text-center text-gray-500">Tidak ada fasilitas yang sesuai filter.</div>}
      </div>
    </div>
  )
}
