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
                    <UFormField name="to" label="接收地址">
                        <div class="flex items-start flex-row gap-2">
                            <UTextarea size="xl" class="w-full" variant="subtle" v-model="formState.to"
                                placeholder="请输入接收地址" :ui="{ base: 'w-full' }" :disabled="loading || !balance" />
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
                                placeholder="请输入发送数量" :ui="{ base: 'w-full' }" :disabled="loading || !balance" />
                        </div>
                    </UFormField>

                    <div class="mt-4">
                        <div class="text-gray-400 text-sm">余额</div>
                        <div class="flex items-center gap-2">
                            <span class="text-3xl font-bold" v-if="loading">-- {{ formState.token?.symbol }}</span>
                            <span class="text-3xl font-bold" v-else>
                                {{ displayBalance(balance, 6, formState.token?.decimals) }}
                                {{ formState.token?.symbol }}
                            </span>
                        </div>
                    </div>

                    <UButton type="submit" color="primary" class="w-full mt-4 flex justify-center items-center"
                        size="xl" :loading="loading || step2Loading"
                        :disabled="loading || step2Loading || !isFormValid || !balance">
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
                            class="w-full" :ui="{ base: 'w-full' }" :disabled="loading" mask />
                    </UFormField>

                    <div class="text-red-500 text-sm mt-3" v-if="step2Error">
                        {{ step2Error }}
                    </div>

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
                            :loading="loading" :disabled="loading || !isCodeComplete || !!step2Error">
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
import { useChainStore } from '@/stores/chain'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getBalance, getErc20Balance } from '~/utils/balance'
import { estimateGas, predictSafeAccountAddress, transfer, transferErc20 } from '~/utils/SafeSmartAccount'
import { displayBalance } from '~/utils/display'
import { isAddress, zeroAddress, formatUnits } from 'viem'
import { decryptKeystoreToMnemonic, mnemonicToPrivateKey } from '~/utils/encryption'
import type { TokenMetadata } from '@/utils/balance/tokens'

const route = useRoute()
const router = useRouter()
const useChain = useChainStore()
const loading = ref(false)
const step2Loading = ref(false)
const toast = useToast()
const balance = ref<bigint>(BigInt(0))
const step = ref(1)
const user = useUserStore()
const step2Error = ref('')

const formState = reactive<{
    to: string,
    amount: string,
    code: string[],
    token: TokenMetadata | undefined,
    remainingFreeTransactions: number,
    gasEstimate: string
}>({
    to: '0x22B3d0a57656C42d4Da2c68105A469DB254CEeA8',
    amount: '0.000001',
    code: Array(6).fill(''),
    token: undefined,
    remainingFreeTransactions: 0,
    gasEstimate: '0'
})

const nativeToken = computed(() => {
    return {
        address: zeroAddress,
        name: useChain.chain.nativeCurrency.name,
        symbol: useChain.chain.nativeCurrency.symbol,
        decimals: useChain.chain.nativeCurrency.decimals,
        icon: '/images/eth_logo.png'
    } as TokenMetadata
})

// 初始化表单数据
const initFormFromQuery = async () => {
    const { to, amount, chain_id, token_address } = route.query

    if (chain_id && typeof chain_id === 'string') {
        const numChainId = Number(chain_id)
        if (numChainId in chainMap) {
            await useChain.switch(numChainId)
        } else {
            toast.add({
                title: '无效链ID',
                description: 'URL中的链ID不正确',
                color: 'error'
            })
        }
    }

    if (token_address && typeof token_address === 'string') {
        const targetToken = tokenList.value.find((token) => token.address === token_address)
        if (targetToken) {
            formState.token = targetToken
        } else {
            toast.add({
                title: '无效代币地址',
                description: 'URL中的代币地址不正确或者不支持的代币',
                color: 'error'
            })
            formState.token = nativeToken.value
        }
    } else {
        formState.token = nativeToken.value
    }

    if (to && typeof to === 'string') {
        if (isAddress(to)) {
            formState.to = to
        } else {
            toast.add({
                title: '无效地址',
                description: 'URL中的接收地址格式不正确',
                color: 'error'
            })
        }
    }

    if (amount && typeof amount === 'string') {
        const numAmount = Number(amount)
        if (!isNaN(numAmount) && numAmount > 0) {
            formState.amount = amount
        } else {
            toast.add({
                title: '无效金额',
                description: 'URL中的金额必须是大于0的数字',
                color: 'error'
            })
        }
    }
}

const tokenList = computed(() => {
    const erc20TokenList = POPULAR_ERC20_TOKENS[useChain.chain.id]
    return [nativeToken.value, ...erc20TokenList]
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

// 统一的错误处理函数
const handleError = (error: unknown, title: string) => {
    console.error(error)
    toast.add({
        title,
        description: error instanceof Error ? error.message : '请稍后再试',
        color: 'error'
    })
}

// 统一的余额获取函数
const fetchTokenBalance = async () => {
    if (!formState.token) return

    try {
        loading.value = true
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
        loading.value = false
    }
}

// 统一的转账函数
const handleTokenTransfer = async () => {
    if (!formState.token) return

    loading.value = true
    try {
        const mnemonic = await decryptKeystoreToMnemonic(
            JSON.parse(user.user?.encrypted_keys as string),
            formState.code.join('')
        )
        const privateKey = await mnemonicToPrivateKey(mnemonic)

        const transferParams = {
            to: formState.to as `0x${string}`,
            amount: formState.amount,
            privateKey: privateKey as `0x${string}`,
            chain: useChain.chain,
            ...(formState.token.address !== zeroAddress && {
                erc20TokenAddress: formState.token.address as `0x${string}`
            }),
            sponsorFee: isGasSponsorshipChain(useChain.chain.id) && formState.remainingFreeTransactions > 0
        }

        const receipt = await (formState.token.address === zeroAddress
            ? transfer(transferParams)
            : transferErc20(transferParams))

        // 解决BigInt序列化问题
        // @ts-ignore
        BigInt.prototype.toJSON = function () {
            return this.toString();
        };

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
        handleError(error, '转账失败')
        step.value = 1
    } finally {
        loading.value = false
    }
}

// 表单提交
const onSubmit = async () => {
    if (step.value === 1) {
        // 验证余额
        const amount = Number(formState.amount) * 10 ** (formState.token!.decimals as number)
        if (amount > Number(balance.value)) {
            toast.add({
                title: '余额不足',
                description: '发送数量不能大于账户余额',
                color: 'error'
            })
            return
        }

        step2Loading.value = true
        let remainingFreeTransactions = 0
        step2Error.value = ''
        // 获取剩余免手续费交易次数
        try {
            if (isGasSponsorshipChain(useChain.chain.id)) {
                const { remaining_free_transactions } = await getRemainingGasCredits()
                formState.remainingFreeTransactions = remainingFreeTransactions = remaining_free_transactions
            } else {
                formState.remainingFreeTransactions = 0
            }
        } catch (error) {
            step2Loading.value = false
            console.error(error)
            step2Error.value = error instanceof Error ? error.message : '请稍后再试'
            toast.add({
                title: '获取免手续费交易次数失败',
                description: '请稍后再试',
                color: 'error'
            })
        }

        // 估算gas费用
        try {
            const predictSafeAddress = await predictSafeAccountAddress({
                owner: user.user?.evm_chain_active_key as `0x${string}`,
                chain: useChain.chain
            })
            const gas = await estimateGas({
                to: formState.to as `0x${string}`,
                amount: formState.amount,
                safeAccountAddress: predictSafeAddress,
                chain: useChain.chain,
                erc20TokenAddress: formState.token?.address as `0x${string}`,
                sponsorFee: isGasSponsorshipChain(useChain.chain.id) && remainingFreeTransactions > 0
            })
            console.log('[Gas estimate fileds]:', gas)
            const gasEstimate = (gas.callGasLimit + gas.verificationGasLimit + gas.preVerificationGas + gas.paymasterPostOpGasLimit + gas.paymasterVerificationGasLimit) * gas.maxFeePerGas
            console.log('[Gas Estimate]:', gasEstimate)
            formState.gasEstimate = formatUnits(gasEstimate as any, 9).toString()
        } catch (error) {
            step2Loading.value = false
            console.error(error)

            const getErrorMessage = (error: unknown): string => {
                if (!(error instanceof Error)) return '请稍后再试'
                if (!error.message) return '请稍后再试'
                return error.message.includes('Smart Account does not have sufficient funds to execute the User Operation')
                    ? '账户余额不足以支付手续费'
                    : error.message
            }
            step2Error.value = getErrorMessage(error)
            toast.add({
                title: '估算gas费用失败',
                description: getErrorMessage(error),
                color: 'error'
            })
        }

        step2Loading.value = false
        step.value = 2
        return
    }

    await handleTokenTransfer()
}

const handleReset = () => {
    step.value = 1
    formState.code = Array(6).fill('')
}

const handleQrCodeDetect = (values: string[]) => {
    if (values.length > 0) {
        const address = values[0]
        // 验证地址格式
        if (isAddress(address)) {
            formState.to = address
            toast.add({
                title: '扫码成功',
                description: '已填入接收地址',
                color: 'success'
            })
        } else {
            toast.add({
                title: '无效地址',
                description: '扫描的二维码不是有效的以太坊地址',
                color: 'error'
            })
        }
    }
}

// 监听token变化
watch(() => formState.token, async () => {
    await fetchTokenBalance()
}, { immediate: true })

// 在组件挂载时初始化表单
onMounted(() => {
    initFormFromQuery()
})

</script>