<template>
	<div class="wallet-card wallet-card1">
		<div class="wallet-card-name">{{ $t('WR0001') }}</div>
		<div class="wallet-card-money">
			{{ useSysConfigStore().currency_symbol }}
			<BasePoint class="cw-basePoint" :value="userStore.data.user_point.point" :show-symbol="false" />
		</div>
		<div v-if="userStore.data.user_point.code && userStore.data.user_point.point" class="wallet-card-tips">
			<!-- 有现金金额，且还需要打码 -->
			<div v-if="userStore.data.user_point.code && userStore.data.user_point.point">
				{{ walletCardLang(0) }}
				<span class="text-[#FFC700]">
					{{ useSysConfigStore().currency_symbol }}
					<BasePoint class="cw-basePoint" :value="userStore.data.user_point.code" :show-symbol="false" />
				</span>
				{{ walletCardLang(2) }}
			</div>
		</div>
	</div>

	<div v-if="configStore.wallet_type == 1" class="wallet-card wallet-card2 mt-[15px]">
		<div class="wallet-card-name">{{ $t('WR0002') }}</div>
		<div class="wallet-card-money">
			{{ useSysConfigStore().currency_symbol }}
			<BasePoint class="cw-basePoint" :value="userStore.data.user_point.bonus" :show-symbol="false" />
		</div>
		<div class="wallet-card-tips">
			<!-- 没有彩金跳转到活动中心 -->
			<div v-if="userStore.data.user_point.bonus == 0" class="cursor-pointer" @click="navigateTo('/bonus-center')">
				<span class="underline">{{ $t('WR0003') }}</span>
			</div>
			<div v-if="userStore.data.user_point.bonusCode != 0">
				{{ walletCardLang(0) }}
				<span class="text-[#FFC700]">
					{{ useSysConfigStore().currency_symbol }}
					<BasePoint
						class="cw-basePoint"
						:value="userStore.data.user_point.bonusCode + userStore.data.user_point.code"
						:show-symbol="false"
					/>
				</span>
				{{ walletCardLang(2) }}
			</div>
		</div>
	</div>

	<div
		v-if="configStore.wallet_type == 1 && configStore.gameBonusList.length"
		class="wallet-card wallet-card3 mt-[15px] h-[82px] pointer"
		@click="useClassGameStore().toClassGame({ active: 'bonus' })"
	>
		<div class="text-second">{{ $t('H0009') }}</div>
		<div class="text-[12px] font-normal">{{ $t('H0010') }}</div>
		<div class="text-[12px] flex">
			<span class="mr-[6px]">{{ $t('R0010') }}</span>
			<BaseIcon name="select-arrow-down" class="rotate-[-90deg]" />
		</div>
	</div>
</template>
<script setup lang="ts">
	const userStore = useUserStore()
	const configStore = useSysConfigStore()
	const wallet_card_01 = `url(${getResConfigImage('wallet_card_01', ImageKeyEnum.home)})`
	const wallet_card_02 = `url(${getResConfigImage('wallet_card_02', ImageKeyEnum.home)})`
	const wallet_card_03 = `url(${getResConfigImage('wallet_card_03', ImageKeyEnum.home)})`
	const propsConf = defineProps({
		padding: {
			type: String,
			default: '0px',
		},
		width: {
			type: String,
			default: '0px',
		},
		nameSize: {
			type: String,
			default: '0px',
		},
		moneySize: {
			type: String,
			default: '0px',
		},
		moneyTop: {
			type: String,
			default: '0px',
		},
		moneyBottom: {
			type: String,
			default: '0px',
		},
	})
	const walletCardLang = (index: number, money?: number) => {
		let langArr = useNuxtApp().$t('WR0004', { value: money }).split(' ')
		if (index != 2) {
			return langArr[index] + ' '
		} else {
			return langArr[2] + ' ' + langArr[3]
		}
	}
</script>
<style lang="scss" scoped>
	.wallet-card {
		@apply overflow-hidden relative;
		padding: v-bind('propsConf.padding');
		width: v-bind('propsConf.width');
		border-radius: 5px;
		&.wallet-card1 {
			background: radial-gradient(98.83% 388.19% at 0% -0.1%, rgba(44, 107, 34, 0.84) 0%, rgba(38, 66, 38, 0.939029) 53.21%, #262828 100%)
				/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

			// background-image: v-bind(wallet_card_01);
		}
		&.wallet-card2 {
			background: radial-gradient(98.83% 388.19% at 0% -0.1%, #5620bc 0%, rgba(103, 66, 187, 0.45) 53.21%, rgba(63, 22, 134, 0.26) 100%)
				/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

			// background-image: v-bind(wallet_card_02);
		}

		&.wallet-card3 {
			background-image: v-bind(wallet_card_03);
			padding: 11px 0 11px 20px;
		}
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		:deep(.text-number) {
			font-family: Poppins;
		}
		.wallet-card-name {
			@apply w-[70px] h-[28px] text-[#FFFFFF] text-[12px] indent-[10px];
			border-radius: 6px 0px 100px 0px;
			background: rgba(255, 255, 255, 0.1);
			// font-size: v-bind('propsConf.nameSize');
			// line-height: v-bind('propsConf.nameSize');
			line-height: 28px;
		}
		.wallet-card-money {
			@apply mt-[20px] mb-[11px] font-[600] text-center text-[#FFFFFF];
			margin-top: v-bind('propsConf.moneyTop');
			margin-bottom: v-bind('propsConf.moneyBottom');
			font-size: v-bind('propsConf.moneySize');
			// line-height: v-bind('propsConf.moneySize');
		}
		.wallet-card-tips {
			@apply mx-auto w-[85%] h-[24px] text-center text-[#FFFFFF] bg-[rgba(255,255,255,0.1)] rounded-[100px];
			line-height: 24px;
			font-size: v-bind('propsConf.nameSize');
			// line-height: v-bind('propsConf.nameSize');
			div {
				@apply h-[24px] text-[12px];
				line-height: 24px;
			}
		}
	}
</style>
