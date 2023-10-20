<template>
	<div class="record-select-container" :class="{ 'has-border': border }">
		<div v-for="(item, count) in list" :class="[`w-[${100 / list.length}%]`]" :key="count">
			<BaseSelect
				:model-value="item.value"
				:list="item.list"
				:unless="true"
				:center="true"
				:lang-bol-key="item.langBolKey || ''"
				:lang-bol="item.langBol || 0"
				@change="(index) => handleChange(index, count)"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
	defineProps({
		list: {
			type: <any>Array,
			default: [],
		},
		border: {
			type: Boolean,
			default: true,
		},
	})
	const emits = defineEmits(['change'])
	const handleChange = (value: number, index: number) => {
		emits('change', value, index)
	}
	const bodder = computed(() => {})
</script>
<style scoped lang="scss">
	.record-select-container {
		width: 100%;

		background: $block-bg-2;
		display: flex;
		justify-content: space-between;
		border-radius: 6px;
		&.has-border {
			border: 0.5px solid $block-bg;
		}
		:deep(.select) {
			background: transparent;
		}
	}
</style>
