<template>
	<em class="text-number" v-html="text" />
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		//是否已经换算过
		isConverted: {
			type: Boolean,
			default: true,
		},
		//是否金额，if false, isConverted = true
		isPoint: {
			type: Boolean,
			default: true,
		},
		//金额数值
		value: {
			type: [Number, String],
			default: 0,
		},
		//格式化精度
		precision: {
			type: Number,
			default: 0,
		},
		//是否删除小数末尾的0
		bDeleteZeroPoint: {
			type: Boolean,
			default: false,
		},
		decimalNonEmphasis: {
			type: Boolean,
			default: false,
		},
		prev: {
			type: String,
			default: '',
		},
		next: {
			type: String,
			default: '',
		},
	})
	const text = computed(() => {
		let value: String = propsConf.isPoint
			? useNuxtApp().$fp(
					propsConf.isConverted ? propsConf.value : useNuxtApp().$cp(propsConf.value),
					propsConf.precision,
					propsConf.bDeleteZeroPoint
			  )
			: useNuxtApp().$fp(propsConf.value, propsConf.precision, propsConf.bDeleteZeroPoint)
		let result = value
		if (propsConf.decimalNonEmphasis && !propsConf.bDeleteZeroPoint) {
			value.replace(/[^0-9]{1,}[0-9]+$/gi, (text: string, index: number) => {
				result = value.substring(0, index + 1) + `<em class='placeholder-color'>${text.substring(1, text.length)}</em>`
				return value
			})
		}
		return propsConf.prev + result + propsConf.next
	})
</script>
