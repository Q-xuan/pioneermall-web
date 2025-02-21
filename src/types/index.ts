export interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  stock?: number
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