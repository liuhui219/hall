<template>
	<button class="btn-icon" :class="[`sysicon-${name}`]" @click="handleClick" />
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		name: {
			type: String,
			default: '',
		},
	})
	const emits = defineEmits(['onClick'])
	const handleClick = () => {
		emits('onClick')
	}
</script>
