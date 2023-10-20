<template>
	<LazyDesktopBonusCenter v-if="app.$device.isDesktop" />
	<LazyMobileBonusCenter v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.bonusCenter,
	})
	const app = useNuxtApp()
	const bonusCenterStore = useBonusCenterStore()
	onActivated(bonusCenterStore.mounted)
</script>
