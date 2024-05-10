import { ref } from 'vue'
import { auth } from '@/config/firebaseConfig'
import router from '@/router'
import { useWallet } from '@/composables/useWallet'
const { connectWallet, isConnected, provider, signer, userAddress, createSiweMessage } = useWallet()
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'

export function useAuth() {
  const isAuthenticated = ref(Boolean(localStorage.getItem('isAuthenticated') || false))
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

  async function signup(email: string, password: string) {
    // console.log(email, password)
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      if (user) {
        console.log('User created')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const signInWithEthereum = async () => {
    // Connect the wallet if it is not connected

    let value
    try {
      if (!isConnected.value) {
        console.log('the user is connected ==================')
        await connectWallet()
      }
      // Check if we have the signer and the provider
      if (!signer || !provider) {
        throw new Error('No signer or provider')
      }
      // Create the message
      const message = await createSiweMessage(
        userAddress.value,
        'Sign in with Ethereum to the app.'
      )
      // Sign the message
      const signature = await signer.signMessage(message)

      //   // Send the signature to the backend
      //   const res = await fetch(`${endpoint}/siwe`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ signature, message })
      //   })

      //   if (!res.ok) {
      //     console.error(`Failed in getInformation: ${res.statusText}`)
      //     return
      //   }
      //   const { token } = await res.json()
      //   value = token
    } catch (e) {
      console.log('here', e)
    }

    return value
  }
  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      const user1 = await signInWithPopup(auth, provider)
      if (user1) {
        console.log('User logged in')
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify(user1.user))
        isAuthenticated.value = true
        user.value = user1.user
        // console.log(getAdditionalUserInfo(user1))
        console.log(user.value)
        router.push('/ballots')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function loginWithEmail(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (user) {
        console.log('User logged in')
        localStorage.setItem('isAuthenticated', 'true')
        isAuthenticated.value = true
        router.push('/ballots')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      isAuthenticated.value = false
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      user.value = {}
      console.log(user.value)
      router.push('/login')
      console.log('User logged out')
    } catch (error) {
      console.log(error)
    }
  }

  async function forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email)
      console.log('Password reset email sent')
    } catch (error) {
      console.log(error)
    }
  }

  return {
    isAuthenticated,
    user,
    signup,
    loginWithGoogle,
    loginWithEmail,
    logout,
    forgotPassword,
    signInWithEthereum
  }
}
