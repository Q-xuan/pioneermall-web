<template>
  <v-container>
    <h1 class="text-h3 mb-6">My Orders</h1>
    
    <v-row v-if="orderStore.sortedOrders.length">
      <v-col
        v-for="order in orderStore.sortedOrders"
        :key="order.id"
        cols="12"
      >
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span>Order #{{ order.id }}</span>
            <span class="text-subtitle-1">{{ formatDate(order.createdAt) }}</span>
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
import { onMounted } from 'vue'
import { useOrderStore } from '../stores/order'

const orderStore = useOrderStore()

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString()
}

onMounted(() => {
  orderStore.fetchOrders()
})
</script>