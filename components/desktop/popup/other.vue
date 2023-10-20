<template>
	<section class="modal-header">
		<div class="flex justify-between w-full">
			<button :class="{ invisible: !otherStore.showback }" @click="() => closePopup()">
				<BaseIcon name="arrow-left" class="text-lowlight" />
			</button>
		</div>
		<h3 v-if="otherStore.title" class="modal__title section-title text-center">{{ $t(otherStore.title) }}</h3>
		<p v-else class="pb-[10px] w-full" />
	</section>
	<div class="modal__content flex flex-col justify-between flex-1 overflow-auto">
		<div class="flex flex-col flex-1">
			<iframe :src="otherStore.url" frameborder="0" allowtransparency="true" class="flex-1" @load="otherStore.iFrameLoad" />
		</div>
	</div>
</template>
<script setup lang="ts">
	const otherStore = useOtherStore()
	onMounted(otherStore.mounted)
	onBeforeUnmount(otherStore.unmounted)
</script>
