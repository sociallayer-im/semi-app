<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="router.push('/')">
            返回
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 py-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold">{{ '配置钱包恢复' }}</h1>
            <div>{{ currentStep === 1 ? '输入守护者邮箱' : '请输入6位数字密码' }}</div>

            <!-- 第一步：邮箱输入 -->
            <UForm v-if="currentStep === 1" :state="formState" @submit="onEmailSubmit" class="w-full">
                <UFormField name="email">
                    <UInput size="xl" class="w-full" v-model="formState.email" placeholder="请输入邮箱地址"
                        :ui="{ base: 'w-full' }" :disabled="loading" variant="subtle" />
                </UFormField>
                <UButton type="submit" color="primary" class="w-full mt-4 flex justify-center items-center" size="xl"
                    :loading="loading" :disabled="loading || !isValidEmail">
                    下一步
                </UButton>
            </UForm>

            <!-- 第二步：密码输入 -->
            <UForm v-else :state="formState" @submit="onPasswordSubmit" class="w-full">
                <UFormField name="pin">
                    <UPinInput variant="subtle" type="number" v-model="formState.pin" :length="6" size="xl"
                        class="w-full" :ui="{ base: 'w-full' }" :disabled="loading" mask />
                </UFormField>
                <div class="flex gap-4 mt-4">
                    <UButton type="button" color="neutral" class="flex-1 justify-center items-center" size="xl"
                        :disabled="loading" @click="currentStep = 1">
                        上一步
                    </UButton>
                    <UButton type="submit" color="primary" class="flex-1 justify-center items-center" size="xl"
                        :loading="loading" :disabled="loading || !isPinComplete">
                        确认
                    </UButton>
                </div>
            </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { setupRecover } from '~/utils/SafeSmartAccount/recover'
import { getErc7579SafeAccount } from '~/utils/SafeSmartAccount'

definePageMeta({
    layout: 'unauth'
})

const router = useRouter()
const loading = ref(false)
const toast = useToast()
const currentStep = ref(1)
const useChain = useChainStore()
const user = useUserStore()

const formState = reactive({
    email: 'webdbcosmo@gmail.com',
    pin: Array(6).fill('1')
})

const isValidEmail = computed(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(formState.email)
})

const isPinComplete = computed(() => {
    return formState.pin.length === 6 && formState.pin.every(digit => digit !== '')
})

const validateEmail = (value: string) => {
    if (!value) return '请输入邮箱地址'
    if (!isValidEmail.value) return '请输入有效的邮箱地址'
    return true
}

const onEmailSubmit = async () => {
    loading.value = true
    try {
        const validation = validateEmail(formState.email)
        if (validation === true) {
            currentStep.value = 2
        } else {
            toast.add({
                title: '邮箱格式错误',
                description: validation,
                color: 'error'
            })
        }
    } finally {
        loading.value = false
    }
}

const onPasswordSubmit = async () => {
    loading.value = true
    try {
        // TODO: 处理密码设置逻辑
        const mnemonic = await decryptKeystoreToMnemonic(JSON.parse(user.user?.encrypted_keys as string), formState.pin.join(''))
        const privateKey = await mnemonicToPrivateKey(mnemonic)
        const safeAccount = await getErc7579SafeAccount(privateKey as `0x${string}`, useChain.chain)

        await setupRecover(safeAccount, useChain.chain, formState.email)

    } catch (error) {
        console.error('设置失败:', error)
        toast.add({
            title: '设置失败',
            description: '请稍后重试',
            color: 'error'
        })
    } finally {
        loading.value = false
    }
}
</script>
