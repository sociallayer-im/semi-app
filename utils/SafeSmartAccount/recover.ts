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
    toFunctionSelector,
    type Address,
    type Hex
} from "viem";
import { baseSepolia } from "viem/chains";
import { readContract } from "wagmi/actions";
import axios from "axios";
import { buildPoseidon } from "circomlibjs";
import { prepareClient } from "./utils/prepareClient";
import { ZKEMAIL_RELAYER_API, ZKEMAIL_RECOVERY_MODULE, V1_4_1_DEPLOYMENTS, BUNDLER_URL } from "../config";
import { universalEmailRecoveryModuleAbi } from "./utils/abis/UniversalEmailRecoveryModule";
import { isModuleEnabled } from "./operation";
import { z } from "zod";


export const checkAccountContractDeployed = async (safeAccount: ToSafeSmartAccountReturnType, chain: Chain) => {
    const { publicClient } = await prepareClient(chain, safeAccount)
    const code = await publicClient.getCode({
        address: safeAccount.address,
    })
    return !!code
}

export interface EnableZkEmailModuleParams {
    safeAccount: ToSafeSmartAccountReturnType
    chain: Chain
    accountDeployed: boolean
    guardianEmail: string
}

export const enableZkEmailModule = async ({
    safeAccount,
    chain,
    accountDeployed,
    guardianEmail
}: EnableZkEmailModuleParams) => {
    const { smartAccountClient } = await prepareClient(chain, safeAccount)
    const poseidon = await buildPoseidon();
    const accountCodeBytes: Uint8Array = poseidon.F.random();
    const accountCode = bytesToHex(accountCodeBytes.reverse());
    const guardianAddress = await computeGuardianAddress(safeAccount, chain, accountCode, guardianEmail)
    console.log('[setup recover]: accountCode', accountCode)
    console.log('[setup recover]: accountCode old', '0x214db98fe750d8edf612e6035ab47087588f45a25cb4e983768e78b8c97b6305')
    console.log('[setup recover]: guardianAddress', guardianAddress)

    const zkemailModule = ZKEMAIL_RECOVERY_MODULE[chain.id]
    if (!zkemailModule) {
        throw new Error('ZKEMAIL_RECOVERY_MODULE is not defined for this chain');
    }

    if (accountDeployed) {
        const isModuleInstalled = await smartAccountClient!.isModuleInstalled({
            address: zkemailModule,
            type: "executor",
            context: toHex(0),
        });
        console.log('[setup recover]: isModuleInstalled', isModuleInstalled)

        if (isModuleInstalled) {
            console.log("[setup recover]: ZK-Email module already installed");
            return {
                accountCode,
                guardianAddress,
                guardianEmail,
                zkemailModule,
                userOpHash: null,
                receipt: null,
            }
        }
    }

    console.log('[setup recover]: ZK-Email module not installed, installing...')
    const validator = safeAccount.address;
    const isInstalledContext = toHex(0);
    const functionSelector = toFunctionSelector(
        "swapOwner(address,address,address)"
    );
    const guardians = [guardianAddress];
    const guardianWeights = [1n];
    const threshold = 1n;
    const delay = 6n * 60n * 60n; // no delay, execute immediately
    const expiry = 1n * 7n * 24n * 60n * 60n; // 1 weeks in seconds to expire

    const moduleData = encodeAbiParameters(
        [
            { name: "validator", type: "address" },
            { name: "isInstalledContext", type: "bytes" },
            { name: "initialSelector", type: "bytes4" },
            { name: "guardians", type: "address[]" },
            { name: "weights", type: "uint256[]" },
            { name: "delay", type: "uint256" },
            { name: "expiry", type: "uint256" },
            { name: "threshold", type: "uint256" },
        ],
        [
            validator,
            isInstalledContext,
            functionSelector,
            guardians,
            guardianWeights,
            threshold,
            delay,
            expiry,
        ]
    );

    const userOpHash = await smartAccountClient!.installModule({
        type: "executor",
        address: zkemailModule,
        context: moduleData,
        account: safeAccount,
    });
    console.log("[setup recover]: install module userOpHash", userOpHash);

    const receipt = await smartAccountClient!.waitForUserOperationReceipt({
        hash: userOpHash,
    });
    console.log("[setup recover]: install module transactionHash", receipt.receipt.transactionHash);

    return {
        accountCode,
        guardianAddress,
        guardianEmail,
        zkemailModule,
        userOpHash,
        receipt,
    }
}

export const handleAcceptance = async ({ safeAccount, chain, accountCode, guardianEmail}: { safeAccount: ToSafeSmartAccountReturnType, chain: Chain, accountCode: Hex, guardianEmail: string }) => {
    const { publicClient } = await prepareClient(chain, safeAccount)

    const acceptanceCommandTemplates = await publicClient.readContract({
        abi: universalEmailRecoveryModuleAbi,
        address: ZKEMAIL_RECOVERY_MODULE[chain.id],
        functionName: "acceptanceCommandTemplates",
        args: [],
    });

    const templateIdx = 0;
    const handleAcceptanceCommand = acceptanceCommandTemplates[0]
        ?.join()
        .replaceAll(",", " ")
        .replace("{ethAddr}", safeAccount.address);

    const handleAcceptanceResponse = await axios({
        method: "POST",
        url: `${ZKEMAIL_RELAYER_API[chain.id]}/acceptanceRequest`,
        data: {
            controller_eth_addr: ZKEMAIL_RECOVERY_MODULE[chain.id],
            guardian_email_addr: guardianEmail,
            account_code: accountCode.slice(2),
            template_idx: templateIdx,
            command: handleAcceptanceCommand,
        },
    });

    console.log("[setup recover]: Request status:", handleAcceptanceResponse.status);
    if (handleAcceptanceResponse.status === 200) {
        const HandleAcceptanceResponseSchema = z.object({
            request_id: z.number(),
            command_params: z.array(z.object({ EthAddr: z.string() })),
        });

        const { request_id: handleAcceptanceRequestId } =
            HandleAcceptanceResponseSchema.parse(handleAcceptanceResponse.data);
        console.log("[setup recover]: Request ID:", handleAcceptanceRequestId);
        return handleAcceptanceRequestId
    } else {
        throw new Error(`Failed to handle acceptance: ${handleAcceptanceResponse.data.error}`)
    }
};

export const computeGuardianAddress = async (
    safeAccount: ToSafeSmartAccountReturnType,
    chain: Chain,
    accountCode: Hex,
    guardianEmail: string
) => {
    const { publicClient } = await prepareClient(chain, safeAccount)
    const getAccountSaltResponse = await axios({
        method: "POST",
        url: `${ZKEMAIL_RELAYER_API[chain.id]}/getAccountSalt`,
        data: {
            account_code: accountCode.slice(2),
            email_addr: guardianEmail,
        },
    });
    const guardianSalt = z.custom<`0x${string}`>().parse(
        getAccountSaltResponse.data
    )

    // The guardian address is generated by sending the user's account address and guardian salt to the computeEmailAuthAddress function
    return await publicClient.readContract({
        abi: universalEmailRecoveryModuleAbi,
        address: ZKEMAIL_RECOVERY_MODULE[chain.id],
        functionName: "computeEmailAuthAddress",
        args: [safeAccount.address, guardianSalt],
    });
};