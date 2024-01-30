<template>
  <div class="block">
    <h2 class="max-w-full md:max-w-[1024px] mx-auto flex justify-between text-lg text-black">
      Men
      <p class="m-0">
        <router-link to="/products?category=men">
          <span class="text-sm text-[#12b488] font-bold">More >></span>
        </router-link>
      </p>
    </h2>
    <div class="max-w-full md:max-w-[1024px] mx-auto grid grid-cols-4 gap-5">
      <div v-for="p in men" :key="p.productId">
        <product-card :product="p" />
      </div>
    </div>

    <h2 class="max-w-full md:max-w-[1024px] mx-auto mt-5 flex justify-between text-lg text-black">
      Category
    </h2>
    <div class="max-w-full md:max-w-[1024px] mx-auto mt-5 grid grid-cols-3 gap-5">
      <div v-for="c in PRODUCTS_CATEGORY" :key="c.title">
        <category-card :title="c.title" :image="c.image" :link="c.link" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { PRODUCTS_CATEGORY } from '@/core/constants'
import { IProductDto } from '@/modules/product/dto'
import { productServices } from '@/modules/product/services'
import CategoryCard from '../molecules/CategoryCard.vue'
import ProductCard from '../molecules/ProductCard.vue'

const men = ref<IProductDto[]>([])

onMounted(async () => {
  const res = await productServices.getProducts(1, 'men')
  men.value = res.data
})
</script>
