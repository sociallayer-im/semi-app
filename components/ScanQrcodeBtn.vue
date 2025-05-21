<template>
    <UModal v-model:open="open" title="扫描二维码" :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full'
    }">
        <UButton icon="i-ci-qr-code" color="neutral" variant="subtle" size="xl" class="text-2xl cursor-pointer"
            @click="isOpen = true" />

        <template #body>
            <div class="relative">
                <div class="loading-bg">
                    <qrcode-stream :track="paintBoundingBox" @detect="onDetect" @error="onError" />
                </div>
                <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
            </div>
        </template>
    </UModal>
</template>

<script setup>
import { QrcodeStream } from 'vue-qrcode-reader'
import { ref } from 'vue'

const emit = defineEmits(['onDetect'])
const open = ref(false)
const result = ref('')
const error = ref('')

function paintBoundingBox(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const {
            boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
    }
}

function onError(err) {
    error.value = `[${err.name}]: `

    if (err.name === 'NotAllowedError') {
        error.value += 'you need to grant camera access permission'
    } else if (err.name === 'NotFoundError') {
        error.value += 'no camera on this device'
    } else if (err.name === 'NotSupportedError') {
        error.value += 'secure context required (HTTPS, localhost)'
    } else if (err.name === 'NotReadableError') {
        error.value += 'is the camera already in use?'
    } else if (err.name === 'OverconstrainedError') {
        error.value += 'installed cameras are not suitable'
    } else if (err.name === 'StreamApiNotSupportedError') {
        error.value += 'Stream API is not supported in this browser'
    } else if (err.name === 'InsecureContextError') {
        error.value += 'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
        error.value += err.message
    }
}

function onDetect(detectedCodes) {
    const values = detectedCodes.map(code => code.rawValue)
    result.value = JSON.stringify(values)
    open.value = false
    emit('onDetect', values)
    
}
</script>