import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div style={{display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', flexDirection: 'row'}}>
      {/* Mobile menu button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          display: 'none',
          position: 'fixed',
          top: '12px',
          left: '12px',
          zIndex: '1001',
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          padding: '8px',
          cursor: 'pointer',
          fontSize: '24px'
        }}
        className="admin-mobile-menu-btn"
      >
        {sidebarOpen ? <IoClose /> : <IoMenu />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: '998',
            display: 'none'
          }}
          className="admin-overlay"
        />
      )}

      {/* Sidebar */}
      <aside 
        style={{
          width: '256px',
          backgroundColor: '#1e3a8a',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'transform 0.3s ease'
        }}
        className="admin-sidebar"
      >
        <div style={{
          padding: '16px',
          fontSize: '24px',
          fontWeight: 'bold',
          borderBottom: '1px solid #1e40af'
        }}>
          Admin Panel
        </div>
        <nav style={{
          flex: '1',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto'
        }}>
          <Link to="/admin" onClick={handleLinkClick} style={{
            display: 'block',
            padding: '12px 16px',
            borderRadius: '6px',
            color: 'white',
            textDecoration: 'none',
            transition: 'background 0.2s'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
            Dashboard
          </Link>
          <Link to="/admin/doctors" onClick={handleLinkClick} style={{
            display: 'block',
            padding: '12px 16px',
            borderRadius: '6px',
            color: 'white',
            textDecoration: 'none',
            transition: 'background 0.2s'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
            Dokter
          </Link>
          <Link to="/admin/schedules" onClick={handleLinkClick} style={{
            display: 'block',
            padding: '12px 16px',
            borderRadius: '6px',
            color: 'white',
            textDecoration: 'none',
            transition: 'background 0.2s'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
            Jadwal Praktik
          </Link>
          <Link to="/admin/news" onClick={handleLinkClick} style={{
            display: 'block',
            padding: '12px 16px',
            borderRadius: '6px',
            color: 'white',
            textDecoration: 'none',
            transition: 'background 0.2s'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
            Berita
          </Link>
          <Link to="/admin/facilities" onClick={handleLinkClick} style={{
            display: 'block',
            padding: '12px 16px',
            borderRadius: '6px',
            color: 'white',
            textDecoration: 'none',
            transition: 'background 0.2s'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
            Fasilitas
          </Link>
          <Link to="/admin/achievements" onClick={handleLinkClick} style={{
            display: 'block',
            padding: '12px 16px',
            borderRadius: '6px',
            color: 'white',
            textDecoration: 'none',
            transition: 'background 0.2s'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
            Prestasi
          </Link>
          <Link to="/admin/promotions" onClick={handleLinkClick} style={{
            display: 'block',
            padding: '12px 16px',
            borderRadius: '6px',
            color: 'white',
            textDecoration: 'none',
            transition: 'background 0.2s'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
            Promo
          </Link>
          <Link to="/admin/contact" onClick={handleLinkClick} style={{
            display: 'block',
            padding: '12px 16px',
            borderRadius: '6px',
            color: 'white',
            textDecoration: 'none',
            transition: 'background 0.2s'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
            Kontak
          </Link>
        </nav>
        <div style={{
          padding: '16px',
          borderTop: '1px solid #1e40af'
        }}>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              backgroundColor: '#dc2626',
              padding: '12px 16px',
              borderRadius: '6px',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{
        flex: '1',
        padding: '32px 24px',
        overflowY: 'auto',
        maxHeight: '100vh'
      }} className="admin-main">
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-mobile-menu-btn {
            display: block !important;
          }

          .admin-overlay {
            display: block !important;
          }

          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            z-index: 999;
            transform: ${sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
          }

          .admin-main {
            padding: 60px 16px 24px 16px;
          }
        }

        @media (max-width: 640px) {
          .admin-main {
            padding: 60px 12px 16px 12px;
          }

          .admin-sidebar {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
}
