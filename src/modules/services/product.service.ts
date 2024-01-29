import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../core/plugins/firebase.plugin'
import { IProductDto } from '../dto/product.dto'

/** get product list by page, limit = 4
 * filter by categoryId and tagId
 * return { data: IProductDto[], total: number }
 */
const getProducts = async (page: number, categoryId?: string, tagId?: string) => {
  const lim = 4
  let q
  page = Number(page) || 1
  const start = (page - 1) * lim
  if (categoryId) {
    q = tagId
      ? query(
          collection(db, 'product'),
          where('categoryId', '==', categoryId),
          where('tagId', '==', tagId)
        )
      : query(collection(db, 'product'), where('categoryId', '==', categoryId))
  } else {
    q = query(collection(db, 'product'), orderBy('updated'))
  }
  const snapshot = await getDocs(q)

  if (snapshot.docs) {
    const total = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as IProductDto[]
    const data = total.slice(start, start + lim)
    return { data, total: total.length }
  } else {
    // docSnap.data() will be undefined in this case
    return { data: [], total: 0 }
  }
}

/** get product detail by id */
const getProductById = async (id: string) => {
  const docRef = doc(db, 'product', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as IProductDto
  } else {
    // docSnap.data() will be undefined in this case
    return null
  }
}

export const productServices = {
  getProducts,
  getProductById
}
