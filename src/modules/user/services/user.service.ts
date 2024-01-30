import sha256 from 'crypto-js/sha256'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'

import { db } from '@/core/plugins'
import { ICreateAccountDto, ICreateUserDto } from '../dto'
import { IAccountEntity, IUserEntity } from '../entities'

type TResponse<T> = {
  message: string
  status: number
  data?: T
}

type TLoginPayload = {
  email: string
  password: string
}

/** handle login account with email & password
 * return { user: IUserEntity, account: IAccountEntity }
 */
const login = async (
  user: TLoginPayload
): Promise<TResponse<{ user: IUserEntity; account: IAccountEntity }>> => {
  const { email, password } = user
  const accountRef = doc(db, 'account', email)
  const accountSnap = await getDoc(accountRef)
  if (accountSnap.exists() && accountSnap.data().password === sha256(password).toString()) {
    const userSnap = await getDoc(doc(db, 'user', accountSnap.data().userId))
    return {
      message: 'Login success!',
      data: {
        user: { ...userSnap.data(), userId: userSnap.id } as IUserEntity,
        account: { ...accountSnap.data(), email: accountSnap.id } as IAccountEntity
      },
      status: 200
    }
  }
  return { message: 'Login fail!', status: 401 }
}

type TRegisterPayload = {
  email: string
  name: string
  password: string
  address?: string
  phone?: string
}

/** handle create account in firestore */
const register = async ({ email, password, name, address, phone }: TRegisterPayload) => {
  try {
    const docRef = doc(db, 'users', email)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { message: 'Resource exited!', status: 409 }
    } else {
      const newUser: ICreateUserDto = {
        name,
        address: address ?? '',
        phone: phone ?? '',
        created: new Date().toISOString()
      }
      const newUserId = await addDoc(collection(db, 'user'), newUser)
      const newAccount: ICreateAccountDto = {
        roleId: 'j2OMw2Mwyy8qcrfiagoH',
        userId: newUserId.id,
        password: sha256(password).toString()
      }
      await setDoc(doc(db, 'account', email), newAccount)
      return {
        message: 'User created!',
        status: 200,
        data: { ...newAccount, email }
      }
    }
  } catch (e: any) {
    return { message: e.message, status: 500 }
  }
}

export const userServices = {
  login,
  register
}
