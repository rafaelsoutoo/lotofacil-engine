import axios from 'axios'
import { env } from '@/src/lib/env'

export const httpClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})
