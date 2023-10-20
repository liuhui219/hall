<template>
	<div class="wrap vip-nl-container">
		<div class="vip-nl-banner" :style="{ backgroundImage: `url(${getResConfigImage('banner_pc', ImageKeyEnum.vip)})` }">
			<div class="vip-nl-banner-title">
				<div class="vip-nl-club">{{ $t('V0026') }}</div>
				<div class="leading-[1.6] mt-[20px] mb-[27px]">
					{{ $t('V0027') }}
				</div>
				<button class="sys-btn btn-main-text w-[350px] !h-[63PX] !text-[20px]" @click="openLoginOrRegister()">{{ $t('V0028') }}</button>
			</div>
		</div>
		<div class="vip-nl-setup-container">
			<h3 class="vip-nl-title">{{ $t('V0029') }}</h3>
			<div class="vip-nl-setup-context">
				<div v-for="item in setupList" :key="item.value" class="vip-nl-setup-context-item" :class="[`setup-${item.value}`]">
					<div class="vip-nl-setup-context-container">
						<div class="vip-nl-setup-title">{{ $t(item.title) }}</div>
						<p class="vip-nl-setup-context-text">{{ $t(item.text) }}</p>
					</div>
					<div class="vip-nl-setup-image">
						<BaseImg :src="item.img" />
					</div>
				</div>
			</div>
		</div>
		<div class="vip-nl-reward-item-container">
			<h3 class="flex justify-between items-center vip-nl-title">
				<span>{{ $t('V0036') }}</span>
				<div class="flex items-center gap-[4px] ml-[6px]">
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
				<swiper-slide v-for="(item, index) in vipStore.list" :key="index" class="vip-nl-reward-item">
					<div class="vip-nl-reward-item-context">
						<div class="vip-nl-reward-item-title">{{ $t(item.title) }}</div>
						<p>{{ $t(item.text) }}</p>
					</div>
					<div :style="{ backgroundImage: `url(${getResConfigImage(item.image, ImageKeyEnum.vip)})` }" class="vip-nl-reward-item-image" />
				</swiper-slide>
			</swiper>
			<div v-if="vipStore.list.length > 4" class="vip-nl-p">
				<div
					v-for="(item, index) in Math.max(1, vipStore.list.length - 3)"
					:key="item"
					:class="{ 'vip-nl-p-a': index == activeIndex }"
					@click="changeSlide(index)"
				/>
			</div>
		</div>

		<div v-if="resConfig['telegram-group']" class="vip-nl-help">
			<h3 class="vip-nl-title">{{ $t('V0071') }}</h3>
			<div class="vip-nl-help-context" :style="{ backgroundImage: `url(${getResConfigImage('vip_tip_pc', ImageKeyEnum.vip)})` }">
				<div class="w-[54%] pl-[30px] pr-[44px] absolute right-0 top-0 h-full gap-[24px] flex flex-col leading-[2.22] justify-center">
					<p>{{ $t('V0072') }}</p>
					<button class="sys-btn btn-main-text w-[280px] !text-[16px]" @click="pageConfigClick(1, resConfig['telegram-group'])">
						{{ $t('V0073') }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const vipStore = useVipStore()
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow, SwiperPagination])
	const rewardRef = ref()
	const activeIndex = ref(0)
	const slideChange = (event: any) => {
		activeIndex.value = event.realIndex
	}
	const changeSlide = (index: number) => {
		rewardRef.value?.$el.swiper.slideTo(index)
	}
	const setupList = [
		{
			value: 1,
			text: 'V0033',
			title: 'V0030',
			img: getResConfigImage('setup_1_pc', ImageKeyEnum.vip),
		},
		{
			value: 2,
			text: 'V0034',
			title: 'V0031',
			img: getResConfigImage('setup_2_pc', ImageKeyEnum.vip),
			color: resConfig.vipConfig['setup_2']?.color,
		},
		{
			value: 3,
			text: 'V0035',
			title: 'V0032',
			img: getResConfigImage('setup_3_pc', ImageKeyEnum.vip),
			color: resConfig.vipConfig['setup_3']?.color,
		},
	]
	const setup_1_color = resConfig.vipConfig['setup_1']?.color
	const setup_2_color = resConfig.vipConfig['setup_2']?.color
	const setup_3_color = resConfig.vipConfig['setup_3']?.color
</script>

<style scoped lang="scss">
	.vip-nl-container {
		padding-bottom: 50px;
		display: flex;
		flex-direction: column;
		gap: 30px;
		padding-top: 30px;
	}
	.margin {
		margin: 0 16px;
	}
	.vip-nl-banner {
		width: 100%;
		height: 0;
		padding-bottom: calc(100% * 321px / 1280px);
		background-size: 100% 100%;
		position: relative;
		border-radius: 6px;
		.vip-nl-banner-title {
			color: $color-white;
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 700px;
			position: absolute;
			bottom: 0;
			font-size: 22px;
			left: 26px;
			height: 100%;
			& > div {
				padding-left: 13px;
			}
			.vip-nl-club {
				color: $main;
				text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.34);
				font-size: 40px;
				font-weight: 700;
				line-height: 1;
				text-transform: capitalize;
			}
		}
	}
	.vip-nl-title {
		font-size: 26px;
		margin-bottom: 24px;
		font-weight: 700;
		color: $color-white;
	}
	.vip-nl-setup-container {
		position: relative;

		.vip-nl-setup-context {
			width: 100%;
			display: flex;
			gap: 22px;
			.vip-nl-setup-context-item {
				border-radius: 8px;
				flex: 1;
				height: 190px;
				overflow: hidden;
				flex-shrink: 0;
				font-size: 18px;
				position: relative;

				display: flex;
				align-items: flex-end;
				border-radius: 6px;
				border: 0.5px solid $disable-color;
				background: $block-bg-2;
				&::before {
					content: '';
					position: absolute;
					left: -35px;
					top: 0;
					border-radius: 50%;
					width: 71px;
					height: 218px;
					flex-shrink: 0;
					opacity: 0.3;
					filter: blur(40px);
				}
				&.setup-1 {
					&::before {
						background: v-bind(setup_1_color);
					}
					.vip-nl-setup-image::after {
						background: v-bind(setup_1_color);
					}
					// .vip-nl-setup-image::before {
					// 	box-shadow: 0 0 16px 0 v-bind(setup_1_color);
					// }
				}
				&.setup-2 {
					&::before {
						background: v-bind(setup_2_color);
					}
					.vip-nl-setup-image::after {
						background: v-bind(setup_2_color);
					}
					// .vip-nl-setup-image::before {
					// 	box-shadow: 0 0 16px 0 v-bind(setup_2_color);
					// }
				}
				&.setup-3 {
					&::before {
						background: v-bind(setup_3_color);
					}
					.vip-nl-setup-image::after {
						background: v-bind(setup_3_color);
					}
					// .vip-nl-setup-image::before {
					// 	box-shadow: 0 0 16px 0 v-bind(setup_3_color);
					// }
				}
				.vip-nl-setup-context-container {
					height: 100%;
					padding: 30px 10px 30px 20px;
					display: flex;
					flex-direction: column;
					gap: 14px;
					.vip-nl-setup-title {
						color: $main;
						text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.34);
						font-size: 24px;
						font-weight: 700;
						text-transform: capitalize;
						white-space: nowrap;
					}
					.vip-nl-setup-context-text {
						color: $text-lowlight;
						font-size: 18px;
						font-weight: 500;
					}
				}

				.vip-nl-setup-image {
					margin-right: 18px;
					flex-shrink: 0;
					width: 103px;
					height: 120px;
					position: relative;
					z-index: 0;
					border-radius: 50%;
					align-self: center;
					z-index: 0;
					&::after {
						content: '';
						position: absolute;
						left: -16%;
						top: -7%;
						width: 132%;
						height: 114%;
						border-radius: 50%;
						opacity: 0.4;
						z-index: 1;
						filter: blur(20px);
					}
				}
			}
		}
	}
	.reward {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 20px;
		font-weight: 600;
		text-transform: uppercase;
		margin-top: 20px;
		.rewardTitle {
			background: linear-gradient(180deg, #fef1d1 0%, #fabf29 100%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			margin: 0 12px;
		}
	}
	.vip-nl-reward-item-container {
		.vip-nl-reward-item {
			height: 246px;
			flex-shrink: 0;
			border-radius: 6px;
			border-radius: 12px;
			border: 1px solid $block-bg;
			background: $block-bg-2;
			color: $text-lowlight;
			display: flex;
			flex-direction: column-reverse;
			align-items: center;
			justify-content: center;

			.vip-nl-reward-item-context {
				flex: 1;
				font-size: 16px;
				text-transform: capitalize;
				line-height: 20px;
				text-align: center;
				padding: 0 20px;
				.vip-nl-reward-item-title {
					color: $main;
					text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.34);
					font-size: 22px;
					font-weight: 700;
					line-height: 24px; /* 109.091% */
					text-transform: capitalize;
					margin-bottom: 4px;
					white-space: nowrap;
				}
			}
			.vip-nl-reward-item-image {
				width: 140px;
				height: 140px;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center center;
			}
		}
		.vip-nl-p {
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
				&:not(.vip-nl-p-a):hover {
					background: $block-bg;
				}
			}
			& > div.vip-nl-p-a {
				background: $main;
			}
		}
	}

	.vip-nl-help {
		.vip-nl-help-context {
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
	}
</style>
