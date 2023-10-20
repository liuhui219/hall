<template>
	<span style="text-align: left">{{ displayedAmount }}</span>
</template>

<script lang="ts" setup>
	const propsConf = defineProps({
		startAmount: {
			type: Number,
			default: 0,
		},
		endAmount: {
			type: Number,
			default: 0,
			required: true,
		},
		duration: {
			type: Number,
			default: 3,
			validator(duration: number): boolean {
				return duration >= 1
			},
		},
		autoinit: {
			type: Boolean,
			default: true,
		},
		prefix: {
			type: String,
			default: '',
		},
		suffix: {
			type: String,
			default: '',
		},
		separator: {
			type: String,
			default: ',',
		},
		decimalSeparator: {
			type: String,
			default: '.',
		},
		decimals: {
			type: Number,
			default: 0,
			validator(decimals: number): boolean {
				return decimals >= 0
			},
		},
	})
	const emits = defineEmits(['mounted', 'finished'])
	const timestamp = ref(0)
	const startTimestamp = ref(0)
	const currentAmount = ref(0)
	const currentStartAmount = ref(0)
	const currentDuration = ref(0)
	const paused = ref(false)
	const remaining = ref(0)
	const animationFrame = ref(0)
	const displayedAmount = computed((): string => {
		let numberString = currentAmount.value.toFixed(propsConf.decimals)
		let numberArray: Array<string> = numberString.split('.')
		let numbers: string = numberArray[0]
		let decimals: string = numberArray.length > 1 ? propsConf.decimalSeparator + numberArray[1] : ''
		let isNumber = !isNaN(parseFloat(propsConf.separator))
		if (propsConf.separator && !isNumber) {
			const regex = /(\d+)(\d{3})/
			while (regex.test(numbers)) numbers = numbers.replace(regex, '$1' + propsConf.separator + '$2')
		}

		return numbers + decimals
	})
	const isCountingUp = computed((): boolean => {
		return propsConf.endAmount > propsConf.startAmount
	})

	onMounted(() => {
		currentAmount.value = propsConf.startAmount
		currentStartAmount.value = propsConf.startAmount
		currentDuration.value = propsConf.duration * 1000
		remaining.value = propsConf.duration * 1000
		if (propsConf.autoinit && currentAmount.value != propsConf.endAmount) {
			start()
		} else {
			paused.value = true
		}
		emits('mounted')
	})
	const start = (): void => {
		cancelAnimation()
		currentStartAmount.value = propsConf.startAmount
		startTimestamp.value = 0
		currentDuration.value = propsConf.duration * 1000
		paused.value = false
		animationFrame.value = window.requestAnimationFrame(counting)
	}
	const cancelAnimation = (): void => {
		if (animationFrame.value) window.cancelAnimationFrame(animationFrame.value)
	}
	const counting = (time: number): void => {
		timestamp.value = time
		if (!startTimestamp.value) startTimestamp.value = time
		let progress: number = time - startTimestamp.value
		remaining.value = currentDuration.value - progress

		if (!isCountingUp.value) {
			currentAmount.value = currentStartAmount.value - (currentStartAmount.value - propsConf.endAmount) * (progress / currentDuration.value)
			currentAmount.value = currentAmount.value < propsConf.endAmount ? propsConf.endAmount : currentAmount.value
		} else {
			currentAmount.value = currentStartAmount.value + (propsConf.endAmount - currentStartAmount.value) * (progress / currentDuration.value)
			currentAmount.value = currentAmount.value > propsConf.endAmount ? propsConf.endAmount : currentAmount.value
		}
		if (progress < currentDuration.value) {
			animationFrame.value = window.requestAnimationFrame(counting)
		} else {
			emits('finished')
		}
	}
	const pause = (): void => {
		if (paused.value) return
		cancelAnimation()
		paused.value = true
	}
	const resume = (): void => {
		if (!paused.value) return
		startTimestamp.value = 0
		currentDuration.value = +remaining.value
		currentStartAmount.value = +currentAmount.value
		animationFrame.value = window.requestAnimationFrame(counting)
		paused.value = false
	}
	const reset = (): void => {
		paused.value = false
		startTimestamp.value = 0
		cancelAnimation()
		currentAmount.value = propsConf.startAmount
		if (propsConf.autoinit) {
			start()
		} else {
			paused.value = true
		}
	}
	watch(propsConf, () => {
		if (propsConf.startAmount != propsConf.endAmount) {
			start()
		}
	})

	onUnmounted(() => {
		cancelAnimation()
	})
</script>
