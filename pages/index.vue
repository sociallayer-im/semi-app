<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const user = computed(() => userStore.user)
const ready = ref(false)
const toast = useToast()

onMounted(async () => {
    try {
        await userStore.getUser()
        ready.value = true
    } catch (error) {
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
  <Profile v-if="user" :user="user" />
  <Welcome :ready="ready" v-else />
</template>
