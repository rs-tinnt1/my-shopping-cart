export interface IProductDto {
  id: string
  title: string
  description: string
  categoryId: string
  tagId: string
  price: number
  basePrice?: number
  image: string
  colors: { colorId: string }[]
  sizes: { sizeId: string }[]
}
