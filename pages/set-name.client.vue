<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="handleLogout">
            退出登录
        </UButton>
        <div class="flex flex-col items-center justify-center h-full gap-4 pb-8 w-[80%] mx-auto">
            <h1 class="text-2xl font-bold">设置您的用户名</h1>
            <UForm :state="formState" @submit="onSubmit" class="w-full">
                <UFormField name="handle">
                    <UInput size="xl" class="w-full" v-model="formState.handle" placeholder="请输入用户名"
                        :ui="{ base: 'w-full' }" :disabled="loading" variant="subtle" />
                </UFormField>
                <div class="text-sm text-gray-500 mt-2">长度在6-30个字符之间；</div>
                <div class="text-sm text-gray-500">只允许使用字母、数字、下划线和连字符；</div>
                <div class="text-sm text-gray-500">不能全部为数字。</div>
                <UButton type="submit" color="primary" class="w-full mt-4 flex justify-center items-center" size="xl"
                    :loading="loading" :disabled="loading || !formState.handle">
                    确认
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

const formState = reactive({
    handle: ''
})

const handleLogout = async () => {
    try {
        await userStore.signout()
        toast.add({
            title: '退出成功',
            description: '您已成功退出登录',
            color: 'success'
        })
        router.push('/')
    } catch (error) {
        console.error(error)
        toast.add({
            title: '退出失败',
            description: '请稍后再试',
            color: 'error'
        })
    }
}

const validateHandle = (value: string) => {
    if (!value) return '请输入用户名'
    if (value.length < 6) return '用户名至少需要6个字符'
    if (value.length > 30) return '用户名不能超过30个字符'
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) return '用户名只能包含字母、数字、下划线和连字符'
    if (/^\d+$/.test(value)) return '用户名不能全部为数字'
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
                    title: '用户名已存在',
                    description: '请输入其他用户名',
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
                title: '请输入正确的用户名',
                description: validation,
                color: 'error'
            })
        }
    } finally {
        loading.value = false
    }
}
</script>