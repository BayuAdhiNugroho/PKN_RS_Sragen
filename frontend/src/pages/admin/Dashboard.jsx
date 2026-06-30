import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const statsConfig = [
  {
    key: 'doctors',
    label: 'Total Dokter',
    meta: 'Tenaga medis terdaftar',
    icon: 'stethoscope',
    color: 'forest',
  },
  {
    key: 'news',
    label: 'Total Berita',
    meta: 'Artikel dipublikasikan',
    icon: 'news',
    color: 'leaf',
  },
  {
    key: 'facilities',
    label: 'Fasilitas',
    meta: 'Unit layanan aktif',
    icon: 'building-hospital',
    color: 'sage',
  },
];

const colorMap = {
  forest: {
    bg: 'bg-[#F2EDC2]',
    text: 'text-[#346739]',
    border: 'border-[#346739]/20',
    gradient: 'from-[#346739] to-[#79AE6F]',
  },
  leaf: {
    bg: 'bg-[#E9F3E4]',
    text: 'text-[#346739]',
    border: 'border-[#79AE6F]/30',
    gradient: 'from-[#79AE6F] to-[#9FCB98]',
  },
  sage: {
    bg: 'bg-[#F6F4D8]',
    text: 'text-[#346739]',
    border: 'border-[#9FCB98]/40',
    gradient: 'from-[#9FCB98] to-[#F2EDC2]',
  },
};

const activities = [
  {
    color: 'bg-[#346739]',
    icon: 'user-plus',
    text: 'Dr. Andi Wijaya ditambahkan',
    time: '2 jam lalu',
  },
  {
    color: 'bg-[#79AE6F]',
    icon: 'file-plus',
    text: 'Berita "Promo Cek Kesehatan" diterbitkan',
    time: '5 jam lalu',
  },
  {
    color: 'bg-[#9FCB98]',
    icon: 'building-plus',
    text: 'Fasilitas Poli Gigi diperbarui',
    time: '1 hari lalu',
  },
  {
    color: 'bg-[#346739]',
    icon: 'user-edit',
    text: 'Profil dokter diperbarui',
    time: '2 hari lalu',
  },
];

const quickActions = [
  {
    icon: 'user-plus',
    label: 'Tambah Dokter',
    desc: 'Tambahkan dokter baru',
    path: '/admin/doctors#tambah-dokter',
    color: 'forest',
  },
  {
    icon: 'file-plus',
    label: 'Buat Berita',
    desc: 'Publikasi artikel baru',
    path: '/admin/news#tambah-berita',
    color: 'leaf',
  },
  {
    icon: 'building-plus',
    label: 'Kelola Fasilitas',
    desc: 'Atur unit layanan',
    path: '/admin/facilities#tambah-fasilitas',
    color: 'sage',
  },
  {
    icon: 'discount',
    label: 'Kelola Promosi',
    desc: 'Atur promo dan diskon',
    path: '/admin/promotions#tambah-promosi',
    color: 'forest',
  },
];

const StatCard = ({ config, value, isLoading }) => {
  const colors = colorMap[config.color];

  return (
    <div className={`relative overflow-hidden bg-white rounded-lg border ${colors.border} shadow-sm hover:shadow-lg transition-all duration-300 p-6 group`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${colors.bg} ${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <i className={`ti ti-${config.icon} text-2xl`} />
          </div>

          {isLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-[#9FCB98]/30 rounded w-24"></div>
              <div className="h-8 bg-[#9FCB98]/30 rounded w-16"></div>
              <div className="h-3 bg-[#9FCB98]/30 rounded w-32"></div>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-[#346739]/75 mb-1">{config.label}</p>
              <p className="text-4xl font-bold text-[#254d2a] mb-2">{value || 0}</p>
              <p className="text-xs text-[#346739]/60">{config.meta}</p>
            </>
          )}
        </div>

        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${colors.gradient} opacity-20 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity, index }) => (
  <li className="relative flex items-start gap-4 py-4 last:pb-0 group">
    <div className="relative">
      <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
        <i className={`ti ti-${activity.icon} text-white text-sm`} />
      </div>
      {index !== activities.length - 1 && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#9FCB98]/45"></div>
      )}
    </div>

    <div className="flex-1 min-w-0 pb-2">
      <p className="text-sm font-medium text-[#254d2a] mb-1 group-hover:text-[#346739] transition-colors">
        {activity.text}
      </p>
      <p className="text-xs text-[#346739]/60 flex items-center gap-1">
        <i className="ti ti-clock text-xs" />
        {activity.time}
      </p>
    </div>
  </li>
);

const QuickActionCard = ({ action }) => {
  const colorClasses = {
    forest: 'hover:border-[#346739]/40 hover:bg-[#F2EDC2]/40',
    leaf: 'hover:border-[#79AE6F]/50 hover:bg-[#9FCB98]/20',
    sage: 'hover:border-[#9FCB98]/60 hover:bg-[#F2EDC2]/30',
  };

  const iconColors = {
    forest: 'bg-[#F2EDC2] text-[#346739]',
    leaf: 'bg-[#E9F3E4] text-[#346739]',
    sage: 'bg-[#F6F4D8] text-[#346739]',
  };

  return (
    <Link
      to={action.path}
      className={`flex items-center gap-4 p-4 rounded-lg border border-[#346739]/10 bg-white ${colorClasses[action.color]} transition-all duration-200 group shadow-sm`}
    >
      <div className={`w-12 h-12 rounded-lg ${iconColors[action.color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
        <i className={`ti ti-${action.icon} text-xl`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#254d2a] group-hover:text-[#346739]">{action.label}</p>
        <p className="text-xs text-[#346739]/60">{action.desc}</p>
      </div>
      <i className="ti ti-chevron-right text-[#79AE6F] group-hover:text-[#346739] group-hover:translate-x-1 transition-all duration-200" />
    </Link>
  );
};

export default function Dashboard() {
  const [stats, setStats] = useState({ doctors: 0, news: 0, facilities: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [doctorsRes, newsRes, facilitiesRes] = await Promise.all([
          api.get('/doctors'),
          api.get('/news'),
          api.get('/facilities'),
        ]);

        setStats({
          doctors: doctorsRes.data?.length || 0,
          news: newsRes.data?.length || 0,
          facilities: facilitiesRes.data?.length || 0,
        });
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2EDC2]/70 via-[#F7F8EA] to-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="relative overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-[#346739] rounded-lg p-6 lg:p-8 shadow-xl">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#79AE6F]/45 to-transparent"></div>
          <div className="relative">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Dashboard Admin
            </h1>
            <p className="text-[#F2EDC2]">
              Pantau semua aktivitas sistem kesehatan
            </p>
          </div>

          <div className="relative flex items-center gap-3 bg-white/95 px-4 py-3 rounded-lg shadow-sm border border-[#F2EDC2]">
            <div className="relative">
              <div className="w-3 h-3 bg-[#79AE6F] rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-[#79AE6F] rounded-full animate-ping opacity-75"></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#346739]">Sistem Aktif</p>
              <p className="text-xs text-[#346739]/70">
                {lastUpdated.toLocaleTimeString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsConfig.map((config) => (
            <StatCard
              key={config.key}
              config={config}
              value={stats[config.key]}
              isLoading={isLoading}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-[#346739]/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F2EDC2] flex items-center justify-center">
                  <i className="ti ti-activity text-[#346739] text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#254d2a]">Aktivitas Terbaru</h2>
                  <p className="text-xs text-[#346739]/60">Update real-time sistem</p>
                </div>
              </div>
              <Link
                to="/admin/activities"
                className="text-sm text-[#346739] hover:text-[#254d2a] font-medium hover:underline"
              >
                Lihat Semua
              </Link>
            </div>

            <ul className="space-y-2">
              {activities.map((activity, index) => (
                <ActivityItem
                  key={activity.text}
                  activity={activity}
                  index={index}
                />
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#346739]/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#E9F3E4] flex items-center justify-center">
                <i className="ti ti-bolt text-[#346739] text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#254d2a]">Aksi Cepat</h2>
                <p className="text-xs text-[#346739]/60">Menu navigasi cepat</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <QuickActionCard
                  key={action.path}
                  action={action}
                />
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-[#346739] to-[#79AE6F] rounded-lg text-white">
              <div className="flex items-start gap-3">
                <i className="ti ti-info-circle text-2xl" />
                <div>
                  <p className="font-semibold mb-1">Butuh Bantuan?</p>
                  <p className="text-sm text-[#F2EDC2]">
                    Dokumentasi lengkap tersedia di menu Help Center
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-[#346739]/60 pt-4 border-t border-[#346739]/10">
          <p>© 2026 Sistem Manajemen Rumah Sakit. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
