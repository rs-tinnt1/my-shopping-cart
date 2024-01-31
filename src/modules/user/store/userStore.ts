// userStore.js
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
      try {
        const res = await userServices.login({ email, password })
        if (res.status == 200 && res.data) {
          this.userData = res.data.user
          this.accountData = res.data.account
          return true
        }

        return false
      } catch {
        return false
      }
    },
    async register(email: string, password: string, name: string) {
      try {
        const res = await userServices.register({ email, password, name })
        if (res.status == 200 && res.data) {
          return true
        }
        return false
      } catch {
        return false
      }
    }
  }
})
