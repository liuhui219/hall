<template>
	<div class="relative" :class="{ 'sys-select-center': center }">
		<label @click="toggleList(!isShow)">
			<div class="sys-select" :class="[`sys-select-${size === 'm' ? 'mobile' : 'pc'}`, { pointer: canSelect }]">
				<span
					class="select flex items-center"
					:class="{ 'placeholder-color': textConf.isplace, unless: unless, 'color-text-white': !textConf.isplace }"
				>
					{{ text || textConf.value }}
				</span>
				<BaseArrowDown v-if="canSelect" :class="{ '-rotate-[90deg]': !isShow }" />
			</div>
		</label>
		<div
			v-if="canSelect"
			v-show="isShow"
			class="sys-option w-full absolute z-[99999] flex flex-col mt-1 max-h-[200px] overflow-hidden rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
		>
			<ul class="w-full h-full overflow-auto show-scroll-bar">
				<li
					v-for="(item, index) in list"
					:key="index"
					class="text-[14px] relative cursor-default select-none py-2 px-[12px] w-full sys-select-item"
					:class="{
						'color-text': item == modelValue,
						active: index === modelValue,
					}"
					@click="changeCurrentOption(index)"
				>
					<div class="flex items-center">
						<span
							class="font-normal block truncate"
							v-html="langBol == 0 ? item : langBol == 1 ? $t(item) : $pt(langBolKey ? item[langBolKey] : item)"
						/>
					</div>
					<template v-if="!center">
						<span v-show="index === modelValue && !dot" class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-[8px]">
							<BaseIcon name="check" class="text-second" />
						</span>
						<div
							v-show="index === modelValue && dot"
							class="absolute inset-y-0 right-[5px] top-[10px] flex items-center pr-[8px] w-[18px] h-[18px] dot"
						>
							<span class="absolute top-[4px] left-[4px] w-[10px] h-[10px]" />
						</div>
					</template>
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { uuid } from 'vue3-uuid'
	import HallLog from '~~/apis/debug/HallLog'

	const propsConf = defineProps({
		modelValue: {
			type: Number,
			default: 0,
		},
		text: {
			type: String,
			default: '',
		},
		size: {
			type: String,
			default: '',
		},
		list: {
			type: Array<any>,
			default: () => [],
		},
		placeholder: {
			type: String,
			default: '',
		},
		langBolKey: {
			type: String,
			default: '',
		},
		langBol: {
			//是否需要翻译，0不需要翻译 1前端翻译 2后端返回数据翻译 例{1: a, 11: a} 默认不翻译
			type: Number,
			default: 0,
		},
		unless: {
			type: Boolean,
			default: false,
		},
		dot: {
			type: Boolean,
			default: false,
		},
		selectLen: {
			type: Number,
			default: 0,
		},
		chatIsShow: {
			type: Boolean,
			default: false,
		},
		center: {
			type: Boolean,
			default: false,
		},
		//打开其他下拉选择框时是否自动关闭 默认true
		autoClose: {
			type: Boolean,
			default: true,
		},
	})
	const canSelect = computed(() => {
		if (propsConf.chatIsShow) {
			isShow.value = false
			return false
		}
		return propsConf.list && propsConf.list.length > propsConf.selectLen
	})
	const key = uuid.v1()
	const textConf = computed(() => {
		let value =
			propsConf.langBol == 0
				? propsConf.list[propsConf.modelValue]
				: propsConf.langBol == 1
				? useNuxtApp().$t(propsConf.list[propsConf.modelValue])
				: useNuxtApp().$pt(
						propsConf.langBolKey ? propsConf.list[propsConf.modelValue][propsConf.langBolKey] : propsConf.list[propsConf.modelValue]
				  )
		let isplace = false
		if (!value && propsConf.placeholder) {
			isplace = true
			value = propsConf.placeholder
		}
		return { isplace, value }
	})
	const isShow = ref(false)
	const emits = defineEmits(['update:modelValue', 'change'])
	const toggleList = (val: boolean) => {
		const from: any = useSelectConfig().value
		if (val) {
			for (let i in from) {
				try {
					from[i]()
				} catch (error) {
					HallLog.log('select error===============>', error)
				}
			}
			if (propsConf.autoClose) {
				from[key] = function () {
					toggleList(false)
				}
			}
		} else {
			delete from[key]
		}
		isShow.value = val
	}
	const changeCurrentOption = (val: any) => {
		emits('update:modelValue', val)
		emits('change', val)
		toggleList(false)
	}
</script>
<style scoped lang="scss">
	.dot {
		border-radius: 50%;
		background: $chat-select-dot1;
		span {
			border-radius: 50%;
			background: $chat-select-dot2;
		}
	}
</style>
