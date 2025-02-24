<template>
  <div>
    <v-carousel
      cycle
      :height="$vuetify.display.smAndDown ? 300 : 400"
      hide-delimiter-background
      show-arrows="hover"
      class="rounded-lg"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.image"
        cover
      >
        <v-sheet
          height="100%"
          color="rgba(0, 0, 0, 0.5)"
          class="d-flex align-center justify-center"
        >
          <div class="text-center px-4">
            <h2 class="text-h4 text-white mb-4">{{ slide.title }}</h2>
            <v-btn color="primary" :to="slide.link" size="large">
              Shop Now
            </v-btn>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <h2 class="text-h4 mt-6 mt-sm-8 mb-4 mb-sm-6">Featured Products</h2>
    <div class="product-grid">
      <v-card
        v-for="product in featuredProducts"
        :key="product.id"
        class="product-card"
        link
        :to="`/products/${product.id}`"
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
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useProductStore } from '../stores/product';
import { Product } from '../types';

const productStore = useProductStore();

const slides = ref([
  {
    title: 'New Collection',
    image: 'https://picsum.photos/1920/1080?random=1',
    link: '/products',
  },
  {
    title: 'Special Offers',
    image: 'https://picsum.photos/1920/1080?random=2',
    link: '/products',
  },
  {
    title: 'Limited Edition',
    image: 'https://picsum.photos/1920/1080?random=3',
    link: '/products',
  },
]);


const featuredProducts = ref<Product[]>([])

const fetchProducts = async () => {
  try {
    // Replace with your actual API endpoint
    await productStore.fetchProducts();
    featuredProducts.value = productStore.products;
    console.log(featuredProducts.value);
  } catch (error) {
    console.log('Error fetching products:', error);
    
  }
}
onMounted(() => {
  fetchProducts()
})
</script>
