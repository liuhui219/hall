<template>
	<div class="game-detail-container" @click="closePopup()">
		<div class="game-preview border-radius" @click.stop="() => {}">
			<button class="absolute -top-[54px] -right-[5px] p-[20px]" @click="closePopup()">
				<BaseIcon name="close" class="text-lowlight text-[20px]" />
			</button>
			<div class="relative z-[1] flex-1 overflow-hidden flex flex-col">
				<div class="flex mb-3 px-[15px] pt-[15px] flex-1">
					<BaseImg class="w-[140px] h-[140px] rounded-[6px] mr-[12px]" :src="gamedetailStore.gameInfo.src" alt="game image" />
					<div class="flex-1 overflow-hidden flex flex-col justify-between">
						<div class="flex justify-between items-start mb-2">
							<div class="flex-1 overflow-hidden">
								<h3 class="block-title text-[15px] font-bold color-text-white overflow-hidden flex justify-between">
									<div class="flex-1 truncate">
										{{ gamedetailStore.gameInfo.name }}
									</div>
									<button class="ml-[4px]" @click="gamedetailStore.toggleFavorite(gamedetailStore.gameInfo)">
										<i class="sysicon-star text-[18px]" :class="gamedetailStore.isFavorite ? 'text-second' : 'text-lowlight'" />
									</button>
								</h3>
								<p class="text-[14px] mt-[-4px]">
									{{ configStore.getProviderNameByGameId(gamedetailStore.gameInfo.game_id) }}
								</p>
							</div>
						</div>
						<!-- <p v-if="!gamedetailStore.realPlayshow && gamedetailStore.minPoint > 0" class="text-[12px]">
						{{ gamedetailStore.minpointTips }}
					</p> -->
						<div class="text-[12px]">
							<div v-if="gamedetailStore.gameInfo.r" class="flex items-center">
								RTP:&nbsp;
								<p class="text-second">
									<BaseNumber :value="$cp(gamedetailStore.gameInfo.r)" :precision="2" :b-delete-zero-point="true" />%
								</p>
							</div>
							<div v-if="gamedetailStore.gameInfo.m" class="flex items-center">
								{{ $t('NH0028') }}:&nbsp;
								<p class="text-second">
									<BaseNumber :value="$cp(gamedetailStore.gameInfo.m)" :precision="2" :b-delete-zero-point="true" />X
								</p>
							</div>
							<!--  -->
							<div
								v-if="gamedetailStore.gameInfo.s && gamedetailStore.gameInfo.s.length"
								class="flex items-center flex-wrap gap-[6px] h-[26px] overflow-hidden"
							>
								<button
									v-for="item in gamedetailStore.gameInfo.s"
									:key="item"
									class="sys-btn btn-m schemas-btn !font-normal !px-[5px]"
								>
									{{ $t(GameTagLangMaps[item]) }}
								</button>
							</div>
						</div>
						<div v-if="configStore.wallet_type == 1 && !gamedetailStore.gameInfo.p" class="warning text-[12px] mt-[4px]">
							{{ $t('H0006') }}
						</div>
						<div v-else class="h-[22px]" />
					</div>
				</div>
				<div class="flex shrink-0 px-[15px] pt-[12px] pb-[30px]">
					<button
						v-if="gamedetailStore.gameInfo.demo"
						class="sys-btn flex items-center justify-center w-full mr-2 btn-login"
						@click="gameStore.tryToGame(gamedetailStore.gameInfo.game_id, true, true)"
					>
						<span class="mr-2">{{ $t('GA0001') }}</span>
						<i class="sysicon-triangle-right" />
					</button>
					<button
						v-if="gamedetailStore.realPlayshow"
						class="sys-btn btn-highlight w-full"
						@click="gameStore.tryToGame(gamedetailStore.gameInfo.game_id, true, false)"
					>
						<span class="mr-2">{{ $t('GA0002') }}</span>
						<i class="sysicon-triangle-right" />
					</button>
					<button v-else-if="!userStore.isLogin" class="sys-btn btn-highlight w-full" @click="openLoginOrRegister()">
						{{ $t('L1001') }}
					</button>
					<button v-else class="sys-btn btn-highlight w-full" @click="toDeposit()">{{ $t('H0005') }}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import HallLog from '~~/apis/debug/HallLog'

	const gameStore = useGameStore()
	const userStore = useUserStore()
	const configStore = useSysConfigStore()
	const gamedetailStore = useGamedetailStore()
	onMounted(() => {
		gamedetailStore.mounted()

		if (useToGamePage().value) {
			useToGamePage().value = false

			let router = useRouter()
			if (router.options.history.state.forward) {
				let forwardStr = router.options.history.state.forward.toString()
				if (isPageInGame(forwardStr)) {
					//从Game返回
					HallLog.log('back to detail from game')
					closePopup()
				}
			}
		}
	})
</script>
<style scoped lang="scss">
	.game-detail-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		.game-preview {
			width: 100%;
			position: absolute;
			bottom: 0;
			min-height: 252px;
			background: $block-bg-2;
			display: flex;
			flex-direction: column;
			.sys-btn {
				padding: 0 12px;
			}
		}
	}
</style>
