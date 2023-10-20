<template>
	<div>
		<div class="relative">
			<BaseImg :src="getResConfigImage('temp_mobile', 'temp-0')" class="w-full" alt="temp" />

			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 70 + 'px',
					height: tempStore.scaleRate * 70 + 'px',
					top: tempStore.scaleRate * 1238 + 'px',
					left: tempStore.scaleRate * 44 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_1', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[0], true, false)
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 70 + 'px',
					height: tempStore.scaleRate * 70 + 'px',
					top: tempStore.scaleRate * 1238 + 'px',
					left: tempStore.scaleRate * 116 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_2', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[1], true, false)
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 70 + 'px',
					height: tempStore.scaleRate * 70 + 'px',
					top: tempStore.scaleRate * 1238 + 'px',
					left: tempStore.scaleRate * 188 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_3', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[2], true, false)
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 70 + 'px',
					height: tempStore.scaleRate * 70 + 'px',
					top: tempStore.scaleRate * 1238 + 'px',
					left: tempStore.scaleRate * 260 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_4', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[3], true, false)
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 70 + 'px',
					height: tempStore.scaleRate * 70 + 'px',
					top: tempStore.scaleRate * 1312 + 'px',
					left: tempStore.scaleRate * 44 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_5', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[4], true, false)
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 70 + 'px',
					height: tempStore.scaleRate * 70 + 'px',
					top: tempStore.scaleRate * 1312 + 'px',
					left: tempStore.scaleRate * 116 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_6', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[5], true, false)
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 70 + 'px',
					height: tempStore.scaleRate * 70 + 'px',
					top: tempStore.scaleRate * 1312 + 'px',
					left: tempStore.scaleRate * 188 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_7', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[6], true, false)
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 70 + 'px',
					height: tempStore.scaleRate * 70 + 'px',
					top: tempStore.scaleRate * 1312 + 'px',
					left: tempStore.scaleRate * 260 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_8', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[7], true, false)
					}
				"
			/>

			<!-- =============分割线============== -->

			<div
				class="temp-btn-item absolute"
				:style="{
					width: '100%',
					height: tempStore.scaleRate * 50 + 'px',
					top: tempStore.scaleRate * 1830 + 'px',
					left: tempStore.scaleRate * 0 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_11', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[0], true, false)
					}
				"
			/>

			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 160 + 'px',
					height: tempStore.scaleRate * 30 + 'px',
					top: tempStore.scaleRate * 2042 + 'px',
					left: tempStore.scaleRate * 167 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-0_click_12', sendType: 1 })
						gameStore.tryToGame(tempStore.gameList[0], true, false)
					}
				"
			/>

			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 100 + 'px',
					height: tempStore.scaleRate * 30 + 'px',
					top: tempStore.scaleRate * 2438 + 'px',
					left: tempStore.scaleRate * 180 + 'px',
				}"
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
