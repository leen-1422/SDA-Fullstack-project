import axios from 'axios'
import { getTokenFromStorage } from '../utils/token'

let baseURL = process.env.BACKEND_ORIGIN
console.log('baseURL:', baseURL)

const api = axios.create({
  baseURL
})

const token = getTokenFromStorage()
api.defaults.headers['Authorization'] = `Bearer ${token}`

export default api
