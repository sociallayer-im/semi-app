<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="router.push('/')">
            返回
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 py-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold">发送 {{ useChain.chain.nativeCurrency.symbol }}</h1>

            <!-- 步骤1：输入转账信息 -->
            <div v-if="step === 1" class="w-full">

                <UForm :state="formState" @submit="onSubmit" class="w-full">
                    <UFormField name="to" label="接收地址">
                        <UInput size="xl" class="w-full" variant="subtle" v-model="formState.to" placeholder="请输入接收地址"
                            :ui="{ base: 'w-full' }" :disabled="loading || !balance" />
                    </UFormField>

                    <UFormField name="amount" label="发送数量" class="mt-4">
                        <UInput variant="subtle" size="xl" class="w-full" v-model="formState.amount" placeholder="请输入发送数量"
                            :ui="{ base: 'w-full' }" :disabled="loading || !balance" />
                    </UFormField>

                    <div class="mt-4">
                        <div class="text-gray-400 text-sm">余额</div>
                        <div class="flex items-center gap-2">
                            <span class="text-3xl font-bold">{{ displayBalance(balance) }} {{
                                useChain.chain.nativeCurrency.symbol }}</span>
                        </div>
                    </div>

                    <UButton type="submit" color="primary" class="w-full mt-4 flex justify-center items-center"
                        size="xl" :loading="loading" :disabled="loading || !isFormValid || !balance">
                        下一步
                    </UButton>
                </UForm>
            </div>

            <!-- 步骤2：输入验证码 -->
            <div v-if="step === 2" class="w-full">
                <div class="text-center mb-4">
                    <div class="text-gray-400 text-sm mb-2">请输入6位密码</div>
                </div>

                <UForm :state="formState" @submit="onSubmit" class="w-full">
                    <UFormField name="code">
                        <UPinInput variant="subtle" type="number" v-model="formState.code" :length="6" size="xl" class="w-full"
                            :ui="{ base: 'w-full' }" :disabled="loading" mask />
                    </UFormField>

                    <div class="flex gap-4 mt-4">
                        <UButton type="button" color="neutral" class="flex-1 flex justify-center items-center" size="xl"
                            :disabled="loading" @click="handleReset">
                            返回
                        </UButton>
                        <UButton type="submit" color="primary" class="flex-1 flex justify-center items-center" size="xl"
                            :loading="loading" :disabled="loading || !isCodeComplete">
                            确认
                        </UButton>
                    </div>
                </UForm>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getBalance } from '~/utils/balance'
import { formatEther } from 'viem'
import { useChainStore } from '../stores/chain'
import { getSafeAccount, predictSafeAccountAddress, transfer } from '~/utils/SafeSmartAccount'
import { displayBalance } from '~/utils/display'
import { isAddress } from 'viem'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const loading = ref(false)
const toast = useToast()
const useChain = useChainStore()
const balance = ref<bigint>(BigInt(0))
const step = ref(1)
const user = useUserStore()
const formState = reactive({
    to: '',
    amount: '',
    code: Array(6).fill('')
})

// 表单验证
const isFormValid = computed(() => {
    if (!formState.to || !formState.amount) return false
    if (!isAddress(formState.to)) return false
    if (isNaN(Number(formState.amount)) || Number(formState.amount) <= 0) return false
    return true
})

// 验证码验证
const isCodeComplete = computed(() => {
    return formState.code.length === 6 && formState.code.every(digit => digit !== '')
})

// 获取余额
const fetchBalance = async () => {
    try {
        loading.value = true
        const predictSafeAddress = await predictSafeAccountAddress({
            owner: user.user?.evm_chain_active_key as `0x${string}`,
            chain: useChain.chain
        })
        balance.value = await getBalance(predictSafeAddress, useChain.chain)
    } catch (error) {
        console.error(error)
        toast.add({
            title: '获取余额失败',
            description: '请稍后再试',
            color: 'error'
        })
    } finally {
        loading.value = false
    }
}

// 表单提交
const onSubmit = async () => {
    if (step.value === 1) {
        // 验证余额
        const amount = parseFloat(formState.amount)
        const balanceInEth = Number(formatEther(balance.value))
        if (amount > balanceInEth) {
            toast.add({
                title: '余额不足',
                description: '发送数量不能大于账户余额',
                color: 'error'
            })
            return
        }
        step.value = 2
        return
    }

    // TODO: 实现转账逻辑
    const mnemonic = await decryptKeystoreToMnemonic(JSON.parse(user.user?.encrypted_keys as string), formState.code.join(''))
    const privateKey = await mnemonicToPrivateKey(mnemonic)

    loading.value = true
    try {
        // 这里添加转账逻辑
        await transfer({
            to: formState.to as `0x${string}`,
            amount: formState.amount,
            privateKey: privateKey as `0x${string}`,
            chain: useChain.chain
        })
        
        toast.add({
            title: '转账成功',
            description: '转账已提交',
            color: 'success'
        })
        router.push('/')
    } catch (error) {
        console.error('转账失败:', error)
        toast.add({
            title: '转账失败',
            description: '请稍后再试',
            color: 'error'
        })
        // 返回 step 1
        step.value = 1
    } finally {
        loading.value = false
    }
}

const handleReset = () => {
    step.value = 1
    formState.code = Array(6).fill('')
}

onMounted(() => {
    fetchBalance()
})
</script>
