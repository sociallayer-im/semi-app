import type { Address, Chain } from "viem"

import { prepareClient } from "./utils/prepareClient"
import { getSafeAccount } from "./account"
import { erc20Abi, parseEther } from "viem"
import { BUNDLER_URL } from "./config"


export interface TransferOptions {
    to: Address
    amount: string,
    erc20TokenAddress?: Address
    privateKey: `0x${string}`
    chain: Chain
}

export const transfer = async ({ to, amount, privateKey, chain }: TransferOptions) => {
    const smartAccount = await getSafeAccount(privateKey, chain)

    const { bundlerClient } = await prepareClient(chain)

    const tx = {
        to,
        value: parseEther(amount)
    } as const

    const gas = await bundlerClient.estimateUserOperationGas({
        account: smartAccount,
        calls: [tx]
    })

    console.log('[gas]:', gas)

    let params: any = {
        account: smartAccount,
        calls: [tx],
    }

    if (chain.id === 10) {
        const gasPrice = await pimlicoGetUserOperationGasPrice(chain)
        console.log('[gasPrice]:', gasPrice)
        params = {
            ...params,
            maxFeePerGas: gasPrice.maxFeePerGas,
            maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
            preVerificationGas: gas.preVerificationGas,
            verificationGasLimit: gas.verificationGasLimit,
        }
    }

    const hash = await bundlerClient.sendUserOperation(params)

    console.log('[userOperation hash]:', hash)

    const receipt = await bundlerClient.waitForUserOperationReceipt({ hash })

    return receipt
}

export const transferErc20 = async ({ to, amount, privateKey, chain, erc20TokenAddress }: TransferOptions) => {
    if (!erc20TokenAddress) {
        throw new Error('erc20TokenAddress is required')
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

    const gas = await bundlerClient.estimateUserOperationGas({
        account: smartAccount,
        calls: [tx]
    })

    console.log('[gas]:', gas)

    let params: any = {
        account: smartAccount,
        calls: [tx],
    }

    if (chain.id === 10) {
        const gasPrice = await pimlicoGetUserOperationGasPrice(chain)
        console.log('[gasPrice]:', gasPrice)
        params = {
            ...params,
            maxFeePerGas: gasPrice.maxFeePerGas,
            maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
            preVerificationGas: gas.preVerificationGas,
            verificationGasLimit: gas.verificationGasLimit,
        }
    }

    const hash = await bundlerClient.sendUserOperation(params)

    console.log('[userOperation hash]:', hash)

    const receipt = await bundlerClient.waitForUserOperationReceipt({ hash })

    console.log('[userOperation receipt]:', receipt)

    return receipt
}

export const pimlicoGetUserOperationGasPrice = async (chain: Chain) => {
    const response = await fetch(`${BUNDLER_URL[chain.id]}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "pimlico_getUserOperationGasPrice",
            "params": [],
            "id": 1
        })
    })

    const data = await response.json()

    console.log('[pimlicoGetUserOperationGasPrice]:', data)

    return {
        maxFeePerGas: BigInt(data.result.standard.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(data.result.standard.maxPriorityFeePerGas),
    }
}