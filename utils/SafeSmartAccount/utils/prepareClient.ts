import { createPublicClient, http, type Chain } from "viem"
import { createBundlerClient, createPaymasterClient } from "viem/account-abstraction"
import { BUNDLER_URL, RPC_URL, PAYMASTER_URL } from "../../config"

export const prepareClient = async (chain: Chain, sponsorFee: boolean) => {
    const bundlerUrl = BUNDLER_URL[chain.id]
    if (!bundlerUrl) {
        console.log('Unsupported chain: ', chain)
        throw new Error(`Unsupported chain: ${chain.name}`)
    }

    console.log('[Sponsor Fee]:', sponsorFee)
    const publicClient = createPublicClient({
        chain,
        transport: http(RPC_URL[chain.id]),
    })

    let paymasterClient = undefined

    if (PAYMASTER_URL[chain.id] && sponsorFee) {
        paymasterClient = createPaymasterClient({
            transport: http(PAYMASTER_URL[chain.id])
        })
    }

    const bundlerClient = createBundlerClient({
        chain,
        transport: http(bundlerUrl),
        paymaster: paymasterClient,
    })

    return {
        publicClient,
        bundlerClient,
    }
}