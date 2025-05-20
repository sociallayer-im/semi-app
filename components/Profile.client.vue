<template>
    <div class="flex flex-col container-size h-[100vh] rounded-xl bg-[var(--ui-bg)] shadow-lg px-4 sm:px-8 py-8 banner">
        <!-- 顶部账户信息 -->
        <div class="w-full flex items-center justify-between mb-4">
            <AddressDisplay :address="data.safeAddress" />
            <ProfileSettings />
        </div>

        <!-- 资产总览 -->
        <div class="w-full flex items-center justify-between mb-2">
            <div>
                <div class="text-gray-400 text-sm">余额</div>
                <div class="flex items-center gap-2">
                    <span class="text-3xl font-bold">{{ displayBalance(data.balance) }} {{
                        useChain.chain.nativeCurrency.symbol }}</span>
                </div>
            </div>
        </div>

        <!-- 操作按钮 -->
        <div class="w-full flex justify-around my-4">
            <div class="flex flex-col items-center cursor-pointer" @click="navigateTo('/receive')">
                <div class="bg-green-50 rounded-full w-14 h-14 flex items-center justify-center mb-1">
                    <UIcon name="ci:qr-code" size="24" class="text-primary-500" />
                </div>
                <span class="text-sm mt-1">接收</span>
            </div>
            <div class="flex flex-col items-center cursor-pointer" @click="navigateTo('/send')">
                <div class="bg-purple-50 rounded-full w-14 h-14 flex items-center justify-center mb-1">
                    <UIcon name="ci:external-link" size="24" class="text-purple-500" />
                </div>
                <span class="text-sm mt-1">发送</span>
            </div>
            <div class="flex flex-col items-center cursor-pointer" @click="navigateTo('/actions')">
                <div class="bg-yellow-50 rounded-full w-14 h-14 flex items-center justify-center mb-1">
                    <UIcon name="ci:notebook" size="24" class="text-orange-500" />
                </div>
                <span class="text-sm mt-1">活动</span>
            </div>
        </div>

        <!-- 分割线 -->
        <div class="w-full border-t border-muted my-4"></div>

         <!-- 加载动画 -->
         <div class="flex flex-col gap-4 mt-4" v-if="loading">
            <div class="w-full h-10 rounded-lg loading-bg"></div>
            <div class="w-80 h-10 rounded-lg loading-bg"></div>
            <div class="w-full h-10 rounded-lg loading-bg"></div>
            <div class="w-80 h-10 rounded-lg loading-bg"></div>
        </div>

        <!-- 资产列表 -->
        <div class="flex flex-col flex-1  overflow-y-auto" v-else>
            <!-- 主链资产 -->
            <div class="w-full flex items-center justify-between mb-4 hover:bg-muted rounded-md py-2 px-4 cursor-pointer"
                @click="navigateTo('/send')"
            >
                <div class="flex items-center gap-3">
                    <img :src="'/images/eth_logo.png'" class="w-10 h-10 rounded-full" alt="eth" />
                    <div>
                        <div class="font-medium">{{ useChain.chain.nativeCurrency.symbol }}</div>
                        <div class="text-gray-400 text-sm">{{ useChain.chain.name }}</div>
                    </div>
                </div>
                <div class="flex flex-col items-end">
                    <span class="font-medium">{{ displayBalance(data.balance) }}</span>
                </div>
            </div>

            <!-- 代币资产 -->
            <div class="w-full flex items-center justify-between mb-4 hover:bg-muted rounded-md py-2 px-4 cursor-pointer"
                v-for="balance in balances"
                @click="navigateTo(`/senderc20/${balance.token.address}`)"
                :key="balance.token.address">
                <div class="flex items-center gap-3">
                    <img :src="balance.token.icon" class="w-10 h-10 rounded-full" :alt="balance.token.symbol" />
                    <div>
                        <div class="font-medium">{{ balance.token.symbol }}</div>
                        <div class="text-gray-400 text-sm">{{ balance.token.name }}</div>
                    </div>
                </div>
                <div class="flex flex-col items-end">
                    <span class="font-medium">{{ displayBalance(balance.balance, 6, balance.token.decimals) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getBalance, getPopularERC20Balance, type ERC20Balance } from '~/utils/balance'
import { useUserStore } from '../stores/user'
import { useChainStore } from '../stores/chain'
import { displayBalance } from '~/utils/display'

const userStore = useUserStore()
const user = computed(() => userStore.user)
const loading = ref(false)
const toast = useToast()
const useChain = useChainStore()
const balances = ref<ERC20Balance[]>([])

const data = reactive({
    safeAddress: '',
    balance: BigInt(0)
})

onMounted(async () => {
    try {
        loading.value = true
        data.safeAddress = user.value?.evm_chain_address as string
        data.balance = await getBalance(user.value?.evm_chain_address as `0x${string}`, useChain.chain)
        balances.value = await getPopularERC20Balance(user.value?.evm_chain_address as `0x${string}`, useChain.chain)
    } catch (error) {
        console.error(error)
        toast.add({
            title: '获取数据失败',
            description: '请稍后再试',
            color: 'error'
        })
    } finally {
        loading.value = false
    }
})
</script>
