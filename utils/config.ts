import { Network } from "alchemy-sdk"
import type { Address } from "viem"

interface Deployment {
    [key: number]: {
        compatibility_fallback_handler: Address
        create_call: Address
        multi_send: Address
        multi_send_call_only: Address
        safe: Address
        safe_l2: Address
        safe_migration: Address
        safe_proxy_factory: Address
        safe_to_l2_migration: Address
        safe_to_l2_setup: Address
        sign_message_lib: Address
        simulate_tx_accessor: Address
        safe_4337_module: Address
        add_module_lib: Address
        safe_7579_module: Address
        erc7579_launchpad: Address
    }
}

export interface BundlerUrl {
    [key: number]: string
}

export interface RPCUrl {
    [key: number]: string
}

export interface PaymasterUrl {
    [key: number]: string | undefined
}

export interface ZkeemailApiUrl {
    [key: number]: string | undefined
}

export const SUPPORTED_CHAINS = [10] as const

export const V1_4_1_DEPLOYMENTS: Deployment = {
    // optimism
    10: {
        compatibility_fallback_handler: '0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99',
        create_call: '0x9b35Af71d77eaf8d7e40252370304687390A1A52',
        multi_send: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
        multi_send_call_only: '0x9641d764fc13c8B624c04430C7356C1C7C8102e2',
        safe: '0x41675C099F32341bf84BFc5382aF534df5C7461a',
        safe_l2: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
        safe_migration: '0x526643F69b81B008F46d95CD5ced5eC0edFFDaC6',
        safe_proxy_factory: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
        safe_to_l2_migration: '0xfF83F6335d8930cBad1c0D439A841f01888D9f69',
        safe_to_l2_setup: '0xBD89A1CE4DDe368FFAB0eC35506eEcE0b1fFdc54',
        sign_message_lib: '0xd53cd0aB83D845Ac265BE939c57F53AD838012c9',
        simulate_tx_accessor: '0x3d4BA2E0884aa488718476ca2FB8Efc291A46199',
        safe_4337_module: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
        add_module_lib: '0x8EcD4ec46D4D2a6B64fE960B3D64e8B94B2234eb',
        safe_7579_module: '0x7579EE8307284F293B1927136486880611F20002',
        erc7579_launchpad: '0x7579011aB74c46090561ea277Ba79D510c6C00ff',
    },
    
    // sepolia
    11155111: {
        compatibility_fallback_handler: '0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99',
        create_call: '0x9b35Af71d77eaf8d7e40252370304687390A1A52',
        multi_send: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
        multi_send_call_only: '0x9641d764fc13c8B624c04430C7356C1C7C8102e2',
        safe: '0x41675C099F32341bf84BFc5382aF534df5C7461a',
        safe_l2: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
        safe_migration: '0x526643F69b81B008F46d95CD5ced5eC0edFFDaC6',
        safe_proxy_factory: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
        safe_to_l2_migration: '0xfF83F6335d8930cBad1c0D439A841f01888D9f69',
        safe_to_l2_setup: '0xfF83F6335d8930cBad1c0D439A841f01888D9f69',
        sign_message_lib: '0xd53cd0aB83D845Ac265BE939c57F53AD838012c9',
        simulate_tx_accessor: '0x3d4BA2E0884aa488718476ca2FB8Efc291A46199',
        safe_4337_module: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
        add_module_lib: '0x8EcD4ec46D4D2a6B64fE960B3D64e8B94B2234eb',
        safe_7579_module: '0x7579EE8307284F293B1927136486880611F20002',
        erc7579_launchpad: '0x7579011aB74c46090561ea277Ba79D510c6C00ff',
    },
    // base sepolia
    84532: {
        compatibility_fallback_handler: '0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99',
        create_call: '0x9b35Af71d77eaf8d7e40252370304687390A1A52',
        multi_send: '0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526',
        multi_send_call_only: '0x9641d764fc13c8B624c04430C7356C1C7C8102e2',
        safe: '0x41675C099F32341bf84BFc5382aF534df5C7461a',
        safe_l2: '0x29fcB43b46531BcA003ddC8FCB67FFE91900C762',
        safe_migration: '0x526643F69b81B008F46d95CD5ced5eC0edFFDaC6',
        safe_proxy_factory: '0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67',
        safe_to_l2_migration: '0xfF83F6335d8930cBad1c0D439A841f01888D9f69',
        safe_to_l2_setup: '0xfF83F6335d8930cBad1c0D439A841f01888D9f69',
        sign_message_lib: '0xd53cd0aB83D845Ac265BE939c57F53AD838012c9',
        simulate_tx_accessor: '0x3d4BA2E0884aa488718476ca2FB8Efc291A46199',
        safe_4337_module: '0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226',
        add_module_lib: '0x8EcD4ec46D4D2a6B64fE960B3D64e8B94B2234eb',
        safe_7579_module: '0x7579EE8307284F293B1927136486880611F20002',
        erc7579_launchpad: '0x7579011aB74c46090561ea277Ba79D510c6C00ff',
    }
}

export const BUNDLER_URL: BundlerUrl = {
    10: import.meta.env.VITE_OP_BUNDLER_URL!,
    11155111: import.meta.env.VITE_SEPOLIA_BUNDLER_URL!,
    84532: import.meta.env.VITE_BASE_SEPOLIA_BUNDLER_URL!,
}

export const RPC_URL: RPCUrl = {
    10: `${import.meta.env.VITE_OP_RPC_URL!}/${import.meta.env.VITE_INFURA_API_KEY!}`,
    11155111: `${import.meta.env.VITE_SEPOLIA_RPC_URL!}/${import.meta.env.VITE_INFURA_API_KEY!}`,
    84532: `${import.meta.env.VITE_BASE_SEPOLIA_RPC_URL!}/${import.meta.env.VITE_INFURA_API_KEY!}`,
}

export const PAYMASTER_URL: PaymasterUrl = {
    10: import.meta.env.VITE_OP_PAYMASTER
}

// 网络映射配置
export const CHAIN_TO_NETWORK: Record<number, Network> = {
    10: Network.OPT_MAINNET,
    11155111: Network.ETH_SEPOLIA,
    84532: Network.BASE_SEPOLIA,
};

export const ZKEMAIL_RECOVERY_MODULE: Record<number, `0x${string}`> = {
    84532: '0x636632FA22052d2a4Fb6e3Bab84551B620b9C1F9',
}

export const ZKEMAIL_RELAYER_API: ZkeemailApiUrl = {
    84532: 'https://auth-base-sepolia-staging.prove.email/api',
}
