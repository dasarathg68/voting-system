import {
  BrowserProvider
  // ethers
} from 'ethers'
import { SiweMessage } from 'siwe'
import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Interface for the useWallet composable
export interface WalletType {
  connectWallet: () => Promise<void>

  isConnected: Ref<boolean>

  provider: BrowserProvider | undefined

  signInWithEthereum: () => Promise<string | undefined>

  signer: any

  userAddress: any
}

export function useWallet(): WalletType {
  const userAddress = ref()
  const isConnected = ref(false)
  let provider: BrowserProvider | undefined
  let signer: any
  const endpoint = import.meta.env.VITE_BACKEND_ENDPOINT
  let intervalId: string | number | NodeJS.Timeout | undefined

  /**
   * This function connects the user's MetaMask wallet to the app.
   * It uses the window.ethereum.request method to connect the wallet.
   */
  const connectWallet = async () => {
    try {
      if (typeof (window as any).ethereum !== 'undefined') {
        console.log('MetaMask is installed!')
      }

      const { ethereum } = window as any
      if (!ethereum) {
        alert('Please install MetaMask to use this feature')
      }
      provider = new BrowserProvider(ethereum)
      await checkNetwork()
      if (provider) {
        signer = await provider.getSigner()
        userAddress.value = await signer.getAddress()
      }
    } catch (error) {
      console.log('Error: ', error)
    }
    // return { provider, signer }
  }

  const checkNetwork = async () => {
    if (provider) {
      const networkId = await provider.getNetwork()
      console.log('the chainID ', networkId.chainId)
      console.log(networkId, import.meta.env.VITE_CURRENT_NETWORK_ID)
      if (networkId.chainId.toString() != import.meta.env.VITE_CURRENT_NETWORK_ID) {
        alert(` please make sure you're connected to  ${import.meta.env.VITE_CURRENT_NETWORK_NAME}`)
        throw new Error(" please make sure you're connected to sepolia network")
      }
    }
  }

  const createSiweMessage = async (address: string, statement: string) => {
    const domain = window.location.host
    const origin = window.location.origin

    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: import.meta.env.VITE_CURRENT_NETWORK_ID
      //nonce: nonce
    })
    return message.prepareMessage()
  }

  // TODO : make this function only sign the message and not send it to the backend
  // TODO : Create a function that verify the signature by calling the backend and receiving a the signature
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

      // Send the signature to the backend
      const res = await fetch(`${endpoint}/siwe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ signature, message })
      })

      if (!res.ok) {
        console.error(`Failed in getInformation: ${res.statusText}`)
        return
      }
      const { token } = await res.json()
      value = token
    } catch (e) {
      console.log('here', e)
    }
    return value
  }

  // Example usage:

  /**
   * This is a Vue lifecycle hook that is called when the component is mounted.
   * We use it to check if the user is connected to MetaMask.
   * If they are, we set the userAddress and isConnected variables.
   * We also set up a setInterval to check if the user is still connected.
   * If they are not, we set the userAddress and isConnected variables to their default values.
   */
  onMounted(async () => {
    console.log('mounted')
    if ((window as any).ethereum) {
      provider = new BrowserProvider((window as any).ethereum)
    }
    intervalId = setInterval(async () => {
      try {
        if ((window as any).ethereum && provider) {
          const accounts = await (window as any).ethereum.request({
            method: 'eth_accounts'
          })
          isConnected.value = accounts.length > 0
          userAddress.value = accounts.pop()
          if (isConnected.value) {
            // This throws an error if the user is not connected
            signer = await provider.getSigner()
            userAddress.value = await signer.getAddress()
          } else {
            signer = undefined
          }
        } else {
          isConnected.value = false
        }
      } catch (e) {
        console.log(e)
      }
    }, 1000)
  })

  /**
   * This is a Vue lifecycle hook that is called when the component is unmounted.
   * We use it to clear the interval that we set up in the onMounted hook.
   */
  onBeforeUnmount(() => {
    if (intervalId) clearInterval(intervalId)
  })
  return {
    connectWallet,
    isConnected,
    provider,
    signInWithEthereum,
    signer,
    userAddress
  }
}
