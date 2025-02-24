import api from '../config'
import type { Order, CartItem } from '../../types'

interface CreateOrderRequest {
  userId: number | undefined
  items: CartItem[]
  totalAmount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  createdAt: string
}

interface OrdersResponse {
  orders: Order[]
  total: number
  page: number
  limit: number
}

interface OrderResponse {
  order: Order
}

export const orderApi = {
  getOrders: (page: number = 1, limit: number = 10) => {
    return api.get<OrdersResponse>('/api/orders', {
      params: { page, limit }
    })
  },

  getOrderById: (id: number) => {
    return api.get<OrderResponse>(`/api/orders/${id}`)
  },

  createOrder: (orderData: CreateOrderRequest) => {
    return api.post<OrderResponse>('/api/orders', orderData)
  },

  updateOrderStatus: (orderId: number, status: Order['status']) => {
    return api.patch<OrderResponse>(`/api/orders/${orderId}`, { status })
  }
}