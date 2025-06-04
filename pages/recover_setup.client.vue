<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="router.push('/')">
            返回
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 py-8 w-[80%] mx-auto">

            <!-- 第一步：邮箱输入 -->
            <UForm v-if="currentStep === 1" :state="formState" @submit="onEmailSubmit" class="w-full">
                <h1 class="text-2xl font-bold text-center mb-3">{{ '设置守护邮箱' }}</h1>
                <div class="text-sm text-gray-500 mb-3">
                    · 守护邮箱用于恢复智能钱包，请使用Google邮箱。<br>· 请确保对邮箱的控制权，邮箱泄漏可能会造成资产损失。
                </div>
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
            <UForm v-if="currentStep === 2" :state="formState" @submit="onPasswordSubmit" class="w-full">
                <h1 class="text-2xl font-bold text-center mb-3">{{ '验证身份' }}</h1>
                <div class="text-sm text-gray-500 gap-2 mb-3 flex justify-center">{{ '请输入6位数字密码' }}</div>
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
                        开始
                    </UButton>
                </div>
            </UForm>

            <!-- 第三步：开始设置 -->
            <UForm v-if="currentStep === 3" :state="formState" @submit="onPasswordSubmit" class="w-full">
                <h1 class="text-2xl font-bold text-center mb-3">{{ '开始设置' }}</h1>

                <div v-if="!recoverStep.setupCompleted">
                    <div :class="['flex items-center gap-2 my-2 justify-between', recoverStep.checkContractDeployed ? 'text-green-500' : 'text-gray-500']">
                        检查用户合约部署
                        <UIcon name="i-heroicons-check-circle" :class="['w-4 h-4 text-2xl']" />

                    </div>
                    <div :class="['flex items-center gap-2 my-2 justify-between', recoverStep.enableZkEmailModule ? 'text-green-500' : 'text-gray-500']">
                        安装邮箱恢复模块
                        <UIcon name="i-heroicons-check-circle" :class="['w-4 h-4 text-2xl']" />
                    </div>
                    <div :class="['flex items-center gap-2 my-2 justify-between', recoverStep.setEmailAcceptance ? 'text-green-500' : 'text-gray-500']">
                        设置守护邮箱
                        <UIcon name="i-heroicons-check-circle" :class="['w-4 h-4 text-2xl']" />
                    </div>
                </div>

                <div v-if="recoverStep.setupCompleted">
                    <div class="gap-2 my-2">
                        设置完成, 请在邮箱中查看确认邮件，并按邮件提示完成剩余操作： <br> <b class="text-green-500 font-bold">Request ID:{{ recoverStep.requestId }}</b>
                    </div>
                </div>

                <div class="flex gap-4 mt-4">
                    <UButton type="button" 
                    color="primary" 
                    class="flex-1 justify-center items-center" size="xl"
                    :loading="isSetting"
                    @click="router.push('/')">
                        {{ isSetting ? '设置中' : '完成' }}
                    </UButton>
                </div>
            </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { checkAccountContractDeployed, enableZkEmailModule, handleAcceptance } from '~/utils/SafeSmartAccount/recover'
import { getErc7579SafeAccount } from '~/utils/SafeSmartAccount'

definePageMeta({
    layout: 'unauth'
})

const router = useRouter()
const loading = ref(false)
const isSetting = ref(true)
const toast = useToast()
const currentStep = ref(1)
const useChain = useChainStore()
const user = useUserStore()

const recoverStep = reactive({
    checkContractDeployed: false,
    enableZkEmailModule: false,
    setEmailAcceptance: false,
    setupCompleted: false,
    requestId: ''
})

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

const handleSetUp = async () => {
    const mnemonic = await decryptKeystoreToMnemonic(JSON.parse(user.user?.encrypted_keys as string), formState.pin.join(''))
    const privateKey = await mnemonicToPrivateKey(mnemonic)
    const safeAccount = await getErc7579SafeAccount(privateKey as `0x${string}`, useChain.chain)
    console.log('[setup recover]: safeAccount', safeAccount.address)
    currentStep.value = 3
    
    // 检查用户合约是否部署
    const checkContractDeployed = await checkAccountContractDeployed(safeAccount, useChain.chain)
    recoverStep.checkContractDeployed = true

    console.log('[setup recover]: contract deployed', checkContractDeployed)

    // 安装邮箱恢复模块
   const {accountCode, guardianAddress, guardianEmail} = await enableZkEmailModule({
        safeAccount,
        chain: useChain.chain,
        accountDeployed: checkContractDeployed,
        guardianEmail: formState.email
    })
    recoverStep.enableZkEmailModule = true

    // 设置守护邮箱
    const requestId = await handleAcceptance({
        safeAccount,
        chain: useChain.chain,
        accountCode,
        guardianEmail
    })
    
    recoverStep.requestId = requestId.toString()
    recoverStep.setEmailAcceptance = true
    recoverStep.setupCompleted = true
    isSetting.value = false
}

const onPasswordSubmit = async () => {
    loading.value = true
    isSetting.value = true
    try {
        await handleSetUp()

    } catch (error) {
        console.error('设置失败:', error)
        toast.add({
            title: '设置失败',
            description: '请稍后重试',
            color: 'error'
        })
    } finally {
        isSetting.value = false
        loading.value = false
    }
}
</script>
