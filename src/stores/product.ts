import { defineStore } from "pinia";
import { productApi } from "../api/modules/products";
import type { Category, Product } from "../types";

interface ProductState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const useProductStore = defineStore("product", {
  state: (): ProductState => ({
    products: [],
    categories: [{ id: 1, name: "All" }],
    loading: false,
    error: null,
  }),

  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find((p) => p.id === id);
    },

    getFeaturedProducts: (state) => {
      return state.products.slice(0, 3);
    },
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await productApi.getProducts();
        this.products = data.products;
      } catch (error) {
        console.error("Failed to fetch products:", error);
        this.error = "Failed to fetch products";
        // For demo purposes, add dummy data
        this.products = [
          {
            id: 1,
            name: "Product 1",
            price: 99.99,
            description: "This is a sample product description.",
            image: "https://picsum.photos/500/300?random=1",
            stock: 10,
          },
          {
            id: 2,
            name: "Product 2",
            price: 149.99,
            description: "Another sample product description.",
            image: "https://picsum.photos/500/300?random=2",
            stock: 5,
          },
          {
            id: 3,
            name: "Product 3",
            price: 199.99,
            description: "A third sample product description.",
            image: "https://picsum.photos/500/300?random=3",
            stock: 8,
          },
          {
            id: 4,
            name: "Product 4",
            price: 299.99,
            description: "A fourth sample product description.",
            image: "https://picsum.photos/500/300?random=4",
            stock: 3,
          },
        ];
      } finally {
        this.loading = false;
      }
    },
    async fetchProductsByCategory(name:string) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await productApi.getProductsByCategory(name);
        return data.products;
      } catch (error) {
        console.error("Failed to fetch products:", error);
        this.error = "Failed to fetch products";
        // For demo purposes, add dummy data
        return [
          {
            id: 1,
            name: "Product 1",
            price: 99.99,
            description: "This is a sample product description.",
            image: "https://picsum.photos/500/300?random=1",
            stock: 10,
          },
          {
            id: 2,
            name: "Product 2",
            price: 149.99,
            description: "Another sample product description.",
            image: "https://picsum.photos/500/300?random=2",
            stock: 5,
          },
          {
            id: 3,
            name: "Product 3",
            price: 199.99,
            description: "A third sample product description.",
            image: "https://picsum.photos/500/300?random=3",
            stock: 8,
          },
          {
            id: 4,
            name: "Product 4",
            price: 299.99,
            description: "A fourth sample product description.",
            image: "https://picsum.photos/500/300?random=4",
            stock: 3,
          },
        ];
      } finally {
        this.loading = false;
      }
    },

    async fetchProductById(id: number) {
      try {
        const { data } = await productApi.getProductById(id);
        return data.product;
      } catch (error) {
        console.error(`Failed to fetch product ${id}:`, error);
        // Return dummy data for demo
        return this.getProductById(id);
      }
    },

    async fetchCategorys() {
      try {
        const { data } = await productApi.fetchCategoies();
        this.categories = data.categorys
      } catch (error) {
        console.error(`Failed to fetch categorys:`, error);
        this.categories = [{ id: 1, name: "All" }];
        // Return dummy data for demo
      }
    },
  },
});
