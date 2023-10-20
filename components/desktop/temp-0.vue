<template>
	<div class="relative flex justify-center items-center">
		<div class="relative min-w-[1344px] max-w-[1344px]">
			<BaseImg :src="getResConfigImage('temp_pc', 'temp-0')" class="w-full" alt="temp" />

			<div
				class="pointer temp-btn-item absolute w-[268px] h-[268px] top-[2570px] left-[92px]"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_1', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[0], true, false)
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[268px] h-[268px] top-[2570px] left-[388px]"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_2', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[1], true, false)
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[268px] h-[268px] top-[2570px] left-[684px]"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_3', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[2], true, false)
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[268px] h-[268px] top-[2570px] left-[980px]"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_4', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[3], true, false)
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[268px] h-[268px] top-[2866px] left-[92px]"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_5', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[4], true, false)
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[268px] h-[268px] top-[2866px] left-[388px]"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_6', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[5], true, false)
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[268px] h-[268px] top-[2866px] left-[684px]"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_7', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[6], true, false)
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[268px] h-[268px] top-[2866px] left-[980px]"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_8', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[7], true, false)
					}
				"
			/>

			<!-- =============分割线============== -->

			<div
				class="pointer temp-btn-item absolute w-[300px] h-[60px] top-[1152px] right-[65px]"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_11', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[0], true, false)
					}
				"
			/>

			<div
				class="pointer temp-btn-item absolute w-[300px] h-[60px] top-[3565px] left-[50px]"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_12', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[0], true, false)
					}
				"
			/>

			<div
				class="pointer temp-btn-item absolute w-[200px] h-[40px] top-[1890px] right-[160px]"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_13', sendType: 1 })
						clickLiveChat()
					}
				"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
	const gameStore = useGameStore()
	const tempStore = useTempStore()
</script>

<!-- <style scoped lang="scss">
	.temp-btn-item {
		background: #0000ff88;
	}
</style> -->
