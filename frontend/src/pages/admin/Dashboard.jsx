import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ doctors: 0, news: 0, facilities: 0 });

  useEffect(() => {
    // We can just fetch the public endpoints to get counts
    Promise.all([
      api.get('/doctors'),
      api.get('/news'),
      api.get('/facilities')
    ]).then(([doctorsRes, newsRes, facRes]) => {
      setStats({
        doctors: doctorsRes.data.length,
        news: newsRes.data.length,
        facilities: facRes.data.length
      });
    }).catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-md border-t-4 border-blue-600">
          <h2 className="text-xl text-gray-600">Total Dokter</h2>
          <p className="text-4xl font-bold mt-2">{stats.doctors}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md border-t-4 border-green-600">
          <h2 className="text-xl text-gray-600">Total Berita</h2>
          <p className="text-4xl font-bold mt-2">{stats.news}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md border-t-4 border-yellow-600">
          <h2 className="text-xl text-gray-600">Fasilitas</h2>
          <p className="text-4xl font-bold mt-2">{stats.facilities}</p>
        </div>
      </div>
    </div>
  );
}
