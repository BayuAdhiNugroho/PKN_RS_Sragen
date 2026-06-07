import axios from 'axios'

const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
export const IMAGE_URL = base.replace('/api', '/uploads/');

const api = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getDoctors = async () => {
  const res = await api.get('/doctors')
  return Array.isArray(res.data) ? res.data : []
}

export const getNews = async () => {
  const res = await api.get('/news')
  return Array.isArray(res.data) ? res.data : []
}

export const getPromotions = async () => {
  const res = await api.get('/promotions')
  return Array.isArray(res.data) ? res.data : []
}

export const getFacilities = async () => {
  const res = await api.get('/facilities')
  return Array.isArray(res.data) ? res.data : []
}

export const getSchedule = async () => {
  const res = await api.get('/schedules')
  return Array.isArray(res.data) ? res.data : []
}

export const getAchievements = async () => {
  const res = await api.get('/achievements')
  return Array.isArray(res.data) ? res.data : []
}

export const sendContact = async (payload) => {
  const res = await api.post('/contact', payload)
  return res.data
}

export default api
