import { defineStore } from 'pinia'
import { IProductDto } from '../dto/product.dto'

type TProductListState = {
  menProducts: IProductDto[]
}

export const useProductListStore = defineStore('product', {
  state: (): TProductListState => ({
    menProducts: []
  })
})
