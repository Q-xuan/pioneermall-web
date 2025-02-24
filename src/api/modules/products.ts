import api from '../config'
import type { Product } from '../../types'

interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}

interface ProductResponse {
  product: Product
}

export const productApi = {
  getProducts: (page: number = 1, limit: number = 10) => {
    return api.post<ProductsResponse>('/product/products', {
        data: { page, limit }
    })
  },

  getProductById: (id: number) => {
    return api.get<ProductResponse>(`/product/products/${id}`)
  },

  searchProducts: (query: string, page: number = 1, limit: number = 10) => {
    return api.post<ProductsResponse>('/product/search', {
      data: { query, page, limit }
    })
  }
}