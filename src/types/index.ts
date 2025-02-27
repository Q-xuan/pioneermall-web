export interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  stock?: number
}

export interface Category {
  id: number
  name: string
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: number
  userId: number
  items: CartItem[]
  totalAmount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  createdAt: string
}

export interface User {
  id: number
  email: string
  name: string
  createdAt: string
}

export interface ApiPaginationParams {
  page?: number
  limit?: number
}

export interface ApiPaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}