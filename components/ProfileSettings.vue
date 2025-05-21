<template>
    <UDropdownMenu :items="[
        {
            label: '导出钱包',
            icon: 'i-ci-download',
            onSelect: handleExportKeyStore
        },
        {
            label: '退出登录',
            icon: 'i-ci-log-out',
            onSelect: handleLogout
        }
    ]">
        <UIcon name="ci:settings" size="24" class="cursor-pointer hover:text-primary-500" />
    </UDropdownMenu>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { exportKeyStore } from '~/utils/SafeSmartAccount'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const user = computed(() => userStore.user)
const toast = useToast()
const router = useRouter()

const handleExportKeyStore = () => {
    router.push('/export')
}

const handleLogout = async () => {
    try {
        await userStore.signout()
        toast.add({
            title: '退出成功',
            description: '您已成功退出登录',
            color: 'success'
        })
    } catch (error) {
        console.error(error)
        toast.add({
            title: '退出失败',
            description: '请稍后再试',
            color: 'error'
        })
    }
}
</script> 