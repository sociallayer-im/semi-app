<template>
    <UModal title="预估手续费">
        <UIcon name="i-ci-info" size="18" class="cursor-pointer hover:text-primary-500" />
        <template #body>
            <div class="text-sm">包含支付给bundler和paymaster的费用。是一个大概值，以交易完成后最终的gas使用情况为准。</div>
        </template>
    </UModal>
</template>