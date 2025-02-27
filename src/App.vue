<template>
  <v-app>
    <v-app-bar
      :elevation="2"
      class="bg-gradient"
      height="64"
    >
      <v-container class="d-flex align-center pa-0">
        <v-app-bar-title class="hidden-sm-and-down font-weight-bold"
          >Vue E-commerce</v-app-bar-title
        >
        <v-app-bar-title class="hidden-md-and-up font-weight-bold">Shop</v-app-bar-title>
        <v-spacer></v-spacer>

        <!-- Desktop Navigation -->
        <div class="hidden-sm-and-down">
          <v-btn
            to="/"
            class="mx-1 nav-btn"
            variant="text"
            rounded="pill"
          >Home</v-btn>
          <v-btn
            to="/products"
            class="mx-1 nav-btn"
            variant="text"
            rounded="pill"
          >Products</v-btn>
          <template v-if="authStore.isAuthenticated">
            <v-btn
              to="/cart"
              class="mx-1 nav-btn"
              variant="text"
              rounded="pill"
            >
              <v-icon start icon="mdi-cart"></v-icon>
              Cart ({{ cartStore.totalItems }})
            </v-btn>
            <v-btn
              to="/orders"
              class="mx-1 nav-btn"
              variant="text"
              rounded="pill"
            >
              <v-icon start icon="mdi-package"></v-icon>
              Orders
            </v-btn>
            <v-btn
              @click="logout"
              class="mx-1 nav-btn"
              variant="text"
              rounded="pill"
            >
              <v-icon start icon="mdi-logout"></v-icon>
              Logout
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              to="/login"
              class="mx-1 nav-btn"
              variant="text"
              rounded="pill"
            >
              <v-icon start icon="mdi-login"></v-icon>
              Login
            </v-btn>
            <v-btn
              to="/register"
              class="mx-1 nav-btn"
              variant="text"
              rounded="pill"
            >
              <v-icon start icon="mdi-account-plus"></v-icon>
              Register
            </v-btn>
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
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
      class="elevation-4"
    >
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

    <v-footer app class="pa-4 bg-grey-lighten-4">
      <v-container class="pa-0">
        <v-row justify="center" align="center" no-gutters>
          <span class="text-grey">&copy; {{ new Date().getFullYear() }} - Vue E-commerce</span>
        </v-row>
      </v-container>
    </v-footer>
    <Msg/>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from './stores/auth';
import { useCartStore } from './stores/cart';
import Msg from './components/Msg.vue';

const authStore = useAuthStore();
const cartStore = useCartStore();
const drawer = ref(false);

const logout = () => {
  authStore.logout();
  drawer.value = false;
};
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, var(--v-primary-base), var(--v-primary-darken1));
}

.nav-btn {
  transition: all 0.3s ease;
}

.nav-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.v-navigation-drawer {
  transition: transform 0.3s ease;
}
</style>
