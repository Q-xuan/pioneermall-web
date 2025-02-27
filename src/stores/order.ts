import { defineStore } from "pinia";
import { orderApi } from "../api/modules/orders";
import type { Order } from "../types";
import { useCartStore } from "./cart";
import { useAuthStore } from "./auth";

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export const useOrderStore = defineStore("order", {
  state: (): OrderState => ({
    orders: [],
    loading: false,
    error: null,
  }),

  getters: {
    getOrderById: (state) => (id: number) => {
      return state.orders.find((order) => order.id === id);
    },

    sortedOrders: (state) => {
      return [...state.orders].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
  },

  actions: {
    async fetchOrders() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await orderApi.getOrders();
        this.orders = data.orders;
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        this.error = "Failed to fetch orders";
        // For demo purposes
        this.orders = [
          {
            id: 1,
            userId: 1,
            items: [
              {
                id: 1,
                name: "Product 1",
                price: 99.99,
                quantity: 2,
                image: "https://picsum.photos/500/300?random=1",
              },
            ],
            totalAmount: 199.98,
            status: "completed",
            createdAt: new Date().toISOString(),
          },
        ];
      } finally {
        this.loading = false;
      }
    },

    async createOrder() {
      const cartStore = useCartStore();
      const authStore = useAuthStore();

      if (!authStore.isAuthenticated) {
        throw new Error("User must be authenticated to create an order");
      }

      if (cartStore.items.length === 0) {
        throw new Error("Cart is empty");
      }

      try {
        const orderData = {
          userId: authStore.user?.id,
          items: cartStore.items,
          totalAmount: cartStore.totalAmount,
          status: "pending" as const,
          createdAt: new Date().toISOString(),
        };

        const { data } = await orderApi.createOrder(orderData);
        this.orders.push(data.order);
        cartStore.clearCart();
        return data.order;
      } catch (error) {
        console.error("Failed to create order:", error);
        throw error;
      }
    },
  },
});
