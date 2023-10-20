<template>
	<BaseSelect v-model="acodeIndex" :list="selectList" :unless="true" :text="modelValue" :select-len="1" class="select-acode" />
</template>

<script setup lang="ts">
	const propsConf = defineProps({
		modelValue: {
			type: String,
			default: '',
		},
	})
	const configStore = useSysConfigStore()
	const emits = defineEmits(['update:modelValue'])
	const selectList = computed(() => {
		const list = configStore.countrys.map((el: any) => {
			return `${el.code}  ${el.name}`
		})
		return list
	})
	const acodeIndex = computed({
		get: () => configStore.countrys.findIndex((el: any) => el.code == propsConf.modelValue),
		set: (val) => {
			let acode = configStore.countrys[val].code
			emits('update:modelValue', acode)
		},
	})
</script>

<style scoped lang="scss">
	.select-acode {
		position: relative;
		display: flex;
		font-size: 14px;
		height: 20px;
		border-right: 1px solid $block-bg-2;
		:deep(.select) {
			height: 20px;
		}
	}
</style>
