<template>
	<LazyDesktopOther v-if="app.$device.isDesktop" />
	<LazyMobileOther v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.brandAmbassador,
	})
	const app = useNuxtApp()
	const otherStore = useOtherStore()
	onActivated(otherStore.mounted)
	onBeforeRouteLeave(otherStore.unmounted)
</script>
