import { defineStore } from 'pinia'
import { IProductDto } from '../modules/dto/product.dto'

type TProductListState = {
  menProducts: IProductDto[]
}

export const useProductListStore = defineStore('product', {
  state: (): TProductListState => ({
    menProducts: []
  })
})
