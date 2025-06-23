<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="router.push('/')">
            返回
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 pb-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold">发送代币</h1>

            <!-- 步骤1：输入转账信息 -->
            <div v-if="step === 1" class="w-full">
                <UForm :state="formState" @submit="onSubmit" class="w-full">
                    <UFormField name="to" label="接收人(支持地址或手机号)">
                        <div class="flex items-start flex-row gap-2">
                            <UTextarea size="xl" class="w-full" variant="subtle" v-model="formState.to"
                                placeholder="请输入接收地址/手机号" :ui="{ base: 'w-full' }" :disabled="initializing" />
                            <div class="flex flex-col gap-2">
                                <UButton icon="ci:close-md" color="neutral" variant="subtle" size="xl"
                                    class="text-2xl cursor-pointer" @click="formState.to = ''">
                                </UButton>
                                <ScanQrcodeBtn @onDetect="handleQrCodeDetect" />
                            </div>
                        </div>
                    </UFormField>

                    <UFormField name="amount" label="发送数量" class="mt-4">
                        <div class="flex items-center gap-2">
                            <TokenSwitch :token-list="tokenList" v-model="formState.token" v-if="formState.token" />
                            <UInput variant="subtle" size="xl" class="w-full flex-1" v-model="formState.amount"
                                placeholder="请输入发送数量" :ui="{ base: 'w-full' }" :disabled="initializing || !balance" />
                        </div>
                    </UFormField>

                    <div class="mt-4">
                        <div class="text-gray-400 text-sm">余额</div>
                        <div class="flex items-center gap-2">
                            <span class="text-3xl font-bold" v-if="initializing">-- {{ formState.token?.symbol }}</span>
                            <span class="text-3xl font-bold" v-else>
                                {{ displayBalance(balance, 6, formState.token?.decimals) }}
                                {{ formState.token?.symbol }}
                            </span>
                        </div>
                    </div>

                    <UButton type="submit" color="primary" class="w-full mt-4 flex justify-center items-center"
                        size="xl" :loading="initializing || loading"
                        :disabled="initializing || loading || !isFormValid || !balance">
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
                        <UPinInput variant="subtle" type="number" v-model="formState.code" :length="6" size="xl"
                            class="w-full" :ui="{ base: 'w-full' }" mask />
                    </UFormField>

                    <div class="text-gray-400 text-sm mt-3" v-if="formState.gasEstimate !== '0'">
                        <span class="flex items-center gap-1">
                            预估手续费
                            <FeeTipPopup />
                        </span>
                        <span
                            :class="['font-bold text-base text-foreground', formState.remainingFreeTransactions > 0 ? 'line-through' : '']">
                            {{ formState.gasEstimate }} Gwei
                        </span>
                    </div>

                    <div class="text-gray-400 text-sm mt-2">
                        剩余免手续费交易次数：
                        <span class="font-bold text-base text-foreground">
                            {{ formState.remainingFreeTransactions }}
                        </span>
                    </div>

                    <div class="flex gap-4 mt-4">
                        <UButton type="button" color="neutral" class="flex-1 flex justify-center items-center" size="xl"
                            :disabled="loading" @click="handleReset">
                            上一步
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
import { POPULAR_ERC20_TOKENS } from '@/utils/balance/tokens'
import { useChainStore, chainMap } from '@/stores/chain'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getBalance, getErc20Balance } from '~/utils/balance'
import { estimateGas, predictSafeAccountAddress, transfer, transferErc20 } from '~/utils/SafeSmartAccount'
import { displayBalance } from '~/utils/display'
import { isAddress, zeroAddress, formatUnits } from 'viem'
import { keystoreToPrivateKey } from '~/utils/encryption'
import { getUserByHandleOrPhone, getRemainingGasCredits, uploadTransaction } from '~/utils/semi_api'
import { isGasSponsorshipChain } from '~/utils/gas_sponsorship'
import type { TokenMetadata } from '@/utils/balance/tokens'
import { isPhoneNumber } from '~/utils'

// 类型定义
interface FormState {
    to: string
    recipient: string | null
    amount: string
    code: string[]
    token: TokenMetadata | undefined
    remainingFreeTransactions: number
    gasEstimate: string
}

interface TransferParams {
    to: `0x${string}`
    amount: string
    privateKey: `0x${string}`
    chain: any
    erc20TokenAddress?: `0x${string}`
    sponsorFee: boolean
}

// 常量
const CODE_LENGTH = 6
const DEFAULT_CODE = Array(CODE_LENGTH).fill('')

// 组合式函数
const route = useRoute()
const router = useRouter()
const useChain = useChainStore()
const user = useUserStore()
const toast = useToast()

// 响应式状态
const initializing = ref(false)
const loading = ref(false)
const balance = ref<bigint>(BigInt(0))
const step = ref(1)

const formState = reactive<FormState>({
    to: '',
    recipient: null,
    amount: '',
    code: [...DEFAULT_CODE],
    token: undefined,
    remainingFreeTransactions: 0,
    gasEstimate: '0'
})

// 计算属性
const nativeToken = computed(() => ({
    address: zeroAddress,
    name: useChain.chain.nativeCurrency.name,
    symbol: useChain.chain.nativeCurrency.symbol,
    decimals: useChain.chain.nativeCurrency.decimals,
    icon: '/images/eth_logo.png'
} as TokenMetadata))

const tokenList = computed(() => {
    const erc20TokenList = POPULAR_ERC20_TOKENS[useChain.chain.id] || []
    return [nativeToken.value, ...erc20TokenList]
})

const isFormValid = computed(() => {
    if (!formState.to || !formState.amount) return false
    if (!isAddress(formState.to) && !isPhoneNumber(formState.to)) return false
    if (isNaN(Number(formState.amount)) || Number(formState.amount) <= 0) return false
    return true
})

const isCodeComplete = computed(() => {
    return formState.code.length === CODE_LENGTH && formState.code.every(digit => digit !== '')
})

// 工具函数
const getErrorMessage = (error: unknown): string => {
    if (!(error instanceof Error)) return "请稍后再试"
    if (!error.message) return "请稍后再试"
    
    return error.message.includes(
        "Smart Account does not have sufficient funds to execute the User Operation"
    ) ? "账户余额不足以支付手续费" : error.message
}

const handleError = (error: unknown, title: string, description?: string) => {
    console.error(error)
    toast.add({
        title,
        description: description || (error instanceof Error ? error.message : '请稍后再试'),
        color: 'error'
    })
}

const resetForm = () => {
    step.value = 1
    formState.recipient = null
    formState.code = [...DEFAULT_CODE]
}

// 业务逻辑函数
const fetchTokenBalance = async () => {
    if (!formState.token) return

    try {
        initializing.value = true
        const predictSafeAddress = await predictSafeAccountAddress({
            owner: user.user?.evm_chain_active_key as `0x${string}`,
            chain: useChain.chain
        })

        balance.value = formState.token.address === zeroAddress
            ? await getBalance(predictSafeAddress, useChain.chain)
            : await getErc20Balance(
                predictSafeAddress,
                formState.token.address as `0x${string}`,
                useChain.chain
            )
    } catch (error) {
        handleError(error, '获取余额失败')
    } finally {
        initializing.value = false
    }
}

const validateBalance = (): boolean => {
    if (!formState.token) return false
    
    const amount = Number(formState.amount) * 10 ** (formState.token.decimals as number)
    if (amount > Number(balance.value)) {
        handleError(new Error('余额不足'), '余额不足')
        return false
    }
    return true
}

const resolveRecipient = async (): Promise<boolean> => {
    try {
        if (isPhoneNumber(formState.to)) {
            const recipient = await getUserByHandleOrPhone(formState.to)
            if (!recipient?.evm_chain_address) {
                handleError(new Error('无效手机号'), '无效手机号')
                return false
            }
            formState.recipient = recipient.evm_chain_address as `0x${string}`
        } else {
            formState.recipient = formState.to as `0x${string}`
        }
        return true
    } catch (error) {
        handleError(error, '获取接收地址失败', '请检查手机号是否正确')
        return false
    }
}

const fetchGasCredits = async (): Promise<boolean> => {
    try {
        if (isGasSponsorshipChain(useChain.chain.id)) {
            const { remaining_free_transactions } = await getRemainingGasCredits()
            formState.remainingFreeTransactions = remaining_free_transactions
        } else {
            formState.remainingFreeTransactions = 0
        }
        return true
    } catch (error) {
        handleError(error, '获取免手续费交易次数失败', '请稍后再试')
        return false
    }
}

const handleTokenTransfer = async () => {
    if (!formState.token || !formState.recipient) return

    loading.value = true
    try {
        const privateKey = await keystoreToPrivateKey(
            JSON.parse(user.user?.encrypted_keys as string),
            formState.code.join('')
        )

        const transferParams: TransferParams = {
            to: formState.recipient as `0x${string}`,
            amount: formState.amount,
            privateKey: privateKey as `0x${string}`,
            chain: useChain.chain,
            sponsorFee: isGasSponsorshipChain(useChain.chain.id) && formState.remainingFreeTransactions > 0
        }

        // 如果是ERC20代币，添加代币地址
        if (formState.token.address !== zeroAddress) {
            transferParams.erc20TokenAddress = formState.token.address as `0x${string}`
        }

        const receipt = await (formState.token.address === zeroAddress
            ? transfer(transferParams)
            : transferErc20(transferParams))

        // 解决BigInt序列化问题
        ;(BigInt.prototype as any).toJSON = function () {
            return this.toString()
        }

        await uploadTransaction({
            tx_hash: receipt.receipt.transactionHash,
            gas_used: (receipt.actualGasCost + receipt.receipt.effectiveGasPrice * BigInt(receipt.receipt.gasUsed)).toString(),
            status: receipt.success ? 'success' : 'failed',
            chain: useChain.chain.id,
            data: JSON.stringify(receipt) as any
        })

        toast.add({
            title: '转账成功',
            description: '转账已提交',
            color: 'success'
        })
        router.push('/')
    } catch (error) {
        handleError(error, '转账失败', getErrorMessage(error))
        resetForm()
    } finally {
        loading.value = false
    }
}

const initFormFromQuery = async () => {
    const { to, amount, chain_id, token_address } = route.query

    // 处理链ID
    if (chain_id && typeof chain_id === 'string') {
        const numChainId = Number(chain_id)
        if (numChainId in chainMap) {
            await useChain.switch(numChainId)
        } else {
            handleError(new Error('无效链ID'), '无效链ID', 'URL中的链ID不正确')
        }
    }

    // 处理代币地址
    if (token_address && typeof token_address === 'string') {
        const targetToken = tokenList.value.find((token) => token.address === token_address)
        formState.token = targetToken || nativeToken.value
        if (!targetToken) {
            handleError(new Error('无效代币地址'), '无效代币地址', 'URL中的代币地址不正确或者不支持的代币')
        }
    } else {
        formState.token = nativeToken.value
    }

    // 处理接收地址
    if (to && typeof to === 'string' && isAddress(to)) {
        formState.to = to
    } else if (to && typeof to === 'string') {
        toast.add({
            title: '无效地址',
            description: 'URL中的接收地址格式不正确',
            color: 'error'
        })
    }

    // 处理金额
    if (amount && typeof amount === 'string') {
        const numAmount = Number(amount)
        if (!isNaN(numAmount) && numAmount > 0) {
            formState.amount = amount
        } else {
            handleError(new Error('无效金额'), '无效金额', 'URL中的金额必须是大于0的数字')
        }
    }
}

const onSubmit = async () => {
    if (step.value === 1) {
        if (!validateBalance()) return

        loading.value = true
        
        // 解析接收地址
        if (!(await resolveRecipient())) {
            loading.value = false
            return
        }

        // 获取免手续费交易次数
        if (!(await fetchGasCredits())) {
            loading.value = false
            return
        }

        loading.value = false
        step.value = 2
        return
    }

    await handleTokenTransfer()
}

const handleQrCodeDetect = (values: string[]) => {
    if (values.length > 0) {
        const address = values[0]
        if (isAddress(address)) {
            formState.to = address
            toast.add({
                title: '扫码成功',
                description: '已填入接收地址',
                color: 'success'
            })
        } else {
            handleError(new Error('无效地址'), '无效地址', '扫描的二维码不是有效的以太坊地址')
        }
    }
}

const handleReset = () => {
    resetForm()
}

// 监听器
watch(() => formState.token, fetchTokenBalance, { immediate: true })

// 生命周期
onMounted(initFormFromQuery)
</script>