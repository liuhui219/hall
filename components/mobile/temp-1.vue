<template>
	<div>
		<div class="relative">
			<BaseImg :src="getResConfigImage('temp_mobile', 'temp-1')" class="w-full" alt="temp" />

			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 160 + 'px',
					height: tempStore.scaleRate * 50 + 'px',
					top: tempStore.scaleRate * 500 + 'px',
					left: tempStore.scaleRate * 20 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_1', sendType: 1 })
						openPopup(PopupEnum.inviteChest)
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 160 + 'px',
					height: tempStore.scaleRate * 50 + 'px',
					top: tempStore.scaleRate * 500 + 'px',
					left: tempStore.scaleRate * 196 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_2', sendType: 1 })
						openPopup(PopupEnum.deposit)
					}
				"
			/>

			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 160 + 'px',
					height: tempStore.scaleRate * 50 + 'px',
					top: tempStore.scaleRate * 800 + 'px',
					left: tempStore.scaleRate * 20 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_3', sendType: 1 })
						navigateTo('/task')
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 160 + 'px',
					height: tempStore.scaleRate * 50 + 'px',
					top: tempStore.scaleRate * 800 + 'px',
					left: tempStore.scaleRate * 196 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_4', sendType: 1 })
						pageConfigClick(1, resConfig['telegram-group'])
					}
				"
			/>

			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 160 + 'px',
					height: tempStore.scaleRate * 50 + 'px',
					top: tempStore.scaleRate * 1026 + 'px',
					left: tempStore.scaleRate * 20 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_5', sendType: 1 })
						pageConfigClick(1, resConfig['telegram-group'])
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 160 + 'px',
					height: tempStore.scaleRate * 50 + 'px',
					top: tempStore.scaleRate * 1026 + 'px',
					left: tempStore.scaleRate * 196 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_6', sendType: 1 })
						openPopup(PopupEnum.deposit)
					}
				"
			/>

			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 160 + 'px',
					height: tempStore.scaleRate * 50 + 'px',
					top: tempStore.scaleRate * 1284 + 'px',
					left: tempStore.scaleRate * 20 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_7', sendType: 1 })
						openPopup(PopupEnum.account)
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 40 + 'px',
					height: tempStore.scaleRate * 40 + 'px',
					top: tempStore.scaleRate * 1106 + 'px',
					left: tempStore.scaleRate * 320 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_8', sendType: 1 })
						promotionStore.openDetail('650b06bbed3a1bcade4467c1')
					}
				"
			/>
			<div
				class="temp-btn-item absolute"
				:style="{
					width: tempStore.scaleRate * 160 + 'px',
					height: tempStore.scaleRate * 50 + 'px',
					top: tempStore.scaleRate * 1284 + 'px',
					left: tempStore.scaleRate * 196 + 'px',
				}"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_9', sendType: 1 })
						navigateTo('/casino?tab=Slots')
					}
				"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
	const tempStore = useTempStore()
	const promotionStore = usePromotionStore()
</script>

<!-- <style scoped lang="scss">
	.temp-game-item {
			background: #00ff0088;
		}
	.temp-btn-item {
		background: #0000ff88;
	}
</style> -->
