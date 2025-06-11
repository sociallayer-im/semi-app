<template>
    <div class="flex flex-col container-size h-[100vh] rounded-xl bg-[var(--ui-bg)] shadow-lg px-4 sm:px-8 py-8 banner">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="router.push('/')">
            返回
        </UButton>

        <div class="flex items-center justify-between mb-4">
            <h1 class="text-2xl font-bold">活动记录</h1>
            <UButton icon="i-ci-external-link" color="primary" variant="ghost" 
                @click="toSafeExplorer">
                区块浏览器
            </UButton>
        </div>

        <!-- 加载动画 -->
        <div class="flex flex-col gap-4" v-if="loading">
            <div class="w-full h-10 rounded-lg loading-bg"></div>
            <div class="w-80 h-10 rounded-lg loading-bg"></div>
            <div class="w-full h-10 rounded-lg loading-bg"></div>
            <div class="w-80 h-10 rounded-lg loading-bg"></div>
            <div class="w-full h-10 rounded-lg loading-bg"></div>
        </div>

        <!-- 活动记录列表 -->
        <UTabs :items="tabs" class="w-full overflow-auto" v-else>
            <template #send="{ item }">
                <div class="text-gray-400 text-sm" v-if="sendActions.length === 0">当前没有数据</div>

                <div class="flex items-center gap-2 justify-between hover:bg-muted p-2 rounded-lg cursor-pointer"
                    v-for="(action, index) in sendActions" :key="index" @click="toExplorer(action.txHex)">
                    <div class="flex flex-row gap-2">
                        <div class="flex flex-col">
                            <div class="font-medium"><span class="text-red-400 text-sm">TO: </span>{{
                                formatAddress(action.to) }}</div>
                            <div class="text-gray-400 text-sm flex flex-row gap-1 items-center"
                                v-if="action.token === 'NATIVE_COIN'">
                                <div>{{ displayBalance(action.value, 6, 18) }} {{ useChain.chain.nativeCurrency.symbol
                                }}
                                </div>
                            </div>
                            <div class="text-gray-400 text-sm" v-else>
                                {{ displayBalance(action.value, 6, action.decimals) }} {{ action.symbol }}
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2 items-end">
                        <div class="text-gray-400 text-sm">{{ displayDate(action.date) }}</div>
                        <div class="text-gray-400 text-sm">{{ action.status }}</div>
                    </div>
                </div>
            </template>
            <template #receive="{ item }">
                <div class="text-gray-400 text-sm" v-if="receiveActions.length === 0">当前没有数据</div>
                <div class="flex items-center gap-2 justify-between hover:bg-muted p-2 rounded-lg cursor-pointer"
                    v-for="(action, index) in receiveActions" :key="index" @click="toExplorer(action.txHex)">
                    <div class="flex flex-row gap-2">
                        <div class="flex flex-col">
                            <div class="font-medium"><span class="text-green-400 text-sm">FROM: </span>{{
                                formatAddress(action.from) }}</div>
                            <div class="text-gray-400 text-sm">
                                {{ displayBalance(action.value, 6, action.decimals) }} {{ action.symbol }}
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2 items-end">
                        <div class="text-gray-400 text-sm">{{ displayDate(action.date) }}</div>
                        <div class="text-gray-400 text-sm">{{ action.status }}</div>
                    </div>
                </div>
            </template>
        </UTabs>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useChainStore } from '../stores/chain'
import type { Chain } from 'viem'
import { formatAddress, displayDate, displayBalance } from '../utils/display'
import { getReceiveActions, getSendActionsV2 } from '../utils/actions'
import type { TabsItem } from '@nuxt/ui'

const userStore = useUserStore()
const user = computed(() => userStore.user)
const loading = ref(false)
const useChain = useChainStore()
const sendActions = ref<ActionPreview[]>([])
const receiveActions = ref<ActionPreview[]>([])
const toast = useToast()

const router = useRouter()

const toExplorer = (tx: string) => {
    const url = useChain.chain.blockExplorers?.default?.url
    window.open(`${url}/tx/${tx}`, '_blank')
}

const toSafeExplorer = () => {
    if (user.value?.evm_chain_address) {
        const url = useChain.chain.blockExplorers?.default?.url
        window.open(`${url}/address/${user.value.evm_chain_address}`, '_blank')
    }
}

const tabs: TabsItem[] = [
    {
        label: '发送',
        slot: 'send' as const,
    },
    {
        label: '接收',
        slot: 'receive' as const,
    }
]

onMounted(async () => {
    const updateActions = async (chain: Chain, safeAddress: string) => {
        loading.value = true
        try {
            const tasks = [
                getSendActionsV2(safeAddress, chain),
                getReceiveActions(safeAddress, chain)
            ]
            const [sendActionsList, receiveActionsList] = await Promise.all(tasks)
            sendActions.value = sendActionsList
            receiveActions.value = receiveActionsList
            console.log('[sendActions]:', sendActions.value)
            console.log('[receiveActions]:', receiveActions.value)
        } catch (error) {
            console.error('Error updating recipients:', error)
            toast.add({
                title: 'Error',
                description: (error as Error).message,
                color: 'error',
            })
            throw error
        } finally {
            loading.value = false
        }
    }


    if (user.value?.evm_chain_address) {
        updateActions(useChain.chain, user.value?.evm_chain_address!)
    }
})
</script>
