<template>
  <div class="mt-4 relative flex flex-col justify-center overflow-hidden">
    <div
      class="w-full p-6 m-auto bg-white border-t border-primary-dark rounded shadow-lg shadow-primary-800/50 lg:max-w-md"
    >
      <h1 class="text-3xl font-semibold text-center text-primary">LOGO</h1>

      <form class="mt-6">
        <div>
          <label for="username" class="block text-sm text-gray-800">Username</label>
          <input
            v-model="form.username"
            type="email"
            class="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary-dark focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Username"
          />
        </div>
        <div>
          <label for="email" class="block text-sm text-gray-800">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary-dark focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Email"
          />
        </div>
        <div class="mt-4">
          <div>
            <label for="password" class="block text-sm text-gray-800">Password</label>
            <input
              type="password"
              v-model="form.password"
              class="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary-dark focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label for="confirm" class="block text-sm text-gray-800">Confirm Password</label>
            <input
              type="password"
              v-model="form.confirm"
              class="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary-dark focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" class="text-xs text-gray-600 hover:underline">Forget Password?</a>
          <div class="mt-6 flex justify-center">
            <button @click="handleRegister" class="bg-blue-500 hover:bg-blue-600 btn">
              Register
            </button>
          </div>
        </div>
      </form>
      <p class="mt-8 text-xs font-light text-center text-gray-700">
        I have account already?
        <router-link to="/login" class="font-medium text-primary-dark hover:underline">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useUserStore } from '@/modules/user/store'

const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirm: ''
})
// handler
const handleRegister = async (e: Event) => {
  e.preventDefault()
  if (form.username == '' || form.password == '') {
    message.warning('Plese enter a valid username and password!')
    return
  }
  if (
    !String(form.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    message.warning('Plese enter a valid email!')
    return
  }
  console.log('TEST1', form)
  if (form.password !== form.confirm) {
    message.warning('Plese confirm password again!')
    return
  }

  const res = await userStore.register(form.email, form.password, form.username)
  if (res) {
    message.success('Register success!')
    router.push('/login')
    return
  }
  message.error('Register failed!')
}
</script>
