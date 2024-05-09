const BACKEND_URL = import.meta.env.VITE_BACKEND_ENDPOINT

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
