import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null as any
    }),
    
    actions: {
        async logout() {
            this.isAuthenticated = false
            this.user = null
            // 这里可以添加其他退出登录的逻辑，比如清除本地存储等
        }
    }
}) 