<template>
    <div class="flex flex-col container-size rounded-xl bg-[var(--ui-bg)] shadow-lg p-4 "
        :style="{ maxHeight: `90svh` }">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" class="self-start mb-4"
            @click="router.back()">
            {{ i18n.text['Back'] }}
        </UButton>
        <div class="text-2xl font-bold text-center mb-4">Minter Contract</div>
        <div class="flex flex-col gap-4">
            <NuxtLink href="/nft/solar/minter/deploy"
                class="hover:border-primary justify-between h-40 flex flex-1 flex-row gap-4 items-center border-[var(--ui-border)] border-2 rounded-xl p-4">
                <div class="flex flex-col">
                    <span class="text-lg font-bold">Deploy</span>
                </div>
                <UIcon name="ci-chevron-right" size="26" class="text-gray-500 " />
            </NuxtLink>
            <NuxtLink href="/nft/solar/minter/register_class"
                class="hover:border-primary justify-between h-40 flex flex-1 flex-row gap-4 items-center border-[var(--ui-border)] border-2 rounded-xl p-4">
                <div class="flex flex-col">
                    <span class="text-lg font-bold">Register Class</span>
                </div>
                <UIcon name="ci-chevron-right" size="26" class="text-gray-500 " />
            </NuxtLink>
            <NuxtLink href="/nft/solar/minter/mint_token"
                class="hover:border-primary justify-between h-40 flex flex-1 flex-row gap-4 items-center border-[var(--ui-border)] border-2 rounded-xl p-4">
                <div class="flex flex-col">
                    <span class="text-lg font-bold">Mint Token</span>
                </div>
                <UIcon name="ci-chevron-right" size="26" class="text-gray-500 " />
            </NuxtLink>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { TabsItem } from '@nuxt/ui'

const router = useRouter()
const i18n = useI18n()


</script>

<style scoped></style>