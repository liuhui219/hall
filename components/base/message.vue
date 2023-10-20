<template>
	<div class="message-box" :class="`message-${type}`">
		<div class="message">
			<div class="icon-container">
				<BaseIcon :name="type == 'error' ? 'close' : 'check'" />
			</div>
			<span v-html="msg" />
		</div>
		<button class="sysicon-close btn-clear" @click="clearMsg" />
		<!-- <div class="progressbar">
			<div class="rate" :style="{ width: progressbarRate + '%' }" />
		</div> -->
	</div>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		msgId: {
			type: [String, Number],
			default: '',
		},
		icon: {
			type: String,
			default: '',
		},
		msg: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: '',
		},
	})

	const progressbarRate = ref(0)
	const timeCounter = ref(Date.now())
	const duration = ref(3000)
	const watingTime = ref(timeCounter.value + duration.value)
	const intervalId = ref()

	onMounted(() => {
		intervalId.value = setInterval(() => {
			timeCounter.value = Date.now()
			if (timeCounter.value < watingTime.value) {
				progressbarRate.value = (Math.max(duration.value - watingTime.value + timeCounter.value, 0) / duration.value) * 100
			} else {
				clearMsg()
			}
		}, 1)
	})
	const clearMsg = () => {
		const { delErrorMessage } = useSysConfigStore()
		delErrorMessage(propsConf.msgId as string)
		clearInterval(intervalId.value)
	}
	const width = computed(() => {
		return navigationStore.mobileNavShow ? '320px' : '64px'
	})
</script>
