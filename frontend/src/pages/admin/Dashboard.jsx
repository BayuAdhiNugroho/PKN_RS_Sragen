import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const stats_config = [
  { key: 'doctors',    label: 'Total Dokter', meta: 'Tenaga medis terdaftar',   icon: 'stethoscope',       color: 'blue'  },
  { key: 'news',       label: 'Total Berita', meta: 'Artikel dipublikasikan',   icon: 'news',              color: 'teal'  },
  { key: 'facilities', label: 'Fasilitas',    meta: 'Unit layanan aktif',       icon: 'building-hospital', color: 'amber' },
];

const colorMap = {
  blue:  { bar: 'border-blue-500',  icon: 'bg-blue-50 text-blue-700'   },
  teal:  { bar: 'border-teal-500',  icon: 'bg-teal-50 text-teal-700'   },
  amber: { bar: 'border-amber-500', icon: 'bg-amber-50 text-amber-700' },
};

const activities = [
  { color: 'bg-blue-500',  text: 'Dr. Andi Wijaya ditambahkan',              time: '2 jam lalu'  },
  { color: 'bg-teal-500',  text: 'Berita "Promo Cek Kesehatan" diterbitkan', time: '5 jam lalu'  },
  { color: 'bg-amber-500', text: 'Fasilitas Poli Gigi diperbarui',           time: '1 hari lalu' },
  { color: 'bg-blue-500',  text: 'Dr. Sari Melati profil diperbarui',        time: '2 hari lalu' },
];

const quickActions = [
  { icon: 'user-plus',     label: 'Tambah dokter baru', path: '/admin/doctors/new'   },
  { icon: 'file-plus',     label: 'Buat berita baru',   path: '/admin/news/new'      },
  { icon: 'building-plus', label: 'Kelola fasilitas',   path: '/admin/facilities'    },
  { icon: 'chart-bar',     label: 'Lihat laporan',      path: '/admin/reports'       },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ doctors: null, news: null, facilities: null });

  useEffect(() => {
    Promise.all([
      api.get('/doctors'),
      api.get('/news'),
      api.get('/facilities'),
    ])
      .then(([d, n, f]) =>
        setStats({ doctors: d.data.length, news: n.data.length, facilities: f.data.length })
      )
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 text-left">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-medium text-gray-900">Dashboard Admin</h1>
          <p className="text-sm text-gray-500 mt-0.5">Pantau semua aktivitas sistem</p>
        </div>
        <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-md">
          ✓ Sistem aktif
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats_config.map(({ key, label, meta, icon, color }) => {
          const c = colorMap[color];
          return (
            <div
              key={key}
              className={`bg-white rounded-xl border border-gray-100 p-5 border-t-2 ${c.bar}`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${c.icon}`}>
                <i className={`ti ti-${icon} text-lg`} />
              </div>
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className="text-3xl font-medium text-gray-900 mb-2">
                {stats[key] ?? '—'}
              </p>
              <p className="text-xs text-gray-400">{meta}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Aktivitas terbaru */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-medium text-gray-900 mb-3">Aktivitas terbaru</p>
          <ul className="divide-y divide-gray-50">
            {activities.map((a, i) => (
              <li key={i} className="flex items-center gap-3 py-2.5">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${a.color}`} />
                <p className="text-sm text-gray-500 flex-1">{a.text}</p>
                <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Aksi cepat */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-medium text-gray-900 mb-3">Aksi cepat</p>
          <div className="flex flex-col gap-2">
            {quickActions.map(({ icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
              >
                <i className={`ti ti-${icon} text-gray-400 text-base`} />
                <span className="flex-1">{label}</span>
                <i className="ti ti-chevron-right text-gray-300 text-sm" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}