<template>
	<div v-if="name == 'referralRewards'" class="dl-card-item dl-img-card dl-img-card1" :class="{ 'not-login': notLogIn }">
		<!-- <h1>{{ $t('DL0019') }}</h1> -->
		<h2>
			{{ referAndEarnStore.sliceLang(0, $t('DL0070', { Bonus: 1000 }))
			}}<span class="dl-money-span"> {{ configStore.currency_symbol }}{{ $fp($cp(referAndEarnStore.maxReferralRewards())) }} </span
			>{{ referAndEarnStore.sliceLang(1, $t('DL0070', { Bonus: 1000 })) }}
		</h2>
		<button class="dl-img-btn" @click="emits('onClick')">{{ $t('DL0033') }}</button>
	</div>
	<div v-if="name == 'commissionRewards'" class="dl-card-item dl-img-card dl-img-card2" :class="{ 'not-login': notLogIn }">
		<!-- <h1>{{ $t('DL0021') }}</h1> -->
		<h2>
			{{ referAndEarnStore.sliceLang(0, $t('DL0020')) }}<span class="dl-money-span"> {{ referAndEarnStore.maxFlowPro() }}</span
			>{{ referAndEarnStore.sliceLang(1, $t('DL0020')) }}
		</h2>
		<button class="dl-img-btn" @click="emits('onClick')">{{ $t('DL0033') }}</button>
	</div>
	<div v-if="name == 'distributionRewards'" class="dl-card-item dl-img-card dl-img-card3" :class="{ 'not-login': notLogIn }">
		<!-- <h1>{{ $t('DL0023') }}</h1> -->
		<h2>
			{{ referAndEarnStore.sliceLang(0, $t('DL0022'))
			}}<span class="dl-money-span"
				>{{ configStore.currency_symbol }}{{ $fp($cp(configStore.disRecharge3Cfg.data.reward_items[0].ParentFirstReward.point)) }}</span
			>{{ referAndEarnStore.sliceLang(1, $t('DL0022')) }}
		</h2>
		<button class="dl-img-btn" @click="emits('onClick')">{{ $t('DL0033') }}</button>
	</div>
	<div v-if="name == 'morePromotions'" class="dl-card-item dl-img-card dl-img-card4" :class="{ 'not-login': notLogIn }">
		<!-- <h1>{{ $t('DL0054') }}</h1> -->
		<h2>{{ $t('DL0055') }}</h2>
	</div>
	<div v-if="name == 'referralVipRewards'" class="dl-card-item dl-img-card dl-img-card5" :class="{ 'not-login': notLogIn }">
		<!-- <h1>{{ $t('DL0019') }}123</h1> -->
		<h2>
			{{ referAndEarnStore.sliceLang(0, $t('DL0018', { Bonus: 1000 }))
			}}<span class="dl-money-span"> {{ configStore.currency_symbol }}{{ $fp($cp(referAndEarnStore.totalVipRewards())) }}</span
			>{{ referAndEarnStore.sliceLang(1, $t('DL0018', { Bonus: 1000 })) }}
		</h2>
		<button class="dl-img-btn" @click="emits('onClick')">{{ $t('DL0033') }}</button>
	</div>
	<div v-if="name == 'contact'" class="dl-card-item" :class="{ 'not-login': notLogIn }">
		<div class="mt-[18px] mb-[2px] text-[16px] font-[600]">{{ $t('DL0037') }}</div>
		<div class="text-[14px]">{{ $t('DL0036') }}</div>
		<div class="dl-card-contact bottom-[60px]" @click="pageConfigClick(1, 'https://t.me/' + resConfig.referAndEarnConfig.telegram.substring(1))">
			<BaseImg class="w-[19px] mr-[15px] ml-[75px]" :src="getResConfigImage('dl_Telegram', 'referAndEarn')" alt="dl_Telegram group" />
			<span class="text-[14px]">{{ resConfig.referAndEarnConfig.telegram }}</span>
		</div>
		<div class="dl-card-contact bottom-[10px]" @click="pageConfigClick(1, 'mailto:' + resConfig.referAndEarnConfig.gmail)">
			<BaseImg class="w-[19px] mr-[15px] ml-[75px]" :src="getResConfigImage('dl_google', 'referAndEarn')" alt="dl_google group" />
			<span class="text-[14px]">{{ resConfig.referAndEarnConfig.gmail }}</span>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const dl_pc_card_0 = `url(${getResConfigImage('dl_pc_card_0', 'referAndEarn')})`
	const dl_pc_card_1 = `url(${getResConfigImage('dl_pc_card_1', 'referAndEarn')})`
	const dl_pc_card_2 = `url(${getResConfigImage('dl_pc_card_2', 'referAndEarn')})`
	const dl_pc_card_3 = `url(${getResConfigImage('dl_pc_card_3', 'referAndEarn')})`
	const dl_pc_card_4 = `url(${getResConfigImage('dl_pc_card_4', 'referAndEarn')})`
	const referAndEarnStore = useReferAndEarnStore()
	defineProps({
		notLogIn: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			default: '',
		},
	})
	const emits = defineEmits(['onClick'])
</script>
<style lang="scss" scoped>
	.dl-money-span {
		color: $btn-main;
	}
	.dl-card-item {
		@apply relative flex-1 px-[16px] mb-[30px] min-w-[45%] max-w-[48.5%] h-[210px] rounded-md;
		background: $block-bg-2;
		&.dl-img-card {
			@apply pt-[29px];
			background-size: 101% 101%;
			background-position: center right;
			background-repeat: no-repeat;
			// h1 {
			// 	@apply max-w-[190px] mb-[15px] text-[20px] font-[700];
			// 	line-height: 24px;
			// }
			// h2 {
			// 	@apply max-w-[190px] text-[14px];
			// 	color: $text-lowlight;
			// 	line-height: 17px;
			// }
			h2 {
				@apply max-w-[225px] text-[14px];
				color: $text-base;
			}
			.dl-img-btn {
				@apply absolute bottom-[29px] left-[16px] flex items-center justify-center w-[180px] h-[43px] rounded-md text-[16px] cursor-pointer font-[500];
				color: $text-button;
				background: $btn-main;
			}
		}
		&.dl-img-card1 {
			background-image: v-bind(dl_pc_card_1);
		}
		&.dl-img-card2 {
			background-image: v-bind(dl_pc_card_2);
		}
		&.dl-img-card3 {
			background-image: v-bind(dl_pc_card_3);
		}
		&.dl-img-card4 {
			background-image: v-bind(dl_pc_card_4);
		}
		&.dl-img-card5 {
			background-image: v-bind(dl_pc_card_0);
		}
		.dl-card-contact {
			@apply absolute left-[50%] ml-[-38%] flex py-[10px] w-[76%] rounded-lg cursor-pointer;
			background: $block-bg;
		}
		&.not-login {
			@apply min-w-[28%] max-w-[32%];
		}
	}
</style>
