import { IInventoryDto } from '../../inventory/dto/inventory.dto'
import { ICartDetailEntity } from '../entities/cart.entity'

export interface ICartDto {
  cartId: string
  userId: string
  cartDetails: IInventoryDto[]
}

export interface ICartCreateDto {
  userId: string
  cartDetails: ICartDetailEntity[]
}
