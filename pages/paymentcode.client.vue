<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton
            color="neutral"
            variant="ghost"
            class="self-start mb-4"
            @click="handleLogout"
        >
            退出登录
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 py-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold">设置支付码</h1>
            <div>{{ step === 1 ? '请输入6位数字支付码' : '请再次输入支付码' }}</div>
            <UForm :state="formState" @submit="onSubmit" class="w-full">
                <UFormField name="pin">
                    <UPinInput
                        variant="subtle"
                        type="number"
                        v-model="formState.pin"
                        :length="6"
                        size="xl"
                        class="w-full"
                        :ui="{ base: 'w-full' }"
                        :disabled="loading"
                        mask
                    />
                </UFormField>
                <div class="flex gap-4 mt-4">
                    <UButton
                        v-if="step === 2"
                        type="button"
                        color="neutral"
                        class="flex-1 flex justify-center items-center"
                        size="xl"
                        :disabled="loading"
                        @click="handleReset"
                    >
                        重置
                    </UButton>
                    <UButton
                        type="submit"
                        color="primary"
                        :class="['flex-1 flex justify-center items-center', step === 2 ? '' : 'w-full']"
                        size="xl"
                        :loading="loading"
                        :disabled="loading || !isPinComplete"
                    >
                        {{ step === 1 ? '下一步' : '确认' }}
                    </UButton>
                </div>
            </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { useChainStore } from '~/stores/chain'
import { generateMnemonicPhrase, getAddressFromMnemonic, encryptMnemonicToKeystore } from '~/utils/encryption'
import { predictSafeAccountAddress } from '~/utils/SafeSmartAccount'
import { setEncryptedKeys } from '~/utils/semi_api'

const router = useRouter()
const userStore = useUserStore()
const useChain = useChainStore()
const loading = ref(false)
const toast = useToast()
const step = ref(1)
const firstPin = ref('')

onMounted(async () => {
    if (!userStore.user) {
            router.push('/')
    }
})

const formState = reactive({
    pin: Array(6).fill('')
})

const isPinComplete = computed(() => {
    return formState.pin.length === 6 && formState.pin.every(digit => digit !== '')
})

const createManagerWallet = async (pin: string) => {
    try {
        if (!userStore.user?.id) {
            throw new Error('用户未登录')
        }

        // 第一步：生成助记词和钱包地址
        const mnemonic = generateMnemonicPhrase()
        const evm_chain_active_key = getAddressFromMnemonic(mnemonic)

        // 第二步：生成EVM链地址
        const evm_chain_address = await predictSafeAccountAddress({
            owner: evm_chain_active_key,
            chain: useChain.chain,
        })

        // 第二步：使用pin加密助记词
        const encrypted_keys = await encryptMnemonicToKeystore(mnemonic, pin)

        
        // 第三步：上传加密后的密钥
        const response = await setEncryptedKeys({
            id: userStore.user.id,
            encrypted_keys: JSON.stringify(encrypted_keys),
            evm_chain_active_key,
            evm_chain_address,
        })
        
        if (response.result === 'ok') {
            toast.add({
                title: '设置成功',
                description: '支付码已设置完成',
                color: 'success'
            })

            // 更新用户信息
            await userStore.getUser(true)
            router.push('/')
        } else {
            throw new Error('设置失败')
        }
    } catch (error) {
        console.error('创建钱包失败:', error)
        throw error
    }
}

const onSubmit = async () => {
    if (step.value === 1) {
        firstPin.value = formState.pin.join('')
        formState.pin = Array(6).fill('')
        step.value = 2
        return
    }

    loading.value = true
    try {
        const secondPin = formState.pin.join('')
        if (firstPin.value !== secondPin) {
            toast.add({
                title: '两次输入的支付码不一致',
                color: 'error'
            })
            return
        }

        await createManagerWallet(secondPin)
    } catch (error) {
        console.error('设置支付码失败:', error)
        toast.add({
            title: '设置失败',
            description: '请稍后重试',
            color: 'error'
        })
    } finally {
        loading.value = false
    }
}

const handleReset = () => {
    step.value = 1
    firstPin.value = ''
    formState.pin = Array(6).fill('')
}

const handleLogout = async () => {
    try {
        await userStore.signout()
        toast.add({
            title: '登出成功',
            color: 'success'
        })
        router.push('/')
    } catch (error) {
        console.error('登出失败:', error)
        toast.add({
            title: '登出失败',
            description: '请稍后重试',
            color: 'error'
        })
    }
}
</script> 