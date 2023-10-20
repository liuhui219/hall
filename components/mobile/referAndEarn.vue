<template>
	<div>
		<!-- <BasePageLoading v-if="referAndEarnStore.appLoadingStatus" class="!z-[999] !absolute opacity-80" /> -->
		<div class="dl-mobile-dividing-line">&nbsp;</div>
		<!-- 未登录 或 普通用户 -->
		<!-- v-if="!useUserStore().isLogin || !useUserStore().isAgencyUser" -->
		<div v-if="!useUserStore().isLogin" class="px-[15px]">
			<div class="mb-[10px] text-[24px] text-center font-[600]">
				{{ referAndEarnStore.sliceLang(0, $t('DL0002')) }}
				<span class="dl-money-span"> {{ configStore.currency_symbol }}1000 </span>
				{{ referAndEarnStore.sliceLang(1, $t('DL0002')) }}
			</div>
			<div class="text-[14px] mb-[20px] text-center font-[500]">{{ $t('DL0003') }}</div>

			<BaseImg class="w-[100%]" :src="getResConfigImage('dl_h5_banner', ImageKeyEnum.referAndEarn)" alt="h5 banner" />
			<div v-if="!useUserStore().isLogin" class="dl-banner-btn" @click="openRegister()">
				{{ $t('DL0001') }}
			</div>
		</div>
		<!-- 代理用户 专属轮播图 -->
		<div v-if="useUserStore().isLogin" class="dl_dl_h5_banner">
			<div class="mr-[10px] dl_dl_h5_banner-box">
				<h1>{{ $t('DL0065') }}</h1>
				<div>
					<p v-if="useUserStore().inviteUsersStatus || useUserStore().inviteUsersVipStatus">
						<span class="dl-money-span">
							{{ configStore.currency_symbol
							}}{{
								configStore.inviteUsersCfg.data.awards.length
									? $fp($cp(referAndEarnStore.maxReferralRewards() + referAndEarnStore.totalVipRewards()))
									: ''
							}}
						</span>
						{{ $t('DL0019') }}
					</p>
					<p v-if="useUserStore().proxyAwardStatus">
						<span class="dl-money-span"> {{ referAndEarnStore.maxFlowPro() }} </span> {{ $t('DL0066') }}
					</p>
				</div>
			</div>
		</div>

		<!-- 登录 -->
		<div v-if="useUserStore().isLogin" class="mb-4 pt-4 pb-1 px-[15px]">
			<p class="block-title font-bold mb-2">{{ $t('DL0005') }}</p>

			<button class="refer-earn-btn my-[13px]" @click="Helper.copyText(referAndEarnStore.shareUrl, true)">
				<span class="mr-[20px]">link</span>
				<span class="color-text flex-1 truncate text-left mr-[10px]">{{ referAndEarnStore.shareUrl }}</span>
				<BaseIcon name="dl-copy" class="dl-copy-color" />
			</button>

			<!-- code码 仅代理用户展示 -->
			<button class="refer-earn-btn" @click="Helper.copyText(String(referAndEarnStore.referCode), true)">
				<span class="mr-[20px]">{{ $t('REW0011') }}</span>
				<span class="color-text flex-1 truncate text-left mr-[10px]">{{ referAndEarnStore.referCode }}</span>
				<BaseIcon name="dl-copy" class="dl-copy-color" />
			</button>

			<div class="flex justify-center items-center py-[20px] w-[365px]">
				<span class="or-line" />
				<span class="mx-[45px] dl-invite-or-mobile">{{ $t('L1004') }}</span>
				<span class="or-line" />
			</div>

			<div class="flex justify-center gap-x-8">
				<a
					v-for="(item, index) in configStore.shareList"
					:key="index"
					class="link text-[40px] dl-invite-icon-mobile"
					target="_blank"
					@click="referAndEarnStore.clickShare(item.url)"
				>
					<BaseIcon :name="item.icon" />
				</a>
			</div>
		</div>
		<!-- 代理用户 -->
		<div v-if="useUserStore().isLogin" class="dl-panel-mobile">
			<div>
				<div class="dl-panel-header-mobile">
					<h1>{{ $t('U0005') }}</h1>
					<p @click="openPopup(PopupEnum.agentHistory)">
						<span>{{ $t('DL0033') }}</span>
						<BaseIcon name="select-arrow-down" class="dl-panel-icon" />
					</p>
				</div>

				<div class="dl-panel-content-mobile dl-panel-content-mobile-up">
					<!-- <div>
						<h1>{{ $fp($cp(referAndEarnStore.dlData.amount_point)) }}</h1>
						<h2>{{ $t('DL0007') }}</h2>
					</div>
					<p class="vertical-line" />
					<div>
						<h1>{{ $fp($cp(referAndEarnStore.dlData.un_receive_point)) }}</h1>
						<h2>{{ $t('DL0008') }}</h2>
					</div> -->
					<div>
						<h1>{{ $fp($cp(referAndEarnStore.dlData.un_receive_point)) }}</h1>
						<h2>{{ $t('DL0007') }}</h2>
					</div>

					<p class="vertical-line" />
					<div>
						<h1>{{ $fp($cp(referAndEarnStore.dlData.today_amount_point)) }}</h1>
						<h2>{{ $t('AF0010') }}</h2>
					</div>
				</div>
				<button :class="{ 'gray-btn': referAndEarnStore.dlData.un_receive_point == 0 }" @click="referAndEarnStore.BulkClick">
					{{ $t('DL0034') }}
				</button>
			</div>

			<div class="mt-[20px]">
				<div class="dl-panel-header-mobile">
					<h1>{{ $t('DL0009') }}</h1>
					<p @click="openPopup(PopupEnum.friendsList)">
						<span>{{ $t('DL0033') }}</span>
						<BaseIcon name="select-arrow-down" class="dl-panel-icon" />
					</p>
				</div>

				<div class="dl-panel-content-mobile">
					<div>
						<h1>{{ referAndEarnStore.dlData.team_total }}</h1>
						<h2>{{ $t('DL0063') }}</h2>
					</div>
					<p class="vertical-line" />
					<div>
						<h1>{{ referAndEarnStore.dlData.level1_count }}</h1>
						<h2>{{ $t('DL0068') }}</h2>
					</div>
					<p class="vertical-line" />
					<div>
						<h1>{{ referAndEarnStore.dlData.team_total - referAndEarnStore.dlData.level1_count }}</h1>
						<h2>{{ $t('DL0069') }}</h2>
					</div>
				</div>
			</div>
		</div>
		<!-- 未登录 或 代理用户 -->
		<div v-if="useUserStore().inviteUsersStatus" class="dl-mobile-card" @click="openPopup(PopupEnum.referralRewards)">
			<div>
				<BaseImg class="dl-mobile-card-img" :src="getResConfigImage('dl_h5_card_1', ImageKeyEnum.referAndEarn)" alt="h5 banner" />
				<p>
					{{ referAndEarnStore.sliceLang(0, $t('DL0070', { Bonus: 1000 }))
					}}<span class="dl-money-span"> {{ configStore.currency_symbol }}{{ $fp($cp(referAndEarnStore.maxReferralRewards())) }} </span
					>{{ referAndEarnStore.sliceLang(1, $t('DL0070', { Bonus: 1000 })) }}
				</p>
			</div>
			<button>{{ $t('DL0033') }}</button>
		</div>

		<div v-if="useUserStore().inviteUsersVipStatus" class="dl-mobile-card" @click="openPopup(PopupEnum.referralVipRewards)">
			<div>
				<BaseImg class="dl-mobile-card-img" :src="getResConfigImage('dl_h5_card_0', ImageKeyEnum.referAndEarn)" alt="h5 banner" />
				<p>
					{{ referAndEarnStore.sliceLang(0, $t('DL0018', { Bonus: 1000 }))
					}}<span class="dl-money-span"> {{ configStore.currency_symbol }}{{ $fp($cp(referAndEarnStore.totalVipRewards())) }} </span
					>{{ referAndEarnStore.sliceLang(1, $t('DL0018', { Bonus: 1000 })) }}
				</p>
			</div>
			<button>{{ $t('DL0033') }}</button>
		</div>

		<div v-if="useUserStore().proxyAwardStatus" class="dl-mobile-card" @click="openPopup(PopupEnum.commissionRewards)">
			<div>
				<BaseImg class="dl-mobile-card-img" :src="getResConfigImage('dl_h5_card_2', ImageKeyEnum.referAndEarn)" alt="h5 banner" />
				<p>
					{{ referAndEarnStore.sliceLang(0, $t('DL0020')) }}<span class="dl-money-span"> {{ referAndEarnStore.maxFlowPro() }}</span
					>{{ referAndEarnStore.sliceLang(1, $t('DL0020')) }}
				</p>
			</div>
			<button>{{ $t('DL0033') }}</button>
		</div>

		<div v-if="useUserStore().disRecharge3Status" class="dl-mobile-card" @click="openPopup(PopupEnum.distributionRewards)">
			<div>
				<BaseImg class="dl-mobile-card-img" :src="getResConfigImage('dl_h5_card_3', ImageKeyEnum.referAndEarn)" alt="h5 banner" />
				<p>
					{{ referAndEarnStore.sliceLang(0, $t('DL0022'))
					}}<span class="dl-money-span"
						>{{ configStore.currency_symbol
						}}{{ $fp($cp(configStore.disRecharge3Cfg.data.reward_items[0].ParentFirstReward.point)) }}</span
					>{{ referAndEarnStore.sliceLang(1, $t('DL0022')) }}
				</p>
			</div>
			<button>{{ $t('DL0033') }}</button>
		</div>
		<!-- 代理用户 -->
		<div v-if="useUserStore().isLogin" class="dl-score-box-mobile">
			<div class="dl-score-tab">
				<button :class="{ active: referAndEarnStore.scoreTabIndex == 1 }" @click="referAndEarnStore.switchScoreTab(1)">
					{{ $t('AF0010') }}
				</button>
				<button :class="{ active: referAndEarnStore.scoreTabIndex == 2 }" @click="referAndEarnStore.switchScoreTab(2)">
					{{ $t('DL0010') }}
				</button>
				<button :class="{ active: referAndEarnStore.scoreTabIndex == 3 }" @click="referAndEarnStore.switchScoreTab(3)">
					{{ $t('DL0011') }}
				</button>
				<button :class="{ active: referAndEarnStore.scoreTabIndex == 4 }" @click="referAndEarnStore.switchScoreTab(4)">
					{{ $t('DL0012') }}
				</button>
			</div>
			<!-- <BaseDatePicker
				v-model="rangeValue"
				:placeholder="$t('DL0049')"
				range
				format="yyyy-MM-dd"
				class="mt-[20px] mb-[9px]"
			/> -->
			<!-- <BaseDatePicker v-model="dateValue" :placeholder="$t('DL0049')" format="yyyy-MM-dd" class="mt-[20px] mb-[9px]" /> -->
			<ul class="dl-score-list">
				<li>
					<p>{{ $t('DL0007') }} :</p>
					<p>
						<!-- <BasePoint :value="referAndEarnStore.shareData.give_point + referAndEarnStore.shareData.total_commi" /> -->
						{{ $fp($cp(referAndEarnStore.dlData2.total_rewards_point)) }}
					</p>
				</li>
				<li v-if="useUserStore().inviteUsersStatus">
					<p>{{ $t('DL0073') }} :</p>
					<p>{{ $fp($cp(referAndEarnStore.dlData2.referral_rewards_point)) }}</p>
				</li>
				<li v-if="useUserStore().inviteUsersVipStatus">
					<p>{{ $t('DL0074') }} :</p>
					<p>{{ $fp($cp(referAndEarnStore.dlData2.referral_vip_up_rewards_point)) }}</p>
				</li>
				<li v-if="useUserStore().proxyAwardStatus">
					<p>{{ $t('DL0075') }} :</p>
					<p>{{ $fp($cp(referAndEarnStore.dlData2.commission_rewards_point)) }}</p>
				</li>
				<li v-if="useUserStore().disCommission3Status">
					<p>{{ $t('DL0071') }} :</p>
					<p>{{ $fp($cp(referAndEarnStore.dlData2.custom_commission_rewards_point)) }}</p>
				</li>
				<li v-if="useUserStore().disRecharge3Status">
					<p>{{ $t('DL0023') }} :</p>
					<p>{{ $fp($cp(referAndEarnStore.dlData2.friends_recharge_and_cashback)) }}</p>
				</li>
				<!-- <li>
					<p>{{ $t('DL0063') }}</p>
					<p>{{ referAndEarnStore.dlData2.team_total }}</p>
				</li>
				<li>
					<p>{{ $t('DL0068') }}</p>
					<p>{{ referAndEarnStore.dlData2.level1_count }}</p>
				</li>
				<li>
					<p>{{ $t('DL0069') }}</p>
					<p>{{ referAndEarnStore.dlData2.other_team_count }}</p>
				</li> -->
			</ul>
		</div>
		<!-- 代理用户 -->
		<div class="dl-learn-box-mobile">
			<div class="mb-[6px] mx-[15px] text-[14px] font-[600]">{{ $t('DL0037') }}</div>
			<div class="text-[12px] mx-[15px] dl-learn-describe">
				{{ $t('DL0036') }}
			</div>
			<div
				class="dl-card-contact-mobile my-[14px]"
				@click="pageConfigClick(1, 'https://t.me/' + resConfig.referAndEarnConfig.telegram.substring(1))"
			>
				<div class="flex justify-end items-center min-w-[36%] mr-[15px]">
					<BaseImg class="w-[20px]" :src="getResConfigImage('dl_Telegram', ImageKeyEnum.referAndEarn)" alt="dl_Telegram group" />
				</div>
				<span class="text-[14px]">{{ resConfig.referAndEarnConfig.telegram }}</span>
			</div>
			<div class="dl-card-contact-mobile" @click="pageConfigClick(1, 'mailto:' + resConfig.referAndEarnConfig.gmail)">
				<div class="flex justify-end items-center min-w-[36%] mr-[15px]">
					<BaseImg class="w-[20px]" :src="getResConfigImage('dl_google', ImageKeyEnum.referAndEarn)" alt="dl_google group" />
				</div>
				<span class="text-[14px]">{{ resConfig.referAndEarnConfig.gmail }}</span>
			</div>
		</div>
		<!-- 代理用户 -->
		<!-- <div v-if="useUserStore().isLogin" class="dl-faq-box-mobile">
			<h1>{{ $t('DL0043') }}</h1>
			<div class="dl-faq-item mb-[5px]" @click="openPopup(PopupEnum.spinRule)">
				<p>{{ $t('DL0044') }}</p>
				<BaseIcon name="select-arrow-down" class="dl-faq-icon" />
			</div>
			<div class="dl-faq-item" @click="openPopup(PopupEnum.spinRule)">
				<p>{{ $t('DL0045') }}</p>
				<BaseIcon name="select-arrow-down" class="dl-faq-icon" />
			</div>
		</div> -->
	</div>
</template>

<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const configStore = useSysConfigStore()
	const referAndEarnStore = useReferAndEarnStore()
	const dl_h5_banner2 = `url(${getResConfigImage('dl_h5_banner2', ImageKeyEnum.referAndEarn)})`
	// import { format, addDays } from 'date-fns'
	// const rangeValue = ref([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
	// const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
	// watchEffect(() => {
	// 	console.log('dateValue:', dateValue.value)
	// })
</script>
<style scoped lang="scss">
	.dl-banner-btn {
		@apply mx-[auto] mt-[15px] mb-[20px] py-[10px] w-[294px] rounded-md text-[16px] text-center font-[500];
		color: $text-button;
		background: $second;
	}
	.dl-money-span {
		color: $btn-main;
	}
	.dl-copy-color {
		color: $main;
	}
	.dl_dl_h5_banner {
		@apply flex flex-row-reverse  mx-[15px] pt-[14px] pb-[8px];
		background-image: v-bind(dl_h5_banner2);
		background-size: 101% 100%;
		background-position: center;
		background-repeat: no-repeat;
		.dl_dl_h5_banner-box {
			@apply flex flex-col justify-around h-[148px];
			h1 {
				@apply w-[190px] text-[20px] font-[600];
				line-height: 22px;
			}
			div {
				@apply py-[5px] px-[10px] w-[186px] rounded-md;
				background-color: rgba(0, 0, 0, 0.1);
				border: 0.2px solid #6caa6e;
				p {
					@apply text-[12px] font-[400];
					line-height: 16px;
				}
			}
		}
	}
	.dl-mobile-card {
		@apply px-[22px] pt-[22px] pb-[15px] mb-[20px] mx-[15px] rounded-lg;
		background: $block-bg-2;
		div {
			@apply flex items-center;
			.dl-mobile-card-img {
				@apply mr-[13px] w-[70px];
			}
			p {
				@apply text-[16px] font-[500];
			}
		}
		button {
			@apply flex justify-center items-center mt-[13px] w-[100%] h-[43px] text-[15px] rounded-lg;
			background: $btn-main;
			color: $text-button;
		}
	}
	.refer-earn-btn {
		@apply px-[12px] py-[9px] w-[100%] flex justify-between items-center rounded-md;
		border: 1px solid $block-bg;
		background: $block-bg-2;
		&:active {
			filter: brightness(0.8);
		}
	}
	.or-line {
		@apply w-[128px] h-[1px];
		background: $block-bg-2;
	}
	.dl-invite-or-mobile {
		color: $text-lowlight;
	}
	.dl-invite-icon-mobile {
		color: $gray;
	}
	.dl-panel-mobile {
		@apply px-[20px] py-[20px] mb-[20px];
		background: $block-bg-2;
		.dl-panel-header-mobile {
			@apply flex items-center justify-between mb-[15px];
			h1 {
				@apply text-[18px] font-[600];
			}
			p {
				@apply flex items-center relative;
				span {
					@apply mr-[4px] text-[12px] font-[400];
					color: $text-lowlight;
				}
				.dl-panel-icon {
					@apply text-[12px] text-white -rotate-90;
					color: $text-lowlight;
				}
			}
		}
		.dl-panel-content-mobile {
			@apply flex justify-between items-center;
			div {
				@apply flex flex-col items-center w-[32%] text-center;
				h1 {
					@apply mb-[10px] text-[18px] font-[600];
				}
				h2 {
					@apply text-[12px] font-[400];
					color: $text-lowlight;
				}
			}
			.vertical-line {
				@apply w-[1px] h-[30px];
				background: $block-bg;
			}
			&.dl-panel-content-mobile-up {
				div {
					@apply w-[49%];
				}
			}
		}
		button {
			@apply flex justify-center items-center mt-[15px] mx-[auto] w-[90%] h-[43px] text-[15px] rounded-lg;
			background: $btn-main;
			color: $text-button;
			&.gray-btn {
				background: $gray;
			}
		}
	}
	.dl-score-box-mobile {
		@apply px-[15px] py-[20px] mb-[20px];
		background: $block-bg-2;
		.dl-score-tab {
			@apply flex gap-[5px];
			button {
				@apply flex-1 h-[40px] text-[13px] rounded-md;
				border: 1px solid transparent;
				color: $text-base;
				background: $disable-color;
			}
			.active {
				color: $second;
				border-color: $second;
			}
		}
		.dl-score-list {
			@apply mt-[15px] rounded-md overflow-hidden;
			border: 1px solid $block-bg;
			li {
				@apply flex items-center grid grid-cols-3 min-h-[40px] text-[14px];
				color: $text-lowlight;
				p:nth-child(1) {
					@apply col-span-2 pl-[20px];
				}
				p:nth-child(2) {
					@apply pl-[22px];
				}
			}
			li:nth-child(even) {
				background: $block-bg-2;
			}
			li:nth-child(odd) {
				background: $bg;
			}
		}
	}
	.dl-learn-box-mobile {
		@apply px-[15px] py-[20px];
		background: $block-bg-2;
		.dl-learn-describe {
			color: $text-lowlight;
		}
		.dl-card-contact-mobile {
			@apply flex py-[10px] mx-[25px] rounded-lg;
			background: $block-bg;
		}
	}
	.dl-faq-box-mobile {
		@apply py-[10px] px-[20px] mb-[20px];
		h1 {
			@apply mb-[5px] text-[18px] font-[600];
		}
		.dl-faq-item {
			@apply flex justify-between items-center py-[8px] px-[12px];
			border-radius: 3px;
			background: $block-bg-2;
			p {
				@apply text-[12px];
				color: $text-lowlight;
			}
			.dl-faq-icon {
				@apply text-[18px];
				color: $gray;
			}
		}
	}
</style>
