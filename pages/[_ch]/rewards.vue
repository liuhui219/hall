<template>
	<LazyDesktopRewards v-if="app.$device.isDesktop" />
	<LazyMobileRewards v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.rewards,
	})
	const app = useNuxtApp()
	const rewardsStore = useRewardsStore()
	onActivated(rewardsStore.mounted)
</script>
