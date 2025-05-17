<template>
    <div class="flex flex-col container-size h-[100vh] rounded-xl bg-[var(--ui-bg)] shadow-lg px-4 sm:px-8 py-8 banner">
        <!-- 顶部账户信息 -->
        <div class="w-full flex items-center justify-between mb-4">
            <div class="flex items-center gap-2 bg-accented rounded-full px-4 py-2">
                <img src="https://avatars.githubusercontent.com/u/1?v=4"
                    class="w-7 h-7 rounded-full border-2 border-green-400" alt="avatar" />
                <span class="font-medium">Account#6b2f</span>
            </div>
            <UIcon name="ci:settings" size="24" class="cursor-pointer hover:text-primary-500" />
        </div>

        <!-- 资产总览 -->
        <div class="w-full flex items-center justify-between mb-2">
            <div>
                <div class="text-gray-400 text-sm">余额</div>
                <div class="flex items-center gap-2">
                    <span class="text-3xl font-bold">0.00 ETH</span>
                </div>
            </div>
        </div>

        <!-- 操作按钮 -->
        <div class="w-full flex justify-center gap-18 mt-4 mb-6">
            <div class="flex flex-col items-center cursor-pointer">
                <div class="bg-green-50 rounded-full w-14 h-14 flex items-center justify-center mb-1">
                    <UIcon name="ci:qr-code" size="24" class="text-primary-500" />
                </div>
                <span class="text-sm mt-1">Receive</span>
            </div>
            <div class="flex flex-col items-center cursor-pointer">
                <div class="bg-purple-50 rounded-full w-14 h-14 flex items-center justify-center mb-1">
                  <UIcon name="ci:external-link" size="24" class="text-primary-500" />
                </div>
                <span class="text-sm mt-1">Send</span>
            </div>
            <div class="flex flex-col items-center cursor-pointer">
                <div class="bg-yellow-50 rounded-full w-14 h-14 flex items-center justify-center mb-1">
                    <UIcon name="ci:notebook" size="24" class="text-primary-500" />
                </div>
                <span class="text-sm mt-1">Activity</span>
            </div>
        </div>

        <!-- 分割线 -->
        <div class="w-full border-t border-muted my-4"></div>

        <!-- 资产列表 -->
        <div class="w-full flex items-center justify-between mt-2">
            <div class="flex items-center gap-3">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMJSURBVHgB5ZuBcdowGEZfcxmADaoNwggeoRuEDegGOBMkGzgjZILQDUoXqGGBwARR/RfnziW2wZJ/Sabv7oMLdyjSsy3JSP6CPqZKVmVe5Wv996x+b7Ktcqjff1XZ1NkyQbIqT1XKKtYzUkZRl5k0clRXVfb4N7pPxj2fz56ohGj4afb1/zREZknYhnedEcExVdbEa3ibCEMgYh/1vsviO8o8AjbxrFCiAOxEUjAyPwE7sawZiQKwE02BJyuIUvEx84gjS8BeSQaPDoY0hzrX7Bk4TyghaoU1suZCFhC9slo5eykYBh791WqlVuEsy+w5BpYpl8KsT8DgmZ6gJUFBgCTvarzBoeP7QEOCkoDOs2DhUskmY0tQEtB5FpS+AsaWoChgf9r4zLWSbYwlQVGA5eQ3xucxBYwlQVnAU1NAObaAMSQoCyg/Gm98KnkOHwnKAmzddr5pCvCREEDA4objio0qeZ5TSSBB5iLgjgAkKsHIi9fPXUMZcjkEuASk7X63vi5cKiGAgPIW5QWFl5cXDofDP58ZY5jP52w2GyJj5MXL4jnkKLqWHeAMsDf859ySAHI5LJfLT5/PZjO0EQFbIi8zS1+w2+1iDJNbeVEdBof0AdVcwQ7Fp+7S9hsS2oMjk6WHhwcCshMBOxIisISNCIg+GJ8SUMLfmaAhkT4Ahz7Bp+40Ov8yRQGXSPAou6TBU6oCzknwKLdoCshSFtAnwaPMjBOcVoNDCeiS4FjWb1rIUxfQJsGxnPs2ATM8lsZCCTiV4PD93r0C+RQENCU4fDdvNvj0blBGA7kt078N80QmSw6UHBeBepFNBPZKc8+FrCF6ZcdOa8/fheG6Nkm94fCbxzVdCs6bqJ2nyAklx5NnwE40BSMxxc3Sr4zMM2AnkgIlcsAmnHc8NkdfivSoKQ6RbwR4ZOYDQzr7ieWovxJpbWNBXBFBj3oXhuN8IeRlIQ3PSeymzaB7RsipnmTD28g4Dps+Mt7ryE3MI0oPT39BH8NxI5bkjv7H5/f1u6xWySP0P1BeuvsD+qrw3Ldke40AAAAASUVORK5CYII=" class="w-10 h-10 rounded-full"
                    alt="CKB" />
                <div>
                    <div class="font-medium">CKB</div>
                    <div class="text-gray-400 text-sm">Nervos CKB</div>
                </div>
            </div>
            <div class="flex flex-col items-end">
                <span class="font-medium">0</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { UserInfo } from '~/utils/semi_api'

defineProps<{
    user: UserInfo
}>()
</script>