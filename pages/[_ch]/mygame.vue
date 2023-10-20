<template>
	<LazyDesktopMyGame v-if="app.$device.isDesktop" />
	<LazyMobileMyGame v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.mygame,
	})
	const app = useNuxtApp()
	const mygameStore = useMygameStore()
	onActivated(mygameStore.mounted)
</script>
