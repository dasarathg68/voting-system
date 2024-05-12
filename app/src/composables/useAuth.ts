import { ref } from 'vue'
import { auth } from '@/config/firebaseConfig'
import router from '@/router'
import { wallet } from '@/utils/wallet'
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'
const isAuthenticated = ref(Boolean(localStorage.getItem('isAuthenticated') || false))
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
export function useAuth() {
  async function signup(email: string, password: string) {
    // console.log(email, password)
    const user = await createUserWithEmailAndPassword(auth, email, password)
    if (user) {
      console.log('User created')
    } else {
      throw new Error('User not created')
    }
  }
  const signInWithEthereum = async () => {
    // Connect the wallet if it is not connected

    let value
    if (!wallet.isConnected) {
      console.log('the user is connected ==================')
      await wallet.connectWallet()
    }
    // Check if we have the signer and the provider
    console.log(wallet.signer, wallet.provider)
    if (!wallet.signer || !wallet.provider) {
      throw new Error('No signer or provider')
    }
    // Create the message
    const message = await wallet.createSiweMessage(
      wallet.userAddress,
      'Sign in with Ethereum to the app.'
    )
    // Sign the message
    const signature = await wallet.signer.signMessage(message)
    isAuthenticated.value = true

    router.push('/ballots')

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

    return value
  }
  async function loginWithGoogle() {
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
    } else {
      throw new Error('User not found')
    }
  }

  async function loginWithEmail(email: string, password: string) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    if (user) {
      console.log('User logged in')
      localStorage.setItem('isAuthenticated', 'true')
      isAuthenticated.value = true

      router.push('/ballots')
    } else {
      throw new Error('User not found')
    }
  }

  async function logout() {
    await signOut(auth)
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    user.value = {}
    console.log(user.value)
    router.push('/login')
    console.log('User logged out')
  }

  async function forgotPassword(email: string) {
    await sendPasswordResetEmail(auth, email)
    console.log('Password reset email sent')
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
