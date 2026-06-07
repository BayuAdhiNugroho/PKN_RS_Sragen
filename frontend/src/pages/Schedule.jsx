import { useEffect, useState } from 'react'
import { getSchedule } from '../services/api'

export default function Schedule(){
  const [schedule, setSchedule] = useState([])
  useEffect(()=>{ getSchedule().then(setSchedule).catch(()=>{}) }, [])
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Jadwal Praktek</h1>
      {schedule.length ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dokter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spesialis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hari</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedule.map(s=> (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{s.doctor?.nama || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.doctor?.spesialis || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.hari}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.jam_mulai} - {s.jam_selesai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <div className="text-center text-gray-500 mt-8">Tidak ada jadwal praktek tersedia.</div>}
    </div>
  )
}
