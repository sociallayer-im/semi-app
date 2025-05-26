export * from '../config'
export * from './operation'
export * from './account'


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


