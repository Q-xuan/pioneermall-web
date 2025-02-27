<template>
  <div>
    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
      <v-tab v-for="c in categories" :value="c.id" :key="c.id">{{c.name}}</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="n in categories" :key="n.id" :value="n.id">
        <v-container fluid>
          <div class="product-grid">
          <v-card v-for="product in products" :key="product.id" class="product-card">
            <v-img :src="product.image" height="200" cover class="rounded-t-lg"></v-img>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-text>
              <div class="text-h6 mb-2">${{ product.price }}</div>
              <p class="text-truncate">{{ product.description }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" :to="`/products/${product.id}`" block>
                View Details
              </v-btn>
              <v-btn icon="mdi-cart-plus" color="primary" variant="text" @click="addToCart(product)"></v-btn>
            </v-card-actions>
          </v-card>
        </div>
        </v-container>
        
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/product'
import { Category, Product } from '../types'

const cartStore = useCartStore()
const productStore = useProductStore()
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const tab = ref(1)
const fetchProducts = async () => {
  try {
    productStore.fetchProducts();
    products.value = productStore.products;
  } catch (error) {
    console.log('Error fetching products:', error);
  }
}

const fetchCategorys = async () => {
  try {
    await productStore.fetchCategorys();
    categories.value = productStore.categories;
  } catch (error) {
    console.log('Error fetching categories:', error);
  }
}

const addToCart = (product: any) => {
  cartStore.addToCart(product)
}

onMounted(() => {
  fetchCategorys()
  fetchProducts()
})
</script>