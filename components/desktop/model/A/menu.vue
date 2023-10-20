<template>
	<div class="navigation-pc" :style="{ width: menuWidth + 'px' }" :class="{ hide: menuStatus == 1 || menuStatus == 2 }">
		<div class="navigation-body">
			<div
				class="navigation-group-wrap navigation-group-header navigation-group-open-header"
				:class="{ hide: menuStatus == 1 || menuStatus == 2 }"
			>
				<div class="menu-casino-sport">
					<div
						class="menu-header-item menu-toggle flex-1 flex items-center justify-center bg-block-bg-2 rounded-[6px]"
						@click="desktopMenuUpdate"
					>
						<BaseIcon name="menu" />
					</div>
					<div class="flex-1 flex justify-center">
						<BaseImg :src="getResConfigImage('logo-h', 'logo')" class="logo pointer" @click="toHome()" />
					</div>
				</div>
			</div>
			<div
				class="navigation-group-wrap navigation-group-wrap-open bg-bg"
				:class="{ hide: menuStatus == 1 || menuStatus == 2, active: menuStatus == 3 }"
				@transitionend="changeMenuHide"
			>
				<div class="menu-group">
					<!-- v-if="userStore.isLogin && userStore.agencyStatus" -->
					<div v-if="userStore.isLogin" class="menu-special menu-affiliate pointer" @click="navigationStore.referEarnJump('top')">
						<div class="h-[54px] flex items-center justify-start">
							<img :src="getResConfigImage('affiliate', ImageKeyEnum.menu)" alt="" class="w-[30px] mr-[8px] ml-[8px]" />
							<span>{{ $t('H0022') }}</span>
						</div>
					</div>
					<div class="flex gap-[8px]" :class="{ 'flex-col': !userStore.isLogin }">
						<div class="menu-special menu-bonus flex-1 pointer" @click="navigateTo('/bonus-center')">
							<div class="h-[54px] flex items-center justify-start">
								<img :src="getResConfigImage('bonus', ImageKeyEnum.menu)" alt="" class="w-[28px] mr-[8px] ml-[8px]" />
								<span>{{ $t('BC0001') }}</span>
							</div>
							<BaseDot :show="userStore.bonusRedPoint" class="navigation-dot !left-[unset] right-[10px] !top-[22px]" />
						</div>
						<div class="menu-special menu-vip flex-1 pointer" @click="navigateTo('/vip')">
							<div class="h-[54px] flex items-center justify-start">
								<img :src="getResConfigImage('vip', ImageKeyEnum.menu)" alt="" class="w-[28px] mr-[8px] ml-[8px]" />
								<span>{{ $t('TR0001') }}</span>
							</div>
						</div>
					</div>
				</div>
				<div v-if="userStore.vipLossRebateStatus || sysConfig.menuConfig.carnival || sysConfig.menuConfig.tournament" class="menu-group">
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
				<div class="menu-group">
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
				<div class="menu-group menu-group-block">
					<!-- v-if="userStore.isLogin && userStore.agencyStatus" -->
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

				<div class="menu-group menu-group-block">
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

				<div class="h-[20px] shrink-0" />
			</div>
			<div class="navigation-group-wrap navigation-group-wrap-close" :class="{ active: menuStatus == 2 }" @transitionend="changeNavshow">
				<div class="menu-group pt-[2px]">
					<!-- v-if="userStore.isLogin && userStore.agencyStatus" -->
					<div
						v-if="userStore.isLogin"
						class="w-[56px] h-[56px] bg-block-bg-2 ml-[4px] rounded-[6px] relative flex items-center justify-center"
						@click="navigationStore.referEarnJump('top')"
					>
						<MobileModelACompMenuHideItem
							:active="isCurrentPage('refer-and-earn')"
							text="DL0082"
							:height="56"
							:src="getResConfigImage('affiliate', ImageKeyEnum.menu)"
							:dot="userStore.redPoint.affiliate"
						/>
					</div>

					<div
						class="w-[56px] h-[56px] bg-block-bg-2 ml-[4px] rounded-[6px] relative flex items-center justify-center"
						@click="navigateTo('/bonus-center')"
					>
						<MobileModelACompMenuHideItem
							:active="isCurrentPage('bonus-center')"
							text="BC0001"
							:height="56"
							:src="getResConfigImage('bonus', ImageKeyEnum.menu)"
							:dot="userStore.bonusRedPoint"
						/>
					</div>
					<div
						class="w-[56px] h-[56px] bg-block-bg-2 ml-[4px] rounded-[6px] relative flex items-center justify-center"
						@click="navigateTo('/vip')"
					>
						<MobileModelACompMenuHideItem
							:active="isCurrentPage('vip')"
							text="TR0001"
							:height="56"
							:src="getResConfigImage('vip', ImageKeyEnum.menu)"
							:dot="userStore.redPoint.bonusCenter"
						/>
					</div>
				</div>
				<template v-if="userStore.vipLossRebateStatus || sysConfig.menuConfig.carnival || sysConfig.menuConfig.tournament">
					<div class="menu-line" />
					<div class="menu-group">
						<MobileModelACompMenuHideItem
							v-if="userStore.vipLossRebateStatus"
							text="V0105"
							name="loss_rebate"
							:active="isCurrentPage('lossRebate')"
							@on-click="
								() => {
									googleEvent({ sendType: 1, event: 'men_cashback_click' })
									openPopup(PopupEnum.lossRebate)
								}
							"
						/>
						<MobileModelACompMenuHideItem
							v-if="sysConfig.menuConfig.carnival"
							text="AFun Carnaval"
							name="carnival"
							:active="isCurrentPage('temp-1')"
							@on-click="navigateTo('/temp-1')"
						/>
						<MobileModelACompMenuHideItem
							v-if="sysConfig.menuConfig.tournament"
							text="Torneio"
							:need-translation="false"
							name="tournament"
							:active="isCurrentPage('temp-0')"
							@on-click="navigateTo('/temp-0')"
						/>
					</div>
				</template>
				<div class="menu-line" />
				<div class="menu-group">
					<MobileModelACompMenuHideItem
						text="H0053"
						name="star"
						:disabled="!userStore.isLogin"
						:active="isCurrentPage('mygame')"
						@on-click="navigateTo('/mygame')"
					/>
					<MobileModelACompMenuHideItem
						text="H0024"
						name="history"
						:disabled="!userStore.isLogin"
						:active="isCurrentPage('mygame')"
						@on-click="navigateTo('/mygame')"
					/>
					<div class="shrink-0 h-[30px]" />
					<MobileModelACompMenuHideItem
						v-if="configStore.wallet_type == 1 && configStore.gameBonusList.length"
						text="H0009"
						name="bonus-star"
						:active="classGameActive('bonus')"
						@on-click="useClassGameStore().toClassGame({ active: 'bonus' })"
					/>
					<MobileModelACompMenuHideItem
						text="H0023"
						name="casino"
						:active="isCurrentPage('casino') || isCurrentPage('game')"
						@on-click="casinoStore.toCasino()"
					/>
					<MobileModelACompMenuHideItem
						v-if="configStore.gameAllMap[gameStore.sportGameId]"
						text="H0026"
						name="ball"
						:active="isCurrentPage('sport')"
						@click="navigationStore.goToSport('betby')"
					/>
				</div>
				<div class="menu-line" />
				<div class="menu-group">
					<!-- v-if="userStore.isLogin && userStore.agencyStatus" -->
					<MobileModelACompMenuHideItem
						text="DL0082"
						name="affiliate"
						:active="isCurrentPage('refer-and-earn')"
						@on-click="navigationStore.referEarnJump('bottom')"
					/>
					<MobileModelACompMenuHideItem
						v-if="promotionStore.openList.length"
						text="H0019"
						name="loudspeaker"
						:active="isCurrentPage('promotion')"
						:dot="userStore.redPoint.promotion"
						@on-click="navigateTo('/promotion')"
					/>
					<MobileModelACompMenuHideItem
						text="U0005"
						name="gift"
						:active="isCurrentPage('rewards')"
						:dot="userStore.redPoint.rewards"
						@on-click="navigateTo('/rewards')"
					/>
				</div>
				<div class="menu-line" />
				<div class="menu-group">
					<MobileModelACompMenuHideItem
						v-if="!Number(configStore.pageConfig?.brandConfig?.page_hide)"
						name="handshake"
						text="H0029"
						@on-click="navigateTo('/brandAmbassador')"
					/>
					<MobileModelACompMenuHideItem
						v-if="!isWebView() && sysConfig.activity.download"
						name="download"
						text="H0032"
						@on-click="navigationStore.openDownload"
					/>
					<MobileModelACompMenuHideItem name="chats" text="H0033" @on-click="clickLiveChat" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const userStore = useUserStore()
	const gameStore = useGameStore()
	const navigationStore = useNavigationStore()
	const promotionStore = usePromotionStore()
	const vipStore = useVipStore()
	const configStore = useSysConfigStore()
	const casinoStore = useCasinoStore()
	const route = useRoute()
	const menuHide = ref(false)
	const inviteChestActive = computed(() => {
		return isCurrentPage('inviteChest', 1)
	})
	const menuWidth = ref(320)
	const menuStatus = ref(0)
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
	const original = computed((): any => {
		let find = sysConfig.gclass_name_list.find((el: any) => el.gclass == 10)
		if (find) {
			return find
		} else {
			return null
		}
	})
	const sportSubActive = (value: number) => {
		if (rouletteActive.value || checkinActive.value || inviteChestActive.value) {
			return false
		}
		return route.path.includes(`${value}`)
	}

	const changeMenuHide = (el: any) => {
		if (menuStatus.value == 1) {
			menuStatus.value = 2
			menuHide.value = !navigationStore.mobileNavShow
		}
	}
	const changeNavshow = (el: any) => {
		if (menuStatus.value == 3) {
			navigationStore.setMobileNavShow(!menuHide.value)
			menuStatus.value = 0
		}
	}
	const desktopMenuUpdate = () => {
		if (navigationStore.mobileNavShow) {
			navigationStore.setMobileNavShow()
			menuStatus.value = 1
			menuWidth.value = 64
		} else if (menuHide.value) {
			menuHide.value = false
			navigationStore.setMobileNavShow(true)
			menuStatus.value = 3
			menuWidth.value = 320
		}
	}
</script>
<style scoped lang="scss">
	.navigation-pc {
		padding: 0 16px;
		width: 320px;
		transition: all 0.3s;
		background: $menu-bg;
		box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.3);
		pointer-events: auto;
		background: $bg;
		.menu-line {
			flex-shrink: 0;
			height: 1.5px;
			border-radius: 1px;
			background-color: #323c3c;
			margin-left: 8px;
			margin-right: 8px;
			min-width: 48px;
		}
		.menu-special {
			border-radius: 6px;
			flex-shrink: 0;
			overflow: hidden;
			position: relative;
			height: 54px;
			background-color: $menu-block-bg-2;
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

		.navigation-close-container {
			background: transparent;
			padding: 10px;
			position: absolute;
			right: -18px;
			top: 60px;
			z-index: 100;
			.navigation-close {
				width: 20px;
				height: 20px;
				border-radius: 50%;
				font-size: 14px;
				display: flex;
				justify-content: center;
				align-items: center;
				transform: rotate(90deg);
				background: $home-second;
				i {
					transform: scale(0.6);
				}
				&.left {
					transform: rotate(270deg);
				}
			}
		}

		.navigation-body {
			.navigation-group-wrap {
				transition: all 0.3s;
				width: 288px;
				margin-left: 16px;

				display: flex;
				flex-direction: column;
				gap: 18px;
				opacity: 1;
				.menu-group {
					overflow: visible;
					display: flex;
					flex-direction: column;
					gap: 8px;
					&-block {
						padding: 12px 0;
						background: $block-bg-2;
						border-radius: 6px;
					}
				}
				&.navigation-group-wrap-open {
					height: calc(100% - 92px);
					position: absolute;
					top: 92px;
					left: 0;
					z-index: 1;
					&.hide {
						opacity: 0;
						transform: translateX(-281px);
						pointer-events: none;
					}
					&.active {
						opacity: 1;
						transition-delay: 0.1s;
						transform: translateX(0);
						pointer-events: auto;
					}
				}
				&.navigation-group-wrap-close {
					height: calc(100% - #{$pc-header-height} - 10px);
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: flex-start;
					position: absolute;
					top: calc(#{$pc-header-height} + 10px);
					left: 0;
					z-index: 1;
					padding: 0;
					opacity: 0;
					transform: translate3d(0, 100px, 0);
					transition: none;
					pointer-events: none;
					margin-left: 0;
					visibility: hidden;
					img {
						cursor: pointer;
						&.active,
						&:hover {
							filter: brightness(1.3);
						}
					}
					.menu-group {
						flex-shrink: 0;
						width: 64px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: flex-start;
						margin-bottom: 0;
					}
					&.active {
						visibility: visible;
						padding-right: 300px;
						/* margin-left: 100px; */
						padding-left: 30px;
						opacity: 1;
						transform: translate3d(0, 0, 0);
						transition: opacity 0.3s, transform 0.3s;
						transition-delay: 0.2s;
					}
				}
				&.navigation-group-header {
					height: $pc-header-height;

					position: absolute;
					top: 0;
					left: 0;
					&.navigation-group-open-header {
						opacity: 1;
						transition: all 0.3s;

						&.hide {
							margin-left: 0;
							.menu-casino-sport {
								width: 64px;

								& > :not(.menu-toggle) {
									opacity: 0;
									transition: none;
									visibility: hidden;
									display: none;
								}
							}
						}
					}
					&.navigation-group-close-header {
						visibility: hidden;
						opacity: 0;
						transition: none;
						padding: 0;
						width: 36px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						margin: 10px 12px;
						border-bottom: 1.5px solid $home-block-bg;
						&.active {
							visibility: visible;
							opacity: 1;
							transition: all 0.3s;
						}
					}
				}
			}
			.menu-casino-sport {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				padding-bottom: 2px;
				gap: 6px;
				.menu-header-item {
					cursor: pointer;
					height: calc(#{$pc-header-height} * 0.7);
					background: $block-bg-2;
				}
				.menu-toggle {
					flex: 0;
					color: $menu-text-lowlight;
					padding: 0 calc(#{$pc-header-height} * 0.2);
					flex-shrink: 0;
					font-size: calc(#{$pc-header-height} * 0.3);
				}
				.active {
					color: $second;
				}
			}
		}
	}
	.navigation-pc::after {
		position: absolute;
		width: 100%;
		background: $bg;
	}
</style>
