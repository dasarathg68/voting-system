const BACKEND_URL = import.meta.env.VITE_BACKEND_ENDPOINT
export interface IAuthAPI {
  verifyPayloadAndGetToken(payload: any, methodDetails: any): Promise<void>
}

export class AuthAPI {}

export class SiweAuthAPI implements IAuthAPI {
  async verifyPayloadAndGetToken(payload: any, methodDetails: any): Promise<void> {
    // Make a call to an API endpoint
    const response = await fetch(`${BACKEND_URL}/api/auth/${methodDetails}`, {
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
  }
}
