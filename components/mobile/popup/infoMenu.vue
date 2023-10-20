<template>
	<div class="info-menu-box" :class="{ 'down-tip': userStore.bDownTip }" @click="homeStore.showInfoMenu = false">
		<!-- <div class="fixed z-[1] w-screen h-screen left-0 info-list-mb-mobile" /> -->
		<div class="relative z-[1] border-radius w-[175px] flex flex-col info-list-wrap-mobile">
			<div class="info-item-wrap-mobile" @click="openPopup(PopupEnum.walletRules)">
				<BaseIcon name="wallet" />
				<p>{{ $t('BH0010') }}</p>
			</div>
			<div class="info-item-wrap-mobile" @click="openPopup(PopupEnum.withdraw)">
				<BaseIcon name="withdraw" />
				<p>{{ $t('U0002') }}</p>
			</div>
			<div class="info-item-wrap-mobile" @click="openPopup(PopupEnum.myProfile)">
				<BaseIcon name="account" />
				<p>{{ $t('H0048') }}</p>
			</div>
			<!-- <div class="info-item-wrap-mobile" @click="toDeposit()">
                <BaseIcon name="deposit" />
                <p>{{ $t('H0005') }}</p>
            </div> -->
			<div class="info-item-wrap-mobile" @click="() => navigateTo('/rewards')">
				<BaseIcon name="reward" />
				<p>{{ $t('U0005') }}</p>
			</div>
			<div class="info-item-wrap-mobile" @click="openPopup(PopupEnum.transaction)">
				<BaseIcon name="wallet_r" />
				<p>{{ $t('T0016') }}</p>
			</div>
			<div class="info-item-wrap-mobile" @click="openPopup(PopupEnum.betHistory)">
				<BaseIcon name="best-history" />
				<p>{{ $t('U0004') }}</p>
			</div>
			<!-- <div class="info-item-wrap-mobile" @click="() => openPopup(PopupEnum.rewardHistory)">
				<BaseIcon name="gift" />
				<p>{{ $t('R0038') }}</p>
			</div> -->
			<!-- <div class="info-item-wrap-mobile" @click="() => navigateTo('/refer-and-earn')">
                <BaseIcon name="affiliate" />
                <p>{{ $t('H0022') }}</p>
            </div> -->
			<!-- <div class="info-item-wrap-mobile" @click="() => openPopup(PopupEnum.bonus)">
				<BaseIcon name="wallet_r" />
				<p>{{ $t('BH0008') }}</p>
			</div> -->
			<div class="info-item-wrap-mobile" @click="openPopup(PopupEnum.message)">
				<BaseDot :show="messageStore.unreadEmailCount" class="absolute left-[25px] top-[9px]" />
				<BaseIcon name="message" />
				<p>{{ $t('U0007') }}</p>
			</div>
			<div class="info-item-wrap-mobile" @click="openPopup(PopupEnum.account)">
				<BaseIcon name="profile_set" />
				<p>{{ $t('ST0001') }}</p>
			</div>
			<div class="info-item-wrap-mobile !py-[16px]" @click="useDialogStore().openLogout()">
				<BaseIcon name="sign-out" />
				<p>{{ $t('U0008') }}</p>
			</div>
		</div>
	</div>
	<div class="login-modal-mask" @click="homeStore.closeMenuInfo" />
</template>
<script setup lang="ts">
	const homeStore = useHomeStore()
	const userStore = useUserStore()
	const messageStore = useNoticeAndMessageStore()
</script>
<style lang="scss" scoped>
	.info-menu-box {
		@apply absolute z-[500] right-[15px];
		top: $app-header-height;
		&.down-tip {
			top: calc(#{$app-header-height} + #{$app-download-height});
		}
	}
	.info-list-mb-mobile {
		top: $app-header-height;
	}
	.info-list-wrap-mobile {
		max-height: calc(100vh - #{$app-navbar-height} - #{$app-header-height} - #{$app-download-height} - 10px);
		// overflow-y: auto;
		background: $wallet-user-menu-bg;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 6px 24px rgba(0, 0, 0, 0.5);
		&::before {
			content: '';
			position: absolute;
			top: -6px;
			right: $wallet-menu-decorate-right-h5;
			width: 10px;
			height: 10px;
			background: $wallet-user-menu-bg;
			transform: rotateZ(45deg);
		}
	}
	.info-item-wrap-mobile {
		@apply flex items-center gap-[12px] py-[8px] px-[12px] font-normal text-[14px] cursor-pointer relative;
		i {
			font-size: 18px;
		}
		&:hover {
			color: $second;
		}
	}
	.info-item-wrap-mobile:nth-child(odd) {
		background-color: $block-bg-2;
	}
	.info-item-wrap-mobile:last-child {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
</style>
