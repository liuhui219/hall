<template>
	<Component :is="registerComponent" />
</template>
<script setup lang="ts">
	import HallLog from '~~/apis/debug/HallLog'
	import LoadingComonent from '~~/components/base/loading.vue'
	import ErrorComponent from '~~/components/mobile/app/error.vue'
	const app = useNuxtApp() as any
	const isDesktop = app.$device.isDesktop
	const model = useAppModel().value
	const registerComponent = defineAsyncComponent({
		loader: () => {
			//识别路径是否有文件夹，单纯的字符串文件路径不会识别编译到文件路径，会被识别为文件名
			if (isDesktop) {
				return import(`@/components/desktop/model/${model}/register.vue`)
			}
			return import(`@/components/mobile/model/${model}/register.vue`)
		},
		delay: 100,
		timeout: 10000,
		suspensible: false,
		onError: (err, retry, error, attempts) => {
			error()
			HallLog.error('err:', err, 'retry', retry, 'error', error, 'attempts', attempts)
			HallLog.error('lazy component: register is load failed!')
		},
	})

	const rStore = useRegisterStore()
	watchEffect(rStore.changeVerifyText)
	onMounted(rStore.mounted)
	onUnmounted(rStore.unmounted)
</script>
