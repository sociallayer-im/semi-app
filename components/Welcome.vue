<template>
  <div class="flex flex-col container-size  h-[100vh] rounded-xl bg-[var(--ui-bg)] shadow-lg p-4 banner justify-center items-center">
    <h1 class="text-4xl font-bold mt-10 mb-1">Semi</h1>
    <div class="text-lg font-medium mb-4">你的智能数字货币钱包</div>
    <UButton v-if="ready" color="primary" size="xl" class="flex justify-center items-center w-60" to="/login">开始使用</UButton>
    <UProgress class="mt-10" v-else />
  </div>
</template>

<script setup>
defineProps({
  ready: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped>
    .banner {
        background-image: url('/images/home_banner.png');
        background-size: 120% auto;
        background-position: center -10px;
        background-repeat: no-repeat;
    }
</style>