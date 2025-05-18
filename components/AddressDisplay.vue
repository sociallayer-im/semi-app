<template>
    <div class="flex items-center gap-2 bg-accented rounded-full px-4 py-2 cursor-pointer hover:bg-accented/80 transition-colors" @click="copyAddress">
        <img :src="imageUrl"
            class="w-7 h-7 rounded-full border-2 border-green-400" alt="avatar" />
        <span class="font-medium" v-if="address">{{ formatAddress(address) }}</span>
        <UIcon name="ci:copy" size="24" class="cursor-pointer hover:text-primary-500 text-sm" />
    </div>
</template>

<script setup lang="ts">
import { formatAddress } from '~/utils/display'

const props = defineProps<{
    imageUrl: string
    address: string
}>()

const toast = useToast()

const copyAddress = async () => {
    try {
        await navigator.clipboard.writeText(props.address)
        toast.add({
            title: '复制成功',
            description: '地址已复制到剪贴板',
            color: 'success'
        })
    } catch (error) {
        toast.add({
            title: '复制失败',
            description: '请手动复制地址',
            color: 'error'
        })
    }
}
</script> 