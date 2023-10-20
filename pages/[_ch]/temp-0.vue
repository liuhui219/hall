<template>
	<LazyDesktopTemp-0 v-if="app.$device.isDesktop" />
	<LazyMobileTemp-0 v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.brandAmbassador,
	})
	const app = useNuxtApp()
	const tempStore = useTempStore()
	onActivated(() => {
		tempStore.currPage = 'torneio'
		tempStore.mounted()
	})
	onBeforeRouteLeave(tempStore.unmounted)
</script>
