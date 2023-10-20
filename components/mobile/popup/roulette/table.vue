<template>
	<div class="flex justify-center roulette-wrap mb-[48px] relative">
		<BaseIcon name="question" class="absolute right-[0] px-[16px] py-[20px] top-[0] text-[20px] z-[1]" @click="rouletteStore.openRule()" />
		<div class="w-full h-[450px] mt-[40px] relative z-[2]">
			<div class="relative w-full z-[2] wheel-top px-[32px]">
				<div
					v-for="(temp, count) in rouletteStore.currentRouletteCfg.list"
					v-show="rouletteStore.isActive(count)"
					:key="temp"
					class="w-[264px] h-[264px] absolute top-[38px] m-auto left-0 right-0"
				>
					<div :style="rouletteStore.transform(count)" class="relative w-[264px] h-[264px]">
						<BaseImg
							class="w-[264px] absolute left-0 top-0"
							:src="getResConfigImage(temp.fixed + '_chassis', ImageKeyEnum.roulette)"
							alt=""
						/>
						<div
							v-for="(item, index) in temp.items"
							:key="index"
							class="absolute w-full z-[4] top-[115px] left-[1px] h-[33px] px-[10px] white"
							:style="{ transform: `rotate(${30 * index + 15}deg)` }"
						>
							<MobilePopupRouletteTableItem :item="item" />
						</div>
					</div>
				</div>

				<div class="w-full h-[352px] relative -top-[10px] z-[2]">
					<BaseImg
						v-for="(item, index) in rouletteStore.currentRouletteCfg.list"
						v-show="rouletteStore.isActive(index)"
						:key="item"
						class="roulette-table-frame"
						:src="getResConfigImage(item.fixed + '_frame', ImageKeyEnum.roulette)"
						alt=""
					/>

					<!-- <BaseImg
						v-show="rouletteStore.isActive(2)"
						class="w-[400px] h-[400px] absolute inset-0 m-auto -top-[50px] -left-[20px]"
						:src="getResConfigImage('weekly_light', ImageKeyEnum.roulette)"
						alt=""
					/> -->
					<Vue3Lottie
						v-show="rouletteStore.isEnd"
						ref="animationRef2"
						class="absolute top-[30px] -left-[2px] right-0 m-auto -z-[1]"
						:animation-link="getResConfigImage('point_json', ImageKeyEnum.roulette)"
						:assets-path="getResConfigImage('point_path', ImageKeyEnum.roulette)"
						:height="163.2"
						:width="178.5"
						:loop="true"
						:auto-play="false"
						@on-animation-loaded="rouletteStore.animationCreate2"
					/>

					<div
						class="absolute z-[2] inset-0 m-auto left-0"
						:class="[
							{
								'pointer-events-none': userStore.isLogin && rouletteStore.details.ticket_count < 1,
								[`w-[90px] h-[106.5px] top-[10px]`]: rouletteStore.isActive(2),
								[`w-[80px] h-[99.5px] top-[15px]`]: !rouletteStore.isActive(2),
							},
						]"
						@click="rouletteStore.rouletteButtonHandler()"
					>
						<div
							class="h-[16px] flex items-center justify-center text-[12px] text-center font-bold absolute left-0 right-0 m-auto bottom-[30px]"
						>
							<BaseImg class="h-[52px] -translate-y-[12px]" :src="getResConfigImage('start', ImageKeyEnum.roulette)" alt="" />
							<div v-if="userStore.isLogin && rouletteStore.details.ticket_count < 1" class="roulette-diabled-click">
								<div>
									<div class="mb-[3px]">{{ $t('RO0017') }}</div>
									<p>{{ rouletteStore.leftTime }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<BaseImg
				:src="getResConfigImage('back', ImageKeyEnum.roulette)"
				alt=""
				class="absolute w-[340px] h-[340px] left-0 right-0 m-auto top-0 -z-[1]"
			/>
			<BaseImg
				:src="getResConfigImage('back_out', ImageKeyEnum.roulette)"
				alt=""
				class="absolute w-[340px] h-[340px] left-0 right-0 m-auto top-[0] -z-[1]"
			/>
			<div class="absolute w-[340px] h-[340px] left-0 right-0 m-auto top-[0] z-0 rounded-full overflow-hidden roulette-out">
				<BaseImg :src="getResConfigImage('line_1', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[340px] h-[340px]" />
				<BaseImg :src="getResConfigImage('line_2', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[340px] h-[340px]" />
				<BaseImg :src="getResConfigImage('line_3', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[340px] h-[340px]" />
			</div>
			<div class="absolute w-[340px] h-[340px] left-0 right-0 m-auto top-[0] z-0 rounded-full overflow-hidden roulette-out-revese">
				<BaseImg :src="getResConfigImage('line_1', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[340px] h-[340px]" />
				<BaseImg :src="getResConfigImage('line_2', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[340px] h-[340px]" />
				<BaseImg :src="getResConfigImage('line_3', ImageKeyEnum.roulette)" alt="" class="absolute left-0 top-0 w-[340px] h-[340px]" />
			</div>
			<BaseImg
				class="w-[220px] relative -top-[140px] inset-x-0 mx-auto spotlight-animation z-[1]"
				:src="getResConfigImage('base_tray', ImageKeyEnum.roulette)"
				alt=""
			/>
			<BaseImg :src="getResConfigImage('shelf', ImageKeyEnum.roulette)" alt="" class="absolute top-[292px] -z-[1]" />
			<BaseImg class="w-[264px] absolute top-[280px] inset-x-0 mx-auto" :src="getResConfigImage('base', ImageKeyEnum.roulette)" alt="" />
			<div
				class="w-[147.84px] h-[57.75px] z-[2] absolute top-[327px] inset-x-0 mx-auto wheel-bottom-tip flex flex-col justify-center items-center"
				:style="{ backgroundImage: `url(${getResConfigImage('shelf_btn', ImageKeyEnum.roulette)})` }"
			>
				<div class="w-full inset-0 m-auto flex flex-col items-end justify-center">
					<p class="w-full flex items-center justify-center font-bold text-[13px] color-text-white">
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
			<MobilePopupRouletteSwiper />
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
<style class lang="scss">
	.roulette-table-frame {
		width: 310px;
		height: 352px;
		position: absolute;
		top: -15px;
		right: 0;
		left: 0;
		margin: auto;
	}

	.roulette-table-tips {
		color: $main;
		@apply w-full font-bold text-[18px] text-center leading-[1.1];
	}
	.roulette-diabled-click {
		position: absolute;
		height: 200px;
		top: -105px;
		z-index: 60;
		display: flex;
		align-items: center;
		width: 100vw;

		& > div {
			background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0.11%, rgba(0, 0, 0, 0.9) 34.81%, rgba(0, 0, 0, 0.9) 64.33%, rgba(0, 0, 0, 0) 99.54%);
			width: 100%;
			height: 80px;
			color: $color-white;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			font-size: 12px;
			left: calc(40px - 50vw);
			p {
				font-size: 22px;
				font-weight: bold;
			}
		}
	}
</style>
