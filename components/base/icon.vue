<template>
	<i class="icon pointer" :class="{ [`sysicon-${name}`]: true }" :style="iconStyle"><slot /></i>
</template>

<script setup lang="ts">
	const propsConf = defineProps({
		name: {
			type: String,
			default: '',
		},
		padding: {
			type: Number,
			default: 0,
		},
		color: {
			type: String,
			default: '',
		},
		weight: {
			type: String,
			default: '',
		},
		fontSize: {
			type: String,
			default: '',
		},
	})
	const iconStyle = computed(() => {
		let result: any = {}
		if (propsConf.color) {
			result.color = propsConf.color
		}
		if (propsConf.weight) {
			result.fontWeight = propsConf.weight
		}
		if (propsConf.fontSize) {
			result.fontSize = propsConf.fontSize
		}
		return result
	})
</script>
<style lang="scss" scoped>
	// 背景色 字体色 类名
	.icon.main-bg {
		@include icon($bg, $main);
		&.active {
			@include icon($bg, $second);
		}
	}
	.icon.main-bg {
		@include icon($bg, $main);
	}
</style>
