export interface ICartDetailEntity {
  inventoryId: string
  quantity: number
}

export interface ICartEntity {
  cartId: string
  userId: string
  cartDetails: ICartDetailEntity[]
}
