<template>
	<div>
		<DesktopVipNoAuth v-if="!userStore.isLogin" />
		<DesktopVipHasAuth v-else />
	</div>
</template>

<script setup lang="ts">
	const userStore = useUserStore()
</script>
