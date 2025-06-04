import { createSmartAccountClient } from "permissionless";
import { entryPoint07Address } from "viem/account-abstraction";
import { toSafeSmartAccount, type ToSafeSmartAccountReturnType } from "permissionless/accounts";
import { erc7579Actions } from "permissionless/actions/erc7579";
import {
    createPublicClient,
    encodeAbiParameters,
    encodeFunctionData,
    http,
    keccak256,
    parseAbiParameters,
    bytesToHex,
    toHex,
    type Chain,
    zeroAddress,
} from "viem";
import { baseSepolia } from "viem/chains";
import { readContract } from "wagmi/actions";
import axios from "axios";
import { buildPoseidon } from "circomlibjs";
import { prepareClient } from "./utils/prepareClient";
import { ZKEMAIL_RELAYER_API, ZKEMAIL_RECOVERY_MODULE, V1_4_1_DEPLOYMENTS, BUNDLER_URL } from "../config";
import { universalEmailRecoveryModuleAbi } from "./utils/abis/UniversalEmailRecoveryModule";
import { isModuleEnabled } from "./operation";

export const setupRecover = async (safeAccount: ToSafeSmartAccountReturnType,  chain: Chain, guardianEmail: string) => {
    const { publicClient, smartAccountClient } = await prepareClient(chain, safeAccount)

    const accountCode = await publicClient.getCode({
        address: safeAccount.address,
    })

    if (!accountCode) {
        throw new Error('Safe account is not deployed')
    }
    console.log('[safe account deployed]:', true)
    
    const is7579Module = await isModuleEnabled(chain, V1_4_1_DEPLOYMENTS[chain.id].safe_7579_module,safeAccount.address);
    if (!is7579Module) {
        throw new Error('7579 module is not installed')
    }
    console.log('[Is 7579 Module Enabled]:', true)

    
    // if (!await isModuleEnabled(chain, V1_4_1_DEPLOYMENTS[chain.id].safe_7579_module, privateKey)) {
    //     console.log('[setup recover]: 7579 module is not enabled, enabling it....')
    //     await enableModule(chain, V1_4_1_DEPLOYMENTS[chain.id].safe_7579_module, privateKey)
    //     console.log('[setup recover]: 7579 fallback handler is not enabled, enabling it....')
    //     await setFallbackHandler(chain, V1_4_1_DEPLOYMENTS[chain.id].safe_7579_module, privateKey)
    // }
    
    // const { publicClient, bundlerClient, smartAccountClient } = await prepareClient(chain, safeAccount)
    
    // console.log('[smart account]', safeAccount.address)

    // const poseidon = await buildPoseidon();
    // const accountCodeBytes: Uint8Array = poseidon.F.random();
    // const accountCode = bytesToHex(accountCodeBytes.reverse());

    

    // if (!ZKEMAIL_RELAYER_API[chain.id]) {
    //     throw new Error('ZKEMAIL_RELAYER_API is not defined for this chain');
    // }
    // if (!ZKEMAIL_RECOVERY_MODULE[chain.id]) {
    //     throw new Error('ZKEMAIL_RECOVERY_MODULE is not defined for this chain');
    // }

    // const fetchsalt = await fetch(`${ZKEMAIL_RELAYER_API[chain.id]}/getAccountSalt`, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({
    //         account_code: accountCode.slice(2),
    //         email_addr: guardianEmail,
    //     })
    // })

    // if (!fetchsalt.ok) {
    //     throw new Error('Failed to fetch salt');
    // }

    // const guardianSalt = await fetchsalt.text() as `0x${string}`;

    // const guardianAddr = await publicClient.readContract({
    //     abi: universalEmailRecoveryModuleAbi,
    //     address: ZKEMAIL_RECOVERY_MODULE[chain.id],
    //     functionName: "computeEmailAuthAddress",
    //     args: [safeAccount.address, guardianSalt],
    // });

    // console.log('[guardian address]:', guardianAddr)

    // const bytecode = await publicClient.getCode({
    //     address: V1_4_1_DEPLOYMENTS[chain.id].safe,
    // });

    
    // if (bytecode) {
    //     console.log('[has bytecode]:', true)
    //     const isModuleInstalled = await smartAccountClient!.isModuleInstalled({
    //         type: "executor",
    //         address: ZKEMAIL_RECOVERY_MODULE[chain.id],
    //         context: toHex(0),
    //     } as any);

    //     console.log('[isModuleInstalled]:', isModuleInstalled)
        
    //     if (isModuleInstalled) {
    //         console.log("[Install module]: Module already installed");
    //         return;
    //     }
    // }
}