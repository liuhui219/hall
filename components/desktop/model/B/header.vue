<template>
	<header class="header-pc">
		<div class="wrap">
			<div class="left">
				<BaseImg class="logo" :src="getResConfigImage('logo-h', 'logo')" alt="logo" @click="toHome()" />
			</div>
			<div v-if="userStore.isLogin" class="right tools-logined">
				<div v-show="!isPageInGame()" class="wallet pointer" @click="homeStore.changeShowWallet()">
					<BaseImg :src="getResConfigImage('symbol', ImageKeyEnum.home)" class="w-[26px] mr-[6px]" />
					<div class="amount flex items-center pr-[8px]">
						<span class="mr-[6px] color-text-white point-container">
							<BasePoint
								:value="
									useSysConfigStore().wallet_type == 0
										? userStore.data.point
										: userStore.data.point + userStore.data.user_point.bonus
								"
								:show-symbol="false"
								:decimal-non-emphasis="true"
							/>
						</span>
						<BaseArrowDown
							class="transition-all duration-300 placeholder-color text-[6px] font-bold"
							:class="{ 'rotate-[180deg]': homeStore.showWallet }"
						/>
					</div>
				</div>

				<button class="sys-btn btn-highlight btn-deposit cursor relative" @click="toDeposit()">
					{{ $t('H0005') }}
					<span v-if="depositStore.bonusTime" class="header-bonus-time header-bonus">{{
						Helper.renderTimeRemainNoDay(depositStore.bonusTime - depositStore.currentTime)
					}}</span>
					<span v-else-if="depositStore.propsList.length" class="header-bonus">{{ $t('V0004') }}</span>
				</button>
				<button class="sys-btn btn-m btn-icon cursor relative">
					<BaseDot :show="messageStore.unreadEmailCount" class="absolute right-[4px] top-[3px]" />
					<BaseImg :src="configStore.getAvatarSrc(userStore.data.headimg)" class="w-[40px] rounded-full" @click="infoShow = true" />
				</button>
				<button
					v-if="sysConfig.chatConfig.status"
					class="chat-icon sysicon-chatb cursor min-w-[40px] h-[40px] placeholder-color"
					@click="chatStore.setMobileNavShow()"
				/>

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
						</div>

						<div class="info-item-wrap" @click="() => openPopup(PopupEnum.bonus)">
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
				<button class="sys-btn btn-login uppercase" @click="openLogin">{{ $t('L1001') }}</button>
				<button class="sys-btn btn-highlight uppercase" @click="openRegister">{{ $t('L1002') }}</button>
				<button
					v-if="sysConfig.chatConfig.status"
					class="chat-icon sysicon-chatb cursor min-w-[40px] h-[40px] placeholder-color"
					@click="chatStore.setMobileNavShow()"
				/>
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
	const chatStore = useChatStore()
	const headerDot = computed(() => {
		return messageStore.unreadEmailCount
	})
	const infoShow = ref(false)
	const showInfo = () => {
		infoShow.value = false
	}
</script>

<style scoped lang="scss">
	.chat-icon {
		border-radius: 50%;
		font-size: 18px;
		background: $home-block-bg-2;
	}

	.wallet-modal-pc {
		background-color: $wallet-user-menu-bg;
		&::before {
			content: '';
			position: absolute;
			top: -9px;
			right: 83px;
			width: 17px;
			height: 17px;
			background: $wallet-user-menu-bg;
			transform: rotateZ(45deg);
		}
	}
</style>
