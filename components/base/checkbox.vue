<template>
	<div class="pointer sys-checkbox" :class="{ 'checkbox-m': size === 'm', 'check-box-high': checkedHigh, checked: modelValue && high }">
		<label class="flex pointer">
			<input v-model="checked" type="checkbox" class="shrink-0" :class="{ 'is-check': modelValue }" />
			<div class="check-content flex-1 overflow-hidden"><slot /></div>
		</label>
	</div>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		modelValue: {
			type: [Number, Boolean],
			default: 0,
		},
		checkedHigh: {
			type: Boolean,
			default: false,
		},
		size: {
			type: String,
			default: '',
		},
		id: {
			type: String,
			default: '',
		},
		high: {
			type: Boolean,
			default: false,
		},
	})
	const emits = defineEmits(['update:modelValue', 'change'])
	const checked = computed({
		get: () => !!propsConf.modelValue,
		set: (val) => {
			emits('change', { id: propsConf.id, val: Number(val) })
			emits('update:modelValue', Number(val))
		},
	})
</script>
