<template>
	<span :class="{ truncate: isEllipsis, 'btn-highlight': isBtnSecond }">
		<slot />
	</span>
</template>
<script setup>
	const propsConf = defineProps({
		isEllipsis: {
			type: Boolean,
			default: false,
		},
		isBtnSecond: {
			type: Boolean,
			default: false,
		},
	})
</script>
