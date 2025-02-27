import { defineStore } from 'pinia'
import type { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: []
  }),
  
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    
    totalAmount: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    
    cartItemById: (state) => (id: number) => state.items.find(item => item.id === id)
  },
  
  actions: {
    addToCart(product: Product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        })
      }
    },
    
    removeFromCart(productId: number) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },
    
    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = Math.max(0, quantity)
        if (item.quantity === 0) {
          this.removeFromCart(productId)
        }
      }
    },
    
    clearCart() {
      this.items = []
    }
  },

  persist: true
})