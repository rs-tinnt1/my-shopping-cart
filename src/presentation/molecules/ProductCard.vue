<!-- Component overview
    Diplay card of product include: image, name, price 
    and detail button to navigate to product detail page
-->
<template>
  <div class="card text-center">
    <img :src="`${product?.image ?? product.colors[0].image}`" class="thumb" />
    <p class="font-bold text-gray-500 m-2 truncate">{{ product.title }}</p>
    <p class="font-bold text-gray-600 mt-1">{{ product.price }} VND</p>
    <router-link :to="`/products/${product.productId}`">
      <a-button style="margin: 0.5rem 0" type="primary" class="btn"> Detail </a-button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const { product } = defineProps(['product'])
</script>

<style scoped>
.thumb {
  object-fit: cover;
  height: 217px;
  margin: 0 auto;
}
</style>
