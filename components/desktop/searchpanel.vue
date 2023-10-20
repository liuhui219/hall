<template>
	<Component :is="searchpanel" :text="text" :list="list" />
</template>
<script setup lang="ts">
	import HallLog from '~~/apis/debug/HallLog'
	import LoadingComonent from '~~/components/base/loading.vue'
	import ErrorComponent from '~~/components/mobile/app/error.vue'
	const searchpanel = defineAsyncComponent({
		loader: () => {
			const model = useAppModel().value
			//识别路径是否有文件夹，单纯的字符串文件路径不会识别编译到文件路径，会被识别为文件名
			return import(`@/components/desktop/model/${model}/home/searchpanel.vue`)
		},
		errorComponent: ErrorComponent,
		loadingComponent: LoadingComonent,
		delay: 100,
		timeout: 10000,
		suspensible: false,
		onError: (err, retry, error, attempts) => {
			error()
			HallLog.error('err:', err, 'retry', retry, 'error', error, 'attempts', attempts)
			HallLog.error('lazy component: searchpanel is load failed!')
		},
	})
	const propsConf = defineProps({
		text: {
			type: String,
			default: '',
		},
		list: {
			type: Array,
			default: () => [],
		},
	})
</script>
