<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4 "
        :style="{ maxHeight: `90svh` }">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="router.back()">
            {{ i18n.text['Back'] }}
        </UButton>
        <div class="mx-aut p-3">
            <div class="text-2xl font-bold text-center mb-4">Deploy</div>
            <UForm :state="deployParams" @submit="handleDeploy" class="w-full flex flex-col gap-4">
                <UFormField name="chainId" label="Chain ID">
                    <USelect variant="subtle" size="md" class="w-full" v-model="deployParams.chainId"
                        :items="chainOptions" placeholder="Select Chain" />
                </UFormField>
                <UFormField name="badgeAddress" label="Badge Address">
                    <UInput variant="subtle" size="md" class="w-full" v-model="deployParams.badgeAddress" />
                </UFormField>
                <UFormField name="registryAddress" label="Registry Address">
                    <UInput variant="subtle" size="md" class="w-full" v-model="deployParams.registryAddress" />
                </UFormField>
                <UFormField name="pinCode" label="6-digit Password">
                    <UPinInput variant="subtle" type="number" v-model="deployParams.pinCode" :length="6" size="xl"
                        class="w-full" :ui="{ base: 'w-full' }" mask />
                </UFormField>
                <UButton type="submit" color="primary" class="w-full mt-6 flex justify-center items-center" size="xl"
                    :loading="pending" :disabled="pending">
                    Deploy
                </UButton>
            </UForm>
            <div v-if="result"
                class="mt-6 border border-[var(--ui-border)] rounded-xl px-4 pb-4 flex flex-col gap-2 bg-[var(--ui-bg-muted)]">
                <div class="font-bold   text-white p-2 border-b border-gray-600">Deploy Success !</div>
                <div class="font-bold text-center break-all flex flex-row items-center gap-3">
                    <div class="shrink-0">Tx:</div>
                    <AddressDisplay :address="result.hash" :showAvatar="false" :compact="true" />
                </div>
                <div class="font-bold text-center break-all flex flex-row items-center gap-3">
                    <div class="shrink-0">Address:</div>
                    <AddressDisplay :address="result.address" :showAvatar="false" :compact="true" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { deploy, createClientConfig, chains } from 'solar-contract-sdk'
import { useChainStore, chainMap } from '@/stores/chain'
import { useUserStore } from '@/stores/user'
import { keystoreToPrivateKey } from '@/utils/encryption'
import { privateKeyToAccount, type Account } from 'viem/accounts'

const router = useRouter()
const i18n = useI18n()

const CODE_LENGTH = 6
const DEFAULT_CODE = Array(CODE_LENGTH).fill('')

const chainStore = useChainStore()
const userStore = useUserStore()
const toast = useToast()
const result = ref<any>(null)

const pending = ref(false)

const deployParams = ref(
    {
        chainId: chainStore.chain.id,
        badgeAddress: '',
        registryAddress: '',
        pinCode: DEFAULT_CODE
    }
)

// 创建链选项列表
const chainOptions = computed(() => {
    return Object.values(chainMap).map(chain => chain.id)
})

    // 解决BigInt序列化问题
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }

const handleDeploy = async () => {
    pending.value = true
    try {
        if (chainStore.chain.id !== deployParams.value.chainId) {
            await chainStore.switch(deployParams.value.chainId)
        }

        if (!deployParams.value.badgeAddress || !deployParams.value.registryAddress) {
            toast.add({
                title: 'Deploy failed',
                color: 'error',
                description: 'Badge Address and Registry Address are required'
            })
        }

        const privateKey = await keystoreToPrivateKey(
            JSON.parse(userStore.user?.encrypted_keys as string),
            deployParams.value.pinCode.join('')
        )

        const account = privateKeyToAccount(privateKey as `0x${string}`) as any

        const clientConfig = createClientConfig({
            chainId: chainStore.chain.id as keyof typeof chains,
        })

        const receipt = await deploy.deployBadgeMinter({
            params: {
                registryContractAddress: deployParams.value.registryAddress as `0x${string}`,
                badgeContractAddress: deployParams.value.badgeAddress as `0x${string}`
            },
            account: account,
            clientConfig
        })
        console.log(receipt)
        result.value = receipt
    } catch (error) {
        console.error(error)
        toast.add({
            title: 'Deploy failed',
            color: 'error',
            description: error instanceof Error ? error.message : 'deploy failed'
        })
    } finally {
        pending.value = false
    }
}
</script>

<style scoped></style>