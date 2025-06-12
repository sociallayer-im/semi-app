import { sha256 } from 'viem/utils'


// API 响应的基础接口
interface BaseResponse {
    result?: 'ok';
    error?: string;
}

// 用户信息接口
export interface UserInfo {
    id: string;
    handle: string | null;
    email: string | null;
    phone: string;
    image_url: string | null;
    evm_chain_address?: string | null;
    evm_chain_active_key?: string | null;
    remaining_gas_credits?: number;
    total_used_gas_credits?: number;
    encrypted_keys?: string | null;
}

// 登录响应接口
interface SignInResponse extends BaseResponse {
    auth_token: string;
    phone: string;
    id: string;
    address_type: 'phone';
}

// 加密密钥响应接口
interface EncryptedKeysResponse extends BaseResponse {
    encrypted_keys: string;
}

// API 基础配置
export const API_BASE_URL = 'https://semi.fly.dev';
export const AUTH_TOKEN_KEY = 'semi_auth_token';

const MOCK_RESPONSE = false

// 通用请求处理函数
async function handleRequest<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '请求失败');
    }
    return response.json();
}

// 获取认证头
function getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    const authToken = getCookie(AUTH_TOKEN_KEY);
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    return headers;
}

// 设置认证令牌
export function setAuthToken(token: string) {
    setCookie(AUTH_TOKEN_KEY, token, 365); // 设置365天过期
}

// 清除认证令牌
export function clearAuthToken() {
    deleteCookie(AUTH_TOKEN_KEY);
}

// Cookie 操作辅助函数
export function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

export function getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function deleteCookie(name: string) {
    setCookie(name, '', -1);
}

// 登出方法
export function logout(): void {
    clearAuthToken();
}

// 1. 获取欢迎信息
export async function getHello(): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/`);
    return handleRequest<{ message: string }>(response);
}

// 2. 发送短信验证码
export async function sendSMS(phone: string): Promise<BaseResponse> {
    // mock
    if (MOCK_RESPONSE) {
        return {
            result: 'ok',
            message: '验证码已发送',
        } as BaseResponse
    }
    
    const response = await fetch(`${API_BASE_URL}/send_sms`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ phone }),
    });
    return handleRequest<BaseResponse>(response);
}

// 3. 使用手机号和验证码登录
export async function signIn(phone: string, code: string): Promise<SignInResponse> {
    // mock
    const moc_response = {
        result: 'ok',
        auth_token: '1234567890',
        phone: phone,
        id: '1234567890',
        address_type: 'phone',
    } as SignInResponse

    if (MOCK_RESPONSE) {
        setAuthToken('1234567890');
        return moc_response
    }
    
    const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ phone, code }),
    });
    const data = await handleRequest<SignInResponse>(response);
    if (data.auth_token) {
        setAuthToken(data.auth_token);
    }
    return data;
}

// 4. 设置用户句柄
export async function setHandle(id: string, handle: string): Promise<BaseResponse> {
    const response = await fetch(`${API_BASE_URL}/set_handle`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, handle }),
    });
    return handleRequest<BaseResponse>(response);
}

// 5. 设置用户头像 URL
export async function setImageUrl(id: string, image_url: string): Promise<BaseResponse> {
    const response = await fetch(`${API_BASE_URL}/set_image_url`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, image_url }),
    });
    return handleRequest<BaseResponse>(response);
}

// 6. 设置加密密钥

export interface SetEncryptedKeysProps  {
    id: string;
    encrypted_keys: string;
    evm_chain_address: string;
    evm_chain_active_key: string;
}

export async function setEncryptedKeys(props: SetEncryptedKeysProps): Promise<BaseResponse> {
    const response = await fetch(`${API_BASE_URL}/set_encrypted_keys`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(props),
    });
    return handleRequest<BaseResponse>(response);
}

// 7. 获取加密密钥
export async function getEncryptedKeys(id: string): Promise<EncryptedKeysResponse> {
    const response = await fetch(`${API_BASE_URL}/get_encrypted_keys?id=${id}`, {
        headers: getAuthHeaders(),
    });
    return handleRequest<EncryptedKeysResponse>(response);
}

// 8. 获取用户信息
export async function getUser(id: string): Promise<UserInfo> {
    // mock
    const moc_response = {
        id: '1234567890',
        handle: 'test',
        email: 'test@test.com',
        phone: '1234567890',
        image_url: 'https://test.com/test.jpg',
    } as UserInfo

    if (MOCK_RESPONSE) {
        return moc_response
    }
    
    const response = await fetch(`${API_BASE_URL}/get_user?id=${id}`, {
        headers: getAuthHeaders(),
    });
    return handleRequest<UserInfo>(response);
}

export async function getMe(): Promise<UserInfo> {
    const response = await fetch(`${API_BASE_URL}/get_me`, {
        headers: getAuthHeaders(),
    });
    return handleRequest<UserInfo>(response);
}

// 9. 设置EVM链地址
export async function setEvmChainAddress(id: string, evm_chain_address: string, evm_chain_active_key: string): Promise<BaseResponse> {
    const response = await fetch(`${API_BASE_URL}/set_evm_chain_address`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, evm_chain_address, evm_chain_active_key }),
    });
    return handleRequest<BaseResponse>(response);
}

export async function signinWithPassword(phone: string, password: string, ) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(password);
    const hax = sha256(bytes)
    console.log('password_hash', hax)
    
    const response = await fetch(`${API_BASE_URL}/signin_with_password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ phone, password: hax}),
    });

    const data = await handleRequest<SignInResponse>(response);
    
    if (data.auth_token) {
        setAuthToken(data.auth_token);
    }

    return data;
}

export async function getUserByHandle(handle: string): Promise<UserInfo> {
    const response = await fetch(`${API_BASE_URL}/get_by_handle?handle=${handle}`, {
        headers: getAuthHeaders(),
    });
    return handleRequest<UserInfo>(response);
}

