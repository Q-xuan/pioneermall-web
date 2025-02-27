import { defineStore } from "pinia";
import { authApi } from "../api/modules/auth";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem("token"),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const { data } = await authApi.login(email, password);
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem("token", this.token);
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },

    async register(email: string, password: string, name: string) {
      try {
        const { data } = await authApi.register(email, password, name);
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem("token", this.token);
        return true;
      } catch (error) {
        console.error("Registration failed:", error);
        return false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
