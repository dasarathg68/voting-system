const BACKEND_URL = 'http://localhost:3000'
export interface IAuthAPI {
  verifyPayloadAndGetToken(payload: any, methodDetails: any): Promise<string>
}

export class AuthAPI {}

export class SiweAuthAPI implements IAuthAPI {
  /*private httpClient: HttpClient;
  
    constructor(httpClient: HttpClient) {
      this.httpClient = httpClient;
    }*/

  async verifyPayloadAndGetToken(payload: any, methodDetails: any): Promise<string> {
    // Make a call to an API endpoint
    const response = await fetch(`${BACKEND_URL}/api/auth/${methodDetails}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const resObj = await response.json()

    if (resObj.success) {
      const { accessToken: token } = resObj // Assuming the response contains a token field
      return token
    } else {
      throw new Error(resObj.message)
    }
  }
}
