<template>
  <div>
    <product-details-section :product="product" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import { IProductDto } from '@/modules/dto/product.dto'
import { productServices } from '@/modules/services'
import ProductDetailsSection from '../organisms/ProductDetailsSection.vue'

const product = ref<IProductDto | null>(null)

//  fetch the products
watchEffect(async () => {
  const { id } = useRoute().params
  if (id) {
    product.value = await productServices.getProductById(id.toString())
  }
})
</script>
