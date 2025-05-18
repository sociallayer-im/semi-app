<script setup>

</script>

<template>
    <UApp>
        <div
            class="min-h-[100svh] w-full flex p-4 flex-col justify-center items-center relative layout-bg bg-elevated bg-center">
            <slot />
        </div>
    </UApp>
</template>

<style scoped>
.layout-bg {
    background-position: top;
    background-repeat: repeat-x;
    background-image: url('/images/layout_bg.png');
}
</style>
