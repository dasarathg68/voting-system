const BACKEND_URL = 'http://localhost:3000'
// Define a generic type for user data
import { type User, ToastType } from '@/types/index'

// Define an interface for UserService

// Implement UserService using Fetch API (or any other HTTP client)
export class FetchUserAPI {
  async getNonce(userId: string): Promise<string> {
    const response = await fetch(`${BACKEND_URL}/user/nonce/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const resObj = await response.json()

    if (resObj.success) {
      const { nonce } = resObj
      return nonce
    } else {
      throw new Error(resObj.message)
    }
  }
}
