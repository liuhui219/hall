<template>
	<div class="navigation-overlay" :class="{ active: navigationStore.mobileNavShow }" @click="closePopup()" />
	<div class="navigation" :class="{ active: navigationStore.mobileNavShow }">
		<div class="navigation-header relative">
			<BaseImg class="logo" :src="getResConfigImage('logo-h', 'logo')" alt="afun logo" @click="navigationStore.handleClickLogo" />
			<!-- <span v-if="appid == 1012" class="text-[12px] mr-[16px]">{{ useReqVersion().value }}</span> -->
			<button class="sysicon-close btn-close absolute -right-[16px] top-[0] bottom-0 m-auto z-[1] pr-[16px] pl-[16px]" @click="closePopup()" />
		</div>

		<div class="navigation-body">
			<div class="navigation-group-wrap">
				<div class="flex gap-[10px]">
					<div
						class="navigation-item menu-casino flex-1 flex items-center justify-center h-[50px] bg-block-bg-2 rounded-[6px]"
						:class="{ current: isCurrentPage('casino') || isCurrentPage('game') }"
						@click="casinoStore.toCasino()"
					>
						<BaseIcon name="casino" class="navigation-icon mr-[16px]" />
						<div class="navigation-text">{{ $t('H0023') }}</div>
					</div>

					<div
						v-if="configStore.gameAllMap[gameStore.sportGameId]"
						class="navigation-item menu-sport flex-1 flex items-center justify-center h-[50px] bg-block-bg-2 rounded-[6px]"
						:class="{ current: isCurrentPage('sport') }"
						@click="navigationStore.goToSport('betby')"
					>
						<BaseIcon name="ball" class="navigation-icon mr-[16px]" />
						<div class="navigation-text">{{ $t('H0026') }}</div>
					</div>
				</div>
				<div class="navigation-group navigation-group-main">
					<!-- v-if="userStore.isLogin && userStore.agencyStatus" -->
					<div v-if="userStore.isLogin" class="menu-special menu-affiliate" @click="navigationStore.referEarnJump('top')">
						<div class="h-[54px] flex items-center justify-start">
							<img :src="getResConfigImage('affiliate', ImageKeyEnum.menu)" alt="" class="w-[30px] mr-[8px] ml-[8px]" />
							<span>{{ $t('H0022') }}</span>
						</div>
					</div>
					<div
						class="flex gap-[6px]"
						:class="{
							'flex-col': !userStore.isLogin,
							'gap-[6px]': userStore.isLogin,
							'gap-[10px]': !userStore.isLogin,
						}"
					>
						<div class="menu-special menu-bonus flex-1" @click="navigateTo('/bonus-center')">
							<div class="h-[54px] flex items-center justify-start">
								<img :src="getResConfigImage('bonus', ImageKeyEnum.menu)" alt="" class="w-[30px] mr-[8px] ml-[8px]" />
								<span>{{ $t('BC0001') }}</span>
							</div>
							<BaseDot :show="userStore.bonusRedPoint" class="absolute !left-[unset] right-[10px] !top-[22px]" />
						</div>
						<div class="menu-special menu-vip flex-1" @click="navigateTo('/vip')">
							<div class="h-[54px] flex items-center justify-start">
								<img :src="getResConfigImage('vip', ImageKeyEnum.menu)" alt="" class="w-[30px] mr-[8px] ml-[8px]" />
								<span>{{ $t('TR0001') }}</span>
							</div>
						</div>
					</div>
				</div>
				<div
					v-if="userStore.vipLossRebateStatus || sysConfig.menuConfig.carnival || sysConfig.menuConfig.tournament"
					class="navigation-group"
				>
					<MobileModelACompMenuItem
						v-if="userStore.vipLossRebateStatus"
						text="V0105"
						name="loss_rebate"
						:active="isCurrentPage(PopupEnum.lossRebate, 1)"
						@on-click="
							() => {
								googleEvent({ sendType: 1, event: 'men_cashback_click' })
								openPopup(PopupEnum.lossRebate)
							}
						"
					/>
					<MobileModelACompMenuItem
						v-if="sysConfig.menuConfig.carnival"
						text="AFun Carnaval"
						name="carnival"
						:need-translation="false"
						:active="isCurrentPage('temp-1')"
						@on-click="navigateTo('/temp-1')"
					/>
					<MobileModelACompMenuItem
						v-if="sysConfig.menuConfig.tournament"
						text="Torneio"
						:need-translation="false"
						name="tournament"
						:active="isCurrentPage('temp-0')"
						@on-click="navigateTo('/temp-0')"
					/>
				</div>
				<div class="navigation-group">
					<MobileModelACompMenuItem
						text="H0053"
						name="star"
						:disabled="!userStore.isLogin"
						:active="isCurrentPage('mygame')"
						@on-click="navigateTo('/mygame')"
					/>
					<MobileModelACompMenuItem
						text="H0024"
						name="history"
						:disabled="!userStore.isLogin"
						:active="isCurrentPage('mygame')"
						@on-click="navigateTo('/mygame')"
					/>
					<MobileModelACompMenuItem
						v-if="configStore.wallet_type == 1 && configStore.gameBonusList.length"
						text="H0009"
						name="bonus-star"
						:active="classGameActive('bonus')"
						@on-click="useClassGameStore().toClassGame({ active: 'bonus' })"
					/>
					<MobileModelACompMenuItem
						v-if="configStore.menuOriginalsGameList.length"
						:text="$pt(original.name)"
						:need-translation="false"
						name="fire"
					>
						<template #open="{ open }">
							<div
								class="overflow-hidden transition-all duration-300"
								:style="{ maxHeight: open ? (configStore.menuOriginalsGameList.length + 1) * 46 + 'px' : 0 }"
							>
								<MobileModelACompMenuChildItem
									v-for="(item, index) in configStore.menuOriginalsGameList"
									:key="index"
									:name="`${item}`"
									:text="configStore.getGameByGameId(item).name"
									:need-translation="false"
									@on-click="gameStore.tryToGame(item)"
								/>
								<MobileModelACompMenuChildItem
									:text="$t('NH0000')"
									name="triangle-right"
									:need-translation="false"
									@on-click="casinoStore.toCasino()"
								/>
							</div>
						</template>
					</MobileModelACompMenuItem>
					<MobileModelACompMenuItem text="H0023" name="poker" :default-open="true">
						<template #open="{ open }">
							<div class="overflow-hidden transition-all duration-300" :style="{ maxHeight: open ? '800px' : 0 }">
								<MobileModelACompMenuChildItem
									v-for="(item, index) in configStore.gameGclassList"
									:key="index"
									:name="item.icon"
									:text="$pt(item.name)"
									:need-translation="false"
									:active="casinoSubActive(item.urlKey)"
									@on-click="casinoStore.toCasino(item)"
								/>
							</div>
						</template>
					</MobileModelACompMenuItem>
					<MobileModelACompMenuItem v-if="configStore.gameAllMap[gameStore.sportGameId]" text="H0026" name="ball">
						<template #open="{ open }">
							<div class="overflow-hidden transition-all duration-300" :style="{ maxHeight: open ? '800px' : 0 }">
								<MobileModelACompMenuChildItem
									v-for="(item, index) in SportList"
									:key="index"
									:name="item.icon"
									:text="item.text ? $t(item.text) : item.name"
									:need-translation="false"
									@on-click="navigationStore.goToSport('betby', item.path)"
								/>
							</div>
						</template>
					</MobileModelACompMenuItem>
				</div>
				<div class="navigation-group">
					<div class="navigation-group-block">
						<!-- v-if="!Number(configStore.pageConfig?.brandConfig?.page_hide)" -->
						<MobileModelACompMenuItem
							text="DL0082"
							name="affiliate"
							:size="0"
							:active="isCurrentPage('refer-and-earn')"
							@on-click="navigationStore.referEarnJump('bottom')"
						/>
						<MobileModelACompMenuItem
							v-if="promotionStore.openList.length"
							text="H0019"
							name="loudspeaker"
							:size="0"
							:active="isCurrentPage('promotion')"
							:dot="userStore.redPoint.promotion"
							@on-click="navigateTo('/promotion')"
						/>
						<MobileModelACompMenuItem
							text="U0005"
							name="gift"
							:size="0"
							:active="isCurrentPage('rewards')"
							:dot="userStore.redPoint.rewards"
							@on-click="navigateTo('/rewards')"
						/>
					</div>
				</div>

				<div class="navigation-group">
					<div class="navigation-group-block">
						<MobileModelACompMenuItem
							v-if="!Number(configStore.pageConfig?.brandConfig?.page_hide)"
							text="H0029"
							name="handshake"
							:size="0"
							:active="isCurrentPage('/brandAmbassador')"
							@on-click="navigateTo('/brandAmbassador')"
						/>
						<MobileModelACompMenuItem
							v-if="!isWebView() && sysConfig.activity.download"
							text="H0032"
							name="download"
							:size="0"
							@on-click="navigationStore.openDownload()"
						/>
						<MobileModelACompMenuItem :size="0" text="H0033" name="chats" @on-click="clickLiveChat()" />
					</div>
				</div>

				<div class="h-[20px] shrink-0" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const userStore = useUserStore()
	const navigationStore = useNavigationStore()
	const promotionStore = usePromotionStore()
	const vipStore = useVipStore()
	const configStore = useSysConfigStore()
	const casinoStore = useCasinoStore()
	const gameStore = useGameStore()
	const route = useRoute()
	const inviteChestActive = computed(() => {
		return isCurrentPage('inviteChest', 1)
	})
	const checkinActive = computed(() => {
		return isCurrentPage('checkin', 1)
	})
	const rouletteActive = computed(() => {
		return isCurrentPage('roulette', 1)
	})
	const casinoSubActive = (value: string) => {
		if (!isCurrentPage('casino')) {
			return false
		}
		if (rouletteActive.value || checkinActive.value || inviteChestActive.value) {
			return false
		}
		return route.query.tab == value
	}
	const classGameActive = (value: string) => {
		if (!isCurrentPage('class-game')) {
			return false
		}
		if (rouletteActive.value || checkinActive.value || inviteChestActive.value) {
			return false
		}
		return route.query.active == value
	}
	const original = computed((): any => {
		let find = sysConfig.gclass_name_list.find((el: any) => el.gclass == 10)
		if (find) {
			return find
		} else {
			return null
		}
	})

	const originalList = computed(() => {
		if (original.value) {
			return configStore.gameGclassMap[original.value.gclass]
		} else {
			return []
		}
	})
	const sportSubActive = (value: number) => {
		if (rouletteActive.value || checkinActive.value || inviteChestActive.value) {
			return false
		}
		return route.path.includes(`${value}`)
	}
	const isCurrentPage = (value: string, type = 0) => {
		if (type == 0) {
			if (rouletteActive.value || checkinActive.value || inviteChestActive.value) {
				return false
			}
		}
		if (type == 0 && value.charAt(0) != '/') {
			value = '/' + value
		}
		return isPageInSome(value)
	}
</script>
<style lang="scss" scoped>
	.menu-special {
		border-radius: 6px;
		flex-shrink: 0;
		overflow: hidden;
		position: relative;
		height: 54px;
		background-color: $menu-block-bg-2;
		&::after {
			content: '';
			width: 100%;
			height: 100%;
			display: block;
			position: absolute;
			background-repeat: no-repeat;
			left: 0;
			top: 0;
			opacity: 0.2;
		}
	}

	.menu-affiliate {
		background-image: $menu-bj01;
	}
	.menu-bonus {
		background-image: $menu-bj02;
	}
	.menu-vip {
		background-image: $menu-bj03;
	}
</style>
