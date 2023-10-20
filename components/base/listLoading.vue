<template>
	<div class="list-load-container flex justify-center gray">
		<span v-if="loadingStatus == 4" class="list-loading-content" />
		<span v-if="loadingStatus == 2">loaded</span>
		<span v-if="loadingStatus == 1 || loadingStatus === true">{{ $t('AF0035') }}</span>
		<button v-if="loadingStatus == 3" class="sys-btn btn-highlight btn-deposit cursor" @click="loadData()">retry</button>
	</div>
</template>
<script setup lang="ts">
	import { useInfiniteScroll } from '@vueuse/core'

	const propsConf = defineProps({
		targetId: {
			type: String,
			default: '',
		},
		duration: {
			type: Number,
			default: 500,
		},
		loading: {
			type: [Number, Boolean],
			default: 0,
		},
	})
	const emits = defineEmits(['load', 'update:loading'])
	watchEffect(() => {
		let target = document.getElementById('#' + propsConf.targetId)
		if (propsConf.targetId && target) {
			useInfiniteScroll(target || document.body, loadData, { distance: 10 })
		} else {
		}
	})
	//0无状态 1加载完成无数据 2加载完成还有数据 3加载失败 4加载中
	const loadingStatus = computed({
		get: () => propsConf.loading,
		set: (val) => {
			emits('update:loading', val)
		},
	})
	let timer: any = 0

	//value: true 没有数据了 false 还有数据
	const loadData = () => {
		if (timer) {
			return
		}
		if (loadingStatus.value != 0) {
			return
		}
		loadingStatus.value = 4
		emits('load', { complete, error })
	}
	const complete = (value: Boolean) => {
		if (value) {
			loadingStatus.value = 1
		} else {
			loadingStatus.value = 2
			timer = setTimeout(() => {
				loadingStatus.value = 0
				timer = null
			}, propsConf.duration)
		}
	}
	const error = () => {
		loadingStatus.value = 3
	}
</script>
