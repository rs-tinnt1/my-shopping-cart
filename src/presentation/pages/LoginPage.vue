<template>
  <div class="mt-4 relative flex flex-col justify-center overflow-hidden">
    <div
      class="w-full p-6 m-auto bg-white border-t border-primary-dark rounded shadow-lg shadow-primary-800/50 lg:max-w-md"
    >
      <h1 class="text-3xl font-semibold text-center text-primary">LOGO</h1>

      <form class="mt-6">
        <div>
          <label for="email" class="block text-sm text-gray-800">Email</label>
          <input
            v-model="creds.email"
            type="email"
            class="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary-dark focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Email"
          />
        </div>
        <div class="mt-4">
          <div>
            <label for="password" class="block text-sm text-gray-800">Password</label>
            <input
              v-model="creds.password"
              type="password"
              class="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary-dark focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" class="text-xs text-gray-600 hover:underline">Forget Password?</a>
          <div class="mt-6 flex justify-center">
            <button class="bg-blue-500 hover:bg-blue-600 btn" @click="handleLogin">Login</button>
          </div>
        </div>
      </form>
      <p class="mt-8 text-xs font-light text-center text-gray-700">
        Don't have an account?
        <router-link to="/register" class="font-medium text-primary-dark hover:underline">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useCartStore } from '@/modules/cart/store'
import { useUserStore } from '@/modules/user/store'

const router = useRouter()

const { login } = useUserStore()
const { updateCart } = useCartStore()
const creds = reactive({
  email: '',
  password: ''
})

// handler
const handleLogin = async (e: Event) => {
  e.preventDefault()
  if (
    String(creds.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    const res = await login(creds.email, creds.password)
    if (res) {
      updateCart()
      message.success('Login success!')
      router.push('/')
    } else {
      message.error('Login failed!')
    }
  } else {
    message.warning('Plese enter a valid email!')
  }
}
</script>
