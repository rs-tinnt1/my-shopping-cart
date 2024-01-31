<template>
  <div>
    <a-modal :open="props.open" title="Add products" @ok="handleOk" @cancel="handleCancel">
      <a-form
        :model="form"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item label="Color" name="colorId">
          <a-select v-model:value="form.colorId" style="width: 120px">
            <a-select-option v-for="color in colors" :key="color.colorId" :value="color.colorId"
              >[
              <span
                :style="{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  backgroundColor: color.colorId
                }"
              ></span>
              ]</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item label="Size" name="sizeId">
          <a-select v-model:value="form.sizeId" style="width: 120px">
            <a-select-option v-for="size in sizes" :key="size.sizeId" :value="size.sizeId"
              >{{ size.size }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item name="quantity" label="Quantity">
          <a-input-number id="inputNumber" v-model:value="form.quantity" :min="1" :max="10" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { defineEmits, reactive } from 'vue'

import { COLORS, SIZES } from '@/core/constants/assets'
import { useCartStore } from '@/modules/cart/store'
import { IInventoryDto } from '@/modules/inventory/dto'
import { IProductDto } from '@/modules/product/dto'

interface FormState {
  colorId: string
  sizeId: string
  quantity: number
}

const props = defineProps<{ open: boolean; product: IProductDto }>()
const emit = defineEmits(['set-visible'])
const cartStore = useCartStore()
const initFormValue: FormState = {
  colorId: COLORS[0].colorId,
  sizeId: SIZES[0].sizeId,
  quantity: 1
}
const form = reactive<FormState>(initFormValue)
const colors = COLORS
const sizes = SIZES

const handleCancel = () => {
  // reset form
  form.colorId = initFormValue.colorId
  form.sizeId = initFormValue.sizeId
  form.quantity = initFormValue.quantity
  emit('set-visible', false)
}
const handleOk = async () => {
  const inventory: IInventoryDto = {
    ...props.product,
    inventoryId: '',
    colorId: form.colorId,
    sizeId: form.sizeId,
    quantity: form.quantity,
    updated: new Date().toISOString()
  }
  console.log('TEST 1')
  cartStore.addProduct(inventory)
  message.success('Add product successfully!')
  // reset form
  form.colorId = initFormValue.colorId
  form.sizeId = initFormValue.sizeId
  form.quantity = initFormValue.quantity
  emit('set-visible', false)
}
</script>
