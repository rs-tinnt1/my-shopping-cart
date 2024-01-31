<template>
  <div>
    <product-details-section :product="product" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { IProductDto } from '@/modules/product/dto'
import { productServices } from '@/modules/product/services'
import ProductDetailsSection from '../organisms/ProductDetailsSection.vue'

const product = ref<IProductDto | null>(null)
const router = useRoute()
const id = computed(() => router.params.id.toString())

//  fetch the products
watch(id, async (val) => {
  if (val) {
    product.value = await productServices.getProductById(val)
  }
})
</script>
