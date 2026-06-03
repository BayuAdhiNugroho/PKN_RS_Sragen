import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Doctors from '../pages/Doctors'
import Facilities from '../pages/Facilities'
import Schedule from '../pages/Schedule'
import News from '../pages/News'
import Promotions from '../pages/Promotions'
import Contact from '../pages/Contact'
import Achievements from '../pages/Achievements'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="news" element={<News />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="contact" element={<Contact />} />
        <Route path="achievements" element={<Achievements />} />
      </Route>
    </Routes>
  )
}
