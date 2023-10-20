<template>
	<Component :is="headerComponent" v-if="isDesktop" />
	<Component
		:is="headerComponent"
		v-else
		:is-home="isHome"
		:title="title"
		:show-back="showBack"
		:back="back"
		:show-close="showClose"
		@close="emits('close')"
	/>
</template>
<script setup lang="ts">
	import HallLog from '~~/apis/debug/HallLog'
	const app = useNuxtApp() as any
	const isDesktop = app.$device.isDesktop
	const model = useAppModel().value
	const headerComponent = defineAsyncComponent({
		loader: () => {
			//识别路径是否有文件夹，单纯的字符串文件路径不会识别编译到文件路径，会被识别为文件名
			if (isDesktop) {
				return import(`@/components/desktop/model/${model}/header.vue`)
			}
			return import(`@/components/mobile/model/${model}/header.vue`)
		},
		delay: 100,
		timeout: 10000,
		suspensible: false,
		onError: (err, retry, error, attempts) => {
			error()
			HallLog.error('err:', err, 'retry', retry, 'error', error, 'attempts', attempts)
			HallLog.error('lazy component: header is load failed!')
		},
	})
	const propsConf = defineProps({
		isHome: {
			type: Boolean,
			default: true,
		},
		title: {
			type: String,
			default: '',
		},
		showBack: {
			type: Boolean,
			default: true,
		},
		back: {
			type: Function,
			default: null,
		},
		showClose: {
			type: Boolean,
			default: false,
		},
	})
	const emits = defineEmits(['close'])
</script>
