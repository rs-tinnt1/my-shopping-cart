import { db } from '@/core/plugins/firebase.plugin'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'

import { IInventoryDto } from '@/modules/inventory/dto'
import { IInventoryEntity } from '@/modules/inventory/entities'
import { IProductEntity } from '@/modules/product/entities'
import { ICartDto } from '../dto/cart.dto'
import { ICartDetailEntity, ICartEntity } from '../entities'

type TCreateUserCartProp = {
  cartId?: string
  userId: string
  inventoryId: string
  quantity: number
}

/** hadle create user cart,
 * if cartId is exist, then update cart
 */
const createUserCart = async ({ cartId, userId, inventoryId, quantity }: TCreateUserCartProp) => {
  if (cartId) {
    const docRef = doc(db, 'cart', cartId)
    const cartSnap = await getDoc(docRef)
    if (cartSnap.exists()) {
      const newCart = cartSnap.data() as ICartEntity
      const checkItem = newCart.cartDetails.findIndex((item) => item.inventoryId === inventoryId)
      if (checkItem === -1) {
        newCart.cartDetails.push({ inventoryId, quantity })
      } else {
        newCart.cartDetails[checkItem].quantity += quantity
      }
      updateDoc(docRef, { ...newCart })
    }
  }
  const newCartData = { userId, cartDetails: [{ inventoryId, quantity }] }
  await addDoc(collection(db, 'cart'), {
    ...newCartData
  })
}

type TGetCartByUserIdProp = {
  userId: string
}

/** handle order product in user cart */
const getCartByUserId = async ({ userId }: TGetCartByUserIdProp) => {
  const q = query(collection(db, 'cart'), where('userId', '==', userId))
  const docSnap = await getDocs(q)
  if (docSnap.docs.length > 0) {
    const cart = {
      ...(docSnap.docs[0].data() as ICartEntity),
      cartId: docSnap.docs[0].id
    }

    const cartDetails: IInventoryDto[] = []
    // loop through cart details
    const promises = docSnap.docs[0].data().cartDetails.map(async (item: ICartDetailEntity) => {
      // get inventory data to get quantity
      const inventorySnap = await getDoc(doc(db, 'inventory', item.inventoryId))
      // get product data from productId
      const productSnap = await getDoc(doc(db, 'product', inventorySnap?.data()?.productId ?? ''))
      const { productId, colorId, sizeId } = inventorySnap.data() as IInventoryEntity
      const { title, description, categoryId, tagId, image, price, basePrice } =
        productSnap.data() as IProductEntity

      // create cart details data
      const data: IInventoryDto = {
        productId,
        colorId,
        sizeId,
        quantity: item.quantity,
        title,
        description,
        categoryId,
        tagId,
        image,
        price,
        basePrice,
        updated: inventorySnap.data()?.updated.toString() ?? '',
        inventoryId: item.inventoryId
      }
      cartDetails.push(data)
    })
    await Promise.all(promises)

    const res: ICartDto = { ...cart, cartDetails }
    return res
  }
}

export const cartServices = {
  createUserCart,
  getCartByUserId
}
