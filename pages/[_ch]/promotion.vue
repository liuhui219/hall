<template>
	<LazyDesktopPromotion v-if="app.$device.isDesktop" />
	<LazyMobilePromotion v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.promotion,
	})
	const app = useNuxtApp()
	const promotionStore = usePromotionStore()
	onActivated(promotionStore.mounted)
	onBeforeRouteLeave(promotionStore.unmounted)
</script>
