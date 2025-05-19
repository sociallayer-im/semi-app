export interface TokenMetadata {
    name: string
    symbol: string
    address: string
    icon: string
    decimals: number
}

export interface PopularTokenList {
    [chainId: number]: TokenMetadata[]
}

export const POPULAR_ERC20_TOKENS: PopularTokenList = {
    10: [],
    11155111:  [
        {
            name: 'USDC',
            symbol: 'USDC',
            address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
            decimals: 6,
            icon: 'https://ik.imagekit.io/soladata/57yobknk_WoLp8Wvot'
        },
    ]
}