<script setup>
const userStore = useUserStore()
const user = computed(() => userStore.user)
const ready = ref(false)
const toast = useToast()
const router = useRouter()

onMounted(async () => {
    try {
        await userStore.getUser()
        if (!!user.value && !user.value.encrypted_keys) {
            router.replace('/paymentcode')
            return
        }

        ready.value = true
    } catch (error) {
        console.error(error)
        toast.add({
            title: '获取用户信息失败',
            color: 'error'
        })
    } finally {
        ready.value = true
    }
})
</script>

<template>
    <UApp>
        <div
            class="min-h-screen w-full flex p-4 flex-col justify-center items-center relative layout-bg bg-elevated bg-center">
            <slot v-if="user" />
            <Welcome v-else :ready="ready" />
        </div>
    </UApp>
</template>

<style scoped>
.layout-bg {
    background-position: top;
    background-repeat: repeat-x;
    background-image: url('/images/layout_bg.png');
}
</style>
