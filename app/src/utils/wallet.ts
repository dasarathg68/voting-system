import { BrowserProvider } from 'ethers'
import { SiweMessage } from 'siwe'

class Wallet {
  provider?: BrowserProvider
  signer?: any
  userAddress?: any
  isConnected = false

  constructor() {
    this.provider = new BrowserProvider((window as any).ethereum)
  }

  async connectWallet() {
    try {
      const { ethereum } = window as any
      if (!ethereum) {
        alert('Please install MetaMask to use this feature')
        return
      }
      try {
        this.provider = new BrowserProvider(ethereum)
      } catch (error) {
        console.error('Error creating BrowserProvider:', error)
        return
      }
      await this.checkNetwork()
      if (this.provider) {
        this.signer = await this.provider.getSigner()
        this.userAddress = await this.signer.getAddress()
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  async checkNetwork() {
    if (this.provider) {
      const networkId = await this.provider.getNetwork()

      // console.log('the chainID ', networkId.chainId)
      // console.log(networkId, import.meta.env.VITE_CURRENT_NETWORK_ID)
      if (networkId.chainId.toString() != import.meta.env.VITE_CURRENT_NETWORK_ID) {
        alert(` please make sure you're connected to  ${import.meta.env.VITE_CURRENT_NETWORK_NAME}`)
        throw new Error(" please make sure you're connected to sepolia network")
      }
    }
  }

  async createSiweMessage(address: string, statement: string) {
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
}

export const wallet = new Wallet()
