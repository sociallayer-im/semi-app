// API 响应的基础接口
interface BaseResponse {
    result?: 'ok';
    error?: string;
}

// 用户信息接口
interface UserInfo {
    id: string;
    handle: string | null;
    email: string | null;
    phone: string;
    image_url: string | null;
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
const API_BASE_URL = 'https://semi.fly.dev';
const AUTH_TOKEN_KEY = 'semi_auth_token';

// 通用请求处理函数
async function handleRequest<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '请求失败');
    }
    return response.json();
}

// API 类
export class SemiAPI {
    private authToken: string | null = null;

    constructor() {
        // 从 localStorage 读取 authToken
        if (typeof window !== 'undefined') {
            this.authToken = localStorage.getItem(AUTH_TOKEN_KEY);
        }
    }

    // 设置认证令牌
    setAuthToken(token: string) {
        this.authToken = token;
        // 保存到 localStorage
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }

    // 清除认证令牌
    clearAuthToken() {
        this.authToken = null;
        // 从 localStorage 移除
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }

    // 获取认证头
    private getAuthHeaders(): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (this.authToken) {
            headers['Authorization'] = `Bearer ${this.authToken}`;
        }
        return headers;
    }

    // 登出方法
    logout(): void {
        this.clearAuthToken();
    }

    // 1. 获取欢迎信息
    async getHello(): Promise<{ message: string }> {
        const response = await fetch(`${API_BASE_URL}/`);
        return handleRequest<{ message: string }>(response);
    }

    // 2. 发送短信验证码
    async sendSMS(phone: string): Promise<BaseResponse> {
        const response = await fetch(`${API_BASE_URL}/send_sms`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({ phone }),
        });
        return handleRequest<BaseResponse>(response);
    }

    // 3. 使用手机号和验证码登录
    async signIn(phone: string, code: string): Promise<SignInResponse> {
        const response = await fetch(`${API_BASE_URL}/signin`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({ phone, code }),
        });
        const data = await handleRequest<SignInResponse>(response);
        if (data.auth_token) {
            this.setAuthToken(data.auth_token);
        }
        return data;
    }

    // 4. 设置用户句柄
    async setHandle(id: string, handle: string): Promise<BaseResponse> {
        const response = await fetch(`${API_BASE_URL}/set_handle`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({ id, handle }),
        });
        return handleRequest<BaseResponse>(response);
    }

    // 5. 设置用户头像 URL
    async setImageUrl(id: string, image_url: string): Promise<BaseResponse> {
        const response = await fetch(`${API_BASE_URL}/set_image_url`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({ id, image_url }),
        });
        return handleRequest<BaseResponse>(response);
    }

    // 6. 设置加密密钥
    async setEncryptedKeys(id: string, encrypted_keys: string): Promise<BaseResponse> {
        const response = await fetch(`${API_BASE_URL}/set_encrypted_keys`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({ id, encrypted_keys }),
        });
        return handleRequest<BaseResponse>(response);
    }

    // 7. 获取加密密钥
    async getEncryptedKeys(id: string): Promise<EncryptedKeysResponse> {
        const response = await fetch(`${API_BASE_URL}/get_encrypted_keys?id=${id}`, {
            headers: this.getAuthHeaders(),
        });
        return handleRequest<EncryptedKeysResponse>(response);
    }

    // 8. 获取用户信息
    async getUser(id: string): Promise<UserInfo> {
        const response = await fetch(`${API_BASE_URL}/get_user?id=${id}`, {
            headers: this.getAuthHeaders(),
        });
        return handleRequest<UserInfo>(response);
    }
}

// 导出 API 实例
export const semiAPI = new SemiAPI();
