<template>
	<header class="header-pc">
		<div class="wrap">
			<div class="left flex items-center gap-[30px]">
				<!-- <BaseImg class="logo" :src="getResConfigImage(`${userStore.isLogin ? 'logo-icon' : 'logo-h'}`, 'logo')" alt="logo" @click="toHome()" /> -->
				<div class="header-item" :class="{ active: isCurrentPage('') || isCurrentPage('game') }" @click="toHome()">
					<BaseIcon name="casino" class="navigation-icon mr-[6px]" />
					<div class="navigation-text">{{ $t('H0023') }}</div>
				</div>

				<div
					v-if="configStore.gameAllMap[gameStore.sportGameId]"
					class="header-item"
					:class="{ active: isCurrentPage('sport') }"
					@click="navigationStore.goToSport('betby')"
				>
					<BaseIcon name="ball" class="navigation-icon mr-[6px]" />
					<div class="navigation-text">{{ $t('H0026') }}</div>
				</div>
			</div>
			<div v-if="userStore.isLogin" class="right tools-logined">
				<div v-show="!isPageInGame()" class="wallet" @click="homeStore.changeShowWallet()">
					<div class="currency">{{ configStore.currency_symbol }}</div>
					<div class="amount flex items-center flex-1 justify-between">
						<span class="mr-[4px] color-text-white"
							><BasePoint
								:value="
									useSysConfigStore().wallet_type == 0
										? userStore.data.point
										: userStore.data.point + userStore.data.user_point.bonus
								"
								:show-symbol="false"
						/></span>
						<BaseArrowDown class="transition-all duration-300 color-text-white" :class="{ 'rotate-[180deg]': homeStore.showWallet }" />
					</div>
				</div>
				<button class="sys-btn btn-highlight btn-deposit cursor relative" @click="toDeposit()">
					{{ $t('H0005') }}
					<span v-if="depositStore.bonusTime" class="header-bonus-time header-bonus">{{
						Helper.renderTimeRemainNoDay(depositStore.bonusTime - depositStore.currentTime)
					}}</span>
					<span v-else-if="depositStore.propsList.length" class="header-bonus">{{ $t('V0004') }}</span>
				</button>
				<!-- openPopup('userInfo') -->
				<button class="sys-btn btn-m btn-icon cursor relative">
					<BaseDot :show="messageStore.unreadEmailCount" class="absolute right-[4px] top-[3px]" />
					<!-- <BaseIcon name="member" /> -->
					<!-- :src="getResConfigImage('h_' + userStore.data.headimg, ImageKeyEnum.userinfo)" -->
					<BaseImg :src="configStore.getAvatarSrc(userStore.data.headimg)" class="w-[40px] rounded-full" @click="infoShow = true" />
				</button>
				<button
					v-if="sysConfig.chatConfig.status"
					class="chat-icon-button sys-btn"
					:class="{ active: !chatStore.chatHide }"
					@click="chatStore.setMobileNavShow()"
				>
					<BaseIcon name="chat" class="chat-icon" />
				</button>

				<div v-if="homeStore.showWallet" class="absolute mr-[193px] w-[375px] h-[200px] z-[305] top-[97px]">
					<div v-if="homeStore.showWallet" class="fixed z-[1] w-screen h-screen top-0 left-0" @click="homeStore.closeWallet" />
					<div class="px-[16px] py-[20px] w-full absolute z-[306] rounded-md wallet-modal-pc">
						<span class="wallet-deco" />
						<BaseWalletCard padding="0 0 10px" width="auto" name-size="14px" money-size="26px" money-top="2px" money-bottom="3px" />
					</div>
				</div>

				<div v-if="infoShow" class="absolute z-[50] top-[82px] mr-[38px]">
					<div v-if="infoShow" class="fixed z-[40] w-screen h-screen top-0 left-0" @click="showInfo()" />
					<div class="relative z-[50] !pb-0 border-radius min-w-[200px] flex flex-col info-list-wrap" @click="showInfo()">
						<div class="info-item-wrap" @click="openPopup(PopupEnum.walletRules)">
							<BaseIcon name="wallet" />
							<p>{{ $t('BH0010') }}</p>
						</div>
						<div class="info-item-wrap" @click="openPopup(PopupEnum.withdraw)">
							<BaseIcon name="withdraw" />
							<p>{{ $t('U0002') }}</p>
						</div>
						<div class="info-item-wrap" @click="openPopup(PopupEnum.myProfile)">
							<BaseIcon name="account" />
							<p>{{ $t('H0048') }}</p>
						</div>
						<!-- <div class="info-item-wrap" @click="openPopup(PopupEnum.account)">
							<BaseIcon name="account" />
							<p>{{ $t('H0048') }}</p>
						</div> -->
						<!-- <div class="info-item-wrap" @click="toDeposit()">
							<BaseIcon name="deposit" />
							<p>{{ $t('H0005') }}</p>
						</div> -->
						<div class="info-item-wrap" @click="() => navigateTo('/rewards')">
							<BaseIcon name="reward" />
							<p>{{ $t('U0005') }}</p>
						</div>

						<div class="info-item-wrap" @click="openPopup(PopupEnum.transaction)">
							<BaseIcon name="wallet_r" />
							<p>{{ $t('T0016') }}</p>
						</div>
						<div class="info-item-wrap" @click="openPopup(PopupEnum.betHistory)">
							<BaseIcon name="best-history" />
							<p>{{ $t('U0004') }}</p>
						</div>
						<!-- <div class="info-item-wrap" @click="() => openPopup(PopupEnum.rewardHistory)">
							<BaseIcon name="gift" />
							<p>{{ $t('R0038') }}</p>
						</div> -->

						<!-- <div class="info-item-wrap" @click="() => openPopup(PopupEnum.bonus)">
							<BaseIcon name="wallet_r" />
							<p>{{ $t('BH0008') }}</p>
						</div> -->
						<!-- <div class="info-item-wrap" @click="() => navigateTo('/refer-and-earn')">
							<BaseIcon name="affiliate" />
							<p>{{ $t('H0022') }}</p>
						</div> -->
						<div class="info-item-wrap" @click="openPopup(PopupEnum.message)">
							<BaseDot :show="messageStore.unreadEmailCount" class="absolute left-[25px] top-[10px]" />
							<BaseIcon name="message" />
							<p>{{ $t('U0007') }}</p>
						</div>
						<div class="info-item-wrap" @click="openPopup(PopupEnum.account)">
							<BaseIcon name="profile_set" />
							<p>{{ $t('ST0001') }}</p>
						</div>
						<hr class="opacity-10 mt-[3px] mb-0" />
						<div class="info-item-wrap !py-[16px]" @click="useDialogStore().openLogout()">
							<BaseIcon name="sign-out" />
							<p>{{ $t('U0008') }}</p>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="right tools-login">
				<button class="sys-btn btn-login uppercase min-w-[120px] !h-[50px] !text-[16px]" @click="openLogin">{{ $t('L1001') }}</button>
				<button class="sys-btn btn-highlight uppercase min-w-[120px] !h-[50px] !text-[16px]" @click="openRegister">
					{{ $t('L1002') }}
				</button>
				<button
					v-if="sysConfig.chatConfig.status"
					class="chat-icon-button sys-btn"
					:class="{ active: !chatStore.chatHide }"
					@click="chatStore.setMobileNavShow()"
				>
					<BaseIcon name="chat" class="chat-icon" />
				</button>
			</div>
		</div>
	</header>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	const configStore = useSysConfigStore()
	const messageStore = useNoticeAndMessageStore()
	const homeStore = useHomeStore()
	const userStore = useUserStore()
	const depositStore = useDepositStore()
	const casinoStore = useCasinoStore()
	const navigationStore = useNavigationStore()
	const gameStore = useGameStore()
	const route = useRoute()
	const chatStore = useChatStore()
	const infoShow = ref(false)
	const showInfo = () => {
		infoShow.value = false
	}
	const openWalletRules = () => {
		openPopup(PopupEnum.walletRules)
		homeStore.changeShowWallet()
	}
	const isCurrentPage = (value: string, type = 0) => {
		if (type == 0 && value.charAt(0) != '/') {
			value = '/' + value
		}
		return isPageInSome(value)
	}
</script>

<style scoped lang="scss">
	.chat-icon-button {
		border: none;
		background: $home-block-bg-2;
		border-radius: $border-radius;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		padding: 0;
		height: 50px;
		.chat-icon {
			font-size: 28px;
			color: $home-gray;
		}
		&.active,
		&:hover {
			.chat-icon {
				color: $home-second;
			}
		}
	}
	.header-item {
		display: flex;
		align-items: center;
		cursor: pointer;
		color: $menu-text-gray;
		text-transform: uppercase;
		font-size: 18px;
		width: 140px;
		justify-content: center;
		border-radius: $border-radius;
		height: calc(#{$pc-header-height} * 0.625);
		i {
			font-size: 24px;
		}
		&.active {
			color: $menu-second;
			background: $menu-block-bg-2;
		}
		&:not(.active):hover {
			color: $menu-white;
		}
	}
	.wallet {
		// width: 186px;
		font-weight: 600;
		font-size: 16px;
	}
	.wallet-modal-pc {
		background-color: $block-bg-2;
		&::before {
			content: '';
			position: absolute;
			top: -9px;
			right: 83px;
			width: 17px;
			height: 17px;
			background: $block-bg-2;
			transform: rotateZ(45deg);
		}
	}
</style>
