<script setup lang="ts">
import type { UserInfo } from "@/utils/semi_api";

const userStore = useUserStore();
const loading = ref(true);
const toast = useToast();
const router = useRouter();

const checkUser = (user: UserInfo | null) => {
  if (!!user && !user.handle) {
    console.log("[layout]:go to set name");
    router.push("/set-name");
  } else if (!!user && !user.evm_chain_active_key) {
    console.log("[layout]:go to set payment code");
    router.push("/init");
  }
};

watch(
  () => router.currentRoute.value.path,
  (newPath, oldPath) => {
    console.log("[layout]:route changed", oldPath, "->", newPath);
  }
);

watch(
  () => userStore.user,
  (newUser, oldUser) => {
    console.log("[layout]:user changed", oldUser, "->", newUser);
    checkUser(newUser);
  },
  { immediate: true }
);

const showContent = computed(() => {
  const userLoggedIn = !!userStore.user;
  const userReady = !!userStore.user?.handle && !!userStore.user?.evm_chain_active_key;
  const isOnSettingPage = ["/set-name", "/paymentcode", "/import", "/init"].includes(
    router.currentRoute.value.path
  );
  console.log("[layout]:showContent", {
    userLoggedIn,
    userReady,
    isOnSettingPage,
  });
  return userLoggedIn && (userReady || isOnSettingPage);
});

const showLoading = computed(() => {
  return loading.value || !!userStore.user;
});

onMounted(async () => {
  try {
    await userStore.getUser();
  } catch (error) {
    console.error(error);
    toast.add({
      title: "获取用户信息失败",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <UApp>
    <div
      class="min-h-[100svh] w-full flex p-4 flex-col justify-center items-center relative layout-bg bg-elevated bg-center"
    >
      <slot v-if="showContent" />
      <Welcome v-else :loading="showLoading" />
    </div>
  </UApp>
</template>

<style scoped>
.layout-bg {
  background-position: top;
  background-repeat: repeat-x;
  background-image: url("/images/layout_bg.png");
}
</style>
