import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000' + '/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ===== AUTH =====
export const login = (payload) => api.post('/auth/login', payload);
export const register = (payload) => api.post('/auth/register', payload);

// ===== URL SHORTENER =====
export const shortenUrl = (payload) => api.post('/url/shorten', payload);
export const getUserUrls = () => api.get('/url/user');
export const getAnalytics = (code) => api.get(`/analytics/${code}`);
export const getUrlsByTag = (tag) =>
  api.get(`/analytics/tag/${encodeURIComponent(tag)}`); 

export const deleteShortUrl = (code) => api.delete(`/url/${code}`);


export default api;
