import type { Chain } from "viem"
import { parseSendActions, parseActionsFromAlchemyApi } from "./display"
import { Alchemy, Network, AssetTransfersCategory, SortingOrder } from "alchemy-sdk";
import { POPULAR_ERC20_TOKENS } from "./balance/tokens";

// 网络映射配置
const CHAIN_TO_NETWORK: Record<number, Network> = {
    1: Network.ETH_MAINNET,
    10: Network.OPT_MAINNET,
    11155111: Network.ETH_SEPOLIA,
};

// 获取 Alchemy 实例
const getAlchemyInstance = (chain: Chain): Alchemy => {
    const network = CHAIN_TO_NETWORK[chain.id];
    if (!network) {
        throw new Error(`Unsupported chain ID: ${chain.id}`);
    }

    return new Alchemy({
        apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
        network,
    });
};

// 获取资产转移记录
// docs: https://www.alchemy.com/docs/reference/getassettransfers-sdk-v3
const getAssetTransfers = async (
    alchemy: Alchemy,
    address: string,
    direction: 'from' | 'to',
    chain: Chain
) => {
    try {
        const contractAddresses = POPULAR_ERC20_TOKENS[chain.id].map((token) => token.address);
        console.log('[contractAddresses]:', contractAddresses);
        const category = [AssetTransfersCategory.ERC20, AssetTransfersCategory.EXTERNAL]
        if (chain.id !== 10) {
            // optimism do not support internal transfer history indexing in alchemy api
            category.push(AssetTransfersCategory.INTERNAL)
        }
        
        const params = {
            fromBlock: "0x0",
            excludeZeroValue: true,
            withMetadata: true,
            category,
            ...(direction === 'from' ? { fromAddress: address } : { toAddress: address }),
            contractAddresses,
            maxCount: 50,
            order: SortingOrder.DESCENDING,
        };

        const response = await alchemy.core.getAssetTransfers(params);
        console.log('[response]:', response);
        return response.transfers;
    } catch (error) {
        console.error('Error fetching asset transfers:', error);
        throw new Error('Failed to fetch asset transfers');
    }
};


// deprecated
export const getSendActions = async (safeAddress: string, chain: Chain) => {
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const result = await fetch(`https://semi.mobit.app/api/actions?safeAddress=${safeAddress}&chainId=${chain.id}&timezone=${timezone}`);
        
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        
        const resultData = await result.json();
        console.log('[actionsresult]:', resultData);
        return parseSendActions(resultData.results);
    } catch (error) {
        console.error('Error fetching send actions:', error);
        throw new Error('Failed to fetch send actions');
    }
}

export const getReceiveActions = async (safeAddress: string, chain: Chain) => {
    const alchemy = getAlchemyInstance(chain);
    const transfers = await getAssetTransfers(alchemy, safeAddress, 'to', chain);
    return parseActionsFromAlchemyApi(transfers, chain, 'income');
}

export const getSendActionsV2 = async (safeAddress: string, chain: Chain) => {
    const alchemy = getAlchemyInstance(chain);
    const transfers = await getAssetTransfers(alchemy, safeAddress, 'from', chain);
    return parseActionsFromAlchemyApi(transfers, chain, 'outgoing');
}