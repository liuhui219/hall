<template>
	<span v-if="show" class="block w-[8px] h-[8px] rounded-full dot" />
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		show: {
			type: [Boolean, Number],
			default: false,
		},
	})
</script>
