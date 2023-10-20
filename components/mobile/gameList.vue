<template>
	<div class="scroll-load-game-list">
		<div class="game-items-wrap-mobile">
			<BaseGameComponent
				v-for="game in gameListData"
				:key="'casino-load-game-' + game.id"
				class="game-item"
				:game="game"
				:show-detail="configStore.modelConfig.game_detail"
			/>
		</div>
		<div v-if="!showAll" class="mt-[32px] text-center text-[16px] font-medium">
			<!-- <p v-if="showTip" class="text-lowlight" v-html="showGameNumtext" />
			<p v-if="gameListData.length < gameList.length" class="mt-[24px] text-second" @click="showMore()">
				<span>{{ $t('G0007') }}</span>
				<br />
				<BaseArrowDown />
			</p> -->
			<p v-if="showTip" class="text-lowlight" v-html="showGameNumtext" />
			<div v-if="gameListData.length < gameList.length" class="mt-[24px] flex justify-center">
				<button class="sys-btn game-load-more w-[300px]" @click="showMore()">{{ $t('G0007') }}</button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()

	const propsConf = defineProps({
		gameList: {
			type: Array,
			default: (): any[] => {
				return []
			},
		},
		showTip: {
			type: Boolean,
			default: true,
		},
		showAll: {
			type: Boolean,
			default: false,
		},
		num: {
			type: Number,
			default: 0,
		},
	})
	const clickNum = Math.max(propsConf.num, configStore.pageConfig.sysConfig.mobile_game_num)
	const showGameNum = ref(propsConf.num || clickNum)
	const gameListData = computed((): any[] => {
		if (propsConf.showAll) {
			return propsConf.gameList
		}

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
		const { $t } = useNuxtApp() as any
		return $t('G0005', {
			show_num: `<span class="color-text">${gameListData.value.length}</span>`,
			all_num: `<span class="color-text">${propsConf.gameList.length}</span>`,
		})
	})
</script>
