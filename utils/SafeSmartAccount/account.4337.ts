import { toSafeSmartAccount } from 'permissionless/accounts'
import { predictSafeSmartAccountAddress } from './utils'
import { privateKeyToAccount } from 'viem/accounts'
import { type Chain } from 'viem/chains'
import { http, createPublicClient, type Address } from 'viem'
import { V1_4_1_DEPLOYMENTS } from '../config'
import { entryPoint07Address } from 'viem/account-abstraction'
import { RPC_URL } from '../config'

export const getErc4337SafeAccount = async (privateKey: `0x${string}`, chain: Chain) => {
    const deployment = V1_4_1_DEPLOYMENTS[chain.id]
    if (!deployment) throw new Error(`Deployment for chain ${chain.name} not found`)

    const owner = privateKeyToAccount(privateKey)

    const client = createPublicClient({
        chain,
        transport: http(RPC_URL[chain.id]),
    })

    const account = await toSafeSmartAccount({
        client,
        entryPoint: {
            address: entryPoint07Address,
            version: "0.7"
        },
        owners: [owner],
        version: "1.4.1",
        safeProxyFactoryAddress: deployment.safe_proxy_factory,
        safeSingletonAddress: deployment.safe,
        multiSendAddress: deployment.multi_send,
        multiSendCallOnlyAddress: deployment.multi_send_call_only
    })

    return account
}

export const predictErc4337SafeAccountAddress = async ({
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
        transport: http(RPC_URL[chain.id]),
    })

    const address = await predictSafeSmartAccountAddress({
        client,
        owners: [owner],
        version: '1.4.1',
        entryPoint: {
            address: entryPoint07Address,
            version: "0.7"
        },
        safeProxyFactoryAddress: deployment.safe_proxy_factory,
        safeSingletonAddress: deployment.safe,
        multiSendAddress: deployment.multi_send,
        multiSendCallOnlyAddress: deployment.multi_send_call_only
    })
    return address
}