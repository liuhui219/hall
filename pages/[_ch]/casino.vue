<template>
	<LazyDesktopCasino v-if="app.$device.isDesktop" />
	<LazyMobileCasino v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.casino,
	})
	const app = useNuxtApp()
	const casinoStore = useCasinoStore()
	onActivated(casinoStore.mounted)
	onBeforeRouteUpdate(casinoStore.unmounted)
	onBeforeRouteLeave(casinoStore.unmounted)
</script>
