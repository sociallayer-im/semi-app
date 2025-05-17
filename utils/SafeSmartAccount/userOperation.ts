import type { Address, Chain } from "viem"

import { getSafeSmartAccount, prepareClient } from "./utils"
import { erc20Abi, parseEther } from "viem"


export interface TransferOptions {
    to: Address
    amount: string,
    erc20TokenAddress?: Address
    privateKey: `0x${string}`
    chain: Chain
}

export const transfer = async ({ to, amount, privateKey, chain }: TransferOptions) => {
    const smartAccount = await getSafeSmartAccount(privateKey, chain)

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

    const hash = await bundlerClient.sendUserOperation({
        account: smartAccount,
        calls: [tx],
        maxFeePerGas: gas.callGasLimit,
        maxPriorityFeePerGas: gas.preVerificationGas,
        preVerificationGas: gas.preVerificationGas,
        verificationGasLimit: gas.verificationGasLimit,
    })

    console.log('[userOperation hash]:', hash)

    const receipt = await bundlerClient.waitForUserOperationReceipt({ hash })

    return receipt
}

export const transferErc20 = async ({ to, amount, privateKey, chain, erc20TokenAddress }: TransferOptions) => {
    if (!erc20TokenAddress) {
        throw new Error('erc20TokenAddress is required')
    }

    const smartAccount = await getSafeSmartAccount(privateKey, chain)

    const { publicClient, bundlerClient } = await prepareClient(chain)


    const decimals = await publicClient.readContract({
        address: erc20TokenAddress,
        abi: erc20Abi,
        functionName: 'decimals',
    })

    const amountWithDecimals = BigInt(amount) * BigInt(10 ** decimals)

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

    const hash = await bundlerClient.sendUserOperation({
        account: smartAccount,
        calls: [tx],
        maxFeePerGas: gas.callGasLimit,
        maxPriorityFeePerGas: gas.preVerificationGas,
        preVerificationGas: gas.preVerificationGas,
        verificationGasLimit: gas.verificationGasLimit,
    })

    console.log('[userOperation hash]:', hash)

    const receipt = await bundlerClient.waitForUserOperationReceipt({ hash })

    return receipt
}