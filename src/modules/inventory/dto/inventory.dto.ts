import { IInventoryEntity } from '../entities/inventory.entity'

export interface IInventoryDto extends IInventoryEntity {
  inventoryId: string
  quantity: number
  productId: string
  title: string
  description: string
  categoryId: string
  tagId: string
  price: number
  basePrice: number
  image: string
  colorId: string
  sizeId: string
  updated: string
}
