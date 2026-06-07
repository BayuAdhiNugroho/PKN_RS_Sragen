import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-blue-800">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link to="/admin" className="block px-4 py-2 rounded hover:bg-blue-800">Dashboard</Link>
          <Link to="/admin/doctors" className="block px-4 py-2 rounded hover:bg-blue-800">Dokter</Link>
          <Link to="/admin/schedules" className="block px-4 py-2 rounded hover:bg-blue-800">Jadwal Praktik</Link>
          <Link to="/admin/news" className="block px-4 py-2 rounded hover:bg-blue-800">Berita</Link>
          <Link to="/admin/facilities" className="block px-4 py-2 rounded hover:bg-blue-800">Fasilitas</Link>
          <Link to="/admin/achievements" className="block px-4 py-2 rounded hover:bg-blue-800">Prestasi</Link>
          <Link to="/admin/promotions" className="block px-4 py-2 rounded hover:bg-blue-800">Promo</Link>
          <Link to="/admin/contact" className="block px-4 py-2 rounded hover:bg-blue-800">Kontak</Link>
        </nav>
        <div className="p-4 border-t border-blue-800">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
