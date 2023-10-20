<template>
	<section class="userinfo flex flex-col px-[16px] w-full gap-y-[24px] overflow-y-auto overflow-x-hidden" @scroll="userInfoScroll">
		<div class="flex items-center shrink-0 mt-[32px] user-info-header">
			<div class="userinfo-header">
				<div class="userinfo-header-mask"><BaseImg :src="getResConfigImage('h_1', ImageKeyEnum.userinfo)" alt="" class="w-full" /></div>
			</div>
			<div class="flex flex-1">
				<div class="flex-1">
					<div
						class="font-[600] text-[20px] color-text-white w-full flex justify-between user-info-name"
						@click="openPopup(PopupEnum.account)"
					>
						{{ userStore.data.nickname }}
						<div class="-rotate-[90deg]"><BaseArrowDown class="text-[20px]" /></div>
					</div>
					<div class="font-[600] text-[14px] color-text-white user-info-id">
						<span class="mr-[8px]">ID: {{ userStore.uid }}</span>
						<BaseIcon name="copy" class="text-[12px]" @click="userStore.copyUid()" />
					</div>
				</div>
			</div>
		</div>
		<BaseWallet :scroll-top="scrollTop" top="275px" />
		<div class="flex gap-[24px] items-center justify-center shrink-0">
			<button class="userinfo-deposit" @click="toDeposit()">
				<p>{{ $t('H0005') }}</p>
			</button>
			<button class="userinfo-saque" @click="openPopup(PopupEnum.withdraw)">
				<p>{{ $t('U0002') }}</p>
			</button>
		</div>
		<div class="userinfo-options shrink-0">
			<!-- <button class="flex w-full" @click="openPopup(PopupEnum.account)">
				<div class="border-bottom flex-1 mx-[12px] py-[15px] flex items-center">
					<div class="flex-1 relative flex items-center gap-x-[10px]">
						<BaseIcon name="account" />
						<p>{{ $t('U0001') }}</p>
					</div>
					<BaseArrowDown class="-rotate-[90deg]" />
				</div>
			</button> -->
			<button class="flex w-full" @click="openPopup(PopupEnum.transaction)">
				<div class="border-bottom flex-1 mx-[12px] py-[15px] flex items-center">
					<div class="flex-1 relative flex items-center gap-x-[10px]">
						<BaseIcon name="transaction" />
						<p class="text-[14px]">{{ $t('U0003') }}</p>
					</div>
					<BaseArrowDown class="-rotate-[90deg]" />
				</div>
			</button>
			<button class="flex w-full" @click="openPopup(PopupEnum.betHistory)">
				<div class="border-bottom flex-1 mx-[12px] py-[15px] flex items-center">
					<div class="flex-1 relative flex items-center gap-x-[10px]">
						<BaseIcon name="best-history" />
						<p class="text-[14px]">{{ $t('U0004') }}</p>
					</div>
					<BaseArrowDown class="-rotate-[90deg]" />
				</div>
			</button>
			<button class="flex w-full" @click="openPopup(PopupEnum.rewardHistory)">
				<div class="border-bottom flex-1 mx-[12px] py-[15px] flex items-center">
					<div class="flex-1 relative flex items-center gap-x-[10px]">
						<BaseIcon name="gift" />
						<p class="text-[14px]">{{ $t('R0038') }}</p>
					</div>
					<BaseArrowDown class="-rotate-[90deg]" />
				</div>
			</button>
			<button class="flex w-full" @click="openPopup(PopupEnum.bonus)">
				<div class="border-bottom flex-1 mx-[12px] py-[15px] flex items-center">
					<div class="flex-1 relative flex items-center gap-x-[10px]">
						<BaseIcon name="wallet_r" />
						<p class="text-[14px]">{{ $t('BH0008') }}</p>
					</div>
					<BaseArrowDown class="-rotate-[90deg]" />
				</div>
			</button>
			<button class="flex w-full" @click="openPopup(PopupEnum.message)">
				<div class="flex-1 mx-[12px] py-[15px] flex items-center">
					<div class="flex-1 relative flex items-center gap-x-[10px]">
						<BaseDot :show="messageStore.unreadEmailCount" class="absolute left-[12px] top-[2px]" />
						<BaseIcon name="message" />
						<p class="text-[14px]">{{ $t('U0007') }}</p>
					</div>
					<BaseArrowDown class="-rotate-[90deg]" />
				</div>
			</button>
		</div>
		<button class="sys-btn btn-highlight shrink-0 mb-[50px] mt-[20px]" @click="dialogStore.openLogout()">
			<p>{{ $t('U0008') }}</p>
		</button>
	</section>
</template>
<script setup lang="ts">
	const userStore = useUserStore()

	const messageStore = useNoticeAndMessageStore()
	const dialogStore = useDialogStore()
	const scrollTop = ref('0px')
	const userInfoScroll = (event: any) => {
		scrollTop.value = event.target.scrollTop + 'px'
	}
</script>
