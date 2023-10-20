<template>
	<BaseNumber
		:is-point="true"
		:value="value"
		:is-converted="isConverted"
		:precision="precision"
		:decimal-non-emphasis="decimalNonEmphasis"
		:b-delete-zero-point="bDeleteZeroPoint"
		:prev="symbol"
		:next="usdt"
	/>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		value: {
			type: [Number, String],
			default: 0,
		},
		//是否已经换算过
		isConverted: {
			type: Boolean,
			default: false,
		},
		showSymbol: {
			type: Boolean,
			default: true,
		},
		precision: {
			type: Number,
			default: 2,
		},
		showUsdt: {
			type: Boolean,
			default: false,
		},
		bDeleteZeroPoint: {
			type: Boolean,
			default: false,
		},
		decimalNonEmphasis: {
			type: Boolean,
			default: false,
		},
	})
	const configStore = useSysConfigStore()
	const usdt = computed(() => {
		if (propsConf.showUsdt) {
			return ' ' + useNuxtApp().$t('TR0008')
		} else {
			return ''
		}
	})
	const symbol = computed(() => {
		if (propsConf.showSymbol && !propsConf.showUsdt) {
			return configStore.currency_symbol + ' '
		} else {
			return ''
		}
	})
</script>
