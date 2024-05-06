import { defineStore } from 'pinia'
import { auth } from '@/config/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import router from '@/router'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    async signup(email: string, password: string) {
      console.log(email, password)
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        if (user) {
          console.log('User created')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async loginWithGoogle() {
      try {
        const provider = new GoogleAuthProvider()
        const user = await signInWithPopup(auth, provider)
        if (user) {
          console.log('User logged in')
          console.log(getAdditionalUserInfo(user))
          router.push('/ballots')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async loginWithEmail(email: string, password: string) {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        if (user) {
          console.log('User logged in')
          router.push('/ballots')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async logout() {
      try {
        await signOut(auth)
        router.push('/login')
        console.log('User logged out')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
