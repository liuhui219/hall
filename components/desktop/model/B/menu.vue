<template>
	<div class="navigation-pc" :style="{ width: menuWidth + 'px' }" :class="{ hide: menuStatus == 1 || menuStatus == 2 }">
		<button class="navigation-close-container" @click="desktopMenuUpdate">
			<div class="navigation-close pointer" :class="{ left: menuStatus == 1 || menuStatus == 2 }">
				<BaseArrowDown />
			</div>
		</button>
		<div class="navigation-body">
			<div
				class="navigation-group-wrap navigation-group-header navigation-group-open-header"
				:class="{ hide: menuStatus == 1 || menuStatus == 2 }"
			>
				<div class="menu-casino-sport">
					<MobileModelBCompMenuItem
						class="flex-1 menu-casino"
						name="casino"
						:active="isCurrentPage('casino') || isCurrentPage('game')"
						text="H0023"
						:hover-no-back="true"
						@on-click="casinoStore.toCasino()"
					/>
					<MobileModelBCompMenuItem
						v-if="configStore.gameAllMap[gameStore.sportGameId]"
						class="flex-1"
						name="ball"
						:hover-no-back="true"
						:active="isCurrentPage('sport')"
						text="H0026"
						@on-click="navigationStore.goToSport('betby')"
					/>
				</div>
			</div>
			<div
				class="navigation-group-wrap navigation-group-wrap-open"
				:class="{ hide: menuStatus == 1 || menuStatus == 2, active: menuStatus == 3 }"
				@transitionend="changeMenuHide"
			>
				<div class="navigation-group navigation-group-main">
					<!-- v-if="userStore.isLogin && userStore.agencyStatus" -->
					<div v-if="userStore.isLogin" class="menu-special menu-affiliate" @click="navigationStore.referEarnJump('top')">
						<div
							class="h-[50px] flex items-center justify-start !pl-[70px]"
							:style="{
								backgroundImage: `url(${getResConfigImage('affiliate', ImageKeyEnum.menu)})`,
								backgroundSize: '20%',
								backgroundPositionX: '10px',
								backgroundPositionY: 'center',
							}"
						>
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
							<div
								class="h-[50px] flex items-center justify-start"
								:class="{ '!pl-[70px]': !userStore.isLogin }"
								:style="{
									backgroundImage: `url(${getResConfigImage('bonus', ImageKeyEnum.menu)})`,
									backgroundSize: !userStore.isLogin ? '20%' : '38%',
								}"
							>
								<span>{{ $t('BC0001') }}</span>
							</div>
							<BaseDot :show="userStore.bonusRedPoint" class="absolute !left-[unset] right-[10px] !top-[22px]" />
						</div>
						<div class="menu-special menu-vip flex-1" @click="navigateTo('/vip')">
							<div
								class="h-[50px] flex items-center justify-start"
								:class="{ '!pl-[70px]': !userStore.isLogin }"
								:style="{
									backgroundImage: `url(${getResConfigImage('vip', ImageKeyEnum.menu)})`,
									backgroundSize: !userStore.isLogin ? '20%' : '38%',
								}"
							>
								<span>{{ $t('TR0001') }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="navigation-group-content">
					<div class="navigation-group">
						<MobileModelBCompMenuItem
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
					</div>
					<div class="navigation-group">
						<MobileModelBCompMenuItem
							text="H0053"
							name="star"
							:disabled="!userStore.isLogin"
							:active="isCurrentPage('mygame')"
							@on-click="navigateTo('/mygame')"
						/>
						<MobileModelBCompMenuItem
							text="H0024"
							name="history"
							:disabled="!userStore.isLogin"
							:active="isCurrentPage('mygame')"
							@on-click="navigateTo('/mygame')"
						/>
						<MobileModelBCompMenuItem
							v-if="configStore.wallet_type == 1 && configStore.gameBonusList.length"
							text="H0009"
							name="bonus-star"
							:active="classGameActive('bonus')"
							@on-click="useClassGameStore().toClassGame({ active: 'bonus' })"
						/>
						<MobileModelBCompMenuItem
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
									<MobileModelBCompMenuChildItem
										v-for="(item, index) in configStore.menuOriginalsGameList"
										:key="index"
										:name="`${item}`"
										:text="configStore.getGameByGameId(item).name"
										:need-translation="false"
										@on-click="gameStore.tryToGame(item)"
									/>
									<MobileModelBCompMenuChildItem
										:text="$t('NH0000')"
										name="triangle-right"
										:need-translation="false"
										@on-click="casinoStore.toCasino()"
									/>
								</div>
							</template>
						</MobileModelBCompMenuItem>
						<MobileModelBCompMenuItem text="H0023" name="poker" :default-open="true">
							<template #open="{ open }">
								<div class="overflow-hidden transition-all duration-300" :style="{ maxHeight: open ? '800px' : 0 }">
									<MobileModelBCompMenuChildItem
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
						</MobileModelBCompMenuItem>
						<MobileModelBCompMenuItem v-if="configStore.gameAllMap[gameStore.sportGameId]" text="H0026" name="ball">
							<template #open="{ open }">
								<div class="overflow-hidden transition-all duration-300" :style="{ maxHeight: open ? '800px' : 0 }">
									<MobileModelBCompMenuChildItem
										v-for="(item, index) in SportList"
										:key="index"
										:name="item.icon"
										:text="item.text ? $t(item.text) : item.name"
										:need-translation="false"
										@on-click="navigationStore.goToSport('betby', item.path)"
									/>
								</div>
							</template>
						</MobileModelBCompMenuItem>
					</div>
					<div class="line" />
					<div class="navigation-group">
						<MobileModelBCompMenuItem
							v-if="!Number(configStore.pageConfig?.brandConfig?.page_hide)"
							text="DL0082"
							name="affiliate"
							:size="0"
							:active="isCurrentPage('refer-and-earn')"
							@on-click="navigationStore.referEarnJump('bottom')"
						/>
						<MobileModelBCompMenuItem
							v-if="promotionStore.openList.length"
							text="H0019"
							name="loudspeaker"
							:size="0"
							:active="isCurrentPage('promotion')"
							:dot="userStore.redPoint.promotion"
							@on-click="navigateTo('/promotion')"
						/>
						<MobileModelBCompMenuItem
							text="U0005"
							name="gift"
							:size="0"
							:active="isCurrentPage('rewards')"
							:dot="userStore.redPoint.rewards"
							@on-click="navigateTo('/rewards')"
						/>
					</div>

					<div class="navigation-group">
						<MobileModelBCompMenuItem
							v-if="!Number(configStore.pageConfig?.brandConfig?.page_hide)"
							text="H0029"
							name="handshake"
							:size="0"
							:active="isCurrentPage('/brandAmbassador')"
							@on-click="navigateTo('/brandAmbassador')"
						/>
						<MobileModelBCompMenuItem
							v-if="!isWebView() && sysConfig.activity.download"
							text="H0032"
							name="download"
							:size="0"
							@on-click="navigationStore.openDownload()"
						/>
						<MobileModelBCompMenuItem :size="0" text="H0033" name="chats" @on-click="clickLiveChat()" />
					</div>
				</div>
			</div>

			<div class="navigation-group-wrap navigation-group-header navigation-group-close-header" :class="{ active: menuStatus == 2 }">
				<div
					class="w-[35px] h-[35px] !px-[0] rounded-[8px] overflow-hidden top-item"
					:class="{ 'hide-active': isCurrentPage('casino') || isCurrentPage('game') }"
				>
					<MobileModelBCompMenuHideItem
						class="flex-1"
						name="casino"
						:height="35"
						:active="isCurrentPage('casino') || isCurrentPage('game')"
						@on-click="casinoStore.toCasino()"
					/>
				</div>
				<div
					v-if="configStore.gameAllMap[gameStore.sportGameId]"
					class="w-[35px] h-[35px] !px-[0] rounded-[8px] overflow-hidden top-item"
					:class="{ 'hide-active': isCurrentPage('sport') }"
				>
					<MobileModelBCompMenuHideItem
						name="ball"
						:height="35"
						:active="isCurrentPage('sport')"
						text="H0026"
						@on-click="navigationStore.goToSport('betby')"
					/>
				</div>
			</div>
			<div class="navigation-group-wrap navigation-group-wrap-close" :class="{ active: menuStatus == 2 }" @transitionend="changeNavshow">
				<div class="menu-group pt-[2px] top-items">
					<!-- v-if="userStore.agencyStatus" -->
					<div class="w-[35px] h-[35px] rounded-[8px] mb-[10px] relative" @click="navigationStore.referEarnJump('bottom')">
						<BaseImg :src="getResConfigImage('affiliate_hide', ImageKeyEnum.menu)" :class="{ active: isCurrentPage('refer-and-earn') }" />
						<!-- <BaseDot :show="!!userStore.redPoint.referAndEarn" class="absolute -top-[2px] left-[30px] z-[10]"/> -->
					</div>
					<div class="w-[35px] h-[35px] rounded-[8px] overflow-hidden mb-[10px]" @on-click="navigateTo('/bonus-center')">
						<BaseImg :src="getResConfigImage('bonus_hide', ImageKeyEnum.menu)" />
						<BaseDot v-if="!!userStore.bonusRedPoint" />
					</div>
					<div class="w-[35px] h-[35px] rounded-[8px]" @click="navigateTo('/vip')">
						<BaseImg :src="getResConfigImage('vip_hide', ImageKeyEnum.menu)" :class="{ active: isCurrentPage('vip') }" />
						<BaseDot :show="userStore.redPoint.vip" class="absolute -top-[2px] left-[30px] z-[10]" />
					</div>
				</div>
				<div v-if="userStore.vipLossRebateStatus" class="menu-group">
					<MobileModelBCompMenuHideItem
						v-if="userStore.vipLossRebateStatus"
						text="V0105"
						name="loss_rebate"
						:active="isCurrentPage(PopupEnum.lossRebate)"
						@on-click="
							() => {
								googleEvent({ sendType: 1, event: 'men_cashback_click' })
								openPopup(PopupEnum.lossRebate)
							}
						"
					/>
				</div>
				<div v-if="!configStore.gameDisabled" class="menu-group">
					<MobileModelBCompMenuHideItem name="star" :active="isCurrentPage('mygame')" text="H0053" @on-click="navigateTo('/mygame')" />
					<MobileModelBCompMenuHideItem
						v-if="configStore.wallet_type == 1 && configStore.gameBonusList.length"
						text="H0009"
						name="bonus-star"
						:active="classGameActive('bonus')"
						@on-click="useClassGameStore().toClassGame({ active: 'bonus' })"
					/>
					<MobileModelBCompMenuHideItem
						v-for="(item, index) in configStore.gameGclassList"
						:key="index"
						:name="item.icon"
						:active="casinoSubActive(item.urlKey)"
						:text="$pt(item.name)"
						:need-translation="false"
						@on-click="casinoStore.toCasino(item)"
					/>
				</div>
				<div class="menu-group">
					<MobileModelBCompMenuHideItem
						v-if="!Number(configStore.pageConfig?.brandConfig?.page_hide)"
						name="handshake"
						text="H0029"
						@on-click="navigateTo('/brandAmbassador')"
					/>
					<MobileModelBCompMenuHideItem
						v-if="!isWebView() && sysConfig.activity.download"
						name="download"
						text="H0032"
						@on-click="navigationStore.openDownload"
					/>
					<MobileModelBCompMenuHideItem name="chats" text="H0033" @on-click="clickLiveChat" />
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
	const menuWidth = ref(281)
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
			menuWidth.value = 60
		} else if (menuHide.value) {
			menuHide.value = false
			navigationStore.setMobileNavShow(true)
			menuStatus.value = 3
			menuWidth.value = 281
		}
	}
	const top = configStore.gameAllMap[gameStore.sportGameId] ? '130px' : '76px'
</script>
<style scoped lang="scss">
	.navigation-pc {
		width: 281px;
		transition: all 0.3s;
		background: $menu-top-di;
		pointer-events: auto;
		.navigation-close-container {
			background: transparent;
			padding: 0;
			position: absolute;
			right: -8px;
			top: 70px;
			z-index: 100;
			.navigation-close {
				width: 16px;
				height: 16px;
				border-radius: 50%;
				font-size: 12px;
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
			background: $menu-top-di;
			.navigation-group-wrap {
				transition: all 0.3s;
				width: 100%;
				padding: 0 25px 30px;
				opacity: 1;
				.menu-group {
					padding-bottom: 10px;
					margin-bottom: 20px;
					overflow: visible;
					&:last-child {
						border-bottom: none;
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
					height: calc(100% - #{v-bind(top)} - 10px);
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: flex-start;
					position: absolute;
					top: v-bind(top);
					left: 0;
					z-index: 1;
					padding: 0;
					opacity: 0;
					transform: translate3d(0, 100px, 0);
					transition: none;
					pointer-events: none;
					visibility: hidden;
					img {
						cursor: pointer;
						&.active,
						&:hover {
							filter: brightness(1.3);
						}
					}
					.top-items {
						padding: 20px 0 !important;
						background: $menu-01 !important;
						width: 64px !important;
					}
					.menu-group {
						flex-shrink: 0;
						width: 100%;
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
					height: auto;
					padding: 0 25px;
					position: absolute;
					top: 0;
					left: 0;
					&.navigation-group-open-header {
						opacity: 1;
						transition: all 0.3s;
						&.hide {
							opacity: 0;
							transition: none;
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
						margin: 26px 0 24px;
						gap: 10px !important;

						.top-item {
							background: $menu-block-bg-2;
							color: $home-tab-bar-wxz;
						}
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
				background: $home-block-bg-2;
				border-radius: 8px;
				margin: 26px 0 24px;
				padding: 0 !important;
				.active {
					:deep(.menu-item) {
						background: $home-second;
					}
				}
			}

			.menu-special {
				border-radius: 6px;
				flex-shrink: 0;
				overflow: hidden;
				position: relative;
				height: 50px;
				font-weight: 700;
				background-color: $menu-block-bg-2;
				cursor: pointer;
				font-size: 13px;
				& > div {
					background-repeat: no-repeat;
					background-size: 38%;
					background-position: bottom left;
					padding-left: 42px;
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
			.line {
				height: 1.5px;
				width: 100%;
				background: $menu-block-bg-2;
				flex-shrink: 0;
			}
		}
	}
	.navigation-pc::after {
		position: absolute;
		width: 100%;
		background: $menu-top-di;
	}
</style>
