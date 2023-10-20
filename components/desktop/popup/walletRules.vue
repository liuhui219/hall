<template>
	<div class="wr-pc-content">
		<div class="modal-header mb-[40px] pl-[18px] pr-[18px]">
			<div class="flex justify-between w-full">
				<div />
				<h3 class="modal__title section-title text-center">{{ $t('BH0010') }}</h3>
				<button class="modal__close" @click="closePopup()">
					<i class="sysicon-close text-lowlight text-[18px]" />
				</button>
			</div>
		</div>
		<!-- <div class="h-[1px] rules-line" /> -->
		<div class="pl-[31px] pr-[31px]">
			<BaseWalletCard padding="0 0 20px" width="auto" name-size="14px" money-size="30px" money-top="2px" money-bottom="3px" />
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
	.wr-pc-content {
		@apply fixed top-[50px] left-[50%] ml-[-311px] w-[622px] h-[864px] rounded-md;
		padding: 27px 0 40px;
		// background: #1d1d1d;
		background: $bg;
	}
	.wr-rules {
		// padding: 18px;
		// background: #262828;
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
		background: $wallet-rules-line;
	}
</style>
