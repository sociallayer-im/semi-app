import { createPublicClient, http, type Chain } from "viem"
import { createBundlerClient } from "viem/account-abstraction"
import { BUNDLER_URL, RPC_URL } from "../config"

export const prepareClient = async (chain: Chain) => {
    const bundlerUrl = BUNDLER_URL[chain.id]
    if (!bundlerUrl) {
        console.log('Unsupported chain: ', chain)
        throw new Error(`Unsupported chain: ${chain.name}`)
    }

    const publicClient = createPublicClient({
        chain,
        transport: http(RPC_URL[chain.id]),
    })

    const bundlerClient = createBundlerClient({
        chain,
        transport: http(bundlerUrl)
    })

    return {
        publicClient,
        bundlerClient
    }
}