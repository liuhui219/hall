<template>
	<LazyDesktopBrandAmbassador v-if="app.$device.isDesktop" />
	<LazyMobileBrandAmbassador v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.brandAmbassador,
	})
	const app = useNuxtApp()
	const baStore = userBrandAmbassadorStore()
	onActivated(baStore.mounted)
</script>
