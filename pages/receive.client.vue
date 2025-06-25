<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start"
            @click="router.push('/')">
            {{ i18n.text.Back }}
        </UButton>

        <div class="flex flex-col items-center justify-center h-full gap-4 py-2 w-[80%] mx-auto">
            <div class="w-full flex flex-col items-center justify-center">
                <h1 class="text-2xl font-bold mb-3">{{ i18n.text['Receive Assets'] }}</h1>
                <div class="bg-white p-4 rounded-xl shadow-sm mb-4">
                    <qrcode-vue :value="data.safeAddress" :size="200" level="H" render-as="svg" />
                </div>

                <div class="text-center">
                    <div class="text-gray-400 text-sm mb-2">{{ i18n.text['Scan QR code to receive assets'] }}</div>
                    <AddressDisplay :address="data.safeAddress" :compact="false" :showAvatar="false" />
                </div>

                <div class="w-full mt-8">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="flex items-start gap-3">
                            <div class="text-sm text-gray-600">
                                <p class="font-medium mb-1 flex items-center gap-2">
                                    <UIcon name="ci:info" class="text-blue-500 text-xl" /> {{ i18n.text['Security Tip'] }}
                                </p>
                                <p>{{ i18n.text['Please ensure you only send {chainName} assets to this address. Sending other assets may result in asset loss.'].replace('{chainName}', useChain.chain.name) }}</p>
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
import { useI18n } from '../stores/i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const useChain = useChainStore()
const i18n = useI18n()
const toast = useToast()
const data = reactive({
    safeAddress: ''
})

const userStore = useUserStore()
const user = computed(() => userStore.user)

onMounted(async () => {
    try {
        data.safeAddress = user.value?.evm_chain_address as string
    } catch (error) {
        console.error(error)
        toast.add({
            title: i18n.text['Failed to get address'],
            description: i18n.text['Please try again later'],
            color: 'error'
        })
    }
})
</script>