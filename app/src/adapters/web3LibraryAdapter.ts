import { BrowserProvider /*, Signer */ } from 'ethers'

// Define interface for web3 library
export interface IWeb3Library {
  initialize(): void
  connectWallet(): Promise<void>
  requestSign(message: string): Promise<string>
  //getAddressRef(): Promise<Ref<string | null>>
  getAddress(): Promise<string>
}

// Adapter for ethers.js
export class EthersJsAdapter implements IWeb3Library {
  private static instance: IWeb3Library | undefined
  private provider: any

  private signer: any

  initialize(): void {
    // Initialize provider
    if ('ethereum' in window) {
      this.provider = new BrowserProvider(window.ethereum as any)
      ;(window.ethereum as any).on('accountsChanged', async (/*accounts: string[]*/) => {
        this.signer = await this.provider.getSigner()
      })
    }
  }

  async connectWallet(): Promise<void> {
    if (!this.provider) {
      this.initialize()
    }

    // Prompt user to connect their wallet
    await this.provider.send('eth_requestAccounts', [])

    // Get signer with connected wallet
    this.signer = this.provider.getSigner()
  }

  async requestSign(message: string): Promise<string> {
    if (!this.signer) {
      await this.connectWallet()
    }

    const signature = (await this.signer).signMessage(message)

    return signature
  }

  async getAddress() {
    if (!this.signer) {
      await this.connectWallet()
    }

    return (await this.signer).address
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new EthersJsAdapter()
    }

    return this.instance
  }
}
