import { ICategory } from '@/modules/product/entities/category.entity'
import { IColor } from '@/modules/product/entities/color.entity'
import { ISize } from '@/modules/product/entities/size.entity'
import { ITag } from '@/modules/product/entities/tag.entity'

export const COLORS: IColor[] = [
  {
    color: 'BLACK',
    colorId: '#000000'
  },
  {
    color: 'WHITE',
    colorId: '#ffffff'
  },
  {
    color: 'GRAY',
    colorId: '#cccccc'
  },
  {
    color: 'PINK',
    colorId: '#fbeddb'
  },
  {
    color: 'NAVY',
    colorId: '#394762'
  }
]

export const CATEGORIES: ICategory[] = [
  {
    categoryId: 'men',
    category: 'Men'
  },
  {
    categoryId: 'women',
    category: 'Women'
  },
  {
    categoryId: 'kid',
    category: 'Kid'
  }
]

export const SIZES: ISize[] = [
  { size: 'XS', sizeId: 'sizeXS' },
  { size: 'S', sizeId: 'sizeS' },
  { size: 'M', sizeId: 'sizeM' },
  { size: 'L', sizeId: 'sizeL' },
  { size: 'XL', sizeId: 'sizeXL' },
  { size: 'XXL', sizeId: 'sizeXXL' }
]

export const TAGS: ITag[] = [
  {
    tagId: 'glass',
    tag: 'Kính mát'
  },
  {
    tagId: 'shirt',
    tag: 'Áo sơ mi'
  },
  {
    tagId: 'short',
    tag: 'Quần short'
  },
  {
    tagId: 'tanktop',
    tag: 'Áo ba lỗ'
  },
  {
    tagId: 'trouser',
    tag: 'Quần tây'
  },
  {
    tagId: 'tshirt',
    tag: 'Áo thun'
  }
]
