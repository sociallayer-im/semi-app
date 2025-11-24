<template>
  <UDropdownMenu
    :items="[
      {
        label: i18n.text['Export Wallet'],
        icon: 'i-ci-download',
        onSelect: handleExportKeyStore,
      },
      {
        label: i18n.text['Logout'],
        icon: 'i-ci-log-out',
        onSelect: handleLogout,
      },
      {
        label: i18n.text['Contacts'],
        icon: 'ci:notebook',
        onSelect: () => router.push('/contacts'),
      },
    ]"
  >
    <UIcon name="ci:settings" size="24" class="cursor-pointer hover:text-primary-500" />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { useI18n } from "../stores/i18n";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();
const i18n = useI18n();

const handleExportKeyStore = () => {
  router.push("/export");
};

const handleLogout = async () => {
  try {
    await userStore.signout();
    toast.add({
      title: i18n.text["Logout Success"],
      description: i18n.text["You have successfully logged out"],
      color: "success",
    });
  } catch (error) {
    console.error(error);
    toast.add({
      title: i18n.text["Logout Failed"],
      description: i18n.text["Please try again later"],
      color: "error",
    });
  }
};
</script>
