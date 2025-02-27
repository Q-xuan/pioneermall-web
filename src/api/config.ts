import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

interface ApiError {
  message: string
  code: string
  status: number
}

// 创建axios实例
const api: AxiosInstance = axios.create({
  baseURL: 'http://104.198.52.156:30010', // 替换为你的API地址
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    const apiError: ApiError = {
      message: 'An unknown error occurred',
      code: 'UNKNOWN_ERROR',
      status: 500
    }

    if (error.response) {
      const { status } = error.response
      switch (status) {
        case 401:
          apiError.message = 'Unauthorized'
          apiError.code = 'UNAUTHORIZED'
          apiError.status = status
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          apiError.message = 'Permission denied'
          apiError.code = 'FORBIDDEN'
          apiError.status = status
          break
        case 404:
          apiError.message = 'Resource not found'
          apiError.code = 'NOT_FOUND'
          apiError.status = status
          break
        default:
          apiError.message = error.response.data?.message || 'An error occurred'
          apiError.code = error.response.data?.code || 'API_ERROR'
          apiError.status = status
      }
    }

    return Promise.reject(apiError)
  }
)

export default api