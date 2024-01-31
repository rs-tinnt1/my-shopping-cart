<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<!-- Component overview
    Display product detail: image, title, description
    and add to card button
-->
<template>
  <modal-add-to-cart :open="showModalAddToCard" @set-visible="setOpenDialog" :product="product" />

  <div class="card">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <img
          :src="`${product?.image ?? product?.colors?.[0]?.image}`"
          class="mx-auto max-w-[400px] my-7"
        />
      </div>
      <div class="p-7">
        <h2 class="text-4xl my-7">{{ product?.title }}</h2>
        <p class="text-xl my-7">{{ product?.price?.toLocaleString() }} VND</p>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Mô tả sản phẩm:</h3>
        <p class="mb-7">{{ product?.description }}</p>

        <a-button type="primary" @click="handleClick" class="btn">
          <template #icon>
            <PlusCircleOutlined />
          </template>
          Add to cart
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

import { useUserStore } from '@/modules/user/store'
import ModalAddToCart from '@/presentation/molecules/ModalAddToCart.vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

// eslint-disable-next-line vue/require-prop-types
const { product } = defineProps(['product'])

const showModalAddToCard = ref<boolean>(false)
const userStore = useUserStore()
const router = useRouter()

// Handle add to cart context
const handleClick = () => {
  if (!userStore.userData?.userId) {
    message.warning('Please login to continue!')
    router.push('/login')
  }
  showModalAddToCard.value = true
}

// Hanlde open/close modal
const setOpenDialog = (value: boolean) => {
  showModalAddToCard.value = value
}
</script>

<style scoped></style>
