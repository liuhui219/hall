<template>
	<div>
		<div class="navigation-overlay" :class="{ active: navigationStore.mobileNavShow }" @click="closePopup()" />

		<div class="navigation" :class="{ active: navigationStore.mobileNavShow }">
			<div class="navigation-close-container" @click="closePopup()">
				<div class="navigation-close">
					<BaseArrowDown />
				</div>
			</div>
			<div class="navigation-body">
				<div class="navigation-group-wrap navigation-group-header">
					<div class="menu-casino-sport">
						<MobileModelBCompMenuItem
							class="flex-1"
							name="casino"
							:active="isCurrentPage('casino') || isCurrentPage('game')"
							text="H0023"
							@on-click="casinoStore.toCasino()"
						/>
						<MobileModelBCompMenuItem
							v-if="configStore.gameAllMap[gameStore.sportGameId]"
							class="flex-1"
							name="ball"
							:active="isCurrentPage('sport')"
							text="H0026"
							@on-click="navigationStore.goToSport('betby')"
						/>
					</div>
				</div>
				<div class="navigation-group-wrap">
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
										backgroundSize: !userStore.isLogin ? '24%' : '45%',
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
										backgroundSize: !userStore.isLogin ? '24%' : '45%',
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
<style scoped lang="scss">
	.navigation {
		background: $menu-bg;
		.navigation-close-container {
			padding: 10px;
			position: absolute;
			right: -18px;
			top: 30px;
			z-index: 5;
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
					position: relative;
					top: 1px;
				}
			}
		}

		.navigation-body {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			.navigation-group-wrap {
				width: auto;
				flex: 1;
				height: auto;
				padding: 0 25px 30px;
				.menu-group {
					border-bottom: 1.5px solid $home-block-bg-2;
					padding-bottom: 10px;
					margin-bottom: 20px;
					&:last-child {
						border-bottom: none;
					}
					&.menu-affiliate-roulette-vip {
						background: transparent;
						background-size: cover;
						:deep(.menu-item) {
							margin-bottom: 0;
							background-color: transparent;
							padding-left: 38px;
							.menu-text {
								margin-left: 10px;
								font-size: 10px;
								color: #fff;
							}
						}
						.affiliate-menu-item,
						.bonus-menu-item,
						.vip-menu-item {
							margin-bottom: 10px;
							border-radius: 8px;
							overflow: hidden;
						}
						.vip-menu-item {
							background: linear-gradient(93deg, #5b0303 0%, #cd5454 100%);
						}
						.affiliate-menu-item {
							background: linear-gradient(90deg, #117023 0%, #18252b 100%);
						}
						.bonus-menu-item {
							background: linear-gradient(90deg, #3e1844 0%, #241b30 100%);
						}
					}
				}
			}
			.navigation-group-header.navigation-group-wrap {
				flex: unset;
				flex-shrink: 0;
				padding: 0 25px;
			}
			.menu-casino-sport {
				display: flex;
				align-items: center;
				justify-content: center;
				background: $home-block-bg-2;
				border-radius: 8px;
				margin: 20px 0 24px;
				padding: 0 !important;
				.menu-item {
					margin-bottom: 0;
				}
				.active {
					background: $home-second;
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
					padding-left: 48px;
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
</style>
