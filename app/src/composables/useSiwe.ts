import { FetchUserAPI } from '@/apis/userApi'
import { SiweAuthAPI } from '@/apis/authApi'
import { EthersJsAdapter } from '@/adapters/web3LibraryAdapter'
import { SLSiweMessageCreator } from '@/adapters/siweMessageCreatorAdapter'
import { SIWEAuthService } from '@/services/authService'
import router from '@/router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import type { User } from '@/types'

const fetchUserApi = new FetchUserAPI()
const ethersJsAdapter = EthersJsAdapter.getInstance() //new EthersJsAdapter()
const siweAuthApi = new SiweAuthAPI()

const isProcessing = ref(false)

function createSiweMessageCreator(address: string, statement: string, nonce: string | undefined) {
  return new SLSiweMessageCreator({
    address,
    statement,
    nonce,
    version: '1',
    chainId: '1'
  })
}

async function siwe() {
  try {
    isProcessing.value = true
    const address = await ethersJsAdapter.getAddress()
    const nonce = await fetchUserApi.getNonce(address)
    const statement = 'Sign in with Ethereum to the app.'
    const siweMessageCreator = createSiweMessageCreator(address, statement, nonce)
    const siweAuthService = new SIWEAuthService(siweMessageCreator, ethersJsAdapter, siweAuthApi)
    await siweAuthService.authenticateUser()
    // router.push('/teams')
  } catch (error) {
    isProcessing.value = false
    console.log('[app][src][utils][loginUtil.ts][signInWithEthereum] Error', error)
  }
}

export function useSiwe() {
  // const { showToast, type: toastType, message: toastMessage } = storeToRefs(toastStore)

  return { isProcessing, siwe }
}
