<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4" @click="handleBack">
            返回
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 py-8 w-[80%] mx-auto">
            <template v-if="!showPrivateKey">
                <h1 class="text-2xl font-bold">导出私钥</h1>
                <div class="text-center text-gray-600">请输入您的登录密码以验证身份</div>
                <UForm :state="formState" @submit="onSubmit" class="w-full">
                    <UFormField name="pin">
                        <UPinInput variant="subtle" type="number" v-model="formState.pin" :length="6" size="xl"
                            class="w-full" :ui="{ base: 'w-full' }" :disabled="loading" mask />
                    </UFormField>
                    <div class="flex gap-4 mt-4">
                        <UButton type="submit" color="primary" :class="['flex-1 flex justify-center items-center', 'w-full']"
                            size="xl" :loading="loading" :disabled="loading || !isPinComplete">
                            导出私钥
                        </UButton>
                    </div>
                </UForm>
            </template>
            <template v-else>
                <h1 class="text-2xl font-bold">您的私钥</h1>
                <div class="w-full flex flex-col gap-2">
                    <UTextarea v-model="privateKey" readonly :rows="3" class="w-full" />
                    <UButton
                        icon="i-heroicons-clipboard"
                        color="primary"
                        class="w-full justify-center"
                        size="xl"
                        @click="copyPrivateKey"
                    >
                        复制
                    </UButton>
                </div>
                <div class="bg-red-50 border border-red-200 rounded-lg p-2  w-full">
                    <h3 class="text-red-800 font-semibold mb-2 flex items-center gap-1"><UIcon name="ci:error-outline" />安全警告</h3>
                    <ul class="text-red-700 text-sm space-y-2">
                        <li>私钥是访问您账户的唯一凭证，请勿分享给任何人, 一旦私钥泄露，您的资产可能面临被盗风险</li>
                    </ul>
                </div>

                <div class="bg-red-50 border border-yellow-200 rounded-lg p-2  w-full">
                    <h3 class="text-yellow-800 font-semibold mb-2 flex items-center gap-1"><UIcon name="ci:error-outline" />提示</h3>
                    <ul class="text-yellow-700 text-sm space-y-2">
                        <li>这个私钥所属的钱包不等于当前的<b>智能钱包</b>，而是当前智能钱包的<b>拥有者</b>， 具体参考<a href="https://docs.safe.global/advanced/erc-4337/overview" target="_blank" class="text-blue-500">ERC-4337标准</a>。</li>
                    </ul>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { decryptKeystoreToMnemonic, mnemonicToPrivateKey } from '~/utils/encryption'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const showPrivateKey = ref(false)
const privateKey = ref('')
const toast = useToast()

definePageMeta({
    layout: 'unauth'
})

const formState = reactive({
    pin: Array(6).fill('')
})

const isPinComplete = computed(() => {
    return formState.pin.length === 6 && formState.pin.every(digit => digit !== '')
})

const onSubmit = async () => {
    loading.value = true
    try {
        const user = userStore.user
        if (!user?.encrypted_keys) {
            throw new Error('未找到加密的密钥信息')
        }

        // 解密助记词
        const mnemonic = await decryptKeystoreToMnemonic(
            JSON.parse(user.encrypted_keys),
            formState.pin.join('')
        )

        // 从助记词获取私钥
        privateKey.value = mnemonicToPrivateKey(mnemonic)
        showPrivateKey.value = true

    } catch (error) {
        console.error('验证失败:', error)
        toast.add({
            title: '验证失败',
            description: '密码错误或密钥信息无效',
            color: 'error'
        })
    } finally {
        loading.value = false
    }
}

const handleBack = () => {
    router.push('/')
}

const copyPrivateKey = async () => {
    try {
        await navigator.clipboard.writeText(privateKey.value)
        toast.add({
            title: '复制成功',
            description: '私钥已复制到剪贴板',
            color: 'success'
        })
    } catch (error) {
        toast.add({
            title: '复制失败',
            description: '请手动复制私钥',
            color: 'error'
        })
    }
}
</script>