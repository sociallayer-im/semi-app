<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton
            icon="i-heroicons-arrow-left"
            color="neutral"
            variant="ghost"
            class="self-start mb-4"
            @click="router.push('/')"
        >
            返回
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 py-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold">登录</h1>
            <div>输入登录手机号</div>
            <UForm :state="formState" @submit="onSubmit" class="w-full">
                <UFormField name="phone">
                    <UInput
                        size="xl"
                        class="w-full"
                        v-model="formState.phone"
                        placeholder="请输入手机号"
                        :ui="{ base: 'w-full' }"
                        :disabled="loading"
                        variant="subtle"
                    />
                </UFormField>
                <UButton
                    type="submit"
                    color="primary"
                    class="w-full mt-4 flex justify-center items-center"
                    size="xl"
                    :loading="loading"
                    :disabled="loading || !formState.phone"
                >
                    下一步
                </UButton>
            </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { sendSMS } from '~/utils/semi_api'

definePageMeta({
    layout: 'unauth'
})

const router = useRouter()
const loading = ref(false)
const toast = useToast()

const formState = reactive({
    phone: ''
})

const validatePhone = (value: string) => {
    if (!value) return '请输入手机号'
    if (!/^\d{11}$/.test(value)) return '请输入11位数字手机号'
    return true
}

const onSubmit = async () => {
    loading.value = true
    try {
        const validation = validatePhone(formState.phone)
        if (validation === true) {
            await sendSMS(formState.phone)
            await router.push(`/verifyphone?phone=${formState.phone}`)
        } else {
            toast.add({
                title: '请输入正确的手机号',
                description: validation,
                color: 'error'
            })
        }
    } finally {
        loading.value = false
    }
}
</script>
