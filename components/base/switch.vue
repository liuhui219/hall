<template>
	<div
		class="flex items-center"
		:class="{
			'sys-switch': true,
			'switch-m': size === 'm',
		}"
	>
		<p class="block-title">{{ string ? string[0] : '' }}</p>
		<label class="switch mx-3">
			<input v-model="checked" type="checkbox" />
			<span class="slider" />
		</label>
		<p class="block-title">{{ string ? string[1] : '' }}</p>
	</div>
</template>
<script lang="ts" setup>
	const emits = defineEmits(['change'])
	const propsConf = defineProps({
		check: {
			type: Boolean,
			default: false,
		},
		size: {
			type: String,
			default: '',
		},
		string: {
			type: Array,
			default: () => [],
		},
	})

	const checked = computed({
		get: () => !!propsConf.check,
		set: (val) => {
			emits('change', val)
		},
	})
</script>
