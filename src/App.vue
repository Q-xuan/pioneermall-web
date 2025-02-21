<template>
  <v-app>
    <v-app-bar color="primary">
      <v-container class="d-flex align-center pa-0">
        <v-app-bar-title class="hidden-sm-and-down"
          >Vue E-commerce</v-app-bar-title
        >
        <v-app-bar-title class="hidden-md-and-up">Shop</v-app-bar-title>
        <v-spacer></v-spacer>

        <!-- Desktop Navigation -->
        <div class="hidden-sm-and-down">
          <v-btn to="/" text>Home</v-btn>
          <v-btn to="/products" text>Products</v-btn>
          <template v-if="authStore.isAuthenticated">
            <v-btn to="/cart" text> Cart ({{ cartStore.totalItems }}) </v-btn>
            <v-btn to="/orders" text>Orders</v-btn>
            <v-btn @click="logout" text>Logout</v-btn>
          </template>
          <template v-else>
            <v-btn to="/login" text>Login</v-btn>
            <v-btn to="/register" text>Register</v-btn>
          </template>
        </div>

        <!-- Mobile Navigation -->
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" location="right" temporary>
      <v-list>
        <v-list-item to="/" title="Home"></v-list-item>
        <v-list-item to="/products" title="Products"></v-list-item>
        <template v-if="authStore.isAuthenticated">
          <v-list-item
            to="/cart"
            :title="`Cart (${cartStore.totalItems})`"
          ></v-list-item>
          <v-list-item to="/orders" title="Orders"></v-list-item>
          <v-list-item @click="logout" title="Logout"></v-list-item>
        </template>
        <template v-else>
          <v-list-item to="/login" title="Login"></v-list-item>
          <v-list-item to="/register" title="Register"></v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-4 py-sm-8">
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app class="pa-4">
      <v-container class="pa-0">
        <v-row justify="center" no-gutters>
          <span>&copy; {{ new Date().getFullYear() }} - Vue E-commerce</span>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from './stores/auth';
import { useCartStore } from './stores/cart';

const authStore = useAuthStore();
const cartStore = useCartStore();
const drawer = ref(false);

const logout = () => {
  authStore.logout();
  drawer.value = false;
};
</script>
