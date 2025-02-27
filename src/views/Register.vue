<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mt-8">
          <v-card-title class="text-center text-h4 py-4">
            Register
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="name"
                label="Name"
                required
                :error-messages="nameError"
              ></v-text-field>

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
              
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                required
                :error-messages="confirmPasswordError"
              ></v-text-field>
              
              <v-btn
                type="submit"
                color="primary"
                block
                class="mt-4"
                :loading="loading"
              >
                Register
              </v-btn>
            </v-form>
            
            <div class="text-center mt-4">
              Already have an account?
              <router-link to="/login">Login</router-link>
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
})

const handleSubmit = async () => {
  try {
    nameError.value = ''
    emailError.value = ''
    passwordError.value = ''
    confirmPasswordError.value = ''
    loading.value = true
    
    await schema.validate({
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }, { abortEarly: false })
    
    const success = await authStore.register(email.value, password.value, name.value)
    
    if (success) {
      router.push('/')
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      error.inner.forEach((err) => {
        if (err.path === 'name') nameError.value = err.message
        if (err.path === 'email') emailError.value = err.message
        if (err.path === 'password') passwordError.value = err.message
        if (err.path === 'confirmPassword') confirmPasswordError.value = err.message
      })
    }
  } finally {
    loading.value = false
  }
}
</script>