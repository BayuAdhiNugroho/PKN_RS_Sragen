import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: 'layout-dashboard' },
  { path: '/admin/doctors', label: 'Dokter', icon: 'stethoscope' },
  { path: '/admin/schedules', label: 'Jadwal Praktik', icon: 'calendar-time' },
  { path: '/admin/news', label: 'Berita', icon: 'news' },
  { path: '/admin/facilities', label: 'Fasilitas', icon: 'building-hospital' },
  { path: '/admin/achievements', label: 'Prestasi', icon: 'trophy' },
  { path: '/admin/promotions', label: 'Promo', icon: 'discount' },
  { path: '/admin/contact', label: 'Kontak', icon: 'address-book' },
];

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
    <div style={{display: 'flex', minHeight: '100vh', backgroundColor: '#f7f5df', flexDirection: 'row'}}>
      {/* Mobile menu button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          display: 'none',
          position: 'fixed',
          top: '12px',
          left: '12px',
          zIndex: '1001',
          background: '#F2EDC2',
          border: '1px solid rgba(52,103,57,0.2)',
          borderRadius: '8px',
          padding: '8px',
          cursor: 'pointer',
          fontSize: '24px',
          color: '#346739',
          boxShadow: '0 12px 30px rgba(52,103,57,0.18)'
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
          background: 'linear-gradient(180deg, #346739 0%, #28512d 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'transform 0.3s ease',
          boxShadow: '18px 0 45px rgba(52,103,57,0.18)'
        }}
        className="admin-sidebar"
      >
        <div style={{
          padding: '22px 18px',
          borderBottom: '1px solid rgba(242,237,194,0.18)'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#F2EDC2',
            color: '#346739',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            boxShadow: '0 14px 28px rgba(0,0,0,0.14)'
          }}>
            <i className="ti ti-heartbeat" style={{fontSize: '24px'}} />
          </div>
          <div style={{fontSize: '21px', fontWeight: '800', lineHeight: 1.15}}>Admin Panel</div>
          <div style={{fontSize: '12px', color: '#F2EDC2', marginTop: '6px'}}>RSU PKU Muhammadiyah Sragen</div>
        </div>
        <nav style={{
          flex: '1',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto'
        }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className="admin-nav-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  color: isActive ? '#346739' : 'rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s, transform 0.2s',
                  backgroundColor: isActive ? '#F2EDC2' : 'transparent',
                  boxShadow: isActive ? '0 12px 26px rgba(0,0,0,0.14)' : 'none',
                  fontWeight: isActive ? 700 : 500
                }}
              >
                <i className={`ti ti-${item.icon}`} style={{fontSize: '18px'}} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div style={{
          padding: '16px',
          borderTop: '1px solid rgba(242,237,194,0.18)'
        }}>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              backgroundColor: '#F2EDC2',
              padding: '12px 16px',
              borderRadius: '8px',
              color: '#346739',
              border: '1px solid rgba(242,237,194,0.35)',
              cursor: 'pointer',
              transition: 'background 0.2s',
              fontSize: '14px',
              fontWeight: '700'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#9FCB98'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#F2EDC2'}
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
        maxHeight: '100vh',
        background: 'linear-gradient(135deg, #f7f5df 0%, #eef6e8 48%, #ffffff 100%)'
      }} className="admin-main">
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>

      <style>{`
        .admin-nav-link:hover {
          background: rgba(242,237,194,0.14) !important;
          color: #ffffff !important;
          transform: translateX(3px);
        }

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
