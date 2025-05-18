import { toSafeSmartAccount } from 'permissionless/accounts'
import { predictSafeSmartAccountAddress } from './utils'
import { privateKeyToAccount } from 'viem/accounts'
import { type Chain } from 'viem/chains'
import { http, createPublicClient, type Address } from 'viem'
import { V1_4_1_DEPLOYMENTS } from './config'
import { entryPoint07Address } from 'viem/account-abstraction'

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
        entryPoint: {
            address: entryPoint07Address,
            version: "0.7"
        },
        owners: [owner],
        version: "1.4.1",
        safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
        safeSingletonAddress: '0x41675C099F32341bf84BFc5382aF534df5C7461a',
        multiSendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
        multiSendCallOnlyAddress: '0x9641d764fc13c8B624c04430C7356C1C7C8102e2'
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
        owners: [owner],
        version: '1.4.1',
        entryPoint: {
            address: entryPoint07Address,
            version: "0.7"
        },
        safeProxyFactoryAddress: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
        safeSingletonAddress: '0x41675C099F32341bf84BFc5382aF534df5C7461a',
        multiSendAddress: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
        multiSendCallOnlyAddress: '0x9641d764fc13c8B624c04430C7356C1C7C8102e2'
    })
    return address
}