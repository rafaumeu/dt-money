import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const token = process.env.VERCEL_TOKEN

const api = axios.create({
  baseURL: 'https://dt-money-5zs6qc4we-rafaels-projects-62f31870.vercel.app/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

// Adicione um interceptor para adicionar o token a todas as requisições
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export { api }

