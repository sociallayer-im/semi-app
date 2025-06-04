import { defineStore } from 'pinia'

export type ModuleType = '4337' | '7579'

export const useModuleStore = defineStore('module', {
    state: () => ({
        module: window.localStorage.getItem('safe_module') as ModuleType || '4337',
    }),
    
    actions: {
        async switch(chain?: ModuleType) {
            if (chain) {
                this.module = chain
                window.localStorage.setItem('safe_module', chain)
            } else {
                const newMoudle = this.module === '4337' ? '7579' : '4337'
                this.module = newMoudle
                window.localStorage.setItem('safe_module', this.module)
            }
        }
    }
}) 