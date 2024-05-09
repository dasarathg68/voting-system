import { BrowserProvider, ethers } from 'ethers'
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
  async function connectWallet() {
    try {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!')
      }

      const { ethereum } = window
      if (!ethereum) {
        alert('Please install MetaMask to use this feature')
      }
      provider = new BrowserProvider(window.ethereum!)
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

  async function checkNetwork() {
    if (provider) {
      const networkId = await provider.getNetwork()
      console.log('the chainID ', networkId.chainId)
      if (networkId.chainId != import.meta.env.VITE_CURRENT_NETWORK_ID) {
        alert(` please make sure you're connected to  ${import.meta.env.VITE_CURRENT_NETWORK_NAME}`)
        throw new Error(" please make sure you're connected to sepolia network")
      }
    }
  }

  // TODO: make this function receiving the nonce instead of fetching it
  /*
       WHY: SOLID principle :
       - Single Responsibility Principle: A function should have one and only one reason to change, meaning that a function should have only one job.
       And here if the API change the function need to be changed. This is not good
       */
  async function createSiweMessage(address: string, statement: string) {
    const domain = window.location.host
    const origin = window.location.origin

    // TODO: remove this ts-ignore
    //console.log('the layer8 ========= ', layer8)
    //const res = await fetch(`${endpoint}/nonce`)
    //const nonce = await res.text()
    //console.log('' + nonce)

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
  //   async function createSiweMessage(address: string, statement: string) {
  //     const requiredChainId = 11155111;  // Example for Ethereum Mainnet
  //     const currentChainId = await getCurrentChainId();

  //     if (currentChainId !== requiredChainId) {
  //         throw new Error(`Please switch to Sepolia network `);
  //     }

  //     const domain = window.location.host;
  //     const origin = window.location.origin;

  //     const message = new SiweMessage({
  //         domain,
  //         address,
  //         statement,
  //         uri: origin,
  //         version: '1',
  //         chainId: requiredChainId,  // Use the validated chainId
  //     });

  //     return message.prepareMessage();
  // }

  // TODO : make this function only sign the message and not send it to the backend
  // TODO : Create a function that verify the signature by calling the backend and receiving a the signature
  async function signInWithEthereum() {
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
    if (window.ethereum) {
      provider = new BrowserProvider(window.ethereum)
    }
    intervalId = setInterval(async () => {
      try {
        if (window.ethereum && provider) {
          const accounts = await window.ethereum.request({
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
