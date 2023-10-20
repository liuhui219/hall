<template>
	<InfiniteLoading ref="infinite" :key="key" :firstload="true" @infinite="load">
		<template #spinner>
			<slot name="spinner">
				<div class="w-full h-[36px] flex items-center justify-center relative infinite-loading">
					<BaseLoading />
				</div>
			</slot>
		</template>
		<template #complete>
			<slot name="complete">
				<BaseRecordEmpty v-if="empty" :style="{ margin: `${emptyDistance}px auto` }" />
				<p v-if="empty && showEmptyTxt" class="text-[16px] text-lowlight text-center">{{ $t('DL0083') }}</p>
				<div v-if="!empty" class="w-full h-[36px] flex items-center text-lowlight justify-center text-[12px]">
					{{ $t('AF0035') }}
				</div>
			</slot>
		</template>
		<template #error="{ retry }">
			<slot name="error" :retry="retry">
				<div class="w-full h-[36px] flex items-center justify-center">
					<BaseIcon name="refresh" @click="retry()" />
				</div>
			</slot>
		</template>
	</InfiniteLoading>
</template>

<script setup lang="ts">
	import InfiniteLoading from 'v3-infinite-loading'
	import 'v3-infinite-loading/lib/style.css' //required if you're not going to override default slots
	const props = defineProps({
		modelValue: {
			type: [Boolean, Number],
			default: InfiniteTypeEnum.init,
		},
		firstload: {
			type: Boolean,
			default: true,
		},
		empty: {
			type: Boolean,
			default: null,
		},
		emptyDistance: {
			type: Boolean,
			default: 127,
		},
		showEmptyTxt: {
			type: Boolean,
			default: false,
		},
	})
	const infinite = ref()
	const needLoad = ref(props.firstload)
	const emit = defineEmits(['update:modelValue', 'load'])
	const stateCopy: Ref<any> = ref()
	const loading = computed({
		get: () => props.modelValue,
		set: (val) => {
			emit('update:modelValue', val)
		},
	})
	const key = ref(0)
	const load = (state?: any) => {
		loading.value = InfiniteTypeEnum.loading
		if (state) {
			stateCopy.value = state
		}
		if (needLoad.value) {
			emit('load', state)
		} else {
			needLoad.value = false
		}
	}
	watch(
		() => props.modelValue,
		() => {
			if (props.modelValue === InfiniteTypeEnum.compelete) {
				stateCopy.value?.complete()
			} else if (props.modelValue === InfiniteTypeEnum.loaded) {
				stateCopy.value?.loaded()
			} else if (props.modelValue === InfiniteTypeEnum.error) {
				stateCopy.value?.error()
			} else if (props.modelValue === InfiniteTypeEnum.init) {
				needLoad.value = props.firstload
				key.value++
			}
		}
	)
</script>

<style scoped lang="scss">
	.infinite-loading {
		img {
			filter: grayscale(100%);
			width: 24px;
			height: 24px;
		}
	}
</style>
