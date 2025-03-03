import api from '../config'
import type { Category, Product } from '../../types'

interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}

interface ProductResponse {
  product: Product
}

interface Categories{
  categorys: Category[]
}

export const productApi = {
  getProducts: (page: number = 1, page_size: number = 10) => {
    return api.post<ProductsResponse>('/product/products', { page, page_size })
  },
  getProductsByCategory: (category_name: string, page: number = 1, page_size: number = 10) => {
    return api.post<ProductsResponse>('/product/products', { category_name, page, page_size })
  },

  getProductById: (id: number) => {
    return api.get<ProductResponse>(`/product/${id}`)
  },

  searchProducts: (query: string, page: number = 1, limit: number = 10) => {
    return api.post<ProductsResponse>('/product/search', {
      data: { query, page, limit }
    })
  },

  fetchCategoies:() =>{
    return api.get<Categories>('/product/categorys')
  }
}