<template>
	<LazyDesktopVip v-if="app.$device.isDesktop" />
	<LazyMobileVip v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.vip,
	})
	const app = useNuxtApp()
	const vipStore = useVipStore()
	onActivated(vipStore.mounted)
	onBeforeRouteLeave(vipStore.unmounted)
</script>
