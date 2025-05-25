<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start"
            @click="router.push('/')">
            返回
        </UButton>

        <div class="flex flex-col items-center justify-center h-full gap-4 py-8 w-[80%] mx-auto">
            <div class="w-full flex flex-col items-center justify-center">
                <h1 class="text-2xl font-bold mb-3">接收资产</h1>
                <div class="bg-white p-4 rounded-xl shadow-sm mb-4">
                    <qrcode-vue :value="data.safeAddress" :size="200" level="H" render-as="svg" />
                </div>

                <div class="text-center">
                    <div class="text-gray-400 text-sm mb-2">扫描二维码接收资产</div>
                    <AddressDisplay :address="data.safeAddress" />
                </div>

                <div class="w-full mt-8">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="flex items-start gap-3">
                            <div class="text-sm text-gray-600">
                                <p class="font-medium mb-1 flex items-center gap-2">
                                    <UIcon name="ci:info" class="text-blue-500 text-xl" /> 安全提示
                                </p>
                                <p>请确保您只向此地址发送 {{ useChain.chain.name }} 资产，发送其他资产可能会导致资产丢失。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { useChainStore } from '../stores/chain'
import { predictSafeAccountAddress } from '~/utils/SafeSmartAccount'
import { useRouter } from 'vue-router'

const router = useRouter()
const useChain = useChainStore()
const toast = useToast()
const data = reactive({
    safeAddress: ''
})

const userStore = useUserStore()
const user = computed(() => userStore.user)

onMounted(async () => {
    try {
        // const predictSafeAddress = await predictSafeAccountAddress({
        //     owner: '0x6AEF77e177547551476bB8950359F1EB0AC4488f' as `0x${string}`,
        //     chain: useChain.chain
        // })
        data.safeAddress = user.value?.evm_chain_address as string
    } catch (error) {
        console.error(error)
        toast.add({
            title: '获取地址失败',
            description: '请稍后再试',
            color: 'error'
        })
    }
})
</script>