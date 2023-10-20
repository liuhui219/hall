<template>
	<button @click="emits('on-click')" />
</template>

<script setup lang="ts">
	const emits = defineEmits(['on-click'])
</script>

<style scoped lang="scss"></style>
