import axios from 'axios'

const base = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' },
})

export const getDoctors = async () => {
  const res = await api.get('/doctors')
  return res.data
}

export const getNews = async () => {
  const res = await api.get('/news')
  return res.data
}

export const getPromotions = async () => {
  const res = await api.get('/promotions')
  return res.data
}

export const getFacilities = async () => {
  const res = await api.get('/facilities')
  return res.data
}

export const getSchedule = async () => {
  const res = await api.get('/schedule')
  return res.data
}

export const getAchievements = async () => {
  const res = await api.get('/achievements')
  return res.data
}

export const sendContact = async (payload) => {
  const res = await api.post('/contact', payload)
  return res.data
}

export default api
