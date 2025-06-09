import { defineStore } from 'pinia'
import { sepolia, optimism, mainnet, type Chain} from 'viem/chains'

const STORAGE_KEY = 'semit-selected-chain'

interface ChainWithIcon extends Chain {
    icon: string
}

// 创建链的映射表
export const chainMap: Record<number, ChainWithIcon> = {
    [optimism.id]: {
        ...optimism,
        icon: '/images/op_logo.svg'
    },
    [mainnet.id]: {
        ...mainnet,
        icon: '/images/eth_logo.png'
    },
    [sepolia.id]: {
        ...sepolia,
        icon: '/images/eth_logo.png'
    },
}

export const useChainStore = defineStore('chain', {
    state: () => {
        // 从 localStorage 读取保存的链 ID
        const savedChainId = localStorage.getItem(STORAGE_KEY)
        // 默认链为 Optimism
        const defaultChain = chainMap[10]
        return {
            chain: savedChainId && chainMap[Number(savedChainId)] 
                ? chainMap[Number(savedChainId)] 
                : defaultChain as ChainWithIcon,
        }
    },
    
    actions: {
        async switch(chainId: number) {
            this.chain = chainMap[chainId]
            // 只保存链的 ID
            localStorage.setItem(STORAGE_KEY, chainId.toString())
        }
    }
}) 