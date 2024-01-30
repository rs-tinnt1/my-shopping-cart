import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

import { db } from '@/core/plugins'
import { IProductEntity } from '@/modules/product/entities'
import { IInventoryDto } from '../dto'
import { IInventoryEntity } from '../entities'

/** handle get inventory by productId */
const getInventoryByProductId = async (productId: string) => {
  const snapshot = await getDocs(
    query(collection(db, 'inventory'), where('productId', '==', productId))
  )
  const data: IInventoryDto[] = []
  const productSnap = await getDoc(doc(db, 'product', productId.toString()))

  const promises = snapshot.docs.map(async (inventory) => {
    const { productId, colorId, sizeId, quantity, updated } = inventory.data() as IInventoryEntity
    const { categoryId, tagId, price, basePrice, image, title, description } =
      productSnap.data() as IProductEntity
    data.push({
      inventoryId: inventory.id,
      productId,
      colorId,
      sizeId,
      quantity,
      updated,
      categoryId,
      tagId,
      price,
      basePrice,
      image,
      title,
      description
    } as IInventoryDto)
    return ''
  })
  await Promise.all(promises)

  return { data, total: 0, message: 'Success', status: 200 }
}

export const inventoryServices = {
  getInventoryByProductId
}
