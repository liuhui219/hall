<template>
	<img :src="imgSrc" :alt="alt" @error="renderError" @load="renderImage" @click="handleClick" />
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	const propsConf = defineProps({
		src: {
			type: String,
			default: '',
		},
		alt: {
			type: String,
			default: '',
		},
	})
	const emits = defineEmits(['click'])
	const configStore = useSysConfigStore()
	const handleClick = () => {
		emits('click')
	}
	const renderError = (event: Event) => {
		;(event.target as HTMLElement).setAttribute('lazy', 'error')
		;(event.target as HTMLElement).setAttribute(
			'src',
			'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='
		)
	}
	const renderImage = (event: Event) => {
		;(event.target as HTMLElement).setAttribute('lazy', '')
	}
	const imgSrc = computed(() => {
		if (propsConf.src == resConfig['root-url'] || propsConf.src == '') {
			return ''
		}
		let src = ''
		if (typeof propsConf.src == 'string') {
			const configStore = useSysConfigStore()
			let reqParam = configStore.pageConfig?.techConfig?.img_param

			if (propsConf.src.startsWith('data:')) {
				//base64
				reqParam = ''
				src = propsConf.src
			} else if (propsConf.src.startsWith('http') || propsConf.src.startsWith('/')) {
				//全路径
				src = propsConf.src
			} else {
				//配置路径
				src = resConfig['root-url'] + propsConf.src
			}
			src = Helper.urlAddParam(src, reqParam)
		} else {
			//import的图片
			src = propsConf.src
		}
		return src
	})
</script>
