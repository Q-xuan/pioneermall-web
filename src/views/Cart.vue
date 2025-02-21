<template>
  <v-container>
    <h1 class="text-h3 mb-6">Shopping Cart</h1>
    
    <v-row v-if="cartStore.items.length">
      <v-col cols="12" md="8">
        <v-card>
          <v-list>
            <v-list-item
              v-for="item in cartStore.items"
              :key="item.id"
              class="mb-2"
            >
              <template v-slot:prepend>
                <v-img
                  :src="item.image"
                  width="100"
                  height="100"
                  cover
                  class="rounded"
                ></v-img>
              </template>
              
              <v-list-item-title class="text-h6">
                {{ item.name }}
              </v-list-item-title>
              
              <v-list-item-subtitle>
                ${{ item.price }} x {{ item.quantity }}
              </v-list-item-subtitle>
              
              <template v-slot:append>
                <v-btn
                  icon="mdi-delete"
                  color="error"
                  variant="text"
                  @click="cartStore.removeFromCart(item.id)"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card>
          <v-card-text>
            <h2 class="text-h5 mb-4">Order Summary</h2>
            <div class="d-flex justify-space-between mb-4">
              <span>Total Items:</span>
              <span>{{ cartStore.totalItems }}</span>
            </div>
            <div class="d-flex justify-space-between mb-4">
              <span class="text-h6">Total Amount:</span>
              <span class="text-h6">${{ cartStore.totalAmount.toFixed(2) }}</span>
            </div>
            <v-btn
              color="primary"
              block
              @click="checkout"
              :loading="loading"
            >
              Checkout
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row v-else>
      <v-col>
        <v-alert
          type="info"
          text="Your cart is empty"
        ></v-alert>
        <v-btn
          color="primary"
          class="mt-4"
          to="/products"
        >
          Continue Shopping
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import axios from 'axios'

const router = useRouter()
const cartStore = useCartStore()
const loading = ref(false)

const checkout = async () => {
  try {
    loading.value = true
    // Replace with your actual API endpoint
    await axios.post('/api/orders', {
      items: cartStore.items,
      totalAmount: cartStore.totalAmount
    })
    cartStore.clearCart()
    router.push('/orders')
  } catch (error) {
    console.error('Checkout failed:', error)
  } finally {
    loading.value = false
  }
}
</script>