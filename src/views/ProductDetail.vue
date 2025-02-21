<template>
  <v-container>
    <v-row v-if="product">
      <v-col cols="12" md="6">
        <v-img
          :src="product.image"
          height="400"
          cover
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h1 class="text-h3 mb-4">{{ product.name }}</h1>
        <div class="text-h4 mb-4">${{ product.price }}</div>
        <p class="text-body-1 mb-6">{{ product.description }}</p>
        
        <v-row align="center" class="mb-6">
          <v-col cols="auto">
            <v-text-field
              v-model="quantity"
              type="number"
              min="1"
              label="Quantity"
              hide-details
              class="max-width-100"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              size="large"
              @click="addToCart"
            >
              Add to Cart
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <p>Product not found</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cartStore = useCartStore()
const product = ref(null)
const quantity = ref(1)

const fetchProduct = async () => {
  try {
    // Replace with your actual API endpoint
    const response = await axios.get(`/api/products/${route.params.id}`)
    product.value = response.data
  } catch (error) {
    console.error('Failed to fetch product:', error)
    // For demo purposes, add dummy data
    product.value = {
      id: Number(route.params.id),
      name: `Product ${route.params.id}`,
      price: 99.99,
      description: 'This is a detailed product description. It provides comprehensive information about the product, its features, and benefits.',
      image: `https://picsum.photos/800/600?random=${route.params.id}`
    }
  }
}

const addToCart = () => {
  if (product.value) {
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addToCart(product.value)
    }
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.max-width-100 {
  max-width: 100px;
}
</style>