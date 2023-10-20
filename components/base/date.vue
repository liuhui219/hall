<template>
	<div class="flex flex-row w-full items-center sys-date" :class="[isPC() ? 'pr-[39px]' : 'pr-[10px]']">
		<BaseSelect
			class="input-selector basis-1/3"
			:class="{'account': placeholder2||placeholder3}"
			:unless="true"
			:list="yearList"
			v-model="currentYear"
			:placeholder="yearList[currentYear] ? `${yearList[currentYear]}` : placeholder"
		></BaseSelect>
		<BaseSelect
			class="input-selector basis-1/3"
			:class="{'account': placeholder2||placeholder3}"
			:unless="true"
			:list="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
			v-model="currentMonth"
			:placeholder="placeholder2"
		></BaseSelect>
		<BaseSelect
			class="input-selector basis-1/3"
			:class="{'account': placeholder2||placeholder3}"
			:unless="true"
			:list="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]"
			v-model="currentDate"
			:placeholder="placeholder3"
		></BaseSelect>
	</div>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		formData: {
			type: Object,
			default: () => ({}),
		},
		placeholder: {
			type: String,
			default: '',
		},
		placeholder2: {
			type: String,
			default: '',
		},
		placeholder3: {
			type: String,
			default: '',
		},
	})
	const nowYear = ref(new Date().getFullYear())
	const minYear = 1900
	const emits = defineEmits(['change-date'])
	const yearList = ref(<number[]>[])
	for (; nowYear.value > minYear; ) {
		yearList.value.push(nowYear.value)
		nowYear.value--
	}
	const currentYear = computed({
		get: () => yearList.value.findIndex((el: any) => el == propsConf.formData.year),
		set: (val) => {
			emits('change-date', { year: yearList.value[val] })
		},
	})
	const currentMonth = computed({
		get: () => propsConf.formData.month - 1,
		set: (val) => {
			emits('change-date', { month: val + 1 })
		},
	})
	const currentDate = computed({
		get: () => propsConf.formData.date - 1,
		set: (val) => {
			emits('change-date', { date: val + 1 })
		},
	})
</script>
<style scoped lang="scss">
	.account {
		:deep(.sys-select) {
			span{
				@apply block pl-0;
				line-height: 43px;
				color: $text-lowlight;
			}
			i{
				@apply text-center right-0;
			}
		}
		:deep(.items-center) {
			@apply text-center;
			span{
				@apply w-full;
			}
		}
		:deep(.sys-option){
			width: calc( 100% - 7px );
		}
	}
</style>