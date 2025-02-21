<template>
  <div>
    <h1 class="text-h3 mb-6">Products</h1>
    
    <div class="product-grid">
      <v-card
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <v-img
          :src="product.image"
          height="200"
          cover
          class="rounded-t-lg"
        ></v-img>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-text>
          <div class="text-h6 mb-2">${{ product.price }}</div>
          <p class="text-truncate">{{ product.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            :to="`/products/${product.id}`"
            block
          >
            View Details
          </v-btn>
          <v-btn
            icon="mdi-cart-plus"
            color="primary"
            variant="text"
            @click="addToCart(product)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const products = ref([])

const fetchProducts = async () => {
  try {
    // Replace with your actual API endpoint
    const response = await axios.get('/api/products')
    products.value = response.data
  } catch (error) {
    console.error('Failed to fetch products:', error)
    // For demo purposes, add some dummy data
    products.value = [
      {
        id: 1,
        name: 'Product 1',
        price: 99.99,
        description: 'This is a sample product description.',
        image: 'https://picsum.photos/500/300?random=1'
      },
      {
        id: 2,
        name: 'Product 2',
        price: 149.99,
        description: 'Another sample product description.',
        image: 'https://picsum.photos/500/300?random=2'
      },
      {
        id: 3,
        name: 'Product 3',
        price: 199.99,
        description: 'A third sample product description.',
        image: 'https://picsum.photos/500/300?random=3'
      },
      {
        id: 4,
        name: 'Product 4',
        price: 299.99,
        description: 'A fourth sample product description.',
        image: 'https://picsum.photos/500/300?random=4'
      }
    ]
  }
}

const addToCart = (product: any) => {
  cartStore.addToCart(product)
}

onMounted(() => {
  fetchProducts()
})
</script>