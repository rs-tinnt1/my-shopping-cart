import { defineStore } from 'pinia'

import { IInventoryDto } from '@/modules/inventory/dto'
import { ICartDto } from '../dto'
import { cartServices } from '../services'

export const useCartStore = defineStore('cart', {
  state: (): ICartDto => ({
    cartId: '',
    userId: '',
    cartDetails: []
  }),
  getters: {
    totalItems: (state): number => {
      return state.cartDetails.reduce((total, item) => total + item.quantity, 0)
    },
    totalPrice: (state): number => {
      return state.cartDetails.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
  actions: {
    addProduct(product: IInventoryDto) {
      this.cartDetails.push(product)
    },
    setUserId(userId: string) {
      this.userId = userId
    },
    // get cart data in localstorage to update cart context
    updateCart() {
      const localCart = localStorage.getItem('cart')
      if (localCart) {
        this.cartDetails = JSON.parse(localCart) as IInventoryDto[]
      }
    },
    // add item into cart context, set to localstorage
    addToCard(product: IInventoryDto) {
      this.cartDetails.push(product)
      localStorage.setItem('cart', JSON.stringify(this.cartDetails))
    },
    // remove item out of cart context, update localstorage
    removeCartItem(index: number) {
      this.cartDetails.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(this.cartDetails))
    },
    // reset cart context, clear cart in localstorage
    clearCart() {
      this.cartDetails = []
      localStorage.removeItem('cart')
    },
    async getUserCart(userId?: string) {
      try {
        if (userId || this.userId) {
          const res = await cartServices.getCartByUserId({ userId: userId ?? this.userId })
          if (res) {
            this.userId = res.userId ?? ''
            this.cartDetails = res.cartDetails ?? []
            this.cartId = res.cartId ?? ''
            return true
          }
        }
        return false
      } catch {
        return false
      }
    }
    // async orderProductInCart() {
    //   const userStore = useUserStore()
    //   try {
    //     if (this.userId) {
    //       const res = await useFetch('/api/order', {
    //         method: 'POST',
    //         body: {
    //           order: {
    //             address: userStore.userData?.address,
    //             created: new Date(),
    //             status: 'pending',
    //             userId: this.userId
    //           },
    //           details: this.cartDetails.map((item) => ({
    //             inventoryId: item.inventoryId,
    //             quantity: item.quantity
    //           }))
    //         }
    //       })
    //       if (res.data.value?.status === 200) {
    //         await this.getUserCart()
    //         message.success('Create order completed successfully!')
    //         return
    //       }
    //       message.error('Server Error')
    //       return
    //     }

    //     message.error('Account Error')
    //   } catch {
    //     message.error('Error')
    //     return false
    //   }
    // }
  }
})
