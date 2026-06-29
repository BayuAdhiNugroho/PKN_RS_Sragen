import { useEffect, useState } from 'react'
import { getDoctors, getDoctorById, getSpecialties, IMAGE_URL } from '../services/api'

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [specialties, setSpecialties] = useState([])
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [searchText, setSearchText] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Promise.all([
      getDoctors().catch(() => []),
      getSpecialties().catch(() => [])
    ]).then(([docs, specs]) => {
      setDoctors(docs)
      setSpecialties(specs)
    })
  }, [])

  const handleDoctorClick = async (doctor) => {
    setLoading(true)
    try {
      const detailedDoctor = await getDoctorById(doctor.id)
      setSelectedDoctor(detailedDoctor)
    } catch (error) {
      console.error('Error fetching doctor details:', error)
      setSelectedDoctor(doctor)
    } finally {
      setLoading(false)
    }
  }

  // Filter & search logic
  const filteredDoctors = doctors.filter(d => {
    const matchesSpecialty = !selectedSpecialty || d.spesialis === selectedSpecialty
    const matchesSearch = !searchText || d.nama.toLowerCase().includes(searchText.toLowerCase())
    return matchesSpecialty && matchesSearch
  })

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Daftar Dokter</h1>

      {/* Filter dan Search */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cari Dokter</label>
            <input
              type="text"
              placeholder="Ketik nama dokter..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Specialty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter Spesialisasi</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Semua Spesialisasi</option>
              {specialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Menampilkan {filteredDoctors.length} dari {doctors.length} dokter
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDoctors.length ? filteredDoctors.map(d => (
          <div 
            key={d.id} 
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer transform hover:scale-105"
            onClick={() => handleDoctorClick(d)}
          >
            {d.foto ? (
              <img src={`${IMAGE_URL}${d.foto}`} alt={d.nama} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
            )}
            <div className="p-4">
              <div className="font-bold text-lg">{d.nama}</div>
              <div className="text-blue-600 text-sm font-medium mb-2">{d.spesialis}</div>
              <div className="text-sm text-gray-600 line-clamp-2">{d.deskripsi || 'Tidak ada deskripsi'}</div>
              <button className="mt-3 w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition">
                Lihat Detail
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <div className="text-lg">Tidak ada dokter ditemukan</div>
            <div className="text-sm mt-1">Coba ubah filter atau pencarian Anda</div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex justify-between items-start">
              <h2 className="text-2xl font-bold">Detail Dokter</h2>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="text-2xl hover:bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Foto dan Info Dasar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-1">
                  {selectedDoctor.foto ? (
                    <img 
                      src={`${IMAGE_URL}${selectedDoctor.foto}`} 
                      alt={selectedDoctor.nama} 
                      className="w-full h-64 object-cover rounded-lg shadow"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
                      No Image
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-3xl font-bold mb-2">{selectedDoctor.nama}</h3>
                  <div className="mb-4 pb-4 border-b">
                    <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-lg">
                      {selectedDoctor.spesialis}
                    </span>
                  </div>

                  <h4 className="font-bold text-lg mb-2">Deskripsi</h4>
                  <p className="text-gray-700 mb-4">
                    {selectedDoctor.deskripsi || 'Tidak ada deskripsi tersedia'}
                  </p>
                </div>
              </div>

              {/* Jadwal */}
              {selectedDoctor.schedules && selectedDoctor.schedules.length > 0 ? (
                <>
                  <h4 className="font-bold text-lg mb-4">Jadwal Praktik</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDoctor.schedules.map((schedule, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="font-semibold text-blue-600 mb-2">{schedule.hari}</div>
                        <div className="text-gray-700">
                          {schedule.jam_mulai} - {schedule.jam_selesai}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800">
                  Jadwal belum tersedia untuk dokter ini
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 border-t flex gap-4">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Tutup
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                Pesan Jadwal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
