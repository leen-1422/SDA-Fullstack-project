import axios from 'axios'

let baseURL = process.env.BACKEND_ORIGIN
console.log('baseURL:', baseURL)

const api = axios.create({
  baseURL
})

export default api
