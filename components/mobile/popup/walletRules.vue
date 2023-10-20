<template>
	<div class="wr-mobile-content">
		<SkinHeader :is-home="false" :title="$t('BH0010')" />
		<div class="h-[2px] mb-[20px] rules-line" />
		<div class="px-[16px]">
			<BaseWalletCard padding="0 0 10px" width="auto" name-size="12px" money-size="26px" money-top="2px" money-bottom="3px" />
			<h3 class="modal__title section-title !text-[22px] mb-[17px] mt-[20px]">
				<!-- {{ $t('WR0002') }}  -->
				{{ $t('WR0005') }}
			</h3>
			<div v-if="configStore.wallet_type == 0" class="wr-rules">
				<div>{{ $t('WR0014') }}</div>
				<div>{{ $t('WR0015') }}</div>
				<div>{{ $t('WR0016') }}</div>
				<div>{{ $t('WR0017') }}</div>
				<div>{{ $t('WR0018') }}</div>
				<div>{{ $t('WR0019') }}</div>
			</div>
			<div v-if="configStore.wallet_type == 1" class="wr-rules">
				<div>{{ $t('WR0006') }}</div>
				<div>{{ $t('WR0007') }}</div>
				<div>{{ $t('WR0008') }}</div>
				<div>{{ $t('WR0009') }}</div>
				<div>{{ $t('WR0010') }}</div>
				<div>{{ $t('WR0011') }}</div>
				<div>{{ $t('WR0012') }}</div>
				<div>{{ $t('WR0013') }}</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const walletStore = useWalletStore()
	const configStore = useSysConfigStore()
	onMounted(walletStore.mounted)
	onUnmounted(walletStore.unmounted)
</script>
<style lang="scss" scoped>
	.wr-mobile-content {
		overflow: auto;
		background: $bg;
	}
	.wr-rules {
		padding: 16px;
		background: $block-bg-2;
		border-radius: 7px;
		div {
			@apply mb-[11px] text-[14px] text-[#ffffff];
			// line-height: 18px;
		}
		div:nth-child(2n) {
			margin-bottom: 16px;
			color: #b2babb;
		}
	}
	.rules-line {
		display: $wallet-rules-show;
		background: $wallet-rules-line;
	}
</style>
