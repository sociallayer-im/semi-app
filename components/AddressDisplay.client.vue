<template>
  <div
    class="flex items-center gap-2 bg-accented rounded-full px-4 py-2 cursor-pointer hover:bg-accented/80 transition-colors"
    @click="copyAddress"
  >
    <img
      :src="imageUrl"
      v-if="imageUrl"
      class="w-7 h-7 rounded-full border-2 border-green-400"
      alt="avatar"
    />
    <Avatar :name="address || zeroAddress" :size="28" variant="beam" v-else-if="showAvatar" />
    <span class="font-medium break-all" v-if="address">{{
      compact ? formatAddress(address) : address
    }}</span>
    <UIcon name="ci:copy" size="24" class="cursor-pointer hover:text-primary-500 text-sm" />
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { formatAddress } from "~/utils/display";
import Avatar from "vue-boring-avatars";
import { zeroAddress } from "viem";

const props = withDefaults(
  defineProps<{
    address: string;
    imageUrl?: string;
    compact?: boolean;
    showAvatar?: boolean;
  }>(),
  {
    compact: true,
    showAvatar: true,
  }
);

const toast = useToast();

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(props.address);
    toast.add({
      title: "复制成功",
      description: "地址已复制到剪贴板",
      color: "success",
    });
  } catch (error) {
    toast.add({
      title: "复制失败",
      description: "请手动复制地址",
      color: "error",
    });
  }
};
</script>
