// userStore.js
import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { IAccountEntity, IUserEntity } from '../entities'
import { userServices } from '../services'

type TUserState = {
  userData: IUserEntity | null
  accountData: IAccountEntity | null
}

export const useUserStore = defineStore('user', {
  state: (): TUserState => ({
    userData: null,
    accountData: null
  }),
  actions: {
    setUserData(data: IUserEntity) {
      this.userData = data
    },
    logout() {
      const router = useRouter()
      this.userData = null
      this.accountData = null
      router.push('/login')
    },
    async login(email: string, password: string) {
      const router = useRouter()
      try {
        const res = await userServices.login({ email, password })
        if (res.status == 200 && res.data) {
          this.userData = res.data.user
          this.accountData = res.data.account
          message.success(res.message)
          router.push('/')
          return
        }
        message.error('Login failed! Plese try again!')
      } catch {
        message.error('Login failed! Plese try again!')
      }
    },
    async register(email: string, password: string, name: string) {
      const router = useRouter()
      try {
        const res = await userServices.register({ email, password, name })
        if (res.status == 200 && res.data) {
          message.success(res.message)
          router.push('/login')
          return
        }
        message.error('Register failed! Plese try again!')
      } catch {
        message.error('Register failed! Plese try again!')
      }
    }
  }
})
