import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'

export default function MainLayout() {
  const location = useLocation()

  return (
    <div style={{display: 'flex', minHeight: '100svh', flexDirection: 'column'}}>
      <Navbar />
      <main style={{padding: '28px 20px', flex: '1 1 auto', maxWidth: '100%', boxSizing: 'border-box'}}>
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
