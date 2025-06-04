import { defineStore } from 'pinia'
import { sepolia, optimism, baseSepolia, type Chain} from 'viem/chains'

export const useChainStore = defineStore('chain', {
    state: () => ({
        chain: baseSepolia as Chain,
    }),
    
    actions: {
        async switch(chain: Chain) {
            this.chain = chain
        }
    }
}) 