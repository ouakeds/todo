import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000', // replace with your API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default http
