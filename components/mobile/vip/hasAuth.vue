<template>
	<div class="vip-l-container">
		<div>
			<!-- :style="{ backgroundImage: `url(${getResConfigImage(`bg_${userStore.vip_level}`, ImageKeyEnum.vip)})` }" -->
			<div class="vip-l-detail">
				<div class="vip-l-lvbg">
					<BaseImg :src="getResConfigImage(`vip${userStore.vip_level}_l`, ImageKeyEnum.vip)" />
				</div>
				<div>
					<div>
						<h4 class="vip-l-detail-nn">{{ userStore.data.nickname }}</h4>
						<h2 class="vip-l-detail-v">VIP {{ Helper.addZero(userStore.vip_level) }}</h2>
					</div>
				</div>
				<div class="vip-l-progress-c">
					<div class="vip-l-progress-bg">
						<div class="vip-l-progress" :style="{ width: userStore.vipProgress }">
							<p v-if="userStore.vipProgress" class="vip-l-progress-t">{{ parseInt(`${userStore.vipCurrentCoin}`) }}xp</p>
						</div>
					</div>
					<div class="vip-l-detail-v-s">
						<p>VIP {{ Helper.addZero(Math.min(userStore.vip_level, configStore.maxVip - 1)) }}</p>
						<p>VIP {{ Helper.addZero(Math.min(userStore.vip_level + 1, configStore.maxVip)) }}</p>
					</div>
				</div>
				<div class="vip-l-detail-b">
					<p v-if="userStore.vip_level < configStore.maxVip">
						{{ $t('V0075', { value: parseInt(`${userStore.next_coin}`), vip: userStore.vip_level + 1 }) }}
					</p>
					<p v-else>{{ $t('V0093') }}</p>
					<p class="underline" @click="vipStore.openRule()">{{ $t('V0074') }}</p>
				</div>
			</div>
			<div v-if="!userStore.data.activating" class="vip-l-activate">
				<div class="flex-1">
					<div class="!mb-[4px] text-[14px] vip-l-activate-title">{{ $t('V0091') }}</div>
					<div
						class="text-[12px]"
						v-html="
							$t('V0092', {
								value: `${configStore.renderVHtmlNumber(
									`${configStore.currency_symbol}${$fp($cp(userStore.activatePoint))}`,
									'warning'
								)}`,
							})
						"
					/>
				</div>
				<button class="sys-btn btn-main-text !text-[14px] !px-[13px]" @click="toDeposit()">{{ $t('H0005') }}</button>
			</div>
			<div v-else-if="vipStore.nextUnlock" class="vip-l-next-b-a">
				<div class="flex-1">
					<div class="vip-l-t !text-[14px] !mb-[4px]">{{ $t(vipStore.vipAcitvityObject[vipStore.nextUnlock.type]?.title) }}</div>
					<div>{{ $t('V0076', { value: parseInt(`${vipStore.nextUnlock.coin}`), vip: vipStore.nextUnlock.vip }) }}</div>
				</div>
				<BaseImg :src="getResConfigImage(vipStore.vipAcitvityObject[vipStore.nextUnlock.type]?.image, ImageKeyEnum.vip)" class="h-full" />
			</div>
		</div>
		<div>
			<h3 class="vip-l-t">{{ $t('V0077') }}</h3>
			<div>
				<swiper ref="currentSwiper" :modules="modules" :slides-per-view="'auto'" :space-between="4" :slides-per-group="1">
					<swiper-slide
						v-for="item in configStore.config.vip_config.levels"
						:key="item.vip"
						class="vip-l-s-s"
						@click="vipStore.changeVipActive(item.vip)"
					>
						<div :class="{ 'vip-l-s-s-a': vipStore.vipActive == item.vip }">
							<div class="w-[22px] h-[22px] shrink-0 flex items-center justify-center rounded-full bg-bg">
								<BaseImg :src="getResConfigImage(`vip${item.vip}`, ImageKeyEnum.vip)" class="w-[14px]" />
							</div>
							VIP {{ item.vip }}
						</div>
					</swiper-slide>
				</swiper>
				<div class="vip-l-r-container">
					<div v-for="(item, index) in vipStore.currentList" :key="index" class="vip-l-r-c-item">
						<BaseImg :src="getResConfigImage(item.image, ImageKeyEnum.vip)" class="vip-l-r-c-item-i" />
						<div class="vip-l-r-c-item-t">
							<h4>{{ $t(item.title) }}</h4>
							<p v-html="$t(item.tip, item.params)" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="resConfig['telegram-group']">
			<h3 class="vip-l-t">{{ $t('V0071') }}</h3>
			<div class="vip-l-m">
				<p>{{ $t('V0072') }}</p>
				<button class="sys-btn btn-main-text" @click="pageConfigClick(1, resConfig['telegram-group'])">{{ $t('V0073') }}</button>
			</div>
		</div>
		<div v-if="vipStore.faqList.length">
			<h3 class="vip-l-t !mb-[4px]">FAQ</h3>
			<div class="vip-l-f">
				<div v-for="(item, index) in vipStore.faqList" :key="index" class="vip-l-f-c" :class="[{ 'vip-l-f-a': vipStore.faqOpenMap[index] }]">
					<div class="vip-l-f-i" @click="vipStore.clickFaqItem(index)">
						<div>{{ $t(item.title) }}</div>
						<BaseArrowDown class="transition-all duration-300 gray" :class="{ '-rotate-[180deg] ': vipStore.faqOpenMap[index] }" />
					</div>
					<div class="vip-l-f-i-t">{{ $t(item.content) }}</div>
				</div>
			</div>
		</div>
		<VueFinalModal v-model="vipStore.showVipRule" content-class="vip-l-rule">
			<SkinHeader :is-home="false" title="VIP upgrade details" :back="vipStore.closeRule" />
			<ul class="shrink-0 !text-[14px] vip-exchange">
				<li>
					{{
						$t('V0095', {
							symbol: configStore.currency_symbol,
							value1: $fp($cp(configStore.config.vip_config.turnover_rate.turnover)),
							value2: configStore.config.vip_config.turnover_rate.coin,
						})
					}}
				</li>
			</ul>
			<div class="vip-l-rule-c" :class="{ 'vip-l-rule-c-nb': !userStore.vipUpgradeStatus }">
				<div class="vip-l-rule-c-i vip-l-rule-c-h">
					<p class="vip-l-rule-i-n">{{ $t('V0009') }}</p>
					<p v-if="userStore.vipUpgradeStatus" class="vip-l-rule-i-b">{{ $t('V0037') }}</p>
					<p class="vip-l-rule-i-r">{{ $t('V0094') }}</p>
				</div>
				<div v-for="item in configStore.vip_list" :key="item" class="vip-l-rule-c-i">
					<p class="vip-l-rule-i-n">
						<BaseImg :src="getResConfigImage(`vip${item.vip}`, ImageKeyEnum.vip)" class="w-[20px] mr-[10px]" />
						<span> VIP {{ Helper.addZero(item.vip) }} </span>
					</p>
					<p v-if="userStore.vipUpgradeStatus" class="vip-l-rule-i-b"><BasePoint :value="vipStore.getVipUpgradeBonus(item.vip)" /></p>
					<p class="vip-l-rule-i-r"><BaseNumber :value="parseInt((item.vip_coin / 100).toFixed(2))" /></p>
				</div>
			</div>
		</VueFinalModal>
	</div>
</template>

<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	const configStore = useSysConfigStore()
	const vipStore = useVipStore()
	const userStore = useUserStore()
	const modules = reactive([])

	const currentSwiper = ref()

	onMounted(() => {
		nextTick(() => {
			if (currentSwiper.value) {
				vipStore.changeVipActive(userStore.vip_level)
				currentSwiper.value.$el.swiper.slideTo(userStore.vip_level - 1)
			}
		})
	})
</script>

<style scoped lang="scss">
	.vip-l-container {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 0 16px 46px;
	}
	.vip-l-detail {
		position: relative;
		margin-top: 10px;
		z-index: 1;
		&::before {
			content: '';
			display: block;
			position: absolute;
			left: -25%;
			top: -5%;
			border-radius: 50%;
			width: 52%;
			height: 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-color: v-bind('vipStore.vipColor');
			opacity: 0.4;
			filter: blur(80px);
			z-index: 0;
		}
		&::after {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: v-bind('vipStore.vipBg');
			z-index: -1;
		}
		width: 100%;
		font-size: 12px;
		height: min(calc(100vw * 175px / 343px), 300px);
		background-size: 100% 100%;
		padding: 26px 24px 11px;
		position: relative;
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.vip-l-detail-b {
			display: flex;
			justify-content: space-between;
		}
		.vip-l-detail-nn {
			color: $color-white;
			font-size: 16px;
			font-weight: bold;
			line-height: 1;
		}
		.vip-l-detail-v {
			color: $color-white;
			font-size: 30px;
			font-style: italic;
			font-weight: bold;
			transform: translateX(-6px);
		}
		.vip-l-progress-c {
			margin-top: 10px;
			margin-bottom: 16px;
			.vip-l-progress-bg {
				background: $bg;
				height: 4px;
				border-radius: 2px;
				margin-top: 10px;
				.vip-l-progress {
					background: $main;
					height: 4px;
					border-radius: 2px;
					position: relative;
					.vip-l-progress-t {
						color: $color-white;
						position: absolute;
						left: 0;
						text-align: right;
						width: 100%;
						min-width: min-content;
						top: -16px;
						line-height: 1;
					}
				}
			}
		}
		.vip-l-detail-v-s {
			display: flex;
			justify-content: space-between;
			margin-top: 6px;
		}

		.vip-l-lvbg {
			position: absolute;
			top: 0;
			right: 20px;
			z-index: 1;
			width: min(25.34vw, 200px);
			&::after {
				content: '';
				background: v-bind('vipStore.vipColor');
				position: absolute;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				left: 10%;
				top: 0;
				z-index: -1;
				filter: blur(30px);
			}
		}
	}
	.vip-l-activate {
		height: 80px;
		flex-shrink: 0;
		margin-top: 10px;
		border-radius: 8px;
		position: relative;
		background: $block-bg-2;
		padding-left: 20px;
		padding-right: 18px;
		display: flex;
		align-items: center;
		.vip-l-activate-title {
			color: $down-03;
			font-size: 14px;
		}
	}
	.vip-l-next-b-a {
		height: 80px;
		flex-shrink: 0;
		margin-top: 10px;
		border-radius: 8px;
		position: relative;
		background: radial-gradient(
			591.39% 141.42% at 100% 0%,
			rgba(255, 232, 30, 0.79) 0%,
			rgba(253, 139, 34, 0.67) 56.16%,
			rgba(253, 85, 13, 0.42) 99.99%
		);
		box-shadow: 0px 1px 1px 0px rgba(253, 242, 141, 0.3) inset;
		padding-left: 28px;
		padding-right: 28px;
		font-size: 12px;
		display: flex;
		align-items: center;
		color: rgba(255, 255, 255, 0.5);
	}
	.vip-l-s-s {
		border-radius: 6px 6px 0px 0px;
		background: $block-bg-2;
		width: auto;
		font-size: 16px;
		font-weight: 700;
		& > div {
			width: 91px;
			height: 43px;
			display: flex;
			gap: 4px;
			align-items: center;
			justify-content: center;
			background: $dark-bg-03;
			transition: all 0.2s;
			img {
				filter: grayscale(0.8);
			}
		}
		& > div.vip-l-s-s-a {
			color: $main;
			background: transparent;
			img {
				filter: unset;
			}
		}
	}

	.vip-l-r-container {
		border-radius: 0px 0px 6px 6px;
		background: $block-bg-2;
		padding: 15px 12px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		transition: all 0.3s;
		.vip-l-r-c-item {
			width: 100%;
			flex-shrink: 0;
			border-radius: 6px;
			border: 1px solid $block-bg;
			background: $block-bg-2;
			color: $text-lowlight;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 7px 16px;
			gap: 10px;
			.vip-l-r-c-item-t {
				flex: 1;
				font-size: 12px;
				text-transform: capitalize;

				h4 {
					color: $main;
					font-size: 14px;
					margin-bottom: 4px;
				}
			}
			.vip-l-r-c-item-i {
				width: 80px;
				height: 80px;
			}
		}
	}
	.vip-l-t {
		margin-bottom: 16px;
		color: $color-white;
		font-size: 20px;
		font-weight: bold;
	}

	.vip-l-m {
		padding: 20px 24px;
		background: $block-bg-2;
		display: flex;
		flex-direction: column;
		gap: 10px;
		color: $text-lowlight;
		border-radius: 6px;
		font-size: 12px;
	}
	.vip-l-f {
		display: flex;
		flex-direction: column;
		gap: 10px;
		.vip-l-f-c {
			color: $text-lowlight;
			background: $block-bg-2;
			border-radius: 6px;
			.vip-l-f-i {
				font-size: 14px;
				padding: 11px 12px;

				display: flex;
				align-items: center;
				font-weight: 500;
				justify-content: space-between;
			}
			.vip-l-f-i-t {
				padding: 0;
				max-height: 0;
				overflow: hidden;
				opacity: 0;
				font-size: 12px;
			}
		}
		.vip-l-f-a {
			.vip-l-f-i {
				color: $text-base;
			}
			.vip-l-f-i-t {
				padding: 8px 12px 12px;
				max-height: 300px;
				opacity: 1;
				transition: max-height 0.3s, opacity 0.3s;
				// border-top: 1px solid $bg;
				overflow: hidden;
			}
		}
	}

	:deep(.vip-l-rule) {
		height: 100%;
		background-color: $bg;
		padding-left: 16px;
		padding-right: 16px;
		overflow-y: auto;
		overflow-x: hidden;
		.vip-l-rule-c {
			&.vip-l-rule-c-nb {
				.vip-l-rule-c-i {
					& > p.vip-l-rule-i-n {
						flex-shrink: 0;
						flex: 1;
						justify-content: center;
					}
					& > p.vip-l-rule-i-r {
						flex-shrink: 0;
						flex: 1;
						text-align: center;
					}
				}
			}
			width: 100%;
			margin-top: 10px;
			border-radius: 6px;
			background: $block-bg-2;
			display: inline-flex;
			padding: 0px 16px 16px 16px;
			flex-direction: column;
			align-items: flex-start;
			flex-shrink: 0;
			.vip-l-rule-c-i {
				width: 100%;
				display: flex;
				padding: 8px;
				font-size: 12px;
				& > p.vip-l-rule-i-b {
					flex: 1;
					text-align: center;
				}
				& > p.vip-l-rule-i-n {
					flex-shrink: 0;
					width: 30%;
					display: flex;
					align-items: center;

					& > span {
						display: inline-block;
						width: 42px;
						white-space: nowrap;
					}
				}
				& > p.vip-l-rule-i-r {
					flex-shrink: 0;
					width: 30%;
					text-align: right;
				}
			}
			& > .vip-l-rule-c-i:nth-child(even) {
				background: $bg;
			}
			.vip-l-rule-c-h {
				padding: 8px;
				color: $color-white;
			}
		}
	}
	.vip-exchange {
		list-style-type: disc;
		margin-left: 24px;
	}
</style>
