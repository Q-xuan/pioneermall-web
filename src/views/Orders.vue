<template>
  <v-container>
    <h1 class="text-h3 mb-6">My Orders</h1>
    
    <v-row v-if="orders.length">
      <v-col
        v-for="order in orders"
        :key="order.id"
        cols="12"
      >
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span>Order #{{ order.id }}</span>
            <span class="text-subtitle-1">{{ formatDate(order.date) }}</span>
          </v-card-title>
          
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="item in order.items"
                :key="item.id"
                class="mb-2"
              >
                <template v-slot:prepend>
                  <v-img
                    :src="item.image"
                    width="50"
                    height="50"
                    cover
                    class="rounded"
                  ></v-img>
                </template>
                
                <v-list-item-title>
                  {{ item.name }}
                </v-list-item-title>
                
                <v-list-item-subtitle>
                  ${{ item.price }} x {{ item.quantity }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            
            <div class="d-flex justify-space-between mt-4">
              <span class="text-h6">Total Amount:</span>
              <span class="text-h6">${{ order.totalAmount.toFixed(2) }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row v-else>
      <v-col>
        <v-alert
          type="info"
          text="You haven't placed any orders yet"
        ></v-alert>
        <v-btn
          color="primary"
          class="mt-4"
          to="/products"
        >
          Start Shopping
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])

const fetchOrders = async () => {
  try {
    // Replace with your actual API endpoint
    const response = await axios.get('/api/orders')
    orders.value = response.data
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    // For demo purposes, add dummy data
    orders.value = [
      {
        id: 1,
        date: new Date(),
        items: [
          {
            id: 1,
            name: 'Product 1',
            price: 99.99,
            quantity: 2,
            image: 'https://picsum.photos/500/300?random=1'
          }
        ],
        totalAmount: 199.98
      }
    ]
  }
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString()
}

onMounted(() => {
  fetchOrders()
})
</script>