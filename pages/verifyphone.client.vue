<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg  p-4">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="router.push('/login')">
            返回
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 py-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold">验证手机号</h1>
            <div>请输入<span class="text-primary font-semibold mx-1">{{ phone.slice(0, 3) }}...{{ phone.slice(-4)
                    }}</span>收到的8位验证码</div>
            <UForm :state="formState" @submit="onSubmit" class="w-full">
                <UFormField name="pin">
                    <UPinInput variant="subtle" type="number" v-model="formState.pin" :length="6" size="xl" class="w-full"
                        :ui="{ base: 'w-full' }" :disabled="loading" />
                </UFormField>
                <div class="flex justify-between items-center mt-2">
                    <UButton type="button" color="neutral" variant="ghost" :disabled="countdown > 0 || loading"
                        @click="resendCode">
                        {{ countdown > 0 ? `重新发送(${countdown})` : '重新发送验证码' }}
                    </UButton>
                </div>
                <UButton type="submit" color="primary" class="w-full mt-4 flex justify-center items-center" size="xl"
                    :loading="loading" :disabled="loading">
                    验证
                </UButton>
            </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { sendSMS, signIn } from '~/utils/semi_api'
import { useUserStore } from '~/stores/user'

definePageMeta({
    layout: 'unauth'
})

const router = useRouter()
const route = useRoute()
const phone = computed(() => route.query.phone as string || '')
const loading = ref(false)
const countdown = ref(60)
const toast = useToast()
const userStore = useUserStore()

const startCountdown = () => {
    countdown.value = 60
    const timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(timer)
        }
    }, 1000)
}

const resendCode = async () => {
    if (countdown.value > 0) return
    loading.value = true
    try {
        const response = await sendSMS(phone.value)
        if (response.result === 'ok') {
            toast.add({
                title: '发送成功',
                description: '验证码已发送到您的手机',
                color: 'success'
            })
            startCountdown()
        }
    } catch (error) {
        console.error('发送验证码失败:', error)
        toast.add({
            title: '发送验证码失败',
            description: '请稍后重试',
            color: 'error'
        })
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    startCountdown()
})

const formState = reactive({
    pin: Array(8).fill('')
})

const validatePin = (value: string[]) => {
    const pin = value.join('')
    if (!pin) return '请输入验证码'
    if (!/^\d{6}$/.test(pin)) return '请输入8位数字验证码'
    return true
}

const onSubmit = async () => {
    loading.value = true
    try {
        const validation = validatePin(formState.pin)
        if (validation === true) {
            const response = await signIn(phone.value, formState.pin.join(''))
            if (response.result === 'ok') {
                toast.add({
                    title: '验证成功',
                    description: '正在跳转到首页',
                    color: 'success'
                })

                const user = await getMe()
                console.log('[user]:', user)

                if (!user.encrypted_keys) {
                    router.replace('/paymentcode')
                    return
                }

                userStore.setUser(user)
                await router.push('/')
            }
        } else {
            toast.add({
                title: '请输入正确的验证码',
                description: validation,
                color: 'error'
            })
        }
    } catch (error) {
        console.error('验证失败:', error)
        toast.add({
            title: '验证失败',
            description: '请检查验证码是否正确',
            color: 'error'
        })
    } finally {
        loading.value = false
    }
}
</script>
