import { toSafeSmartAccount } from 'permissionless/accounts'
import { privateKeyToAccount } from 'viem/accounts'
import { type Chain } from 'viem/chains'
import { type PublicClient, hexToBigInt, http, createPublicClient, zeroAddress, encodePacked, concatHex, keccak256, getContractAddress, type Hex, type Address, encodeFunctionData } from 'viem'
import { V1_4_1_DEPLOYMENTS, BUNDLER_URL } from './config'
import { createBundlerClient } from 'viem/account-abstraction'
import { erc20Abi } from 'viem'

type InternalTx = {
    to: Address
    data: `0x${string}`
    value: bigint
    operation: 0 | 1
}

export const getSafeSmartAccount = async (privateKey: `0x${string}`, chain: Chain) => {
    const owner = privateKeyToAccount(privateKey)

    const client = createPublicClient({
        chain,
        transport: http(),
    })

    const account = toSafeSmartAccount({
        client,
        owners: [owner],
        version: '1.4.1'
    })

    return account
}

export const generateApproveCallData = (paymasterAddress: Address) => {
    return encodeFunctionData({
        abi: erc20Abi,
        functionName: "approve",
        args: [
            paymasterAddress,
            0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
        ],
    })
};

export const encodeInternalTransaction = (tx: InternalTx): string => {
    const encoded = encodePacked(
        ['uint8', 'address', 'uint256', 'uint256', 'bytes'],
        [tx.operation, tx.to, tx.value, BigInt(tx.data.slice(2).length / 2), tx.data],
    )
    return encoded.slice(2)
}

export const encodeMultiSend = (txs: InternalTx[]): `0x${string}` => {
    const data: `0x${string}` = `0x${txs.map((tx) => encodeInternalTransaction(tx)).join('')}`

    return encodeFunctionData({
        abi: [
            {
                inputs: [{ internalType: 'bytes', name: 'transactions', type: 'bytes' }],
                name: 'multiSend',
                outputs: [],
                stateMutability: 'payable',
                type: 'function'
            }
        ],
        functionName: 'multiSend',
        args: [data]
    })
}

export const enableModuleCallData = (chain: Chain) => {
    const chainName = chain.name
    const deployment = V1_4_1_DEPLOYMENTS[chainName]
    if (!deployment) throw new Error(`Deployment for chain ${chainName} not found`)

    return encodeFunctionData({
        abi: [
            {
                inputs: [
                    {
                        internalType: 'address[]',
                        name: 'modules',
                        type: 'address[]'
                    }
                ],
                name: 'enableModules',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function'
            }
        ],
        functionName: 'enableModules',
        args: [[deployment.safe_4337_module]]
    })
}

export const getInitializerCode = async ({
    owner,
    chain,
    paymasterAddress,
    erc20TokenAddress
}: {
    owner: Address
    chain: Chain
    paymasterAddress: Address,
    erc20TokenAddress: Address
}) => {
    const deployment = V1_4_1_DEPLOYMENTS[chain.name]
    if (!deployment) throw new Error(`Deployment for chain ${chain.name} not found`)

    const setupTxs: InternalTx[] = [
        {
            to: deployment.add_module_lib,
            data: enableModuleCallData(chain),
            value: 0n,
            operation: 1 // 1 = DelegateCall required for enabling the module
        },
    ]

    if (erc20TokenAddress != zeroAddress && paymasterAddress != zeroAddress) {
        setupTxs.push({
            to: erc20TokenAddress,
            data: generateApproveCallData(paymasterAddress),
            value: 0n,
            operation: 0 // 0 = Call
        })
    }

    const multiSendCallData = encodeMultiSend(setupTxs)

    return encodeFunctionData({
        abi: [
            {
                inputs: [
                    {
                        internalType: 'address[]',
                        name: '_owners',
                        type: 'address[]'
                    },
                    {
                        internalType: 'uint256',
                        name: '_threshold',
                        type: 'uint256'
                    },
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address'
                    },
                    {
                        internalType: 'bytes',
                        name: 'data',
                        type: 'bytes'
                    },
                    {
                        internalType: 'address',
                        name: 'fallbackHandler',
                        type: 'address'
                    },
                    {
                        internalType: 'address',
                        name: 'paymentToken',
                        type: 'address'
                    },
                    {
                        internalType: 'uint256',
                        name: 'payment',
                        type: 'uint256'
                    },
                    {
                        internalType: 'address payable',
                        name: 'paymentReceiver',
                        type: 'address'
                    },
                ],
                name: 'setup',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function'
            }
        ],
        functionName: 'setup',
        args: [[owner], 1n, deployment.multi_send, multiSendCallData, deployment.safe_4337_module, zeroAddress, 0n, zeroAddress]
    })
}

export const getAccountInitCode = async ({
    owner,
    chain,
    saltNonce = 0n,
    erc20TokenAddress = zeroAddress,
    paymasterAddress = zeroAddress
}: {
    owner: Address
    chain: Chain
    saltNonce?: bigint
    erc20TokenAddress?: Address
    paymasterAddress?: Address
}): Promise<Hex> => {
    if (!owner) throw new Error('Owner account not found')

    const deployment = V1_4_1_DEPLOYMENTS[chain.name]
    if (!deployment) throw new Error(`Deployment for chain ${chain.name} not found`)

    const initializer = await getInitializerCode({
        owner,
        chain,
        erc20TokenAddress,
        paymasterAddress
    })

    const initCodeCallData = encodeFunctionData({
        abi: [
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: '_singleton',
                        type: 'address'
                    },
                    {
                        internalType: 'bytes',
                        name: 'initializer',
                        type: 'bytes'
                    },
                    {
                        internalType: 'uint256',
                        name: 'saltNonce',
                        type: 'uint256'
                    },
                ],
                name: 'createProxyWithNonce',
                outputs: [
                    {
                        internalType: 'contract SafeProxy',
                        name: 'proxy',
                        type: 'address'
                    },
                ],
                stateMutability: 'nonpayable',
                type: 'function'
            }
        ],
        functionName: 'createProxyWithNonce',
        args: [deployment.safe, initializer, saltNonce]
    })

    return concatHex([deployment.safe_proxy_factory, initCodeCallData])
}

export const predictSafeSmartAccountAddress = async ({
    client,
    owner,
    saltNonce = 0n,
    chain,
    erc20TokenAddress,
    paymasterAddress
}: {
    client: PublicClient
    owner: Address
    chain: Chain
    saltNonce?: bigint
    erc20TokenAddress: Address
    paymasterAddress: Address
}): Promise<Address> => {

    const deployment = V1_4_1_DEPLOYMENTS[chain.name]
    if (!deployment) throw new Error(`Deployment for chain ${chain.name} not found`)

    const proxyCreationCode = await client.readContract({
        abi: [
            {
                inputs: [],
                name: 'proxyCreationCode',
                outputs: [
                    {
                        internalType: 'bytes',
                        name: '',
                        type: 'bytes'
                    }
                ],
                stateMutability: 'pure',
                type: 'function'
            }
        ],
        address: deployment.safe_proxy_factory,
        functionName: 'proxyCreationCode'
    })

    const deploymentCode = encodePacked(
        ['bytes', 'uint256'],
        [proxyCreationCode, hexToBigInt(deployment.safe)]
    )

    const initializer = await getInitializerCode({
        owner,
        chain,
        erc20TokenAddress,
        paymasterAddress
    })

    const salt = keccak256(encodePacked(['bytes32', 'uint256'], [keccak256(encodePacked(['bytes'], [initializer])), saltNonce]))

    return getContractAddress({
        from: deployment.safe_proxy_factory,
        salt,
        bytecode: deploymentCode,
        opcode: 'CREATE2'
    })
}

export const prepareClient = async (chain: Chain) => {
    const bundlerUrl = BUNDLER_URL[chain.name]
    if (!bundlerUrl) {
        throw new Error(`Unsupported chain: ${chain.id}`)
    }
    
    const publicClient = createPublicClient({
        chain,
        transport: http(),
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
