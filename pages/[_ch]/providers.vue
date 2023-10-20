<template>
	<LazyDesktopProviders v-if="app.$device.isDesktop" />
	<LazyMobileProviders v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.providers,
	})
	const app = useNuxtApp()
	const pragmaticStore = usePragmaticStore()
	onActivated(pragmaticStore.mounted)
</script>
