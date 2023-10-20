<template>
	<LazyDesktopTask v-if="app.$device.isDesktop" />
	<LazyMobileTask v-else />
</template>
<script setup lang="ts">
	definePageMeta({
		pageIndex: PageIndexEnum.task,
	})
	const app = useNuxtApp()
	const taskStore = useTaskStore()
	onActivated(taskStore.mounted)
	onBeforeRouteLeave(taskStore.unmounted)
</script>
