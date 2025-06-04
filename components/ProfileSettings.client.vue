<template>
    <UDropdownMenu :items="menueItems">
        <UIcon name="ci:settings" size="24" class="cursor-pointer hover:text-primary-500" />
    </UDropdownMenu>
</template>

<script setup lang="ts">
import { useModuleStore, type ModuleType } from '../stores/module'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const toast = useToast()
const router = useRouter()
const moduleStore = useModuleStore()

const handleExportKeyStore = () => {
    router.push('/export')
}

const handleRecoverSetup = () => {
    router.push('/recover_setup')
}

const menueItems = computed(() => {
    const items = [
        {
            label: '导出钱包',
            icon: 'i-ci-download',
            onSelect: handleExportKeyStore
        }
    ]
    
    if (moduleStore.module === '4337') {
        items.push({
            label: '切换到7579模块',
            icon: 'ci-arrows-reload-01',
            onSelect: handleSwitchModule
        })
    } else {
        items.push({
            label: '切换到4337模块',
            icon: 'ci-arrows-reload-01',
            onSelect: handleSwitchModule
        })
        items.push({
            label: '配置恢复邮箱',
            icon: 'i-ci-mail',
            onSelect: handleRecoverSetup
        })
    }

    items.push({
        label: '退出登录',
        icon: 'i-ci-log-out',
        onSelect: handleLogout
    })

    return items
})

const handleSwitchModule = () => {
    moduleStore.switch()
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