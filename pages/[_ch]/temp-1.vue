<template>
	<LazyDesktopTemp-1 v-if="app.$device.isDesktop" />
	<LazyMobileTemp-1 v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.brandAmbassador,
	})
	const app = useNuxtApp()
	const tempStore = useTempStore()
	onActivated(() => {
		tempStore.currPage = 'carnaval'
		tempStore.mounted()
	})
	onBeforeRouteLeave(tempStore.unmounted)
</script>
