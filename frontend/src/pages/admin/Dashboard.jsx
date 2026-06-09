import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const stats_config = [
  { 
    key: 'doctors',    
    label: 'Total Dokter', 
    meta: 'Tenaga medis terdaftar',   
    icon: 'stethoscope',       
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600'
  },
  { 
    key: 'news',       
    label: 'Total Berita', 
    meta: 'Artikel dipublikasikan',   
    icon: 'news',              
    color: 'teal',
    gradient: 'from-teal-500 to-teal-600'
  },
  { 
    key: 'facilities', 
    label: 'Fasilitas',    
    meta: 'Unit layanan aktif',       
    icon: 'building-hospital', 
    color: 'indigo',
    gradient: 'from-indigo-500 to-indigo-600'
  },
];

const colorMap = {
  blue:  { 
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600'
  },
  teal:  { 
    bg: 'bg-teal-50',
    text: 'text-teal-600',
    border: 'border-teal-200',
    gradient: 'from-teal-500 to-teal-600'
  },
  indigo: { 
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    border: 'border-indigo-200',
    gradient: 'from-indigo-500 to-indigo-600'
  },
};

const activities = [
  { 
    color: 'bg-blue-500',  
    icon: 'user-plus',
    text: 'Dr. Andi Wijaya ditambahkan',              
    time: '2 jam lalu',
    type: 'doctor'
  },
  { 
    color: 'bg-teal-500',  
    icon: 'file-plus',
    text: 'Berita "Promo Cek Kesehatan" diterbitkan', 
    time: '5 jam lalu',
    type: 'news'
  },
  { 
    color: 'bg-indigo-500', 
    icon: 'building-plus',
    text: 'Fasilitas Poli Gigi diperbarui',           
    time: '1 hari lalu',
    type: 'facility'
  },
  { 
    color: 'bg-purple-500', 
    icon: 'user-edit',
    text: 'Dr. Sari Melati profil diperbarui',        
    time: '2 hari lalu',
    type: 'doctor'
  },
];

const quickActions = [
  { 
    icon: 'user-plus',     
    label: 'Tambah Dokter', 
    desc: 'Tambahkan dokter baru',
    path: '/admin/doctors/new',
    color: 'blue'
  },
  { 
    icon: 'file-plus',     
    label: 'Buat Berita',   
    desc: 'Publikasi artikel baru',
    path: '/admin/news/new',
    color: 'teal'
  },
  { 
    icon: 'building-plus', 
    label: 'Kelola Fasilitas',   
    desc: 'Atur unit layanan',
    path: '/admin/facilities',
    color: 'indigo'
  },
  { 
    icon: 'chart-bar',     
    label: 'Lihat Laporan',      
    desc: 'Analisis & statistik',
    path: '/admin/reports',
    color: 'purple'
  },
];

// Component: Stat Card
const StatCard = ({ config, value, isLoading }) => {
  const colors = colorMap[config.color];
  
  return (
    <div className={`relative overflow-hidden bg-white rounded-2xl border ${colors.border} shadow-sm hover:shadow-lg transition-all duration-300 p-6 group`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} ${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <i className={`ti ti-${config.icon} text-2xl`} />
          </div>
          
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-600 mb-1">{config.label}</p>
              <p className="text-4xl font-bold text-gray-900 mb-2">{value || 0}</p>
              <p className="text-xs text-gray-500">{config.meta}</p>
            </>
          )}
        </div>
        
        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
      </div>
    </div>
  );
};

// Component: Activity Item
const ActivityItem = ({ activity, index }) => (
  <li className="relative flex items-start gap-4 py-4 last:pb-0 group">
    <div className="relative">
      <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
        <i className={`ti ti-${activity.icon} text-white text-sm`} />
      </div>
      {index !== activities.length - 1 && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
      )}
    </div>
    
    <div className="flex-1 min-w-0 pb-2">
      <p className="text-sm font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
        {activity.text}
      </p>
      <p className="text-xs text-gray-500 flex items-center gap-1">
        <i className="ti ti-clock text-xs" />
        {activity.time}
      </p>
    </div>
  </li>
);

// Component: Quick Action Card
const QuickActionCard = ({ action }) => {
  const colorClasses = {
    blue: 'hover:border-blue-300 hover:bg-blue-50',
    teal: 'hover:border-teal-300 hover:bg-teal-50',
    indigo: 'hover:border-indigo-300 hover:bg-indigo-50',
    purple: 'hover:border-purple-300 hover:bg-purple-50',
  };

  const iconColors = {
    blue: 'bg-blue-100 text-blue-600',
    teal: 'bg-teal-100 text-teal-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <Link
      to={action.path}
      className={`flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white ${colorClasses[action.color]} transition-all duration-200 group`}
    >
      <div className={`w-12 h-12 rounded-lg ${iconColors[action.color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
        <i className={`ti ti-${action.icon} text-xl`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">{action.label}</p>
        <p className="text-xs text-gray-500">{action.desc}</p>
      </div>
      <i className="ti ti-chevron-right text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
    </Link>
  );
};

// Main Dashboard Component
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
    
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Dashboard Admin
            </h1>
            <p className="text-gray-600">
              Pantau semua aktivitas sistem kesehatan
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-sm border border-green-200">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-700">Sistem Aktif</p>
              <p className="text-xs text-green-600">
                {lastUpdated.toLocaleTimeString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats_config.map((config) => (
            <StatCard
              key={config.key}
              config={config}
              value={stats[config.key]}
              isLoading={isLoading}
            />
          ))}
        </div>

        {/* Bottom Section - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <i className="ti ti-activity text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Aktivitas Terbaru</h2>
                  <p className="text-xs text-gray-500">Update real-time sistem</p>
                </div>
              </div>
              <Link 
                to="/admin/activities" 
                className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Lihat Semua
              </Link>
            </div>
            
            <ul className="space-y-2">
              {activities.map((activity, index) => (
                <ActivityItem 
                  key={index} 
                  activity={activity} 
                  index={index}
                />
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <i className="ti ti-bolt text-purple-600 text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Aksi Cepat</h2>
                <p className="text-xs text-gray-500">Menu navigasi cepat</p>
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

            {/* Additional Info Card */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
              <div className="flex items-start gap-3">
                <i className="ti ti-info-circle text-2xl" />
                <div>
                  <p className="font-semibold mb-1">Butuh Bantuan?</p>
                  <p className="text-sm text-blue-100">
                    Dokumentasi lengkap tersedia di menu Help Center
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
          <p>© 2026 Sistem Manajemen Rumah Sakit. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}