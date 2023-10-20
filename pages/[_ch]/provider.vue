<template>
	<LazyDesktopProvider v-if="app.$device.isDesktop" />
	<LazyMobileProvider v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.provider,
	})
	const app = useNuxtApp()
	const providerStore = useProviderStore()
	onActivated(providerStore.mounted)
</script>
