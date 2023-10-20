<template>
	<Component :is="homeGame" :info="info" />
</template>
<script setup lang="ts">
	import HallLog from '~~/apis/debug/HallLog'
	import LoadingComonent from '~~/components/base/loading.vue'
	import ErrorComponent from '~~/components/mobile/app/error.vue'
	const model = useAppModel().value
	const app = useNuxtApp() as any
	const deviceType = app.$device.isDesktop ? 'desktop' : 'mobile'
	const homeGame = defineAsyncComponent({
		loader: () => {
			//识别路径是否有文件夹，单纯的字符串文件路径不会识别编译到文件路径，会被识别为文件名
			if (!propsConf.info.type || app.$device.isDesktop) {
				return import(`@/components/${deviceType}/model/${model}/home/game/horizontal.vue`)
			}
			return import(`@/components/${deviceType}/model/${model}/home/game/vertical.vue`)
		},
		delay: 100,
		timeout: 10000,
		suspensible: false,
		onError: (err, retry, error, attempts) => {
			error()
			HallLog.error('err:', err, 'retry', retry, 'error', error, 'attempts', attempts)
			HallLog.error('lazy component: gameModule is load failed!')
		},
	})
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({ list: [] }),
		},
	})
</script>
