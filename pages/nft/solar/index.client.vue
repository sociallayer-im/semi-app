<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4">
        <div class="flex flex-col gap-4">
            <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
                @click="router.push('/')">
                {{ i18n.text['Back'] }}
            </UButton>
            <div class="flex flex-col gap-4">
                <div class="text-2xl font-bold text-center mb-4">Solar NFT</div>
                <NuxtLink href="/nft/solar/registry" class="hover:border-primary justify-between h-40 flex flex-1 flex-row gap-4 items-center border-[var(--ui-border)] border-2 rounded-xl p-4">
                    <div class="flex flex-col">
                        <span class="text-lg font-bold">Registry</span>
                        <span class="text-sm text-gray-500">Interact with Register contract</span>
                    </div>
                    <UIcon name="ci-chevron-right" size="36" class="text-gray-500 " />
                </NuxtLink>
                <NuxtLink href="/nft/solar/badge" class="hover:border-primary justify-between h-40 flex flex-1 flex-row gap-4 items-center border-[var(--ui-border)] border-2 rounded-xl p-4">
                    <div class="flex flex-col">
                        <span class="text-lg font-bold">Badge</span>
                        <span class="text-sm text-gray-500">Interact with Badge contract</span>
                    </div>
                    <UIcon name="ci-chevron-right" size="36" class="text-gray-500 " />
                </NuxtLink>
                <NuxtLink href="/nft/solar/minter" class="hover:border-primary justify-between h-40 flex flex-1 flex-row gap-4 items-center border-[var(--ui-border)] border-2 rounded-xl p-4">
                    <div class="flex flex-col">
                        <span class="text-lg font-bold">Minter</span>
                        <span class="text-sm text-gray-500">Interact with Minter contract</span>
                    </div>
                    <UIcon name="ci-chevron-right" size="36" class="text-gray-500 " />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const i18n = useI18n()

</script>

<style scoped></style>