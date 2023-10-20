<template>
	<LazyDesktopReferAndEarn v-if="app.$device.isDesktop" />
	<LazyMobileReferAndEarn v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.referAndEarn,
	})
	const app = useNuxtApp()
	const referAndEarnStore = useReferAndEarnStore()
	onActivated(referAndEarnStore.mounted)
	onBeforeRouteLeave(referAndEarnStore.unmounted)
</script>
