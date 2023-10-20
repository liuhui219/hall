<template>
	<div class="login-modal-mask" @click="homeStore.closeWallet" />
	<div class="px-[16px] w-full overflow-hidden fixed z-[352]" :class="['login-modal wallet-modal', { active: walletStore.modal }]">
		<BaseWalletCard padding="0 0 10px" width="auto" name-size="12px" money-size="26px" money-top="2px" money-bottom="3px" />
	</div>
</template>
<script setup lang="ts">
	const walletStore = useWalletStore()
	const homeStore = useHomeStore()
	onMounted(walletStore.mounted)
	onUnmounted(walletStore.unmounted)
</script>
<style lang="scss" scoped>
	.wallet-modal {
		padding: 20px 16px;
		background: $bg;
	}
</style>
