<template>
	<div class="scroll-load-game-list">
		<div class="mt-[48px] game-items-wrap-pc">
			<BaseGameComponent
				v-for="game in gameListData"
				:key="'casino-game-' + game.id"
				:show-mask="true"
				:show-detail="configStore.modelConfig.game_detail"
				:game="game"
				class="w-[192px] game-item"
			/>
		</div>
		<div class="mt-[48px] text-center text-[16px] font-medium">
			<p v-if="showTip" class="text-lowlight" v-html="showGameNumtext" />
			<div v-if="gameListData.length < gameList.length" class="mt-[24px] flex justify-center">
				<button class="sys-btn game-load-more w-[300px]" @click="showMore()">{{ $t('G0007') }}</button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		gameList: {
			type: Array,
			default: () => [],
		},
		showTip: {
			type: Boolean,
			default: true,
		},
		num: {
			type: Number,
			default: 0,
		},
	})

	const configStore = useSysConfigStore()
	const clickNum = Math.max(propsConf.num, configStore.pageConfig.sysConfig.pc_game_num)
	const showGameNum = ref(propsConf.num || clickNum)
	const gameListData = computed((): Array<any> => {
		if (propsConf.gameList.length > showGameNum.value) {
			return propsConf.gameList.slice(0, showGameNum.value)
		} else {
			return propsConf.gameList
		}
	})

	const showMore = () => {
		showGameNum.value += clickNum
	}
	const showGameNumtext = computed(() => {
		const app = useNuxtApp() as any
		return app.$t('G0005', {
			show_num: `<span class="color-text">${gameListData.value.length}</span>`,
			all_num: `<span class="color-text">${propsConf.gameList.length}</span>`,
		})
	})
</script>
