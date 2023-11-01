import axios from 'axios'

import { sanitizeToken } from '../utils/format'

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + '/api/v1',
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token)
    config.headers.Authorization = `${
      import.meta.env.VITE_SERVER_BEARER
    } ${sanitizeToken(token)}`

  return config
})

export default api
