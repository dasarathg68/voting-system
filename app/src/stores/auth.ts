import { defineStore } from 'pinia'
import { auth } from '@/config/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'
import router from '@/router'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      isAuthenticated: Boolean(localStorage.getItem('isAuthenticated') || false),
      user: JSON.parse(localStorage.getItem('user') || '{}')
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
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('user', JSON.stringify(user.user))
          this.isAuthenticated = true
          this.user = user.user
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
          localStorage.setItem('isAuthenticated', 'true')

          this.isAuthenticated = true
          router.push('/ballots')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async logout() {
      try {
        await signOut(auth)
        this.isAuthenticated = false
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')
        this.user = {}
        router.push('/login')
        console.log('User logged out')
      } catch (error) {
        console.log(error)
      }
    },
    async forgotPassword(email: string) {
      try {
        await sendPasswordResetEmail(auth, email)
        console.log('Password reset email sent')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
