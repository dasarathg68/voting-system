import type { ISiweMessageCreator } from '@/adapters/siweMessageCreatorAdapter'
import type { IWeb3Library } from '@/adapters/web3LibraryAdapter'
import type { IAuthAPI } from '@/apis/authApi'
import { AuthAPI } from '@/apis/authApi'

// Define a generic type for credentials
type AuthCredentials<T> = T | undefined | {}

// Define an interface for AuthService
interface IAuthService<T> {
  authenticateUser(credentials: AuthCredentials<T>): Promise<string>
}

//Class providing default implementations for auth service

// Implement SIWE authentication
export class SIWEAuthService<T> implements IAuthService<T> {
  private messageCreator: ISiweMessageCreator
  private web3Library: IWeb3Library

  constructor(messageCreator: ISiweMessageCreator, web3Library: IWeb3Library, authAPI: IAuthAPI) {
    this.messageCreator = messageCreator
    this.web3Library = web3Library
  }

  async authenticateUser(): Promise<string> {
    // Authentication logic of SIWE authentication
    const message = await this.messageCreator.create()
    const signature = await this.web3Library.requestSign(message)
    const payload = { signature, message }
    const response = await fetch(`http://localhost:3000/auth/siwe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const resObj = await response.json()

    if (!resObj.success) {
      throw new Error(resObj.message)
    }
    return resObj.accessToken
  }
}
