<template>
    <UModal :title="i18n.text['Badge Class Details']">
        <div class="flex flex-col items-center justify-center bg-muted rounded-lg p-4 overflow-hidden gap-2">
            <div class="flex items-center justify-center bg-gray-500 rounded-full overflow-hidden">
                <img :src="badgeClass.metadata.class_image_url" class="w-16 h-16 rounded-full" alt=""></img>
            </div>
            <div class="max-w-full text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                {{ badgeClass.metadata.class_name }}
            </div>
        </div>

        <template #body>
            <div class="flex flex-col items-center justify-center gap-4">
                <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-500 my-2 flex items-center justify-center">
                    <img :src="badgeClass.metadata.class_image_url" alt="badge image" class="object-cover w-full h-full">
                </div>
                <div class="text-2xl font-bold">{{ badgeClass.metadata.class_name }}</div>
                <div class="text-sm text-gray-500">
                    {{ badgeClass.metadata.class_description }}
                </div>

                <div class="flex flex-col gap-2 w-full overflow-x-auto bg-muted p-2 rounded-lg">
                    <div class="flex flex-row items-start justify-between gap-2" v-if="badgeClass.tx_hash">
                        <div class="font-bold text-xs text-gray-500 whitespace-nowrap min-w-22">{{ i18n.text['Tx Hash'] }}</div>
                        <div class="break-all text-xs text-right">{{ badgeClass.tx_hash }}</div>
                    </div>
                    <div class="flex flex-row items-start justify-between gap-2">
                        <div class="font-bold text-xs text-gray-500 whitespace-nowrap min-w-22">{{ i18n.text['Creator'] }}</div>
                        <div class="text-xs break-all text-right">{{ badgeClass.wallet_address }}</div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer v-if="isOwner">
            <div class="flex justify-center gap-4 w-full">
                <UButton color="primary" 
                size="xl" class="flex-1 justify-center"
                @click="handleSendBadges">{{ i18n.text['Send Badges'] }}</UButton>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { BadgeClass } from '@/server/api/badge/types'

const router = useRouter()
const i18n = useI18n()

const props = defineProps<{
    badgeClass: BadgeClass
}>()

const user = useUserStore()

const isOwner = computed(() => {
    if (!user.user || !user.user.evm_chain_address) {
        return false
    }

   return user.user.evm_chain_address === props.badgeClass.wallet_address
})

const handleSendBadges = async () => {
    router.push(`/badges/send/${props.badgeClass.class_id}`)
}
</script>