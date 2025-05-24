<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const user = computed(() => userStore.user)

</script>

<template>
  <Profile v-if="user" :user="user" />
</template>
