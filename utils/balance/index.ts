
import {createPublicClient, http, type Address, type Chain} from 'viem'
export async function getBalance(address: Address, chain: Chain) {
    const client = createPublicClient({
        chain,
        transport: http()
    })
    const balance = await client.getBalance({address})
    return balance
}