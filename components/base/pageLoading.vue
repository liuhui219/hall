<template>
	<div v-show="show" class="app-loading" :class="{ 'http-loading': http }">
		<BaseLoading />
		<!-- <div class="color-text-white text-[14px] mt-[100px]">Loading ...</div> -->
	</div>
</template>
<script setup lang="ts">
	defineProps({
		http: {
			type: Boolean,
			default: false,
		},
		show: {
			type: Boolean,
			default: true,
		},
	})
</script>
