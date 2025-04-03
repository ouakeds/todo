import axios from 'axios'

const apiUrl: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

const http = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default http
