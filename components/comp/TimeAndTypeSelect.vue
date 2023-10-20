<template>
	<div class="time-container">
		<div class="w-full flex items-center justify-between relative" :style="{ gap: gap + 'px', height: height + 'px' }">
			<BaseDatePicker v-model="date" :clearable="clearable" :padding-top="`10px`" :placeholder="$t('DL0049')" format="yyyy-MM-dd" />
			<template v-if="showType">
				<div
					class="dl-filter"
					:style="{ width: height + 'px', height: height + 'px' }"
					:class="{ active: showFilter }"
					@click="toggleShowFilter()"
				>
					<BaseIcon name="dl-filter" class="text-[20px]" />
				</div>
				<div
					v-show="showFilter"
					class="filter-container"
					:style="{
						top: height + 10 + 'px',
						fontSize: filterItemFontSize + 'px',
					}"
				>
					<div class="dl-filter-tab">
						<div
							v-for="(item, index) in filterList"
							:key="index"
							:class="{ active: index == activeIndex || (activeKey && activeKey == item[filterTextKey]) }"
							:style="{
								paddingTop: filterItemFontSize * 0.7 + 'px',
								paddingBottom: filterItemFontSize * 0.7 + 'px',
							}"
							@click="handleClickFilterItem(item, index)"
						>
							{{
								translationType == 1
									? $t(filterTextKey ? item[filterTextKey] : item)
									: translationType == 2
									? $pt(filterTextKey ? item[filterTextKey] : filterTextKey)
									: filterTextKey
									? item[filterTextKey]
									: item
							}}
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	const propsConf = defineProps({
		modelValue: {
			type: String,
			default: '',
		},
		activeIndex: {
			type: Number,
			default: 0,
		},
		activeKey: {
			type: [String, Number],
			default: '',
		},
		filterTextKey: {
			type: String,
			default: '',
		},
		//0不翻译 1前台翻译$t 2后端数据翻译$pt
		translationType: {
			type: Number,
			default: 0,
		},
		clickItemClose: {
			type: Boolean,
			default: true,
		},
		filterList: {
			type: Array<any>,
			default: () => [],
		},
		filterItemFontSize: {
			type: Number,
			default: 14,
		},
		gap: {
			type: Number,
			default: 10,
		},
		height: {
			type: Number,
			default: 45,
		},
		showType: {
			type: Boolean,
			default: true,
		},
		clearable: {
			type: Boolean,
			default: true,
		},
	})
	const showFilter = ref(false)
	const toggleShowFilter = (value?: boolean) => {
		showFilter.value = !showFilter.value
		if (showFilter.value) {
		}
	}
	const handleClickFilterItem = (item: any, index: number) => {
		emit('onClickItem', item, index)
		if (propsConf.clickItemClose) {
			showFilter.value = false
		}
	}
	const emit = defineEmits(['update:modelValue', 'onTimeChange', 'onClickItem'])
	const date = computed({
		get: () => propsConf.modelValue,
		set: (val) => {
			emit('update:modelValue', val)
			emit('onTimeChange', val)
		},
	})
</script>

<style scoped lang="scss">
	.dl-filter {
		@apply rounded-[6px] flex items-center justify-center;
		border: 1px solid $block-bg;
		background: $block-bg-2;
		&.active {
			background: $btn-main;
			color: $text-button;
		}
	}
	.filter-container {
		@apply absolute right-[0] z-[40];
		&::before {
			content: '';
			position: absolute;
			z-index: -1;
			top: -6px;
			right: 20px;
			width: 13px;
			height: 13px;
			background: $block-bg-2;
			transform: rotateZ(45deg);
		}
		.dl-filter-tab {
			@apply rounded-[6px] max-h-[60vh] overflow-y-auto;
			box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.5);
			background: $block-bg-2;

			div {
				width: 100%;
				padding: 0 30px 0 16px;
				position: relative;
				@apply flex items-center  font-[400]  cursor-pointer select-none;
			}

			div.active {
				background: $block-bg;
				&::before {
					content: '';
					position: absolute;
					display: inline-block;
					top: 0;
					bottom: 0;
					margin: auto;
					right: 10px;
					width: 12px;
					height: 12px;
					border-radius: 50%;
					background: #c3f596;
				}
			}
		}
	}

	.dl-history-card {
		@apply mx-[15px] mb-[10px] px-[12px] rounded-md;
		background: $block-bg-2;
		div {
			@apply flex items-center min-h-[38px] px-[11px];
			border-bottom: 1px solid $home-text-button;
			p {
				@apply flex-1 text-[14px];
				color: $text-lowlight;
			}
			p:nth-child(2) {
				@apply min-w-[55%];
			}
		}
		div:last-child {
			border-bottom: none;
		}
	}

	.m-datepicker {
		flex: 1;
		height: 100%;
		// display: inline-block;
	}
	:deep(.dp__input_icon_pad) {
		-webkit-padding-start: 52px;
		-moz-padding-start: 52px;
		padding-inline-start: 52px;
	}
	:deep(.dp__input_wrap) {
		height: 100%;
		& > div {
			height: 100%;
		}
	}
	:deep(.dp__input_wrap) {
		height: 100%;
	}
	:deep(.dp__main) {
		height: 100%;
		& > div {
			height: 100%;
		}
	}
	:deep(.dp__input) {
		height: 100%;
	}
	:deep(.dp__theme_dark),
	:deep(.dp__arrow_top),
	:deep(.dp__overlay) {
		background-color: $block-bg-2;
	}
	.dp__theme_dark {
		// dark theme
		--dp-background-color: $block-bg-2;
		--dp-text-color: #ffffff;
		--dp-hover-color: #484848;
		--dp-hover-text-color: #ffffff;
		--dp-hover-icon-color: #959595;
		--dp-primary-color: #005cb2;
		--dp-primary-text-color: #ffffff;
		--dp-secondary-color: #a9a9a9;
		--dp-border-color: $block-bg;
		--dp-menu-border-color: $block-bg;
		--dp-border-color-hover: #aaaeb7;
		--dp-disabled-color: #737373;
		--dp-scroll-bar-background: $block-bg;
		--dp-scroll-bar-color: #484848;
		--dp-success-color: #00701a;
		--dp-success-color-disabled: #428f59;
		--dp-icon-color: #959595;
		--dp-danger-color: #e53935;
		--dp-highlight-color: rgba(0, 92, 178, 0.2);

		border-radius: 6px;
		border: 1px solid $block-bg;
	}
	.dp__theme_light {
		// light theme
		--dp-background-color: #ffffff;
		--dp-text-color: #212121;
		--dp-hover-color: #f3f3f3;
		--dp-hover-text-color: #212121;
		--dp-hover-icon-color: #959595;
		--dp-primary-color: #1976d2;
		--dp-primary-text-color: #f8f5f5;
		--dp-secondary-color: #c0c4cc;
		--dp-border-color: #ddd;
		--dp-menu-border-color: #ddd;
		--dp-border-color-hover: #aaaeb7;
		--dp-disabled-color: #f6f6f6;
		--dp-scroll-bar-background: #f3f3f3;
		--dp-scroll-bar-color: #959595;
		--dp-success-color: #76d275;
		--dp-success-color-disabled: #a3d9b1;
		--dp-icon-color: #959595;
		--dp-danger-color: #ff6f60;
		--dp-highlight-color: rgba(25, 118, 210, 0.1);
	}
</style>
