<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mt-8">
          <v-card-title class="text-center text-h4 py-4">
            Login
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                :error-messages="emailError"
              ></v-text-field>
              
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                :error-messages="passwordError"
              ></v-text-field>
              
              <v-btn
                type="submit"
                color="primary"
                block
                class="mt-4"
                :loading="loading"
              >
                Login
              </v-btn>
            </v-form>
            
            <div class="text-center mt-4">
              Don't have an account?
              <router-link to="/register">Register</router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import * as yup from 'yup'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const emailError = ref('')
const passwordError = ref('')

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
})

const handleSubmit = async () => {
  try {
    emailError.value = ''
    passwordError.value = ''
    loading.value = true
    
    await schema.validate({ email: email.value, password: password.value }, { abortEarly: false })
    const success = await authStore.login(email.value, password.value)
    
    if (success) {
      router.push('/')
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      error.inner.forEach((err) => {
        if (err.path === 'email') emailError.value = err.message
        if (err.path === 'password') passwordError.value = err.message
      })
    }
  } finally {
    loading.value = false
  }
}
</script>