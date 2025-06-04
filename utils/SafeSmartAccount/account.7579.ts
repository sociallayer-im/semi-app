import { toSafeSmartAccount } from 'permissionless/accounts'
import { predictSafeSmartAccountAddress } from './utils'
import { privateKeyToAccount } from 'viem/accounts'
import { type Chain } from 'viem/chains'
import { http, createPublicClient, type Address } from 'viem'
import { V1_4_1_DEPLOYMENTS } from '../config'
import { entryPoint07Address } from 'viem/account-abstraction'
import { RPC_URL } from '../config'


export const getAccountConfig = (chain: Chain) => {
    const deployment = V1_4_1_DEPLOYMENTS[chain.id]
    if (!deployment) throw new Error(`Deployment for chain ${chain.name} not found`)

    const client = createPublicClient({
        chain,
        transport: http(RPC_URL[chain.id]),
    })

    return {
        client,
        version: "1.4.1",
        entryPoint: {
            address: entryPoint07Address,
            version: "0.7"
        },
        safe4337ModuleAddress: deployment.safe_7579_module,
        erc7579LaunchpadAddress: deployment.erc7579_launchpad,
        attesters: ['0xA4C777199658a41688E9488c4EcbD7a2925Cc23A'] as `0x${string}`[],
        attestersThreshold: 1,
        saltNonce: BigInt(0)
    } as const
}


export const getErc7579SafeAccount = async (privateKey: `0x${string}`, chain: Chain) => {
    const deployment = V1_4_1_DEPLOYMENTS[chain.id]
    if (!deployment) throw new Error(`Deployment for chain ${chain.name} not found`)

    const account = await toSafeSmartAccount({
        ...getAccountConfig(chain),
        owners: [privateKeyToAccount(privateKey)],
    })

    return account
}

export const predictErc7579SafeAccountAddress = async ({
    owner,
    chain
}: {
    owner: Address
    chain: Chain
}): Promise<Address> => {

    const deployment = V1_4_1_DEPLOYMENTS[chain.id]
    if (!deployment) throw new Error(`Deployment for chain ${chain.name} not found`)

    const address = await predictSafeSmartAccountAddress({
        owners: [owner],
        ...getAccountConfig(chain),
    })
    return address
}