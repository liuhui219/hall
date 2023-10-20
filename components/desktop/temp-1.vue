<template>
	<div class="relative flex justify-center items-center">
		<div class="relative min-w-[1280px] max-w-[1280px]">
			<BaseImg :src="getResConfigImage('temp_pc', 'temp-1')" class="w-full" alt="temp" />

			<div
				class="pointer temp-btn-item absolute w-[200px] h-[60px] top-[605px] left-[35px]"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_1', sendType: 1 })
						openPopup(PopupEnum.inviteChest)
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[200px] h-[60px] top-[605px] left-[678px]"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_2', sendType: 1 })
						openPopup(PopupEnum.deposit)
					}
				"
			/>

			<div
				class="pointer temp-btn-item absolute w-[176px] h-[50px] top-[1218px] left-[88px]"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_3', sendType: 1 })
						navigateTo('/task')
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[176px] h-[50px] top-[1218px] left-[398px]"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_4', sendType: 1 })
						pageConfigClick(1, resConfig['telegram-group'])
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[176px] h-[50px] top-[1218px] left-[708px]"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_5', sendType: 1 })
						pageConfigClick(1, resConfig['telegram-group'])
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[176px] h-[50px] top-[1218px] left-[1018px]"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_6', sendType: 1 })
						openPopup(PopupEnum.deposit)
					}
				"
			/>

			<div
				class="pointer temp-btn-item absolute w-[300px] h-[50px] top-[1530px] left-[302px]"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_7', sendType: 1 })
						openPopup(PopupEnum.account)
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[140px] h-[50px] top-[1526px] left-[954px]"
				@click="
					() => {
						googleEvent({ event: 'temp-1_click_8', sendType: 1 })
						promotionStore.openDetail('650b06bbed3a1bcade4467c1')
					}
				"
			/>
			<div
				class="pointer temp-btn-item absolute w-[140px] h-[50px] top-[1526px] left-[1100px]"
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
