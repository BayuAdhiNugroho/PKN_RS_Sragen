import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div style={{display: 'flex', minHeight: '100svh', flexDirection: 'column'}}>
      <Navbar />
      <main style={{padding: '28px 20px', flex: '1 1 auto'}}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
