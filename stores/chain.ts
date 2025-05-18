import { defineStore } from 'pinia'
import { sepolia, type Chain} from 'viem/chains'

export const useChainStore = defineStore('chain', {
    state: () => ({
        chain: sepolia as Chain,
    }),
    
    actions: {
        async switch(chain: Chain) {
            this.chain = chain
        }
    }
}) 