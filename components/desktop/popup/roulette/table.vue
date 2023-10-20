<template>
	<div class="flex justify-center roulette-wrap" :style="{ backgroundImage: `url(${getResConfigImage('shelf_pc', ImageKeyEnum.roulette)})` }">
		<BaseIcon
			name="question"
			class="absolute right-[90px] px-[16px] py-[20px] top-[0] text-[20px] z-[3] pointer"
			@click="rouletteStore.openRule()"
		/>
		<div class="w-full h-full relative z-[2]">
			<div class="relative w-full z-[2] wheel-top px-[32px]">
				<div
					v-for="(temp, count) in rouletteStore.currentRouletteCfg.list"
					v-show="rouletteStore.isActive(count)"
					:key="temp.key"
					class="w-[360px] h-[360px] absolute top-[75px] m-auto left-0 right-0"
				>
					<div :style="rouletteStore.transform(count)" class="relative w-[360px] h-[360px]">
						<BaseImg
							class="w-[380px] absolute left-0 top-0"
							:src="getResConfigImage(temp.fixed + '_chassis', ImageKeyEnum.roulette)"
							alt=""
						/>
						<div
							v-for="(item, index) in temp.items"
							:key="index"
							class="absolute w-full z-[4] top-[170px] left-[2px] h-[20px] px-[20px] white"
							:style="{ transform: `rotate(${30 * index + 15}deg)` }"
						>
							<DesktopPopupRouletteTableItem :item="item" />
						</div>
					</div>
				</div>

				<div class="w-full h-[478px] relative -top-[10px] z-[2]">
					<BaseImg
						v-for="(item, index) in rouletteStore.currentRouletteCfg.list"
						v-show="rouletteStore.rouletteIndexActive == index"
						:key="index"
						class="w-[421px] h-[478px] absolute inset-0 m-auto"
						:src="getResConfigImage(item.fixed + '_frame', ImageKeyEnum.roulette)"
						alt=""
					/>

					<BaseImg
						v-show="rouletteStore.rouletteIndexActive == 2"
						class="w-[470px] h-[470px] absolute inset-0 m-auto top-[8px]"
						:src="getResConfigImage('weekly_light', ImageKeyEnum.roulette)"
						alt=""
					/>
					<Vue3Lottie
						v-show="rouletteStore.isEnd"
						ref="animationRef2"
						class="absolute top-[60px] -left-[1px] right-0 m-auto -z-[1]"
						:animation-link="getResConfigImage('point_json', ImageKeyEnum.roulette)"
						:assets-path="getResConfigImage('point_path', ImageKeyEnum.roulette)"
						:height="206"
						:width="280.28"
						:loop="true"
						:auto-play="false"
						@on-animation-loaded="rouletteStore.animationCreate2"
					/>

					<div
						class="absolute z-[2] inset-0 m-auto left-0 w-[99px] h-[95px] top-[0px] cursor-pointer"
						:class="{ 'pointer-events-none': userStore.isLogin && rouletteStore.details.ticket_count < 1 }"
						@click="rouletteStore.rouletteButtonHandler()"
					>
						<BaseImg
							class="h-[70px] absolute left-0 right-0 m-auto -bottom-[18px]"
							:src="getResConfigImage('start', ImageKeyEnum.roulette)"
							alt=""
						/>
						<div v-show="userStore.isLogin && rouletteStore.details.ticket_count < 1" class="roulette-diabled-click">
							<div>
								<div class="mb-[3px]">{{ $t('RO0017') }}</div>
								<p>{{ rouletteStore.leftTime }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<BaseImg
				:src="getResConfigImage('back', ImageKeyEnum.roulette)"
				alt=""
				class="absolute w-[500px] h-[500px] left-0 right-0 m-auto top-[0px] -z-[1]"
			/>
			<BaseImg
				:src="getResConfigImage('back_out', ImageKeyEnum.roulette)"
				alt=""
				class="absolute w-[500px] h-[500px] left-0 right-0 m-auto top-[0px] -z-[1]"
			/>
			<div class="absolute w-[500px] h-[500px] left-0 right-0 m-auto top-[0px] z-0 rounded-full overflow-hidden roulette-out">
				<BaseImg :src="getResConfigImage('line_1', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[500px] h-[500px]" />
				<BaseImg :src="getResConfigImage('line_2', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[500px] h-[500px]" />
				<BaseImg :src="getResConfigImage('line_3', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[500px] h-[500px]" />
			</div>
			<div class="absolute w-[500px] h-[500px] left-0 right-0 m-auto top-[0px] z-0 rounded-full overflow-hidden roulette-out-revese">
				<BaseImg :src="getResConfigImage('line_1', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[500px] h-[500px]" />
				<BaseImg :src="getResConfigImage('line_2', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[500px] h-[500px]" />
				<BaseImg :src="getResConfigImage('line_3', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[500px] h-[500px]" />
			</div>
			<BaseImg
				class="w-[330px] absolute z-[2] top-[315px] inset-x-0 mx-auto spotlight-animation"
				:src="getResConfigImage('base_tray', ImageKeyEnum.roulette)"
				alt=""
			/>

			<BaseImg class="w-[360px] absolute z-[2] top-[420px] inset-x-0 mx-auto" :src="getResConfigImage('base', ImageKeyEnum.roulette)" alt="" />

			<div
				class="w-[192px] h-[75px] absolute z-[3] top-[440] inset-x-0 mx-auto wheel-bottom-tip flex flex-col justify-center items-center"
				:style="{
					'background-image': `url(${getResConfigImage('shelf_btn', ImageKeyEnum.roulette)})`,
				}"
			>
				<div class="w-full inset-0 m-auto flex flex-col items-end justify-center">
					<p class="w-full flex items-center justify-center text-[16px] color-text-white">
						{{ $t(rouletteStore.currentRouletteCfg.list[rouletteStore.rouletteIndexActive]?.title) }}
					</p>
					<div
						class="roulette-table-tips"
						v-html="
							$t('RO0015', {
								bonus: configStore.renderVHtmlNumber(
									configStore.currency_symbol +
										' ' +
										$fp($cp(rouletteStore.currentRouletteCfg.list[rouletteStore.rouletteIndexActive]?.max_point), 2, true)
								),
							})
						"
					/>
				</div>
			</div>
			<DesktopPopupRouletteSwiper />
		</div>
	</div>
</template>
<script setup lang="ts">
	import { Vue3Lottie } from 'vue3-lottie'
	import 'vue3-lottie/dist/style.css'
	const configStore = useSysConfigStore()
	const rouletteStore = useRouletteStore()
	const userStore = useUserStore()
	const animationRef2 = ref()
	onMounted(() => rouletteStore.tableMounted(animationRef2))
</script>
<style scoped lang="scss">
	.roulette-wrap {
		background-repeat: no-repeat;
		background-position-y: 420px;
		background-size: contain;
		height: 749px;
		padding-top: 30px;
		position: relative;
	}
	.roulette-table-tips {
		color: $main;
		@apply w-full font-bold text-[24px] text-center leading-[1.1];
	}
	.roulette-diabled-click {
		position: absolute;
		height: 200px;
		top: -24px;
		width: 420px;
		z-index: 60;
		display: flex;
		align-items: center;
		left: -160px;

		& > div {
			background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0.11%, rgba(0, 0, 0, 0.8) 34.81%, rgba(0, 0, 0, 0.8) 64.33%, rgba(0, 0, 0, 0) 99.54%);
			width: 500px;
			height: 80px;
			color: $color-white;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			font-size: 12px;
			left: 120px;
			p {
				font-size: 22px;
				font-weight: bold;
			}
		}
	}
</style>
