<template>
	<div class="h-full flex flex-col overflow-hidden">
		<!-- <BasePageLoading v-if="referAndEarnStore.appLoadingStatus" class="!z-[999] !absolute opacity-80" /> -->
		<!-- <div
			v-if="referAndEarnStore.showFilter"
			class="absolute left-0 top-0 z-[30] w-[100%] h-[100%] bg-[rgba(0,0,0,0.3)]"
			@click="referAndEarnStore.showFilter = false"
		/> -->
		<SkinHeader :is-home="false" :title="$t('AF0005')" />
		<div class="dl-mobile-dividing-line !mb-[20px]" />
		<!-- <div class="flex items-center justify-between gap-[10px] relative px-[15px] mb-[10px]"> -->
		<div class="px-[15px] mb-[10px]">
			<BaseDatePicker
				v-model="referAndEarnStore.historyParam.Date"
				model-type="timestamp"
				:active="referAndEarnStore.historyParam.Date ? 2 : 1"
				:placeholder="$t('DL0049')"
				format="yyyy-MM-dd"
			/>
		</div>

		<div class="relative px-[15px] mb-[10px]">
			<div
				class="dl-filter"
				:class="{ active: referAndEarnStore.showFilter }"
				@click="referAndEarnStore.showFilter = !referAndEarnStore.showFilter"
			>
				<BaseIcon name="dl-filter" class="mr-[20px] text-[22px] text-white" />
				<span class="text-white">{{ $t(referAndEarnStore.filterText) }}</span>
			</div>
			<div v-if="referAndEarnStore.showFilter" class="dl-filter-tab">
				<div
					v-for="(item, index) in referAndEarnStore.historyFilterList"
					:key="index"
					:class="{ active: referAndEarnStore.historyParam.query_type === item.index }"
					@click="referAndEarnStore.filterSelect(item.index)"
				>
					<p>{{ $t(item.text) }}</p>
					<p v-show="referAndEarnStore.historyParam.query_type === item.index" class="dot">
						<span />
					</p>
				</div>
			</div>
		</div>
		<!-- </div> -->
		<div class="dl-th mx-[15px] !mt-[0px]">
			<div>{{ $t('U0025') }}</div>
			<div>{{ $t('DL0046') }}</div>
			<div>{{ $t('U0005') }}</div>
			<div>{{ $t('AF0060') }}</div>
		</div>
		<div class="overflow-y-auto mx-[15px]">
			<div
				class="dl-friends-list"
				:class="{ '!bg-transparent': referAndEarnStore.historyList.length == 0 && !referAndEarnStore.appLoadingStatus }"
			>
				<div v-for="(item, index) in referAndEarnStore.historyList" :key="index" class="dl-tr">
					<div>{{ item.username }}</div>
					<div>
						{{ item.is_direction_relation == 1 ? $pt(useSysConfigStore().rewardTypesMaps[item.reward_type]?.title) : $t('DL0032') }}
					</div>
					<div>
						<span>{{ configStore.currency_symbol }}{{ item.reward }}</span>
					</div>
					<div>{{ Helper.formatDate(item.Time, 11) }}</div>
				</div>
				<BaseInfinite
					v-model="referAndEarnStore.historyFinish"
					:empty-distance="50"
					:show-empty-txt="true"
					:empty="!referAndEarnStore.historyList.length"
					@load="referAndEarnStore.loadHistoryData"
				/>
			</div>
		</div>
		<!-- <div class="w-[full] h-[1px] mt-[52px]">&nbsp;</div> -->
	</div>
	<!-- <div class="dl-friends-footer">
		<p>Subtotal??? : 15000</p>
		<p>Cumulative??? : 15000</p>
		<p>Total Acumulado??? : <span class="main-color">15000</span></p>
	</div> -->
</template>
<script setup lang="ts">
	// import { format } from 'date-fns'
	// const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
	import Helper from '~~/apis/tool/Helper'
	const referAndEarnStore = useReferAndEarnStore()
	const configStore = useSysConfigStore()
	onMounted(() => {
		referAndEarnStore.historyParam.page = 0
		referAndEarnStore.filterSelectText()
	})
	watchEffect(() => {
		if (referAndEarnStore.historyDate != referAndEarnStore.historyParam.Date) {
			referAndEarnStore.historyDate = referAndEarnStore.historyParam.Date
			referAndEarnStore.historyList = []
			referAndEarnStore.historyParam.page = 0
			referAndEarnStore.historyFinish = InfiniteTypeEnum.init
			referAndEarnStore.loadHistoryData()
		}
	})
</script>
<style scoped lang="scss">
	.dl-friends-footer {
		@apply flex justify-around items-center fixed bottom-0 px-[15px] w-[100%] h-[52px];
		background: $block-bg;
		p {
			@apply text-[12px];
			color: $color-white;
		}
	}
	.main-color {
		color: $main;
	}
	:deep(.dp__input_icon) {
		i {
			margin-left: 10px;
		}
	}
	.dl-filter {
		@apply flex items-center px-[10px] h-[43px] rounded-md;
		border: 1px solid $block-bg;
		color: $text-lowlight;
		background: $block-bg-2;
		&.active {
			// color: $main;
		}
	}
	.dl-filter-tab {
		@apply absolute top-[50px] right-[15px] z-[40] w-[calc(100%-30px)] rounded-md;
		box-shadow: 0px 4px 12px 0px #000000b2;
		div {
			@apply relative flex items-center h-[43px] text-[14px] font-[400] indent-[17px] cursor-pointer select-none;
			background: $block-bg-2;
			p:nth-child(1) {
				@apply max-w-[180px];
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			&.active {
				background: $block-bg;
			}
		}
		// div:nth-child(even) {
		// 	background: $bg;
		// }
		// div:nth-child(odd) {
		// 	background: $block-bg-2;
		// }
		div:first-child {
			@apply rounded-t-md;
		}
		div:last-child {
			@apply rounded-b-md;
		}
		// &::before {
		// 	content: '';
		// 	position: absolute;
		// 	top: -6px;
		// 	right: 20px;
		// 	width: 13px;
		// 	height: 13px;
		// 	background: $block-bg-2;
		// 	transform: rotateZ(45deg);
		// }
		.dot {
			@apply absolute inset-y-0 right-[15px] top-[13px] flex items-center pr-[8px] w-[16px] h-[16px];
			border-radius: 50%;
			background: $chat-select-dot1;
			span {
				@apply absolute top-[4px] left-[4px] w-[8px] h-[8px];
				border-radius: 50%;
				background: $chat-select-dot2;
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

	.dl-friends-list {
		@apply px-[12px] pb-[10px] rounded-b-md overflow-hidden;
		background: $block-bg-2;
		:deep(.mx-auto) {
			margin-bottom: 150px;
		}
		:deep(img) {
			margin-bottom: 0 !important;
		}
	}
	.dl-th,
	.dl-tr {
		@apply flex items-center min-h-[42px] py-[12px] text-[12px];
		div {
			@apply flex-1 text-center font-[400];
			span {
				color: $main;
			}
		}
		div:nth-child(1) {
			@apply max-w-[140px];
		}
		div:nth-child(4) {
			@apply max-w-[85px];
		}
	}
	.dl-th {
		@apply mt-[10px] px-[13px] rounded-t-md;
		background: $block-bg-2;
	}
	.dl-tr {
		color: $text-lowlight;
		div:nth-child(1) {
			@apply max-w-[140px];
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.dl-tr div:nth-child(1) span {
		color: $main;
		text-decoration: underline;
	}
	.dl-th div:nth-child(2),
	.dl-tr div:nth-child(2) {
		@apply max-w-[30%];
	}
	.dl-tr:nth-child(odd) {
		background: $bg;
	}
</style>
