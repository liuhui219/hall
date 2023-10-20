<template>
	<div class="fixed w-full h-full z-[305] top-[70px] left-0" @click="homeStore.closeOldWallet">
		<div
			class="px-[16px] h-full w-full overflow-hidden absolute z-[305]"
			:class="['wallet-modal-pc', { active: walletStore.modal }]"
			@click.stop="() => {}"
		>
			<BaseWallet top="135px" :show-toggle="false" :is-pc-home="true" />
		</div>
	</div>
</template>
<script setup lang="ts">
	const walletStore = useWalletStore()
	const homeStore = useHomeStore()
	onMounted(walletStore.mounted)
	onUnmounted(walletStore.unmounted)
</script>
<style lang="scss" scoped>
	.wallet-modal-pc {
		padding-top: 24px;
		padding-bottom: 24px;

		width: 500px;
		height: 600px;
		max-height: 80%;
		top: 0;
		right: max(200px, calc(100% - 1572px));
		background-color: $block-bg-2;
		z-index: zIndex('loginModal');
		display: flex;
		flex-direction: column;
		transform: translateY(20%);
		transition: 0.3s ease;
		pointer-events: none;
		opacity: 0;
		overflow: visible;
		border-radius: $border-radius;
		overflow: hidden;
		box-shadow: 0 0 24px #000000;
		.register-content {
			padding-bottom: 0;
			background-color: $bg;
		}
		&.active {
			opacity: 1;
			pointer-events: auto;
			transform: translateY(0);
		}
		.btn-close {
			width: 30px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: $text-lowlight;
			font-size: 18px;
		}
		.modal-body {
			padding: 36px 32px;
			background-color: $bg;
			flex: 1;
		}
		.quick-link {
			width: 100%;
			display: flex;
			font-size: 12px;
			color: $text-lowlight;
			.text-second {
				color: $second;
			}
			&.quick-link-right {
				justify-content: flex-end;
			}
			&.quick-link-center {
				justify-content: center;
			}
		}
	}
</style>
