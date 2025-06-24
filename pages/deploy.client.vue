<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="router.push('/')">
            返回
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 pb-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold" v-if="step != 3">发行代币</h1>

            <!-- 步骤1：输入代币信息 -->
            <div v-if="step === 1" class="w-full">
                <UForm :state="formState" @submit="onSubmit" class="w-full">
                    <UFormField name="name" label="代币名称">
                        <UInput variant="subtle" size="xl" class="w-full" v-model="formState.name" placeholder="请输入代币名称"
                            :ui="{ base: 'w-full' }" :disabled="initializing" />
                    </UFormField>

                    <UFormField name="symbol" label="代币符号" class="mt-4">
                        <UInput variant="subtle" size="xl" class="w-full" v-model="formState.symbol"
                            placeholder="请输入代币符号" :ui="{ base: 'w-full' }" :disabled="initializing" />
                    </UFormField>

                    <!-- 可选预铸造选项 -->
                    <div class="mt-3">
                        <div class="flex items-center gap-2 mb-4 mt-2">
                            <UCheckbox v-model="formState.enablePreMint" />
                            <span class="text-sm">启用预铸造</span>
                        </div>

                        <div v-if="formState.enablePreMint" class="space-y-4 mb-4">
                            <UFormField name="minter" label="接收者地址">
                                <UInput variant="subtle" size="xl" class="w-full" v-model="formState.minter"
                                    placeholder="请输入接收者地址" :ui="{ base: 'w-full' }" :disabled="initializing" />
                            </UFormField>

                            <UFormField name="initMint" label="初始铸造数量" class="mt-4">
                                <UInput variant="subtle" size="xl" class="w-full" v-model="formState.initMint"
                                    placeholder="请输入初始铸造数量" :ui="{ base: 'w-full' }" :disabled="initializing" />
                            </UFormField>
                        </div>
                    </div>

                    <UButton type="submit" color="primary" class="w-full mt-6 flex justify-center items-center"
                        size="xl" :loading="initializing || loading"
                        :disabled="initializing || loading || !isFormValid">
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

                    <div class="flex gap-4 mt-4">
                        <UButton type="button" color="neutral" class="flex-1 flex justify-center items-center" size="xl"
                            :disabled="loading" @click="handleReset">
                            上一步
                        </UButton>
                        <UButton type="submit" color="primary" class="flex-1 flex justify-center items-center" size="xl"
                            :loading="loading" :disabled="loading || !isCodeComplete">
                            确认部署
                        </UButton>
                    </div>
                </UForm>
            </div>

            <!-- 步骤3：部署结果 -->
            <div v-if="step === 3" class="w-full">
                <div class="text-center mb-6">
                    <UIcon name="ci:circle-check-outline" class="text-green-500 text-8xl" />
                    <h2 class="text-xl font-semibold mb-2">部署成功</h2>
                    <p class="text-gray-500 text-sm">代币合约已成功部署到区块链</p>
                </div>

                <div class="space-y-4 mb-6">
                    <UFormField name="contractAddress" label="合约地址">
                        <div class="flex flex-row gap-2 items-start">
                            <UTextarea variant="subtle" size="xl" class="w-full" v-model="newContractAddress"
                                placeholder="请输入合约地址" :ui="{ base: 'w-full' }" :disabled="true" readonly />
                            <div class="flex flex-col gap-2 items-start">
                                <UButton type="button" variant="outline" color="neutral" size="xl"
                                @click="handleCopy(newContractAddress)">
                                <UIcon name="ci:copy" size="22" class="cursor-pointer hover:text-primary-500 text-sm" />
                            </UButton>
                            <UButton type="button" variant="outline" color="neutral" size="xl"
                                @click="gotoExplorer(newContractAddress, 'address')">
                                <UIcon name="ci:globe" size="22" class="cursor-pointer hover:text-primary-500 text-sm" />
                            </UButton>
                            </div>
                        </div>
                    </UFormField>

                    <UFormField name="txHash" label="交易哈希">
                        <div class="flex flex-row gap-2 items-start">
                            <UTextarea variant="subtle" size="xl" class="w-full" v-model="txHash" placeholder="请输入交易哈希"
                                :ui="{ base: 'w-full' }" :disabled="true" readonly />
                            <div class="flex flex-col gap-2 items-start">
                                <UButton type="button" variant="outline" color="neutral" size="xl"
                                @click="handleCopy(txHash)">
                                <UIcon name="ci:copy" size="22" class="cursor-pointer hover:text-primary-500 text-sm" />
                            </UButton>

                            <UButton type="button" variant="outline" color="neutral" size="xl"
                                @click="gotoExplorer(txHash, 'tx')">
                                <UIcon name="ci:globe" size="22" class="cursor-pointer hover:text-primary-500 text-sm" />
                            </UButton>
                            </div>
                        </div>
                    </UFormField>
                </div>

                <UButton type="button" color="primary" class="w-full flex justify-center items-center" size="xl"
                    @click="handleConfirm">
                    确定
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useChainStore } from '@/stores/chain'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { isAddress, encodeDeployData, zeroAddress, parseEther } from 'viem'
import { keystoreToPrivateKey } from '~/utils/encryption'
import { abi, bytecode } from '~/utils/deploy/Minimal.json'
import { deploy } from '~/utils/SafeSmartAccount/operation'

// 类型定义
interface FormState {
    name: string
    symbol: string
    owner: string
    enablePreMint: boolean
    minter: string
    initMint: string
    code: string[]
}

// 常量
const CODE_LENGTH = 6
const DEFAULT_CODE = Array(CODE_LENGTH).fill('1')

// 组合式函数
const router = useRouter()
const useChain = useChainStore()
const useUser = useUserStore()
const toast = useToast()

// 响应式状态
const initializing = ref(false)
const loading = ref(false)
const step = ref(1)
const newContractAddress = ref('')
const txHash = ref('')

const formState = reactive<FormState>({
    name: '',
    symbol: '',
    owner: import.meta.env.VITE_TOKEN_OWNER || useUser.user?.evm_chain_address || zeroAddress,
    enablePreMint: false,
    minter: '',
    initMint: '',
    code: [...DEFAULT_CODE]
})

// 计算属性
const isFormValid = computed(() => {
    console.log(formState.name, formState.symbol, formState.owner)
    if (!formState.name || !formState.symbol || !formState.owner) return false
    if (!isAddress(formState.owner)) return false

    // 如果启用预铸造，验证相关字段
    if (formState.enablePreMint) {
        if (!formState.minter || !formState.initMint) return false
        if (!isAddress(formState.minter)) return false
        if (isNaN(Number(formState.initMint)) || Number(formState.initMint) <= 0) return false
    }

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
    formState.code = [...DEFAULT_CODE]
}

// 业务逻辑函数
const deployToken = async () => {
    loading.value = true
    try {
        const privateKey = await keystoreToPrivateKey(
            JSON.parse(useUser.user?.encrypted_keys as string),
            formState.code.join('')
        )

        // TODO: 实现部署函数
        const deployData = encodeDeployData({
            abi,
            bytecode: bytecode.object as `0x${string}`,
            args: [
                formState.name,
                formState.symbol,
                formState.owner,
                formState.minter || zeroAddress,
                formState.initMint ? parseEther(formState.initMint).toString() : '0'
            ],
        })

        const receipt = await deploy({
            privateKey: privateKey as `0x${string}`,
            chain: useChain.chain,
            callData: deployData,
        })

        console.log('[deploy contract receipt]: ', receipt)
        const targetLog = receipt.logs.find((log: any) => log.address === CREATE_CALL_CONTRACT[useChain.chain.id])
        if (targetLog) {
            console.log('[targetLog]: ', targetLog)
            newContractAddress.value = '0x' + targetLog.data.slice(26)
            txHash.value = receipt.receipt.transactionHash
        }

        step.value = 3
        toast.add({
            title: '部署成功',
            description: '代币合约已成功部署',
            color: 'success'
        })
    } catch (error) {
        handleError(error, '部署失败', getErrorMessage(error))
        resetForm()
    } finally {
        loading.value = false
    }
}

const onSubmit = async () => {
    if (step.value === 1) {
        step.value = 2
        return
    }

    await deployToken()
}

const handleReset = () => {
    resetForm()
}

const handleConfirm = () => {
    // 重置所有表单字段到初始状态
    Object.assign(formState, {
        name: '',
        symbol: '',
        owner: import.meta.env.VITE_TOKEN_OWNER!,
        enablePreMint: false,
        minter: '',
        initMint: '',
        code: [...DEFAULT_CODE]
    })

    // 重置其他状态
    step.value = 1
    newContractAddress.value = ''
    txHash.value = ''
}

const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.add({
        title: '复制成功',
        description: '合约地址已复制到剪贴板',
        color: 'success'
    })
}

const gotoExplorer = (addressOrTxHash: string, type: 'address' | 'tx') => {
    window.open(useChain.chain.blockExplorers?.default.url + '/' + type + '/' + addressOrTxHash, '_blank')
}

// 监听器
watch(() => formState.enablePreMint, (newValue) => {
    if (!newValue) {
        formState.minter = ''
        formState.initMint = ''
    }
})
</script>