import { ICartDetailEntity } from '../../cart/entities/cart.entity'

export interface IInventoryEntity extends ICartDetailEntity {
  inventoryId: string
  quantity: number
  productId: string
  colorId: string
  sizeId: string
  updated: string
}
