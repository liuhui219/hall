<template>
	<div class="wrap">
		<!-- 特殊游戏走全屏模式：【保利体育】 -->
		<div v-if="gameStore.bPCFullScreen" class="game-full-iframe">
			<iframe
				ref="iframe"
				:src="gameStore.url"
				frameborder="0"
				allowtransparency="true"
				allow="autoplay"
				auto=" "
				allowfullscreen="true"
				@load="gameStore.iFrameLoad"
			/>
		</div>
		<section v-else class="game-preview pt-[36px] pb-[72px]">
			<div>
				<div class="router-name">
					<span class="text-lowlight pointer" @click="casinoStore.toCasino(gamedetailStore.gameTypeObj)">
						{{ $pt(configStore.getGclassName(gamedetailStore.gameInfo.gclass)) }}
					</span>
					>
					<span>{{ gamedetailStore.gameInfo.name }}</span>
				</div>

				<section class="game-box">
					<div class="game-window">
						<div class="game-iframe w-full h-full" :style="{ backgroundImage: `url(${gameStore.PCGameBg})` }">
							<iframe
								ref="iframe"
								:class="{ 'limit-width': gameStore.PCGameBg }"
								:src="gameStore.url"
								frameborder="0"
								allowtransparency="true"
								allow="autoplay"
								auto=" "
								allowfullscreen="true"
								@load="gameStore.iFrameLoad"
							/>
						</div>
						<div v-if="gamedetailStore.showOverlay || gameStore.gameErrorMsg" class="game-window-overlay">
							<div class="flex">{{ gameStore.gameErrorMsg }}</div>
							<p v-if="!gamedetailStore.realPlayshow && gamedetailStore.minPoint > 0" class="text-[14px] text-second mb-6">
								{{ gamedetailStore.minpointTips }}
							</p>
							<div class="flex justify-center">
								<button
									v-if="gamedetailStore.gameInfo.demo"
									class="sys-btn flex items-center justify-center mx-2 btn-card"
									@click="gamedetailStore.goGamePlayChange(true)"
								>
									<span class="mr-2">{{ $t('GA0001') }}</span>
									<BaseIcon name="triangle-right" />
								</button>
								<button
									v-if="gamedetailStore.realPlayshow"
									class="sys-btn btn-highlight mx-2"
									@click="gamedetailStore.goGamePlayChange(false)"
								>
									<span class="mr-2">{{ $t('GA0002') }}</span>
									<BaseIcon name="triangle-right" />
								</button>

								<button v-else-if="!userStore.isLogin" class="sys-btn btn-highlight mx-2" @click="openLoginOrRegister()">
									{{ $t('L1001') }}
								</button>
								<button v-else class="sys-btn btn-highlight mx-2" @click="toDeposit()">{{ $t('H0005') }}</button>
							</div>
						</div>
					</div>
					<div class="flex justify-between items-center px-6 py-4">
						<button class="sys-btn btn-icon" @click="clickFullscreen()">
							<BaseIcon name="full-screen" class="text-[36px]" />
						</button>
						<div v-if="gamedetailStore.gameInfo.demo">
							<BaseSwitch
								:string="['Real Play', 'Fun Play']"
								:check="gamedetailStore.switchBol"
								@change="gamedetailStore.goGamePlayChange"
							/>
						</div>
					</div>
				</section>
				<div class="game-block p-6 mb-12 border-radius overflow-hidden">
					<div class="flex">
						<BaseImg class="w-[175px] border-radius mr-8" :src="gamedetailStore.gameInfo.src" alt="game vision" />
						<div class="w-full">
							<div class="flex justify-between items-start mb-2">
								<div class="flex-1">
									<h3 class="section-title font-bold mb-1">{{ gamedetailStore.gameInfo.name }}</h3>
									<p class="block-title text-lowlight">
										{{ configStore.getProviderNameByGameId(gamedetailStore.gameInfo.game_id) }}
									</p>
								</div>

								<button @click="gamedetailStore.toggleFavorite(gamedetailStore.gameInfo)">
									<BaseIcon name="star" class="text-[36px]" :class="gamedetailStore.isFavorite ? 'text-second' : 'text-lowlight'" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="flex items-center justify-center h-[360px]">
                <p class="text-lowlight text-2xl">Game not found</p>
            </div> -->
			<div v-if="gamedetailStore.gameListData.length" class="home-game pl-4 mb-12">
				<div class="flex justify-between w-full">
					<h3 class="section-title mb-6">{{ $t('D0002') }}</h3>
					<div v-show="gamedetailStore.gameListData.length > 6" class="flex">
						<button class="sys-btn btn-icon mr-3 swiper-button-game-prev">
							<BaseArrowDown class="rotate-90" />
						</button>
						<button class="sys-btn btn-icon swiper-button-game-next">
							<BaseArrowDown class="rotate-[270deg]" />
						</button>
					</div>
				</div>
				<swiper
					class="game-list-swiper"
					:slides-per-view="6.5"
					:space-between="24"
					:slides-per-group="1"
					:modules="modules"
					:navigation="{
						nextEl: `.swiper-button-game-next`,
						prevEl: `.swiper-button-game-prev`, // 下一页dom节点
					}"
				>
					<swiper-slide v-for="game in gamedetailStore.gameListData" :key="`${game.game_id}`" class="game-item">
						<BaseGameComponent
							:game="configStore.getGameByGameId(game.game_id)"
							:show-mask="true"
							:show-detail="useAppModel().value == 'A'"
						/>
					</swiper-slide>
				</swiper>
			</div>
		</section>
	</div>
</template>
<script setup lang="ts">
	const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
	const userStore = useUserStore()
	const gameStore = useGameStore()
	const configStore = useSysConfigStore()
	const gamedetailStore = useGamedetailStore()
	const iframe = ref()
	const casinoStore = useCasinoStore()
	const clickFullscreen = () => {
		let element: any = iframe.value
		requestFullscreen(element)
	}
	onMounted(() => {
		;(window as any).iframeWin = iframe.value?.contentWindow
	})
</script>
<style scoped lang="scss">
	.game-iframe {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		background-repeat: no-repeat;
		background-size: cover;

		iframe {
			width: 100%;
			flex: 1;
			background: #000000;
		}

		iframe.limit-width {
			max-width: 405px;
			background: transparent;
		}
	}

	.game-full-iframe {
		width: 100%;
		height: calc(100vh - $pc-header-height);
		display: flex;
		flex-direction: column;
		position: relative;
		top: 0;
		left: 0;

		iframe {
			width: 100%;
			flex: 1;
			background: #000000;
		}
	}

	.game-preview {
		.router-name {
			padding: 5px 15px;
			background: 20px;
			background: $block-bg-2;
			display: inline-block;
			border-radius: 50px;
			/* margin: 10px 0; */
			margin-bottom: 16px;
		}
		.game-box {
			margin-bottom: 48px;
			border-radius: 20px;
			background: $block-bg-2;
			overflow: hidden;
			.game-window {
				position: relative;
				display: block;
				width: 100%;
				height: 720px;
			}
			.game-window-overlay {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgba(0, 0, 0, 0.7);
				flex-direction: column;
			}
		}
		.game-block {
			background: $block-bg-2;
		}
		.home-game {
			.section-title {
				font-size: 24px;
				font-weight: 700;
			}

			.game-item {
				position: relative;
				border-radius: $border-radius;
				// overflow: hidden;
				// background: $block-bg-2;
				cursor: pointer;
			}
		}
	}
</style>
