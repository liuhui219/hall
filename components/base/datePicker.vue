<template>
	<div class="m-datepicker">
		<!-- locale="en-US" -->
		<VueDatePicker
			:month-change-on-scroll="false"
			:enable-time-picker="showTime"
			:time-picker="time"
			:week-picker="week"
			:month-picker="month"
			:year-picker="year"
			now-button-label="today"
			:show-now-button="showToday"
			:clearable="clearable"
			:auto-apply="true"
			:dark="true"
			:model-type="modelType"
			:day-names="['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']"
			v-bind="$attrs"
		>
			<template #input-icon>
				<slot name="input-icon">
					<BaseIcon
						name="dl-date"
						class="text-[20px] ml-[18px] date-picker-icon"
						:class="{ active: active == 2, 'no-active': active == 1 }"
					/>
				</slot>
			</template>
		</VueDatePicker>
	</div>
</template>
<!-- 
    插件文档：https://vue3datepicker.com/props/modes/
    使用此插件的UI框架：https://themusecatcher.github.io/vue-amazing-ui/guide/components/datepicker.html
 -->
<script lang="ts">
	/*
    一个根节点时，禁用组件根节点自动继承 attribute，必须使用这种写法！然后在要继承 attribute 的节点上绑定 v-bind="$attrs" 即可
    多个根节点时，只需在要继承 attribute 的节点上绑定 v-bind="$attrs" 即可
    */
	export default {
		inheritAttrs: false,
	}
</script>
<script setup lang="ts">
	import VueDatePicker from '@vuepic/vue-datepicker'
	import '@vuepic/vue-datepicker/dist/main.css'
	import { computed } from 'vue'
	interface Props {
		// width?: number // 日期选择器宽度
		mode?: 'time' | 'date' | 'week' | 'month' | 'year' // 选择器模式，可选：时间time，日期date，周week，月month，年year
		// format?: string | (params: Date | Date[]) => string // 日期展示格式，(y: 年, M: 月, d: 天, H: 时, m: 分, s: 秒)
		showTime?: boolean // 是否增加时间选择
		showToday?: boolean // 是否展示”今天“按钮
		// multiCalendars?: boolean // 范围选择器是否使用双日期面板
		// flow?: any[] // 定义选择顺序 ("calendar" | "time" | "month" | "year" | "minutes" | "hours" | "seconds")[]
		// dark?: boolean // 样式主题是否使用黑色
		modelType?: 'timestamp' | 'format' // v-model 值类型，可选时间戳(timestamp)、字符串(format)，mode为week和year时，该配置不生效
		clearable?: boolean
		active: 1
	}
	const props = withDefaults(defineProps<Props>(), {
		// width: 180,
		mode: 'date',
		/* format default
        Single picker: 'MM/dd/yyyy HH:mm'
        Range picker: 'MM/dd/yyyy HH:mm - MM/dd/yyyy HH:mm'
        Month picker: 'MM/yyyy'
        Time picker: 'HH:mm'
        Time picker range: 'HH:mm - HH:mm'
    */
		// format: 'MM/dd/yyyy',
		showTime: false,
		showToday: false,
		// multiCalendars: false,
		// flow: () => [],
		// dark: false,
		modelType: 'format',
		clearable: true,
		active: 1,
	})
	const time = computed(() => {
		return props.mode === 'time'
	})
	const week = computed(() => {
		return props.mode === 'week'
	})
	const month = computed(() => {
		return props.mode === 'month'
	})
	const year = computed(() => {
		return props.mode === 'year'
	})
	// const format = (date: Date) => {
	//   const day = date.getDate()
	//   const month = date.getMonth() + 1
	//   const year = date.getFullYear()
	//   return `${year}-${month}-${day}`
	// }
</script>

<style scoped lang="scss">
	.m-datepicker {
		flex: 1;
		// display: inline-block;
	}
	:deep(.dp__input_icon_pad) {
		-webkit-padding-start: 52px;
		-moz-padding-start: 52px;
		padding-inline-start: 52px;
	}
	:deep(.dp__input) {
		padding-top: 9px;
		padding-bottom: 9px;
	}
	:deep(.dp__theme_dark),
	:deep(.dp__arrow_top),
	:deep(.dp__overlay) {
		background-color: $block-bg-2;
	}
	.date-picker-icon {
		color: $text-lowlight;
	}
	.active {
		color: $color-white;
	}
	.no-active {
		color: $gray;
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
