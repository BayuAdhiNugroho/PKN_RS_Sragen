import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

// --- Konfigurasi Data (Bisa dipindah ke file terpisah jika makin banyak) ---
const STATS_CONFIG = [
  { key: 'doctors', label: 'Total Dokter', meta: 'Tenaga medis terdaftar', icon: 'stethoscope', color: 'blue' },
  { key: 'news', label: 'Total Berita', meta: 'Artikel dipublikasikan', icon: 'news', color: 'teal' },
  { key: 'facilities', label: 'Fasilitas', meta: 'Unit layanan aktif', icon: 'building-hospital', color: 'amber' },
];

const COLOR_MAP = {
  blue: { bar: 'border-blue-500', icon: 'bg-blue-50 text-blue-600', hover: 'hover:border-blue-200' },
  teal: { bar: 'border-teal-500', icon: 'bg-teal-50 text-teal-600', hover: 'hover:border-teal-200' },
  amber: { bar: 'border-amber-500', icon: 'bg-amber-50 text-amber-600', hover: 'hover:border-amber-200' },
};

const ACTIVITIES = [
  { color: 'bg-blue-500', text: 'Dr. Andi Wijaya ditambahkan', time: '2 jam lalu' },
  { color: 'bg-teal-500', text: 'Berita "Promo Cek Kesehatan" diterbitkan', time: '5 jam lalu' },
  { color: 'bg-amber-500', text: 'Fasilitas Poli Gigi diperbarui', time: '1 hari lalu' },
  { color: 'bg-blue-500', text: 'Profil Dr. Sari Melati diperbarui', time: '2 hari lalu' },
];

const QUICK_ACTIONS = [
  { icon: 'user-plus', label: 'Tambah dokter baru', path: '/admin/doctors/new' },
  { icon: 'file-plus', label: 'Buat berita baru', path: '/admin/news/new' },
  { icon: 'building-plus', label: 'Kelola fasilitas', path: '/admin/facilities' },
  { icon: 'chart-bar', label: 'Lihat laporan', path: '/admin/reports' },
];

// --- Sub-Komponen untuk Keterbacaan ---

const StatCard = ({ config, value, isLoading }) => {
  const colors = COLOR_MAP[config.color];
  
  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-5 border-t-4 ${colors.bar} ${colors.hover} transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colors.icon} transition-colors`}>
        <i className={`ti ti-${config.icon} text-xl`} />
      </div>
      
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      ) : (
        <>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{config.label}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value ?? 0}</p>
          <p className="text-xs text-gray-400">{config.meta}</p>
        </>
      )}
    </div>
  );
};

const ActivityItem = ({ activity }) => (
  <li className="flex items-start gap-3 py-3 last:pb-0 first:pt-0 group">
    <span className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${activity.color} ring-4 ring-white group-hover:scale-125 transition-transform`} />
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-700 font-medium truncate">{activity.text}</p>
    </div>
    <span className="text-xs text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-1 rounded-md">{activity.time}</span>
  </li>
);

const QuickActionLink = ({ action }) => (
  <Link
    to={action.path}
    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-700 text-sm text-gray-700 transition-all duration-200 group border border-transparent hover:border-blue-100"
  >
    <i className={`ti ti-${action.icon} text-gray-400 group-hover:text-blue-600 text-lg transition-colors`} />
    <span className="flex-1 font-medium">{action.label}</span>
    <i className="ti ti-chevron-right text-gray-300 group-hover:text-blue-400 text-sm transition-colors" />
  </Link>
);

// --- Komponen Utama ---

export default function Dashboard() {
  const [stats, setStats] = useState({ doctors: 0, news: 0, facilities: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    Promise.all([
      api.get('/doctors', { signal: controller.signal }),
      api.get('/news', { signal: controller.signal }),
      api.get('/facilities', { signal: controller.signal }),
    ])
      .then(([d, n, f]) => {
        setStats({
          doctors: d.data?.length || 0,
          news: n.data?.length || 0,
          facilities: f.data?.length || 0,
        });
      })
      .catch((err) => {
        if (err.name !== 'CanceledError') {
          setError('Gagal memuat data dashboard. Silakan periksa koneksi Anda.');
          console.error('Dashboard fetch error:', err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort(); // Cleanup untuk mencegah memory leak
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto text-left space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau ringkasan aktivitas dan performa sistem rumah sakit.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100 w-fit">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs font-semibold">Sistem Aktif</span>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
          <i className="ti ti-alert-circle text-red-500 text-xl mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">Terjadi Kesalahan</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-xs font-semibold text-red-700 hover:text-red-900 underline"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {STATS_CONFIG.map((config) => (
          <StatCard 
            key={config.key} 
            config={config} 
            value={stats[config.key]} 
            isLoading={isLoading} 
          />
        ))}
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Aktivitas Terbaru */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Aktivitas Terbaru</h2>
            <Link to="/admin/activities" className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
              Lihat semua
            </Link>
          </div>
          
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-lg" />)}
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {ACTIVITIES.map((activity, i) => (
                <ActivityItem key={i} activity={activity} />
              ))}
            </ul>
          )}
        </div>

        {/* Aksi Cepat */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <QuickActionLink key={action.path} action={action} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}