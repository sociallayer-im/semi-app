<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="handleLogout">
            {{ i18n.text['Logout'] }}
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 pb-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold">{{ i18n.text['Set Your Username'] }}</h1>
            <UForm :state="formState" @submit="onSubmit" class="w-full">
                <UFormField name="handle">
                    <UInput size="xl" class="w-full" v-model="formState.handle" :placeholder="i18n.text['Please enter username']"
                        :ui="{ base: 'w-full' }" :disabled="loading" variant="subtle" />
                </UFormField>
                <div class="text-sm text-gray-500 mt-2">{{ i18n.text['Length between 6-30 characters'] }}</div>
                <div class="text-sm text-gray-500">{{ i18n.text['Only letters, numbers, underscores and hyphens are allowed'] }}</div>
                <div class="text-sm text-gray-500">{{ i18n.text['Cannot be all numbers'] }}</div>
                <UButton type="submit" color="primary" class="w-full mt-4 flex justify-center items-center" size="xl"
                    :loading="loading" :disabled="loading || !formState.handle">
                    {{ i18n.text['Confirm'] }}
                </UButton>
            </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'unauth'
})

const router = useRouter()
const loading = ref(false)
const toast = useToast()
const userStore = useUserStore()
const i18n = useI18n()

const formState = reactive({
    handle: ''
})

const handleLogout = async () => {
    try {
        await userStore.signout()
        toast.add({
            title: i18n.text['Logout Success'],
            description: i18n.text['You have successfully logged out'],
            color: 'success'
        })
        router.push('/')
    } catch (error) {
        console.error(error)
        toast.add({
            title: i18n.text['Logout Failed'],
            description: i18n.text['Please try again later'],
            color: 'error'
        })
    }
}

const validateHandle = (value: string) => {
    if (!value) return i18n.text['Please enter username first']
    if (value.length < 6) return i18n.text['Username must be at least 6 characters']
    if (value.length > 30) return i18n.text['Username cannot exceed 30 characters']
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) return i18n.text['Username can only contain letters, numbers, underscores and hyphens']
    if (/^\d+$/.test(value)) return i18n.text['Username cannot be all numbers']
    return true
}

const onSubmit = async () => {
    loading.value = true
    try {
        const validation = validateHandle(formState.handle)
        if (validation === true) {
            // 查找用户名是否存在
            try {
                const user = await getUserByHandle(formState.handle)
                toast.add({
                    title: i18n.text['Username already exists'],
                    description: i18n.text['Please enter another username'],
                    color: 'error'
                })
                return
            } catch (error) {
                console.log('handle not found')
            }

            // 设置用户名
            await setHandle(userStore.user!.id, formState.handle)
            // 更新用户信息
            await userStore.getUser(true)
            // 返回首页
            await router.push('/')
        } else {
            toast.add({
                title: i18n.text['Please enter correct username'],
                description: validation,
                color: 'error'
            })
        }
    } finally {
        loading.value = false
    }
}
</script>