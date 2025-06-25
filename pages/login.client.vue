<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton
            icon="i-heroicons-arrow-left"
            color="neutral"
            variant="ghost"
            class="self-start mb-4"
            @click="router.push('/')"
        >
            {{ i18n.text.Back }}
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 py-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold">{{ i18n.text.Login }}</h1>
            <div>{{ i18n.text['Enter your login phone number'] }}</div>
            <UForm :state="formState" @submit="onSubmit" class="w-full">
                <UFormField name="phone">
                    <UInput
                        size="xl"
                        class="w-full"
                        v-model="formState.phone"
                        :placeholder="i18n.text['Please enter phone number']"
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
                    {{ i18n.text.Next }}
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
const i18n = useI18n()

const formState = reactive({
    phone: ''
})

const validatePhone = (value: string) => {
    if (!value) return i18n.text['Please enter phone number']
    if (!/^\d{11}$/.test(value)) return i18n.text['Please enter phone number']
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
                title: i18n.text['Please enter correct phone number'],
                description: validation,
                color: 'error'
            })
        }
    } finally {
        loading.value = false
    }
}
</script>
