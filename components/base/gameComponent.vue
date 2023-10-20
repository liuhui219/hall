<template>
	<div class="game-component w-full" :class="{ 'game-mask-parent': showMask, 'float-up': configStore.modelConfig.float_up }">
		<div
			class="game-cover relative z-[1]"
			:style="{ backgroundImage: loaded ? `url(${game.src})` : '' }"
			:class="{ 'border-game-radius': !showDetail }"
			@click="gameStore.tryToGame(game.game_id)"
		>
			<div v-if="configStore.wallet_type == 1 && game.p" class="game-bonus flex justify-center items-center">
				<BaseIcon name="bonus-star" class="relative left-[1px]" />
			</div>
			<div v-if="showMask" class="game-mask" @click.stop="gameStore.tryToGame(game.game_id, true, false)">
				<div class="game-mask-content">
					<BaseIcon
						name="ic-star"
						class="pointer self-end z-[2] text-[18px] game-comp-star"
						:class="{ active: myGameStore.isFavorite(game.game_id) }"
						@click.stop="myGameStore.setCollectGame(game.game_id)"
					/>
					<div class="game-play pointer">
						<BaseIcon name="enter" class="game-enter" />
					</div>
					<div v-if="!$slots.detail" class="px-[8px] w-full overflow-hidden flex items-center justify-center flex-col shrink-0">
						<div class="text-[14px] font-medium truncate w-full text-center">{{ game.name }}</div>
						<div class="text-[12px] font-normal w-full text-center truncate text-lowlight">
							{{ configStore.getProviderByPlat(game.gplat).name }}
						</div>
					</div>
					<button v-if="game.demo" class="game-demo" @click.stop="gameStore.tryToGame(game.game_id, true, true)">Demo</button>
					<div v-else class="color-text-white h-[23px] w-full" />

					<div v-if="configStore.wallet_type == 1 && !game.p" class="warning text-[9px] text-center leading-none">
						{{ $t('H0006') }}
					</div>
					<div v-else class="color-text-white h-[12px] w-full" />

					<div v-if="configStore.modelConfig.game_help" class="help">
						<BaseImg :src="getResConfigImage('help', ImageKeyEnum.home)" />
						<div class="content">
							<div class="flex items-center mb-[6px]">
								RTP:&nbsp;
								<p class="text-second"><BaseNumber :value="$cp(game.r)" :b-delete-zero-point="true" />%</p>
							</div>
							<div class="flex items-center">
								{{ $t('NH0028') }}:&nbsp;
								<p class="text-second"><BaseNumber :value="$cp(game.m)" :b-delete-zero-point="true" />X</p>
							</div>
							<div v-if="game.s && game.s.length" class="flex items-center flex-wrap gap-[6px] mt-[6px]">
								<button v-for="item in game.s" :key="item" class="sys-btn btn-m schemas-btn !font-normal">
									{{ $t(GameTagLangMaps[item]) }}
								</button>
							</div>
							<!-- <div v-if="game.r" class="flex items-center mb-[6px]">
								RTP:&nbsp;
								<p class="text-second"><BaseNumber :value="$cp(game.r)" :b-delete-zero-point="true" />%</p>
							</div>
							<div v-if="game.m" class="flex items-center">
								{{ $t('NH0028') }}:&nbsp;
								<p class="text-second"><BaseNumber :value="$cp(game.m)" :b-delete-zero-point="true" />X</p>
							</div>
							<div v-if="game.s && game.s.length" class="flex items-center flex-wrap gap-[6px] mt-[6px]">
								<button v-for="item in game.s" :key="item" class="sys-btn btn-m schemas-btn !font-normal">
									{{ $t(GameTagLangMaps[item]) }}
								</button>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="!isRemove" class="game-cover game-cover-copy" />
		<slot name="detail">
			<div v-if="showDetail" class="game-info bg-block-bg-2">
				<h4 v-if="showGameName" class="game-name">{{ game.name }}</h4>
				<div v-if="provider" class="game-provider">{{ configStore.getProviderByPlat(game.gplat).name }}</div>
			</div>
		</slot>
	</div>
</template>
<script setup lang="ts">
	const game_back = `url(${getResConfigImage('game_back', ImageKeyEnum.home)})`
	const game_placeholder = `url(${getResConfigImage('game_placeholder', ImageKeyEnum.home)})`
	const game_cursor = `url(${getResConfigImage('cursor', ImageKeyEnum.home)})`
	const propsConf = defineProps({
		game: {
			type: Object,
			default: () => ({}),
		},
		showGameName: {
			type: Boolean,
			default: false,
		},
		provider: {
			type: Boolean,
			default: true,
		},
		showDetail: {
			type: Boolean,
			default: true,
		},
		showMask: {
			type: Boolean,
			default: false,
		},
		imageRadius: {
			type: Boolean,
			default: false,
		},
	})
	const isRemove = ref(false)
	const configStore = useSysConfigStore()
	const gameStore = useGameStore()
	const myGameStore = useMygameStore()
	const loaded = ref(false)
	onMounted(() => {
		var img = document.createElement('img')
		img.src = propsConf.game.src
		img.onload = function () {
			loaded.value = true
			setTimeout(() => {
				isRemove.value = true
			}, 2000)
		}
	})
</script>
<style lang="scss" scoped>
	.game-cover.game-cover-copy {
		display: inline-block;
		height: 0;
		width: 100%;
		padding-bottom: 100%;
		overflow: hidden;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: transparent;
		position: absolute;
		left: 0;
		top: 0;
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			padding-bottom: 100%;
			background-color: $block-bg-2;
			background-image: v-bind(game_back);
			background-size: cover;
			background-position: center center;
			background-repeat: no-repeat;
		}
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			padding-bottom: 100%;
			background-image: v-bind(game_placeholder);
			background-size: 42%;
			background-position: center;
			background-repeat: no-repeat;
			animation: gamePlaceholder 1.8s linear infinite 0.2s forwards;
		}
	}
	.game-cover {
		height: 0;
		padding-bottom: 100%;
		overflow: hidden;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: transparent;
		position: relative;
		&::before {
		}
	}
	.game-bonus {
		position: absolute;
		right: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0 0 0 12px;
		width: 28px;
		height: 26px;
		color: #fff500;
	}
	.game-info {
		padding: 9px 8px;
		border-bottom-left-radius: $border-game-radius;
		border-bottom-right-radius: $border-game-radius;
		overflow: hidden;
		.game-name {
			margin-bottom: 4px;
			font-size: 12px;
			font-weight: 700;
			color: $text-base;
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			// line-height: 1.2;
		}
		.game-provider {
			font-size: 12px;
			font-weight: 500;
			color: $text-lowlight;
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			// line-height: 1.2;
		}
	}
	.game-component {
		cursor: pointer;
		&.game-mask-parent {
			transition: all 0.3s;
			&:hover {
				// background-size: 115% 115%;
				.game-mask {
					-webkit-backdrop-filter: blur(1.5px);
					backdrop-filter: blur(1.5px);
					-webkit-backdrop-filter: blur(1.5px);
					background-color: #242424b3;
					opacity: 1;
				}
			}

			cursor: #{v-bind(game_cursor)}, pointer !important;

			.game-mask {
				transition: all 0.2s;
				opacity: 0;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				display: flex;
				align-items: flex-end;
				justify-content: center;
				padding-bottom: 10px;
				z-index: 1;
				.game-mask-content {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					height: 150px;

					.game-comp-star {
						position: absolute;
						right: 0;
						top: 0;
						background-color: transparent;
						&::before {
							color: $text-lowlight;
						}
						&.active::before {
							color: $main;
						}
					}
					transition: all 0.3s;
					.game-play {
						flex-shrink: 0;
						width: 50.42px;
						height: 50.42px;
						border-radius: 50%;
						// border: 3px solid rgba(255, 255, 255, 0.15);
						background: $home-second;
						display: flex;
						align-items: center;
						justify-content: center;

						.game-enter {
							color: #fff;
							font-size: 16px;
							margin-left: 2px;
							margin-top: 2px;
						}
					}
					.game-demo {
						color: $color-white;
						height: 24px;
						padding: 0 14px;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 100px;
						flex-shrink: 0;
						font-weight: 500;
						min-width: unset;
						font-size: 12px;
						background: rgba(255, 255, 255, 0.45);
					}
					.help {
						width: 18px;
						height: 18px;
						position: absolute;
						right: 7px;
						bottom: 7px;
						cursor: pointer;
						.content {
							width: 260px;
							background-color: $block-bg-2;
							position: absolute;
							bottom: 20px;
							display: flex;
							flex-direction: column;
							right: 0;
							visibility: hidden;
						}
						&:hover {
							& > .content {
								visibility: visible;
							}
						}
					}
				}
			}
			&.float-up {
				&:hover {
					transform: translateY(-18px);
					z-index: 1;
					position: relative;
				}
				.game-mask {
					border-top: 3px solid rgba(255, 255, 255, 0.15);
					border-top-left-radius: $border-game-radius;
					border-top-right-radius: $border-game-radius;
				}
			}
		}
	}

	@keyframes gamePlaceholder {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
