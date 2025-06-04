import type { Chain } from 'viem'
import { getErc4337SafeAccount, predictErc4337SafeAccountAddress } from './account.4337'
import { getErc7579SafeAccount, predictErc7579SafeAccountAddress } from './account.7579'

export * from '../config'
export * from './operation'
export * from './account.4337'
export * from './account.7579'

export const exportKeyStore = (encrypted_keys: string) => {
    // 创建一个Blob对象，包含JSON数据
    const blob = new Blob([encrypted_keys], { type: 'application/json' });
    
    // 创建一个下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // 设置下载文件名
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `keystore-${timestamp}.json`;
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    
    // 清理
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export const getSafeAccount = async (privateKey: `0x${string}`, chain: Chain, module: ModuleType) => {
    if (module === '4337') {
        return await getErc4337SafeAccount(privateKey, chain)
    } else {
        return await getErc7579SafeAccount(privateKey, chain)
    }
}

export const predictSafeAccount = async (owner: `0x${string}`, chain: Chain, module: ModuleType) => {
    if (module === '4337') {
        return await predictErc4337SafeAccountAddress({owner, chain})
    } else {
        return await predictErc7579SafeAccountAddress({owner, chain})
    }
}

