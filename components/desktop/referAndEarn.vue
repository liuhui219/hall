<template>
	<div class="wrap pt-[30px] pb-[72px] !pl-[55px]">
		<!-- <BasePageLoading v-if="referAndEarnStore.appLoadingStatus" class="!z-[999] opacity-80" /> -->
		<!-- 未登录 -->
		<section v-if="!useUserStore().isLogin" class="dl-banner pt-[70px] pb-[40px] mb-[30px]">
			<div class="w-[635px] h-full">
				<div class="mb-[10px] text-[36px] font-[700]">
					{{ referAndEarnStore.sliceLang(0, $t('DL0002')) }}
					<span class="dl-money-span"> {{ configStore.currency_symbol }}1000 </span>
					{{ referAndEarnStore.sliceLang(1, $t('DL0002')) }}
				</div>
				<div class="text-[18px] mb-[46px] font-[500]">{{ $t('DL0003') }}</div>
				<button class="dl-banner-btn" @click="openRegister()">
					{{ $t('DL0001') }}
				</button>
			</div>
		</section>

		<section v-if="!useUserStore().isLogin" class="flex flex-wrap gap-[23px] min-w-[1257px]">
			<DesktopReferAndEarnCard
				v-if="useUserStore().inviteUsersStatus"
				name="referralRewards"
				:not-log-in="true"
				@on-click="openPopup(PopupEnum.referralRewards)"
			/>
			<DesktopReferAndEarnCard
				v-if="useUserStore().inviteUsersVipStatus"
				name="referralVipRewards"
				:not-log-in="true"
				@on-click="openPopup(PopupEnum.referralVipRewards)"
			/>
			<DesktopReferAndEarnCard
				v-if="useUserStore().proxyAwardStatus"
				name="commissionRewards"
				:not-log-in="true"
				@on-click="openPopup(PopupEnum.commissionRewards)"
			/>

			<DesktopReferAndEarnCard
				v-if="useUserStore().disRecharge3Status"
				name="distributionRewards"
				:not-log-in="true"
				@on-click="openPopup(PopupEnum.distributionRewards)"
			/>
			<!-- <DesktopReferAndEarnCard
				v-if="referAndEarnStore.pcCardNum == 1 || referAndEarnStore.pcCardNum == 3"
				:not-log-in="true"
				name="morePromotions"
			/> -->
		</section>

		<!-- 登录 -->
		<section v-if="useUserStore().isLogin" class="flex justify-between min-w-[1257px]">
			<div class="w-[66%]">
				<div>
					<div class="flex items-center justify-between h-[232px]">
						<div class="distribution-card">
							<div class="dl-panel-header-pc">
								<h1>{{ $t('U0005') }}</h1>
								<p @click="openPopup(PopupEnum.agentHistory)">
									<span>{{ $t('DL0033') }}</span>
									<BaseIcon name="select-arrow-down" class="dl-panel-icon" />
								</p>
							</div>
							<div class="flex distribution-inner-card">
								<!-- <div>
									<p>{{ $fp($cp(referAndEarnStore.dlData.amount_point)) }}</p>
									<p>{{ $t('DL0007') }}</p>
								</div>
								<div>
									<p>{{ $fp($cp(referAndEarnStore.dlData.un_receive_point)) }}</p>
									<p>{{ $t('DL0008') }}</p>
								</div> -->
								<div>
									<p>{{ $fp($cp(referAndEarnStore.dlData.un_receive_point)) }}</p>
									<p>{{ $t('DL0007') }}</p>
								</div>
								<div>
									<p>{{ $fp($cp(referAndEarnStore.dlData.today_amount_point)) }}</p>
									<p>{{ $t('AF0010') }}</p>
								</div>
							</div>
							<button :class="{ 'gray-btn': referAndEarnStore.dlData.un_receive_point == 0 }" @click="referAndEarnStore.BulkClick">
								{{ $t('DL0034') }}
							</button>
						</div>

						<div class="distribution-card">
							<div class="dl-panel-header-pc">
								<h1>{{ $t('DL0009') }}</h1>
							</div>
							<div class="flex distribution-inner-card">
								<div>
									<p>{{ referAndEarnStore.dlData.team_total }}</p>
									<p>{{ $t('DL0063') }}</p>
								</div>
								<div>
									<p>{{ referAndEarnStore.dlData.level1_count }}</p>
									<p>{{ $t('DL0068') }}</p>
								</div>
								<div>
									<p>{{ referAndEarnStore.dlData.team_total - referAndEarnStore.dlData.level1_count }}</p>
									<p>{{ $t('DL0069') }}</p>
								</div>
							</div>
							<button class="dl-img-btn" @click="openPopup(PopupEnum.friendsList)">{{ $t('DL0027') }}</button>
						</div>
					</div>
					<!-- 盈利记录 -->
					<div class="earnings-record mb-[30px]">
						<div class="flex items-center justify-between">
							<h1>{{ $t('DL0035') }}</h1>
						</div>
						<div class="ea-th">
							<div>{{ $t('U0025') }}</div>
							<div>{{ $t('U0005') }}</div>
							<div>{{ $t('D0009') }}</div>
							<div>{{ $t('AF0060') }}</div>
						</div>
						<div class="earnings-list" :style="referAndEarnStore.pcDlHomeEarnHeight">
							<div v-for="(item, index) in referAndEarnStore.historyPcList" :key="index" class="ea-box">
								<div class="ea-tr">
									<div>{{ item.username }}</div>
									<div>
										{{
											item.is_direction_relation == 1
												? $pt(useSysConfigStore().rewardTypesMaps[item.reward_type]?.title)
												: $t('DL0032')
										}}
									</div>
									<div>{{ configStore.currency_symbol }} {{ item.reward }}</div>
									<div>{{ Helper.formatDate(item.Time, 1) }}</div>
								</div>
							</div>
							<BaseRecordEmpty v-if="referAndEarnStore.historyPcList.length == 0" class="mx-[auto] mt-[5px] !w-[130px] !h-[130px]" />
						</div>
					</div>
				</div>

				<div class="flex flex-wrap justify-between">
					<DesktopReferAndEarnCard
						v-if="useUserStore().inviteUsersStatus"
						name="referralRewards"
						@on-click="openPopup(PopupEnum.referralRewards)"
					/>
					<DesktopReferAndEarnCard
						v-if="useUserStore().inviteUsersVipStatus"
						name="referralVipRewards"
						@on-click="openPopup(PopupEnum.referralVipRewards)"
					/>
					<DesktopReferAndEarnCard
						v-if="useUserStore().proxyAwardStatus"
						name="commissionRewards"
						@on-click="openPopup(PopupEnum.commissionRewards)"
					/>

					<DesktopReferAndEarnCard
						v-if="useUserStore().disRecharge3Status"
						name="distributionRewards"
						@on-click="openPopup(PopupEnum.distributionRewards)"
					/>
					<DesktopReferAndEarnCard v-if="referAndEarnStore.pcCardNum == 1 || referAndEarnStore.pcCardNum == 3" name="morePromotions" />
				</div>
			</div>

			<!-- 分享 -->
			<div class="min-w-[28%] max-w-[32%]">
				<div class="invite-box">
					<p v-if="useUserStore().inviteUsersStatus || useUserStore().inviteUsersVipStatus" class="mb-[10px] text-[24px] font-[600]">
						{{ referAndEarnStore.sliceLang(0, $t('DL0002')) }}
						<span class="dl-money-span">
							{{ configStore.currency_symbol
							}}{{
								configStore.inviteUsersCfg.data.awards.length
									? $fp($cp(referAndEarnStore.maxReferralRewards() + referAndEarnStore.totalVipRewards()))
									: ''
							}}
						</span>
						{{ referAndEarnStore.sliceLang(1, $t('DL0002')) }}
					</p>
					<p class="mt-[10px] mb-[20px] text-[14px] font-[500]">{{ $t('DL0003') }}</p>
					<p class="text-[18px] font-[600]">{{ $t('DL0005') }}</p>

					<button class="refer-earn-btn my-[13px]" @click="Helper.copyText(referAndEarnStore.shareUrl, true)">
						<span class="mr-[20px]">link</span>
						<span class="color-text flex-1 truncate text-left mr-[10px]">{{ referAndEarnStore.shareUrl }}</span>
						<BaseIcon name="dl-copy" class="dl-money-span" />
					</button>

					<button class="refer-earn-btn" @click="Helper.copyText(String(referAndEarnStore.referCode), true)">
						<span class="mr-[20px]">{{ $t('REW0011') }}</span>
						<span class="color-text flex-1 truncate text-left mr-[10px]">{{ referAndEarnStore.referCode }}</span>
						<BaseIcon name="dl-copy" class="dl-money-span" />
					</button>

					<div class="flex justify-center items-center py-[20px]">
						<span class="or-line" />
						<span class="mx-[30px]">{{ $t('L1004') }}</span>
						<span class="or-line" />
					</div>

					<div class="flex justify-center gap-x-8">
						<a
							v-for="(item, index) in referAndEarnStore.dlShareList"
							:key="index"
							class="link text-[32px] text-lowlight pointer"
							@click="referAndEarnStore.clickShare(item.url)"
						>
							<BaseIcon :name="item.icon" class="text-[35px] dl-invite-icon" />
						</a>
					</div>
				</div>
				<!-- </section> -->
				<!-- 代理数据 面板2 -->
				<div class="flex-1 h-[449px] pt-[18px] px-[15px] mt-[30px] rounded-md dl-score-box">
					<div class="grid grid-cols-4 gap-[8px] dl-score-tab">
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

					<!-- <BaseDatePicker v-model="dateValue" :placeholder="$t('DL0049')" format="yyyy-MM-dd" class="mt-[20px] mb-[9px]" /> -->

					<ul class="dl-score-list">
						<li>
							<p>{{ $t('DL0007') }} :</p>
							<p>
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
						<!-- configStore.disCommission3Cfg.data && configStore.disRecharge3Cfg.data -->
						<li v-if="useUserStore().disCommission3Status">
							<p>{{ $t('DL0071') }} :</p>
							<p>{{ $fp($cp(referAndEarnStore.dlData2.custom_commission_rewards_point)) }}</p>
						</li>
						<li v-if="useUserStore().disRecharge3Status">
							<p>{{ $t('DL0023') }} :</p>
							<p>{{ $fp($cp(referAndEarnStore.dlData2.friends_recharge_and_cashback)) }}</p>
						</li>
						<!-- <li>
							<p>{{ $t('DL0063') }} :</p>
							<p>{{ referAndEarnStore.dlData2.team_total }}</p>
						</li>
						<li>
							<p>{{ $t('DL0068') }} :</p>
							<p>{{ referAndEarnStore.dlData2.level1_count }}</p>
						</li>
						<li>
							<p>{{ $t('DL0069') }} :</p>
							<p>{{ referAndEarnStore.dlData2.other_team_count }}</p>
						</li> -->
					</ul>
				</div>
			</div>
		</section>
		<div v-if="useUserStore().isLogin">
			<h1 class="mb-[22px] text-[26px] font-[700] text-white">{{ $t('DL0067') }}</h1>
			<div class="dl-learn-more">
				<BaseImg class="w-[334px] ml-[80px] mr-[85px]" :src="getResConfigImage('dl_pc_trumpet', ImageKeyEnum.referAndEarn)" />
				<div class="dl-learn-right">
					<div class="mb-[4px] text-[18px] font-[600] text-white">{{ $t('DL0037') }}</div>
					<div class="text-[14px] dl-learn-txt">{{ $t('DL0036') }}</div>
					<div class="dl-learn-contact">
						<div @click="pageConfigClick(1, 'https://t.me/' + resConfig.referAndEarnConfig.telegram.substring(1))">
							<BaseImg
								class="w-[19px] mr-[15px]"
								:src="getResConfigImage('dl_Telegram', ImageKeyEnum.referAndEarn)"
								alt="dl_Telegram group"
							/>
							<span class="text-[14px]">{{ resConfig.referAndEarnConfig.telegram }}</span>
						</div>
						<div @click="pageConfigClick(1, 'mailto:' + resConfig.referAndEarnConfig.gmail)">
							<BaseImg
								class="w-[19px] mr-[15px]"
								:src="getResConfigImage('dl_google', ImageKeyEnum.referAndEarn)"
								alt="dl_google group"
							/>
							<span class="text-[14px]">{{ resConfig.referAndEarnConfig.gmail }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 代理用户 -->
		<!-- <div v-if="useUserStore().isLogin" class="dl-faq-box-mobile">
			<h1>{{ $t('DL0043') }}</h1>
			<div class="dl-faq-item mb-[10px]" @click="openPopup(PopupEnum.spinRule)">
				<p>{{ $t('DL0044') }}</p>
				<BaseIcon name="select-arrow-down" class="dl-faq-icon" />
			</div>
			<div class="dl-faq-item" @click="openPopup(PopupEnum.spinRule)">
				<p>{{ $t('DL0045') }}</p>
				<BaseIcon name="select-arrow-down" class="dl-faq-icon" />
			</div>
		</div> -->
	</div>
	<SkinFooter />
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const dl_pc_banner = `url(${getResConfigImage('dl_pc_banner', ImageKeyEnum.referAndEarn)})`
	const dl_pc_invite_bg = `url(${getResConfigImage('dl_pc_invite_bg', ImageKeyEnum.referAndEarn)})`
	const dl_pc_learnmore = `url(${getResConfigImage('dl_pc_learnmore', ImageKeyEnum.referAndEarn)})`
	const configStore = useSysConfigStore()
	const referAndEarnStore = useReferAndEarnStore()
	watchEffect(() => {
		referAndEarnStore.pcCard()
	})
	// import {
	// 	format,
	// 	addDays,
	// } from 'date-fns'
	// const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
	// const rangeValue = ref([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
</script>
<style scoped lang="scss">
	.login-card-box {
		// @apply  min-w-[28%] max-w-[66%];
		@apply min-w-[830px] max-w-[830px];
		:deep(.dl-card-item) {
			min-width: 49% !important;
		}
	}
	.dl-learn-more {
		@apply flex items-center h-[211px] rounded-lg overflow-hidden;
		background-image: v-bind(dl_pc_learnmore);
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
		.dl-learn-right {
			@apply px-[30px] py-[32px] h-[211px] max-w-[635px];
			.dl-learn-txt {
				color: $text-lowlight;
			}
			.dl-learn-contact {
				@apply flex mt-[24px] gap-[10px];
				div {
					@apply flex items-center px-[75px] h-[50px] rounded-md cursor-pointer;
					background: $block-bg;
				}
			}
		}
	}
	.dl-invite-icon {
		color: $gray;
	}
	.dl-money-span {
		color: $btn-main;
	}
	.dl-banner {
		background-image: v-bind(dl_pc_banner);
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
		.dl-banner-btn {
			@apply flex items-center justify-center mb-[10px] w-[250px] h-[54px] rounded-md text-[18px] font-[500];
			color: $text-button;
			background: $btn-main;
		}
	}
	.distribution-card {
		@apply flex-1 mb-[30px] min-w-[45%] max-w-[48.5%] h-[202px] rounded-md;
		background: $block-bg-2;
		.dl-panel-header-pc {
			@apply flex items-center justify-between my-[20px] px-[15px];
			h1 {
				@apply text-[18px] font-[600];
			}
			p {
				@apply flex items-center relative cursor-pointer;
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
		.distribution-inner-card {
			@apply rounded-lg;
			div {
				@apply flex-1;
				p {
					@apply text-center;
				}
				p:nth-child(1) {
					@apply text-[18px] font-[600];
				}
				p:nth-child(2) {
					@apply text-[14px] font-[400];
					color: $text-lowlight;
				}
			}
		}
		button {
			@apply mt-[20px] mx-[auto] flex items-center justify-center w-[300px] h-[45px] rounded-md text-[16px] cursor-pointer font-[500];
			color: $block-bg;
			background: $btn-main;
			&.gray-btn {
				background: $gray;
			}
		}
	}
	.earnings-record {
		@apply px-[12px] py-[20px] rounded-md;

		background-color: $block-bg-2;
		.dl-filter {
			@apply px-[20px] pt-[9px] pb-[6px] ml-[14px] rounded-md cursor-pointer;
			background: $disable-color;
			&.active {
				background: $btn-main;
				color: $text-button;
			}
		}
		.dl-filter-tab {
			@apply absolute top-[55px] right-[0] rounded-md;
			box-shadow: 0px 4px 12px 0px #000000b2;
			div {
				@apply flex items-center h-[40px] text-[12px] font-[400] indent-[17px] cursor-pointer select-none;
			}
			div:nth-child(even) {
				background: $bg;
			}
			div:nth-child(odd) {
				background: $block-bg-2;
			}
			div:first-child {
				@apply rounded-t-md;
			}
			div:last-child {
				@apply rounded-b-md;
			}
			&::before {
				content: '';
				position: absolute;
				top: -9px;
				right: 21px;
				width: 17px;
				height: 17px;
				background: $block-bg-2;
				transform: rotateZ(45deg);
			}
		}
		.earnings-list {
			@apply h-[140px] rounded-b-md overflow-y-auto;
			border: 1px solid $block-bg;
			border-top: none;
			.ea-box {
				@apply py-[5px];
			}
			.ea-box:nth-child(odd) {
				background: $bg;
			}
		}
		.ea-th {
			@apply mt-[20px] rounded-t-md;
			border: 1px solid $block-bg;
			border-bottom: none;
		}
		.ea-th,
		.ea-tr {
			@apply flex items-center h-[40px];
			div {
				@apply flex-1 text-center;
			}
		}
	}
	.invite-box {
		@apply h-[498px] px-[15px] pt-[65px] rounded-md;
		background-color: $block-bg-2;
		background-image: v-bind(dl_pc_invite_bg);
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
		.or-line {
			@apply w-[120px] h-[1px];
			background: $block-bg;
		}
	}
	.dl-score-box {
		background: $block-bg-2;
	}
	.dl-score-tab {
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
		@apply mt-[14px] rounded-md overflow-hidden;
		border: 0.6px solid $block-bg;
		li {
			@apply flex items-center grid grid-cols-4 min-h-[40px];
			color: $text-lowlight;
			p:nth-child(1) {
				@apply col-span-3 pl-[20px];
			}
			p:nth-child(2) {
				@apply ml-[15px];
			}
		}
		li:nth-child(even) {
			background: $block-bg-2;
		}
		li:nth-child(odd) {
			background: $bg;
		}
	}
	.refer-earn-btn {
		@apply px-[12px] py-[9px] w-[365px] flex justify-between items-center rounded-md;
		border: 1px solid $block-bg;
		background: $block-bg-2;
		&:active {
			filter: brightness(0.8);
		}
	}
	.dl-faq-box-mobile {
		@apply py-[20px] mt-[10px] rounded-md;
		h1 {
			@apply mb-[10px] text-[20px] font-[700];
		}
		.dl-faq-item {
			@apply flex justify-between items-center py-[15px] px-[12px] rounded-md cursor-pointer;
			background: $block-bg-2;
			p {
				@apply text-[16px];
				color: $text-lowlight;
			}
			.dl-faq-icon {
				@apply text-[18px];
				color: $gray;
			}
		}
	}
	.link:hover {
		color: $second;
	}
	// 旧版
	// .affiliate-title-first {
	// 	text-transform: uppercase;
	// 	color: $color-white;
	// 	font-weight: 700;
	// 	text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.34);
	// }

	// .affiliate-title-second {
	// 	display: flex;
	// 	background-color: $error;
	// 	border-radius: 0 20px;
	// 	height: 46px;
	// 	justify-content: center;
	// 	align-items: center;
	// 	padding: 0 16px;
	// 	color: $color-white;
	// 	font-weight: 600;
	// }

	// .affiliate-container .card-block > div:not(:last-child) {
	// 	border-right: 1px solid $color-btn-border;
	// }
	// .affiliate-banner {
	// 	background: linear-gradient(180deg, #9aff98 0%, #2654ca 100%);
	// 	border-radius: $border-radius;
	// 	.person-1 {
	// 		@apply flex flex-col items-center;

	// 		.person-1-container {
	// 			width: 46px;
	// 			background-color: #b4ffdf;
	// 			border-radius: $border-radius;
	// 			padding: 2px;
	// 			div {
	// 				width: 100%;
	// 				border-radius: $border-radius;
	// 				background-color: #4fe0b5;
	// 			}
	// 		}
	// 	}
	// }

	// .statistics-block .block-item {
	// 	display: flex;
	// 	justify-content: space-between;
	// 	align-items: center;
	// 	padding: 16px 20px;
	// 	&:nth-child(odd) {
	// 		background-color: $bg;
	// 	}
	// }

	// .refer-rule-list {
	// 	margin: 0 16px;
	// 	@apply text-[16px];
	// 	.refer-rule-detail {
	// 		margin-top: 4px;
	// 		list-style: disc;
	// 		padding-left: 4px;
	// 		list-style-position: outside;
	// 		color: $text-lowlight;
	// 		text-indent: -5px;
	// 		margin-left: 24px;
	// 	}

	// 	.refer-rule-desc {
	// 		list-style: disc;

	// 		margin-top: 4px;
	// 		list-style-position: outside;
	// 		color: $text-lowlight;
	// 		text-indent: -5px;
	// 		margin-left: 24px;
	// 		font {
	// 			color: $color-white;
	// 		}
	// 	}
	// }
</style>
