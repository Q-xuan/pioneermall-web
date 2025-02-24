import api from '../config'

interface LoginResponse {
  token: string
  user: {
    id: number
    email: string
    name: string
  }
}

interface RegisterResponse {
  token: string
  user: {
    id: number
    email: string
    name: string
  }
}

export const authApi = {
  login: (email: string, password: string) => {
    return api.post<LoginResponse>('/auth/login', { email, password })
  },

  register: (email: string, password: string, name: string) => {
    return api.post<RegisterResponse>('/auth/register', { email, password, name })
  }
}