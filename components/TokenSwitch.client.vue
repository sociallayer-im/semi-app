<template>
  <UDropdownMenu :items="tokenItems">
    <UButton color="neutral" variant="subtle" class="text-2xl cursor-pointer">
      <img :src="currentTokenIcon" alt="" class="w-6 h-6 block flex-shrink-0 rounded-full" />
      <span class="text-xl">{{ currentTokenSymbol }}</span>
      <UIcon name="ci:caret-down" class="text-2xl" />
    </UButton>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { TokenMetadata } from "../utils/balance/tokens";

const props = defineProps<{
  tokenList: TokenClass[];
  modelValue: TokenClass;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: TokenClass];
}>();

const tokenItems = computed(() =>
  props.tokenList.map(
    (token) =>
      ({
        label: token.name,
        onSelect: () => handleTokenSwitch(token),
        avatar: {
          src: token.image_url,
          size: "xs",
        },
      }) as const
  )
);

const currentTokenIcon = computed(() => props.modelValue.image_url);
const currentTokenSymbol = computed(() => props.modelValue.symbol);

const handleTokenSwitch = (token: TokenClass) => {
  emit("update:modelValue", token);
};
</script>
