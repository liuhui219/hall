<template>
	<Component :is="homeRecent" :info="info" />
</template>
<script setup lang="ts">
	import HallLog from '~~/apis/debug/HallLog'
	import LoadingComonent from '~~/components/base/loading.vue'
	import ErrorComponent from '~~/components/mobile/app/error.vue'
	defineProps({
		info: {
			type: Object,
			default: () => ({ list: [] }),
		},
	})
	const homeStore = useHomeStore()
	const app = useNuxtApp() as any
	const isDesktop = app.$device.isDesktop
	const model = useAppModel().value
	const homeRecent = defineAsyncComponent({
		loader: () => {
			//识别路径是否有文件夹，单纯的字符串文件路径不会识别编译到文件路径，会被识别为文件名
			if (isDesktop) {
				return import(`@/components/desktop/model/${model}/home/recent.vue`)
			}
			return import(`@/components/mobile/model/${model}/home/recent.vue`)
		},
		delay: 100,
		timeout: 10000,
		suspensible: false,
		onError: (err, retry, error, attempts) => {
			error()
			HallLog.error('err:', err, 'retry', retry, 'error', error, 'attempts', attempts)
			HallLog.error('lazy component: recent is load failed!')
		},
	})
	onMounted(homeStore.recentMounted)
	onActivated(homeStore.recentMounted)
</script>
