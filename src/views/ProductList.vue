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
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/product'
import { Product } from '../types'

const cartStore = useCartStore()
const productStore = useProductStore()
const products = ref<Product[]>([])

const fetchProducts = async () => {
  try {
    // Replace with your actual API endpoint
    productStore.fetchProducts();
    products.value = productStore.products;
  } catch (error) {
    console.log('Error fetching products:', error);
    
  }
}

const addToCart = (product: any) => {
  cartStore.addToCart(product)
}

onMounted(() => {
  fetchProducts()
})
</script>