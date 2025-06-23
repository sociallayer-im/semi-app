<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton color="neutral" variant="ghost" class="self-start mb-4" @click="handleBack">
            返回
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 pb-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold mb-2">导入钱包</h1>
            <div class="flex flex-col gap-6 w-full" v-if="step === 1">
                <UForm :state="formState" @submit="toStep2" class="w-full">
                    <UFormField name="private" label="输入密钥" class="w-full">
                        <UTextarea v-model="formState.privateKey" placeholder="0x..." class="w-full" />
                    </UFormField>
                    <UButton type="submit" color="primary" class="w-full mt-4 flex justify-center items-center"
                        size="xl" :loading="loading" :disabled="loading">
                        下一步
                    </UButton>
                </UForm>
            </div>

            <div class="flex flex-col gap-6 w-full" v-if="step === 2">
                <UForm :state="formState" @submit="toStep3" class="w-full">
                    <UFormField name="safe" label="智能钱包地址" class="w-full">
                        <UTextarea v-model="previewWallet.safeAccount" placeholder="0x..." class="w-full" readonly />
                    </UFormField>
                    <div class="flex flex-col gap-2">
                        <span class="text-sm text-gray-500 mt-2">请确认要导入的智能钱包地址</span>
                    </div>
                    <div class="flex justify-center gap-4">
                        <UButton type="submit" color="neutral" class="w-full mt-4 flex justify-center items-center"
                            size="xl" :disabled="loading" @click="toStep1">
                            上一步
                        </UButton>
                        <UButton type="submit" color="primary" class="w-full mt-4 flex justify-center items-center"
                            size="xl" :loading="loading" :disabled="loading">
                            下一步
                        </UButton>
                    </div>
                </UForm>
            </div>

            <div class="flex flex-col gap-6 w-full" v-if="step === 3">
                <UForm :state="formState" @submit="step = 4" class="w-full">
                    <UFormField name="safe" label="设置6位数字支付码" class="w-full">
                        <UPinInput variant="subtle" type="number" v-model="formState.pin" :length="6" size="xl"
                            class="w-full" :ui="{ base: 'w-full' }" :disabled="loading" mask />
                    </UFormField>
                    <div class="flex justify-center gap-4">
                        <UButton type="submit" color="neutral" class="w-full mt-4 flex justify-center items-center"
                            size="xl" :disabled="loading" @click="step = 2">
                            上一步
                        </UButton>
                        <UButton type="submit" color="primary" class="w-full mt-4 flex justify-center items-center"
                            size="xl" :loading="loading" :disabled="loading">
                            下一步
                        </UButton>
                    </div>
                </UForm>
            </div>

            <div class="flex flex-col gap-6 w-full" v-if="step === 4">
                <UForm :state="formState" @submit="handleImport" class="w-full">
                    <UFormField name="safe" label="确认密码" class="w-full">
                        <UPinInput variant="subtle" type="number" v-model="formState.pinConfirm" :length="6" size="xl"
                            class="w-full" :ui="{ base: 'w-full' }" :disabled="loading" mask />
                    </UFormField>
                    <div class="flex flex-col gap-2">
                        <span class="text-sm text-gray-500 mt-2">再次输入密码</span>
                    </div>
                    <div class="flex justify-center gap-4">
                        <UButton type="submit" color="neutral" class="w-full mt-4 flex justify-center items-center"
                            size="xl" :disabled="loading" @click="backToStep3">
                            上一步
                        </UButton>
                        <UButton type="submit" color="primary" class="w-full mt-4 flex justify-center items-center"
                            size="xl" :loading="loading" :disabled="loading">
                            导入
                        </UButton>
                    </div>
                </UForm>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { isPrivateKey } from '~/utils'
import { useChainStore } from '~/stores/chain'
import { predictSafeAccountAddress } from '~/utils/SafeSmartAccount'
import { setEncryptedKeys } from '~/utils/semi_api'

const router = useRouter()
const userStore = useUserStore()
const toast = useToast()
const chainStore = useChainStore()

const loading = ref(false)
const step = ref(1)
const formState = reactive({
    privateKey: '',
    pin: Array(6).fill(''),
    pinConfirm: Array(6).fill('')
})
const previewWallet = ref({
    eoa: '',
    safeAccount: ''
})


const handleBack = async () => {
    router.push('/init')
}

const toStep1 = async () => {
    step.value = 1
    previewWallet.value = {
        eoa: '',
        safeAccount: ''
    }
}

const backToStep3 = async () => {
    step.value = 3
    formState.pinConfirm = Array(6).fill('')
}

const toStep2 = async () => {
    loading.value = true
    const validation = isPrivateKey(formState.privateKey)
    if (!validation) {
        toast.add({
            title: '私钥格式错误',
            color: 'error'
        })
        loading.value = false
        return
    }

    const eoa = privateKeyToSafeAccount(formState.privateKey as `0x${string}`)
    const safeAccount = await predictSafeAccountAddress({
        owner: eoa,
        chain: chainStore.chain
    })

    previewWallet.value = {
        eoa,
        safeAccount
    }

    loading.value = false
    step.value = 2
}


const toStep3 = async () => {
    if (previewWallet.value.eoa && previewWallet.value.safeAccount) {
        step.value = 3
    } else {
        toast.add({
            title: '请先输入私钥',
            color: 'error'
        })
    }
}

const handleImport = async () => {
    const password = formState.pin.join('')

    if (password !== formState.pinConfirm.join('')) {
        toast.add({
            title: '密码不一致',
            color: 'error'
        })
        return
    }

    if (password.length !== 6) {
        toast.add({
            title: '请输入支付码',
            color: 'error'
        })
        return
    }


    loading.value = true
    try {
        const keystore = await encryptMnemonicToKeystore(formState.privateKey, formState.pin.join(''))
        const opts = {
            id: userStore.user!.id,
            encrypted_keys: JSON.stringify(keystore),
            evm_chain_active_key: previewWallet.value.eoa,
            evm_chain_address: previewWallet.value.safeAccount,
        }
        console.log('[import] options', opts)
        const response = await setEncryptedKeys(opts)

        if (response.result === 'ok') {
            // 更新用户信息
            await userStore.getUser(true)
            toast.add({
                title: '导入成功',
                description: '钱包和支付码已设置完成',
                color: 'success'
            })
            router.push('/')
        } else {
            throw new Error('设置失败')
        }
    } catch (error) {
        console.error('[import] error', error)
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