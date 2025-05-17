import { toSafeSmartAccount } from 'permissionless/accounts'
import { predictSafeSmartAccountAddress, toSafeSmartAccount as toSafeSmartAccount2 } from './utils'
import { privateKeyToAccount } from 'viem/accounts'
import { type Chain } from 'viem/chains'
import { http, createPublicClient, zeroAddress, type Address } from 'viem'
import { V1_4_1_DEPLOYMENTS, BUNDLER_URL } from './config'
import { createBundlerClient } from 'viem/account-abstraction'

export const getSafeAccount = async (privateKey: `0x${string}`, chain: Chain) => {
    const deployment = V1_4_1_DEPLOYMENTS[chain.id]
    if (!deployment) throw new Error(`Deployment for chain ${chain.name} not found`)

    const owner = privateKeyToAccount(privateKey)

    const client = createPublicClient({
        chain,
        transport: http(),
    })

    const account = await toSafeSmartAccount({
        client,
        threshold: 1n,
        owners: [owner],
        version: '1.4.1'
    })

    return account
}

export const predictSafeAccountAddress = async ({
    owner,
    chain
}: {
    owner: Address
    chain: Chain
}): Promise<Address> => {

    const deployment = V1_4_1_DEPLOYMENTS[chain.id]
    if (!deployment) throw new Error(`Deployment for chain ${chain.name} not found`)

    const client = createPublicClient({
        chain,
        transport: http(),
    })

    const address = await predictSafeSmartAccountAddress({
        client,
        threshold: 1n,
        owners: [owner],
        version: '1.4.1'
    })
    return address

}