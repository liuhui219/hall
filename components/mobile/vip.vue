<template>
	<div>
		<MobileVipNoAuth v-if="!userStore.isLogin" />
		<MobileVipHasAuth v-else />
	</div>
</template>

<script setup lang="ts">
	const userStore = useUserStore()
</script>
