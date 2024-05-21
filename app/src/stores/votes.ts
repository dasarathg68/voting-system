import { defineStore } from 'pinia'

import { ethers } from 'ethers'
import ABI from '@/abi/Voting.json'
import { useToastStore } from './toast'
import { ToastType } from '@/types'
import { wallet } from '@/utils/wallet'

const VOTING_CONTRACT_ADDRESS = '0x78448dBD0Ed87f3259c3694679F8F1d0978f91f8'

// Create a new instance of the contract
let provider: ethers.BrowserProvider | undefined
let contract: ethers.Contract

// Define the store
export const useVotingStore = defineStore('voting', {
  state: () => ({
    contract: null as ethers.Contract | null,
    createBallotLoading: false as boolean,
    // pushTipLoading: false as boolean,
    isWalletConnected: false as boolean,
    balance: '0' as string
  }),

  actions: {
    async createBallot(
      name: string,
      startTime: number,
      endTime: number,
      candidatesList: string[],
      votersList: string[]
    ): Promise<void> {
      provider = wallet.provider

      if (provider) {
        contract = new ethers.Contract(VOTING_CONTRACT_ADDRESS, ABI, await provider.getSigner())
        this.createBallotLoading = true
        try {
          const tx = await contract.createBallot(
            name,
            startTime,
            endTime,
            candidatesList,
            votersList
          )
          await tx.wait()
          useToastStore().show(ToastType.Success, 'Ballot created successfully')
        } catch (error) {
          console.log(error)
          useToastStore().show(ToastType.Error, 'Error creating ballot')
        }
      }
    },

    async getBallots(): Promise<string[]> {
      provider = wallet.provider
      if (provider) {
        contract = new ethers.Contract(VOTING_CONTRACT_ADDRESS, ABI, await provider.getSigner())
        const res = await contract.getBallots()
        return []
      }
      return []
    },
    async vote(ballotName: string, candidate: string, voter: string): Promise<void> {
      provider = wallet.provider
      if (provider) {
        contract = new ethers.Contract(VOTING_CONTRACT_ADDRESS, ABI, await provider.getSigner())
        try {
          const tx = await contract.vote(ballotName, candidate, voter)
          await tx.wait()
          useToastStore().show(ToastType.Success, 'Vote submitted successfully')
        } catch (error) {
          console.log(error)
          useToastStore().show(ToastType.Error, 'Error submitting vote')
        }
      }
    },
    async getCandidateList(ballotIndex: number): Promise<string[]> {
      provider = wallet.provider
      if (provider) {
        contract = new ethers.Contract(VOTING_CONTRACT_ADDRESS, ABI, await provider.getSigner())
        const res = await contract.getCandidateList(ballotIndex)
        return []
      }
      return []
    },
    async getVoteCount(ballotName: string, candidate: string): Promise<number> {
      provider = wallet.provider
      if (provider) {
        contract = new ethers.Contract(VOTING_CONTRACT_ADDRESS, ABI, await provider.getSigner())
        const res = await contract.getVoteCount(ballotName, candidate)
        return res
      }
      return 0
    }
  }
})

//     async getBallotCount(): Promise<number> {
//       // ... implementation here ...
//     }
//   }
