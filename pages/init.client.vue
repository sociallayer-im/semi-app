<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton color="neutral" variant="ghost" class="self-start mb-4" @click="handleLogout">
            {{ i18nStore.text['Logout'] }}
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 py-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold mb-4">{{ i18nStore.text['Choose Wallet Initialization Method'] }}</h1>
            <div class="flex flex-col gap-6 w-full">
                <NuxtLink href="/paymentcode" class="hover:border-primary h-40 flex flex-1 flex-row gap-4 items-center border-[var(--ui-border)] border-2 rounded-xl p-4">
                    <UIcon name="ci-add-plus-circle" size="46" class="text-green-500 " />
                    <div class="flex flex-col">
                        <span class="text-lg font-bold">{{ i18nStore.text['Create'] }}</span>
                        <span class="text-sm text-gray-500">{{ i18nStore.text['We will create a new wallet for you'] }}</span>
                    </div>
                </NuxtLink>
                <NuxtLink href="/import" class="hover:border-primary flex flex-1 flex-row gap-4 items-center border-[var(--ui-border)] border-2 rounded-xl p-4">
                    <UIcon name="ci-arrow-circle-down" size="46" class="text-blue-500" />
                    <div class="flex flex-col">
                        <span class="text-lg font-bold">{{ i18nStore.text['Import'] }}</span>
                        <span class="text-sm text-gray-500">{{ i18nStore.text['Import an existing wallet'] }}</span>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const router = useRouter()
const userStore = useUserStore()
const toast = useToast()
const i18nStore = useI18n()

onMounted(async () => {
    if (!userStore.user) {
        router.push('/')
    }
})

const handleLogout = async () => {
    try {
        await userStore.signout()
        toast.add({
            title: i18nStore.text['Logout Success'],
            color: 'success'
        })
        router.push('/')
    } catch (error) {
        console.error('登出失败:', error)
        toast.add({
            title: i18nStore.text['Logout Failed'],
            description: i18nStore.text['Please try again later'],
            color: 'error'
        })
    }
}
</script>