<template>
    <div class="flex flex-col container-size h-[100vh] rounded-xl bg-[var(--ui-bg)] shadow-lg px-4 sm:px-8 py-8 banner">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="router.push('/')">
            返回
        </UButton>

        <h1 class="text-2xl font-bold">活动记录</h1>

        <!-- 加载动画 -->
        <div class="flex flex-col gap-4 mt-4" v-if="loading">
            <div class="w-full h-10 rounded-lg loading-bg"></div>
            <div class="w-80 h-10 rounded-lg loading-bg"></div>
            <div class="w-full h-10 rounded-lg loading-bg"></div>
            <div class="w-80 h-10 rounded-lg loading-bg"></div>
            <div class="w-full h-10 rounded-lg loading-bg"></div>
            <div class="w-90 h-10 rounded-lg loading-bg"></div>
        </div>

        <!-- 活动记录列表 -->
        <div class="flex-1 overflow-y-auto flex flex-col gap-4">
            <div class="flex items-center gap-2 justify-between hover:bg-muted p-2 rounded-lg cursor-pointer"
                v-for="(action, index) in actions" :key="index" @click="toExplorer(action.txHex)">
                <div class="flex flex-row gap-2">
                    <div class="flex flex-col">
                        <div class="font-medium">To: {{ formatAddress(action.to) }}</div>
                        <div class="text-gray-400 text-sm">{{ displayBalance(action.value) }} {{ action.token ===
                            'NATIVE_COIN' ?
                            useChain.chain.nativeCurrency.symbol : action.token }}</div>
                    </div>
                </div>

                <div class="flex flex-col gap-2 items-end">
                    <div class="text-gray-400 text-sm">{{ displayDate(action.date) }}</div>
                    <div class="text-gray-400 text-sm">{{ action.status }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useChainStore } from '../stores/chain'
import type { Chain } from 'viem'
import { parseActions, formatAddress, displayDate, displayBalance } from '../utils/display'

const userStore = useUserStore()
const user = computed(() => userStore.user)
const loading = ref(false)
const useChain = useChainStore()
const actions = ref<ActionPreview[]>([])

const router = useRouter()

const toExplorer = (tx: string) => {
    const url = useChain.chain.blockExplorers?.default?.url
    window.open(`${url}/tx/${tx}`, '_blank')
}

onMounted(async () => {
    const updateRecipients = async (chain: Chain, safeAddress: string) => {
        loading.value = true
        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
            const result = await fetch(`https://safe-client.safe.global/v1/chains/${chain.id}/safes/${safeAddress}/transactions/history?timezone=${timezone}&trusted=true&imitation=false`)
            const resultData = await result.json()
            console.log('[actionsresult]:', resultData)
            actions.value = parseActions(resultData.results)
        } catch (error) {
            console.error('Error updating recipients:', error)
            throw error
        } finally {
            loading.value = false
        }
    }

    if (user.value?.evm_chain_address) {
        updateRecipients(useChain.chain, user.value?.evm_chain_address!)
    }
})
</script>
