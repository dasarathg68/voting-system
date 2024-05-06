import { defineStore } from 'pinia'
import { auth } from '@/config/firebaseConfig'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      email: '',
      password: ''
    }
  },
  actions: {
    async signup() {
      try {
        const user = await auth.createUserWithEmailAndPassword(this.email, this.password)
        if (user) {
          console.log('User created')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async login() {
      try {
        const user = await auth.signInWithEmailAndPassword(this.email, this.password)
        if (user) {
          console.log('User logged in')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async logout() {
      try {
        await auth.signOut()
        console.log('User logged out')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
