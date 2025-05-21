import type { Address, Chain } from "viem"

import { prepareClient } from "./utils/prepareClient"
import { getSafeAccount } from "./account"
import { erc20Abi, parseEther } from "viem"
import { BUNDLER_URL } from "./config"


export interface TransferOptions {
    to: Address
    amount: string
    erc20TokenAddress?: Address
    privateKey: `0x${string}`
    chain: Chain
}

interface GasPrice {
    maxFeePerGas: bigint
    maxPriorityFeePerGas: bigint
}

const getGasParameters = async (chain: Chain, smartAccount: any, tx: any, bundlerClient: any) => {
    if (chain.id !== 10) return null

    const gasPrice = await pimlicoGetUserOperationGasPrice(chain)
    console.log('[Gas Price]:', {
        maxFeePerGas: gasPrice.maxFeePerGas.toString(),
        maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas.toString()
    })

    const gas = await bundlerClient.estimateUserOperationGas({
        account: smartAccount,
        calls: [tx],
        maxFeePerGas: gasPrice.maxFeePerGas,
        maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
    })
    console.log('[Gas Estimate]:', {
        preVerificationGas: gas.preVerificationGas.toString(),
        verificationGasLimit: gas.verificationGasLimit.toString()
    })

    return {
        maxFeePerGas: gasPrice.maxFeePerGas,
        maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
        preVerificationGas: gas.preVerificationGas,
        verificationGasLimit: gas.verificationGasLimit,
    }
}

const executeUserOperation = async (params: any, bundlerClient: any) => {
    try {
        const hash = await bundlerClient.sendUserOperation(params)
        console.log('[UserOperation Hash]:', hash)
        
        const receipt = await bundlerClient.waitForUserOperationReceipt({ hash })
        console.log('[UserOperation Receipt]:', receipt)
        
        return receipt
    } catch (error: unknown) {
        console.error('[UserOperation Error]:', error)
        throw new Error(`Failed to execute user operation: ${error instanceof Error ? error.message : String(error)}`)
    }
}

export const transfer = async ({ to, amount, privateKey, chain }: TransferOptions) => {
    const smartAccount = await getSafeAccount(privateKey, chain)
    const { bundlerClient } = await prepareClient(chain)

    const tx = {
        to,
        value: parseEther(amount)
    } as const

    const params = {
        account: smartAccount,
        calls: [tx],
    }

    const gasParams = await getGasParameters(chain, smartAccount, tx, bundlerClient)
    if (gasParams) {
        Object.assign(params, gasParams)
    }

    return executeUserOperation(params, bundlerClient)
}

export const transferErc20 = async ({ to, amount, privateKey, chain, erc20TokenAddress }: TransferOptions) => {
    if (!erc20TokenAddress) {
        throw new Error('ERC20 token address is required')
    }

    const smartAccount = await getSafeAccount(privateKey, chain)
    const { publicClient, bundlerClient } = await prepareClient(chain)

    const decimals = await publicClient.readContract({
        address: erc20TokenAddress,
        abi: erc20Abi,
        functionName: 'decimals',
    })

    const amountWithDecimals = BigInt(Number(amount) * 10 ** decimals)

    const tx = {
        abi: erc20Abi,
        functionName: 'transfer',
        args: [to, amountWithDecimals],
        to: erc20TokenAddress,
    } as const

    const params = {
        account: smartAccount,
        calls: [tx],
    }

    const gasParams = await getGasParameters(chain, smartAccount, tx, bundlerClient)
    if (gasParams) {
        Object.assign(params, gasParams)
    }

    return executeUserOperation(params, bundlerClient)
}

export const pimlicoGetUserOperationGasPrice = async (chain: Chain): Promise<GasPrice> => {
    try {
        const response = await fetch(`${BUNDLER_URL[chain.id]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "pimlico_getUserOperationGasPrice",
                params: [],
                id: 1
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.error) {
            throw new Error(`RPC error: ${data.error.message}`)
        }

        return {
            maxFeePerGas: BigInt(data.result.standard.maxFeePerGas),
            maxPriorityFeePerGas: BigInt(data.result.standard.maxPriorityFeePerGas),
        }
    } catch (error: unknown) {
        console.error('[Gas Price Error]:', error)
        throw new Error(`Failed to get gas price: ${error instanceof Error ? error.message : String(error)}`)
    }
}