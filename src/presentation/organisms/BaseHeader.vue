<template>
  <a-layout-header style="display: flex; justify-content: space-between">
    <div class="h-8 w-100 m-4 ml-0 float-left flex justify-between items-center gap-4">
      <router-link to="/">
        <p class="text-white text-lg px-2 py-1 rounded bg-gray-500">Logo</p>
      </router-link>
      <a-dropdown :trigger="['hover']" v-model:open="isOpenModel">
        <a-input-search
          v-model:value="search.searchValue"
          placeholder="input search text"
          enter-button="Search"
          style="width: 200px"
          class="w-50"
          @search="onSearch"
        />
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="product in productsSearch" :key="product.productId">
              <p @click="handleClickSearchResult(product)">{{ product.title }}</p>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
      <router-link to="/"><a-menu-item key="1">Home</a-menu-item></router-link>
      <router-link to="/products">
        <a-menu-item key="2"> Products </a-menu-item>
      </router-link>
      <router-link v-if="userData" to="/checkout">
        <a-menu-item key="3">
          <a-badge :count="totalItems">
            <p id="cart" class="text-white text-lg font-semibold">
              <ShoppingFilled />
            </p> </a-badge
        ></a-menu-item>
      </router-link>
      <router-link v-else to="/login">
        <a-menu-item key="3"> Login </a-menu-item>
      </router-link>
    </a-menu>
  </a-layout-header>
</template>

<script setup lang="ts">
import { useCartStore } from '@/modules/cart/store'
import { IProductDto } from '@/modules/product/dto'
import { productServices } from '@/modules/product/services'
import { useUserStore } from '@/modules/user/store'
import { ShoppingFilled } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const { userData } = useUserStore()
const cartStore = useCartStore()
const totalItems = computed(() => cartStore.totalItems)
const search = ref({
  searchValue: ''
})
const router = useRouter()

const productsSearch = ref<IProductDto[]>([])
const isOpenModel = computed(() => productsSearch.value.length > 0)

const onSearch = async (value: string) => {
  const products = await productServices.getProductByTitle(value)
  productsSearch.value = products.data
}

const handleClickSearchResult = (product: IProductDto) => {
  search.value.searchValue = ''
  productsSearch.value = []
  router.push(`/products/${product.productId}`)
}
</script>

<style>
.ant-layout-content {
  min-height: calc(100vh - 134px);
}
.router-link-exact-active {
  background: #1890ff;
}
.router-link-exact-active span {
  color: white;
}
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#cart {
  margin: 0;
  display: flex;
  align-items: flex-start;
}
#cart span {
  font-size: large;
}
.ant-badge-count {
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  line-height: 16px;
}
</style>
