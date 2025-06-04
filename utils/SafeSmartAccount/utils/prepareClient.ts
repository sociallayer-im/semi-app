import { createPublicClient, http, type Chain } from "viem"
import { createBundlerClient, createPaymasterClient, entryPoint07Address } from "viem/account-abstraction"
import { BUNDLER_URL, RPC_URL, PAYMASTER_URL } from "../../config"
import { createSmartAccountClient } from "permissionless";
import { erc7579Actions } from "permissionless/actions/erc7579";
import { createPimlicoClient } from "permissionless/clients/pimlico";
import type { ToSafeSmartAccountReturnType } from "permissionless/accounts";

export const prepareClient = async (chain: Chain, safeAccount?: ToSafeSmartAccountReturnType) => {
    const bundlerUrl = BUNDLER_URL[chain.id]
    if (!bundlerUrl) {
        console.log('Unsupported chain: ', chain)
        throw new Error(`Unsupported chain: ${chain.name}`)
    }

    const publicClient = createPublicClient({
        chain,
        transport: http(RPC_URL[chain.id]),
    })

    let paymasterClient = undefined

    if (PAYMASTER_URL[chain.id]) {
        paymasterClient = createPaymasterClient({
            transport: http(PAYMASTER_URL[chain.id]),
        })
    }

    let smartAccountClient = undefined
    if (safeAccount) {
        const pimlicoClient = createPimlicoClient({
            transport: http(bundlerUrl),
            chain: chain,
            entryPoint: {
                address: entryPoint07Address,
                version: "0.7",
            },
        })

        // if (PAYMASTER_URL[chain.id]) {
        //     paymasterClient = createPimlicoClient({
        //         transport: http(PAYMASTER_URL[chain.id]),
        //         chain: chain,
        //         entryPoint: {
        //             address: entryPoint07Address,
        //             version: "0.7",
        //         },
        //     })
        // }

        smartAccountClient = createSmartAccountClient({
            account: safeAccount,
            chain,
            bundlerTransport: http(bundlerUrl),
            paymaster: pimlicoClient,
            userOperation: {
                estimateFeesPerGas: async () => {
                    return (await pimlicoClient.getUserOperationGasPrice()).fast;
                },
            },
        }).extend(erc7579Actions())
    }

    return {
        publicClient,
        smartAccountClient,
    }
}