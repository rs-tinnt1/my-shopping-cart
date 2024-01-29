<template>
  <div>
    <div class="max-w-full md:max-w-[1024px] mx-auto mb-2 grid grid-cols-4 gap-5">
      <div v-for="p in products?.data">
        <product-card :product="p" />
      </div>
    </div>
    <!-- <div class="h-[25px]">
      <a-spin size="small" v-show="pending" />
    </div> -->
    <base-pagination v-model="page" :limit="4" :total="products?.total" />
  </div>
</template>

<script setup lang="ts">
import { IProductDto } from '@/modules/dto/product.dto'
import { productServices } from '@/modules/services'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import BasePagination from '../atoms/BasePagination.vue'
import ProductCard from '../molecules/ProductCard.vue'

const route = useRoute()
const page = ref(1)
const products = ref<{ data: IProductDto[]; total: number }>({
  data: [],
  total: 0
})

watchEffect(async () => {
  const category = route.query.category
  const res = await productServices.getProducts(
    page.value,
    category ? category.toString() : undefined
  )
  products.value = res
})
</script>
