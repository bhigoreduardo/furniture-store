import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + '/api/v1',
})

export default api
