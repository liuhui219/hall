<template>
	<LazyDesktopClassGame v-if="app.$device.isDesktop" />
	<LazyMobileClassGame v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.classGame,
	})
	const app = useNuxtApp()
	const classGameStore = useClassGameStore()
	onActivated(classGameStore.mounted)
	onBeforeRouteLeave(classGameStore.unmounted)
</script>
