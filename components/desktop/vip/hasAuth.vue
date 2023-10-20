<template>
	<div class="wrap vip-l-container">
		<div class="vip-l-detail">
			<div class="vip-l-detail-c">
				<div>
					<div>
						<h4 class="vip-l-detail-nn">{{ userStore.data.nickname }}</h4>
						<h2 class="vip-l-detail-v">VIP {{ Helper.addZero(userStore.vip_level) }}</h2>
					</div>
					<div class="vip-l-progress-c">
						<div class="vip-l-progress-bg">
							<div class="vip-l-progress" :style="{ width: userStore.vipProgress }">
								<p class="vip-l-progress-t">{{ parseInt(`${userStore.vipCurrentCoin}`) }}xp</p>
							</div>
						</div>
						<div class="vip-l-detail-v-s">
							<p>VIP {{ Helper.addZero(Math.min(userStore.vip_level, configStore.maxVip - 1)) }}</p>
							<p>VIP {{ Helper.addZero(Math.min(userStore.vip_level + 1, configStore.maxVip)) }}</p>
						</div>
					</div>
				</div>
				<div class="vip-l-detail-b">
					<p v-if="userStore.vip_level < configStore.maxVip">
						{{ $t('V0075', { value: parseInt(`${userStore.next_coin}`), vip: userStore.vip_level + 1 }) }}
					</p>
					<p v-else>{{ $t('V0093') }}</p>
					<p class="underline pointer" @click="vipStore.openRule()">{{ $t('V0074') }}</p>
				</div>
			</div>
			<div class="vip-l-lvbg">
				<BaseImg :src="getResConfigImage(`vip${userStore.vip_level}_l`, ImageKeyEnum.vip)" />
			</div>
		</div>
		<div v-if="!userStore.data.activating" class="vip-l-activate">
			<div class="flex-1">
				<div class="text-[30px] font-bold vip-l-activate-title mb-[10px]">{{ $t('V0091') }}</div>
				<div
					class="text-[26px]"
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
			<button class="sys-btn btn-main-text w-[280px]" @click="toDeposit()">{{ $t('H0005') }}</button>
		</div>
		<div v-else class="vip-l-r-c">
			<h3 class="flex justify-between items-center min-h-[60px] vip-l-text">
				<span>{{ $t('V0028') }}</span>
				<div v-if="vipStore.list.length > 4" class="flex items-center gap-[4px] ml-[6px]">
					<button class="sys-btn btn-min btn-home-next swiper-button-vip-prev">
						<BaseArrowDown class="rotate-90" />
					</button>
					<button class="sys-btn btn-min btn-home-next swiper-button-vip-next">
						<BaseArrowDown class="rotate-[270deg] translate-x-[2px]" />
					</button>
				</div>
			</h3>
			<swiper
				ref="rewardRef"
				:modules="modules"
				:slides-per-view="4"
				:navigation="{
					nextEl: `.swiper-button-vip-next`,
					prevEl: `.swiper-button-vip-prev`, // 下一页dom节点
				}"
				:space-between="16"
				:slides-per-group="1"
				@slide-change="slideChange"
			>
				<swiper-slide
					v-for="(item, index) in vipStore.list"
					:key="index"
					class="vip-l-r-c-i"
					:class="{ 'vip-l-r-c-i-a': item.key == vipStore.nextUnlock?.type }"
				>
					<div class="vip-l-r-c-i-t">
						<div class="vip-l-r-c-i-t-t">{{ $t(item.title) }}</div>
						<p>{{ $t(item.text || item.tip) }}</p>
					</div>
					<BaseImg :src="getResConfigImage(item.image, ImageKeyEnum.vip)" class="vip-l-r-c-i-i" />
					<div v-show="item.key == vipStore.nextUnlock?.type" class="vip-l-r-c-i-d">
						{{ $t('V0076', { vip: vipStore.nextUnlock?.vip, value: parseInt(`${vipStore.nextUnlock?.coin || 0}`) }) }}
					</div>
				</swiper-slide>
			</swiper>
			<div v-if="vipStore.list.length > 4" class="vip-l-p">
				<div
					v-for="(item, index) in Math.max(1, vipStore.list.length - 3)"
					:key="item"
					:class="{ 'vip-l-p-a': index == activeIndex }"
					@click="changeSlide(index)"
				/>
			</div>
		</div>
		<div class="vip-l-r-c">
			<h3 class="flex justify-between items-center vip-l-text">
				<span>{{ $t('V0077') }}</span>
				<div class="flex items-center gap-[4px] ml-[6px]">
					<button class="sys-btn btn-min btn-home-next swiper-button-vipl-prev">
						<BaseArrowDown class="rotate-90" />
					</button>
					<button class="sys-btn btn-min btn-home-next swiper-button-vipl-next">
						<BaseArrowDown class="rotate-[270deg] translate-x-[2px]" />
					</button>
				</div>
			</h3>
			<div>
				<swiper
					ref="currentSwiper"
					:modules="modules"
					:navigation="{
						nextEl: `.swiper-button-vipl-next`,
						prevEl: `.swiper-button-vipl-prev`, // 下一页dom节点
					}"
					:slides-per-view="7.2"
					:space-between="10"
					:slides-per-group="7"
				>
					<swiper-slide
						v-for="item in configStore.config.vip_config.levels"
						:key="item.vip"
						class="vip-l-s-s"
						@click="vipStore.changeVipActive(item.vip)"
					>
						<div :class="{ 'vip-l-s-s-a': vipStore.vipActive == item.vip }">
							<div class="w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full bg-bg">
								<BaseImg :src="getResConfigImage(`vip${item.vip}`, ImageKeyEnum.vip)" class="w-[24px]" />
							</div>
							VIP {{ item.vip }}
						</div>
					</swiper-slide>
				</swiper>
				<div class="vip-l-container-13">
					<div v-for="(item, index) in vipStore.currentList" :key="index" class="vip-l-item-13">
						<BaseImg :src="getResConfigImage(item.image, ImageKeyEnum.vip)" class="vip-l-image-13" />
						<div class="vip-l-content-13">
							<h4 class="vip-l-text-13">{{ $t(item.title) }}</h4>
							<p class="truncate whitespace-pre-wrap line-clamp-4" v-html="$t(item.tip, item.params)" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="resConfig['telegram-group']">
			<h3 class="vip-l-text">{{ $t('V0071') }}</h3>
			<div class="vip-l-m" :style="{ backgroundImage: `url(${getResConfigImage('vip_tip_pc', ImageKeyEnum.vip)})` }">
				<div class="w-[54%] pl-[30px] pr-[44px] absolute right-0 top-0 h-full gap-[24px] flex flex-col leading-[2.22] justify-center">
					<p>{{ $t('V0072') }}</p>
					<button class="sys-btn btn-main-text w-[280px] !text-[16px]" @click="pageConfigClick(1, resConfig['telegram-group'])">
						{{ $t('V0073') }}
					</button>
				</div>
			</div>
		</div>
		<div v-if="vipStore.faqList.length">
			<h3 class="vip-l-text !mb-[4px]">FAQ</h3>
			<div class="vip-l-f">
				<div
					v-for="(item, index) in vipStore.faqList"
					:key="index"
					class="vip-l-faq-container"
					:class="['vip-l-faq-container', { 'vip-l-faq-container-active': vipStore.faqOpenMap[index] }]"
				>
					<div class="vip-l-faq-item pointer" @click="vipStore.clickFaqItem(index)">
						<div>{{ $t(item.title) }}</div>
						<BaseArrowDown class="transition-all duration-300 gray" :class="{ '-rotate-[180deg] ': vipStore.faqOpenMap[index] }" />
					</div>
					<div class="vip-l-f-t">{{ $t(item.content) }}</div>
				</div>
			</div>
		</div>
		<VueFinalModal v-model="vipStore.showVipRule" classes="modal-container" modal content-class="modal-content vip-l-rule">
			<DesktopPopupHeader :invisible="true" :close="vipStore.closeRule" title="VIP upgrade details" />
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
				<div class="vip-l-rule-i vip-l-rule-h">
					<p class="vip-l-rule-i-n">
						{{ $t('V0009') }}
					</p>
					<p v-if="userStore.vipUpgradeStatus" class="vip-l-rule-i-b">{{ $t('V0037') }}</p>
					<p class="vip-l-rule-i-r">
						{{ $t('V0094') }}
					</p>
				</div>
				<div class="flex-1 overflow-y-auto flex flex-col w-full">
					<div v-for="item in configStore.vip_list" :key="item" class="vip-l-rule-i">
						<p class="vip-l-rule-i-n">
							<BaseImg :src="getResConfigImage(`vip${item.vip}`, ImageKeyEnum.vip)" class="w-[20px] mr-[10px]" />
							<span>VIP {{ Helper.addZero(item.vip) }}</span>
						</p>
						<p v-if="userStore.vipUpgradeStatus" class="vip-l-rule-i-b"><BasePoint :value="vipStore.getVipUpgradeBonus(item.vip)" /></p>
						<p class="vip-l-rule-i-r"><BaseNumber :value="parseInt((item.vip_coin / 100).toFixed(2))" /></p>
					</div>
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
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow, SwiperPagination])
	const rewardRef = ref()
	const activeIndex = ref(0)
	const currentSwiper = ref()
	const slideChange = (event: any) => {
		activeIndex.value = event.realIndex
	}
	const changeSlide = (index: number) => {
		rewardRef.value?.$el.swiper.slideTo(index)
	}

	onMounted(() => {
		nextTick(() => {
			if (vipStore.nextUnlock) {
				let findIndex = vipStore.list.findIndex((el: any) => el.key == vipStore.nextUnlock.type)
				if (findIndex > 3) {
					rewardRef.value?.$el.swiper.slideTo(Math.min(vipStore.list.length - 3, findIndex))
				}
			}
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
		gap: 40px;
		padding-bottom: 46px;
	}
	.vip-l-detail {
		width: 100%;
		font-size: 22px;
		height: 0;
		background-size: 100% 100%;
		padding: 0 70px;
		margin-top: 30px;
		padding-bottom: calc(100% * 321px / 1280px);
		position: relative;
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		color: $color-white;
		z-index: 0;
		&::before {
			content: '';
			display: block;
			position: absolute;
			left: -25%;
			top: -5%;
			border-radius: 50%;
			width: 56%;
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
		.vip-l-detail-c {
			position: absolute;
			height: 100%;
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: center;
			width: 70%;
			padding-top: 10px;
			.vip-l-detail-b {
				display: flex;
				justify-content: space-between;
				font-size: 22px;
			}
			.vip-l-detail-nn {
				font-size: 28px;
				font-weight: bold;
				line-height: 1;
			}
			.detailVip {
				font-size: 42px;
				font-style: italic;
				font-weight: bold;
				transform: translateX(-8px);
			}
			.vip-l-progress-c {
				.vip-l-progress-bg {
					background: $bg;
					height: 12px;
					border-radius: 6px;
					margin-top: 32px;
					.vip-l-progress {
						background: $main;
						height: 12px;
						border-radius: 6px;
						position: relative;
						.vip-l-progress-t {
							color: $color-white;
							position: absolute;
							left: 0;
							text-align: right;
							width: 100%;
							min-width: min-content;
							font-size: 12px;
							top: -21px;
						}
					}
				}
			}
			.vip-l-detail-v {
				margin-bottom: 20px;
				display: flex;
				justify-content: space-between;
				font-style: italic;
				color: $color-white;
				font-size: 42px;
				font-weight: bold;
			}
			.vip-l-detail-v-s {
				margin-bottom: 30px;
				display: flex;
				justify-content: space-between;
				margin-top: 12px;
				color: $text-base;
				font-size: 22px;
			}
		}
		.vip-l-lvbg {
			position: absolute;
			right: 5%;
			width: 18%;
			z-index: 1;
			&::after {
				content: '';
				background: v-bind('vipStore.vipColor');
				position: absolute;
				width: 108%;
				height: 100%;
				border-radius: 50%;
				left: -4%;
				top: 10%;
				z-index: -1;
				opacity: 0.6;
				filter: blur(25px);
			}
		}
	}

	.vip-l-r-c {
		.vip-l-r-c-i {
			height: 246px;
			flex-shrink: 0;
			border-radius: 6px;
			border-radius: 12px;
			border: 1px solid $block-bg;
			background: $block-bg-2;
			color: $text-lowlight;
			position: relative;
			display: flex;
			flex-direction: column-reverse;
			align-items: center;
			justify-content: center;

			.vip-l-r-c-i-t {
				flex: 1;
				font-size: 16px;
				text-transform: capitalize;
				text-align: center;
				font-weight: 500;
				.vip-l-r-c-i-t-t {
					color: $main;
					text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.34);
					font-size: 22px;
					font-weight: 700;
					line-height: 24px; /* 109.091% */
					text-transform: capitalize;
					margin-bottom: 4px;
				}
			}
			.vip-l-r-c-i-i {
				width: 140px;
			}
			.vip-l-r-c-i-d {
				position: absolute;
				left: 1px;
				top: 1px;
				z-index: 1;
				padding: 4px 8px;
				border-top-left-radius: inherit;
				border-bottom-right-radius: inherit;
				background: linear-gradient(102deg, #fa8b37 13.41%, #ffc149 99.73%);
				filter: drop-shadow(0px 2px 2px #1b544a);
				color: #a12307;
				text-align: center;
				font-feature-settings: 'clig' off, 'liga' off;
				font-size: 12px;
				font-style: normal;
				font-weight: 700;
				line-height: normal;
			}
			&::after {
				content: '';
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				border: 1px solid rgba(63, 241, 173, 0.83);
				background: linear-gradient(180deg, #184f47 -7.53%, #184f47 5.69%, #1e584c 27.86%, #367c60 54.91%, #0b4d31 97.82%);
				z-index: -1;
				border-radius: inherit;
				visibility: hidden;
			}
		}
		.vip-l-r-c-i-a {
			&::after {
				visibility: visible;
			}
		}
		.vip-l-p {
			width: 681px;
			margin: 24px auto 0;
			height: 6px;
			border-radius: 3px;
			background: $block-bg-2;
			display: flex;
			& > div {
				flex: 1;
				height: 6px;
				border-radius: 3px;
				transition: all 0.3s;
				background: transparent;
				cursor: pointer;
				&:not(.vip-l-p-a):hover {
					background: $block-bg;
				}
			}
			& > div.vip-l-p-a {
				background: $main;
			}
		}
	}

	.vip-l-r-c {
		.vip-l-s-s {
			border-radius: 6px 6px 0px 0px;
			background: $block-bg-2;
			cursor: pointer;
			font-size: 24px;
			font-weight: 700;
			& > div {
				width: 100%;
				height: 82px;
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
		.vip-l-container-13 {
			padding: 40px 20px;
			background: $block-bg-2;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 15px;
			border-radius: 0px 0px 6px 6px;
			.vip-l-item-13 {
				height: 150px;
				flex-shrink: 0;
				border-radius: 6px;
				border: 1px solid $block-bg;
				background: $block-bg-2;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 22px 0 20px;
				gap: 30px;
				.vip-l-content-13 {
					flex: 1;
					font-size: 18px;
					text-transform: capitalize;
					color: $text-lowlight;
					.vip-l-text-13 {
						color: $main;
						font-size: 20px;
						font-weight: 700;
						text-transform: capitalize;
						margin-bottom: 10px;
					}
				}
				.vip-l-image-13 {
					width: 110px;
				}
			}
		}
	}

	.vip-l-text {
		margin-bottom: 24px;
		color: $color-white;
		font-size: 26px;
		font-weight: bold;
	}

	.vip-l-m {
		padding: 56px 30px;
		width: 100%;
		height: 0;
		padding-bottom: calc(100% / 1280px * 210px);
		border-radius: 6px;
		font-size: 18px;
		color: $text-lowlight;
		background-size: cover;
		background-repeat: no-repeat;
		position: relative;
	}
	.vip-l-f {
		display: flex;
		flex-direction: column;
		gap: 10px;
		.vip-l-faq-container {
			color: $text-lowlight;
			background: $block-bg-2;
			border-radius: 10px;
			.vip-l-faq-item {
				font-size: 16px;
				padding: 14px 12px;

				display: flex;
				align-items: center;
				font-weight: 500;
				justify-content: space-between;
			}
			.vip-l-f-t {
				padding: 0;
				max-height: 0;
				overflow: hidden;
				opacity: 0;
				font-size: 16px;
			}
		}
		.vip-l-faq-container-active {
			.vip-l-faq-item {
				color: $text-base;
			}
			.vip-l-f-t {
				padding: 8px 12px 22px;
				max-height: 800px;
				opacity: 1;
				transition: max-height 0.3s, opacity 0.3s;

				overflow: hidden;
			}
		}
	}

	:deep(.vip-l-rule) {
		width: 660px;
		height: 864px;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		position: relative;
		background-color: $bg;
		overflow: hidden;
		.vip-l-rule-c {
			width: 100%;
			margin-top: 10px;
			border-radius: 6px;
			background: $block-bg-2;
			display: inline-flex;
			padding: 0px 16px 16px 16px;
			flex-direction: column;
			align-items: flex-start;
			flex: 1;
			overflow: hidden;
			flex-shrink: 0;
			.vip-l-rule-i {
				width: 100%;
				display: flex;
				padding: 8px;
				font-size: 14px;

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
				& > p.vip-l-rule-i-b {
					flex: 1;
					text-align: center;
				}
			}
			.vip-l-rule-i:not(.vip-l-rule-h):nth-child(odd) {
				background: $bg;
			}
			.vip-l-rule-h {
				padding: 16px 8px;
				color: $color-white;
			}
			&.vip-l-rule-c-nb {
				.vip-l-rule-i {
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
		}
	}
	.vip-l-activate {
		flex-shrink: 0;
		border-radius: 6px;
		background: $block-bg-2;
		padding: 43px 30px;
		display: flex;
		align-items: center;
		.vip-l-activate-title {
			color: $down-03;
		}
	}
	.vip-exchange {
		list-style-type: disc;
		margin-left: 24px;
	}
</style>
