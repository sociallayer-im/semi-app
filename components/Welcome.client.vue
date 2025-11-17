<template>
  <div
    class="flex flex-col container-size h-[100vh] rounded-xl bg-[var(--ui-bg)] shadow-lg p-4 justify-center items-center"
  >
    <div class="logo" />
    <h1 class="font-medium mb-4 text-xl mt-4 title">
      {{ i18n.text["App Name"] }}
    </h1>
    <UButton
      v-if="!loading"
      color="primary"
      size="xl"
      class="flex justify-center items-center w-60"
      to="/login"
      >{{ i18n.text["Get Started"] }}</UButton
    >
    <UProgress class="mt-10" v-else />
  </div>
</template>

<script setup>
import { useI18n } from "~/stores/i18n";

const i18n = useI18n();

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.logo {
  width: 280px;
  height: 237px;
  background-image: url("/images/nantang_logo.png");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.dark .logo {
  background-image: url("/images/nantang_logo_dark.png");
}

.title {
  width: 210px;
  text-align: justify;
  text-align-last: justify;
}
</style>
