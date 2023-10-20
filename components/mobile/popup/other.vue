<template>
	<SkinHeader :is-home="false" :title="otherStore.title ? $t(otherStore.title) : ''" />
	<div class="modal__content flex flex-col justify-between flex-1 overflow-auto">
		<div class="flex flex-col h-full">
			<iframe :src="otherStore.url" frameborder="0" allowtransparency="true" class="flex-1" @load="otherStore.iFrameLoad" />
		</div>
	</div>
</template>
<script setup lang="ts">
	const otherStore = useOtherStore()
	onMounted(otherStore.mounted)
	onBeforeUnmount(otherStore.unmounted)
</script>
