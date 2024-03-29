<template>
  <div>
    <!-- Modal edit user infomation -->
    <ModalEditUser
      v-if="isOpenEditDialog"
      v-model="edittingUser"
      :visible="isOpenEditDialog"
      @update:visible="isOpenEditDialog = $event"
    />

    <!-- Checkout drawer -->
    <a-drawer :width="500" title="Nuxt Store" placement="right" :visible="visible" @close="onClose">
      <template #extra>
        <a-button style="margin-right: 8px" type="primary" @click="handleCheckout">
          Confirm
        </a-button>
        <a-button @click="onClose"> Cancel </a-button>
      </template>
      <a-list
        :key="(record:IProductDto) => record.productId + record.colorId + record.sizeId"
        item-layout="horizontal"
        :pagination="pagination"
        :data-source="cartStore.cartDetails"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.description">
              <template #title>
                <p>{{ item.title }}</p>
              </template>
              <template #avatar>
                <a-avatar :src="item.image" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
        <template #footer>
          <p>Total: {{ cartStore.totalPrice }} VND</p>
        </template>
      </a-list>
    </a-drawer>

    <!-- Main layout profile -->
    <main class="profile-page">
      <!-- Banner -->
      <section class="relative block" :style="{ height: '500px' }">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          style="
            background-image: url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80');
          "
        >
          <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
      </section>

      <section class="relative py-16 bg-gray-300">
        <div class="container mx-auto px-4">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-6">
              <!-- User properties & action -->
              <div class="flex flex-wrap justify-between">
                <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div class="relative">
                    <div
                      id="avatar"
                      className="w-[100px] h-[100px] shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                    >
                      <a-image
                        :width="100"
                        src="https://firebasestorage.googleapis.com/v0/b/nuxt-store-4c385.appspot.com/o/fallback.png?alt=media&token=988b7e71-9db4-47e3-8d35-497ac32def3c"
                        fallback="https://firebasestorage.googleapis.com/v0/b/nuxt-store-4c385.appspot.com/o/fallback.png?alt=media&token=988b7e71-9db4-47e3-8d35-497ac32def3c"
                      />
                    </div>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-3 flex lg:justify-end">
                  <div class="py-6 mt-32 sm:mt-0">
                    <a-button type="primary" @click="logout" danger>
                      <template #icon>
                        <LogoutOutlined />
                      </template>
                      Logout
                    </a-button>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-1">
                  <div class="flex items-center py-6 mt-32 sm:mt-0">
                    <a-button type="primary" @click="handleEdit">
                      <template #icon>
                        <edit-outlined />
                      </template>
                      Edit
                    </a-button>
                    <div class="mx-4">
                      <span class="text-xl font-bold block uppercase tracking-wide text-gray-700">{{
                        userData?.name
                      }}</span
                      ><span class="text-sm text-gray-500"> {{ account?.email }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Product list -->
              <div class="py-4">
                <a-list
                  item-layout="vertical"
                  size="large"
                  :key="(record:IProductDto) => record.productId + record.colorId + record.sizeId"
                  :pagination="pagination"
                  :data-source="cartStore.cartDetails"
                >
                  <template #footer>
                    <div class="px-4">
                      <a-button v-if="cartStore.totalItems" type="primary" @click="showDrawer">
                        <template #icon>
                          <WalletOutlined />
                        </template>
                        Order
                      </a-button>
                    </div>
                  </template>
                  <template #renderItem="{ item, index }">
                    <a-list-item key="item.id">
                      <template #actions>
                        <a-button shape="circle" danger @click="cartStore.removeCartItem(index)">
                          <template #icon><DeleteOutlined /></template>
                        </a-button>
                      </template>
                      <template #extra>
                        <a-image
                          :width="150"
                          :height="150"
                          :src="item.image"
                          fallback="https://firebasestorage.googleapis.com/v0/b/nuxt-store-4c385.appspot.com/o/fallback.png?alt=media&token=988b7e71-9db4-47e3-8d35-497ac32def3c"
                        />
                      </template>
                      <a-list-item-meta :description="item.description">
                        <template #title>
                          <a :href="item.href">{{ item.title }}</a>
                        </template>
                      </a-list-item-meta>
                      {{ item.price }} VND
                    </a-list-item>
                  </template>
                </a-list>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { DeleteOutlined, EditOutlined, LogoutOutlined, WalletOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'

import { useCartStore } from '@/modules/cart/store'
import { IProductDto } from '@/modules/product/dto'
import { IAccountEntity, IUserEntity } from '@/modules/user/entities'
import { useUserStore } from '@/modules/user/store'

// State
const { userData, logout } = useUserStore()
const cartStore = useCartStore()
const isOpenEditDialog = ref<boolean>(false)
const edittingUser = ref<IUserEntity | null>(null)
const account = ref<IAccountEntity | null>(null)
const visible = ref<boolean>(false)
const pagination = {
  onChange: (_page: number) => {},
  pageSize: 3
}

// Listener
onMounted(() => {
  if (userData) {
    edittingUser.value = userData
  }
})

// Handler
const handleEdit = () => {
  isOpenEditDialog.value = true
}

const showDrawer = () => {
  visible.value = true
}

const onClose = () => {
  visible.value = false
}

const handleCheckout = async () => {
  message.success('Order successfully')
  await cartStore.orderProductInCart()
  onClose()
}
</script>
