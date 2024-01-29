export class ProductEntity {
  title: string
  description: string
  categoryId: string
  tagId: string
  price: number
  basePrice: number
  image: string
  colors: { colorId: string }[]
  sizes: { sizeId: string }[]
  updated: string

  constructor(
    title: string,
    description: string,
    categoryId: string,
    tagId: string,
    price: number,
    basePrice: number,
    image: string,
    colors: { colorId: string }[],
    sizes: { sizeId: string }[],
    updated?: string
  ) {
    this.title = title
    this.description = description
    this.categoryId = categoryId
    this.tagId = tagId
    this.price = price
    this.basePrice = basePrice
    this.image = image
    this.colors = colors
    this.sizes = sizes
    this.updated = updated ?? new Date().toISOString()
  }
}
