// import { defineStore } from 'pinia'

// import { ethers } from 'ethers'
// import ABI from '@/abi/Voting.json'

// // Define the ABI

// // console.log(ABI)
// // Define the contract address
// const VOTING_CONTRACT_ADDRESS = '0x78448dBD0Ed87f3259c3694679F8F1d0978f91f8'

// // Create a new instance of the contract
// let provider: ethers.BrowserProvider
// let contract: ethers.Contract

// // Define the store
// export const useVotingStore = defineStore('voting', {
//   state: () => ({
//     contract: null as ethers.Contract | null,
//     sendTipLoading: false as boolean,
//     pushTipLoading: false as boolean,
//     isWalletConnected: false as boolean,
//     balance: '0' as string
//   }),

//   actions: {
//     async connectWallet() {
//       if (this.isWalletConnected) return
//       if (!(window as any).ethereum) {
//         // show(ToastType.Info, 'Please install Metamask')
//         return
//       }
//       provider = new ethers.BrowserProvider((window as any).ethereum)

//       const ret = await provider.send('eth_requestAccounts', [])
//       console.log(ret)
//       //   console.log(VOTING_CONTRACT_ADDRESS)
//       this.contract = new ethers.Contract(VOTING_CONTRACT_ADDRESS, ABI, await provider.getSigner())
//       this.isWalletConnected = true
//     },

//     async createBallot(
//       name: string,
//       startTime: number,
//       endTime: number,
//       candidatesList: string[],
//       votersList: string[]
//     ): Promise<void> {
//       // ... implementation here ...
//     },

//     async getBallots(): Promise<string[]> {
//       // ... implementation here ...
//     },

//     async vote(ballotName: string, candidate: string, voter: string): Promise<void> {
//       // ... implementation here ...
//     },

//     async getCandidateList(ballotIndex: number): Promise<string[]> {
//       // ... implementation here ...
//     },

//     async getVoteCount(ballotName: string, candidate: string): Promise<number> {
//       // ... implementation here ...
//     },

//     async getBallotCount(): Promise<number> {
//       // ... implementation here ...
//     }
//   }
// })
