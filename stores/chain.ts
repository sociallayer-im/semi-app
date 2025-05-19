import { defineStore } from 'pinia'
import { sepolia, optimism, type Chain} from 'viem/chains'

export const useChainStore = defineStore('chain', {
    state: () => ({
        chain: optimism as Chain,
    }),
    
    actions: {
        async switch(chain: Chain) {
            this.chain = chain
        }
    }
}) 