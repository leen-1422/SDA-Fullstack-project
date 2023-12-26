import axios from 'axios'
import { getTokenFromStorage } from '../utils/token'

let baseURL = process.env.VITE_BACKEND_ORIGIN || 'http://localhost:5050'

const api = axios.create({
  baseURL
})

const token = getTokenFromStorage()
api.defaults.headers['Authorization'] = `Bearer ${token}`

export default api
