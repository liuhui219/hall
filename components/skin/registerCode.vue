<template>
	<Component :is="registerComponent" />
</template>
<script setup lang="ts">
	import HallLog from '~~/apis/debug/HallLog'
	const app = useNuxtApp() as any
	const isDesktop = app.$device.isDesktop
	const model = useAppModel().value
	const registerComponent = defineAsyncComponent({
		loader: () => {
			//识别路径是否有文件夹，单纯的字符串文件路径不会识别编译到文件路径，会被识别为文件名
			if (isDesktop) {
				return import(`@/components/desktop/model/${model}/registerCode.vue`)
			}
			return import(`@/components/mobile/model/${model}/registerCode.vue`)
		},
		delay: 100,
		timeout: 10000,
		suspensible: false,
		onError: (err, retry, error, attempts) => {
			error()
			HallLog.error('err:', err, 'retry', retry, 'error', error, 'attempts', attempts)
			HallLog.error('lazy component: registerCode is load failed!')
		},
	})
</script>
