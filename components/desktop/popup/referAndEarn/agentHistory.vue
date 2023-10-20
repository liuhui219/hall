<template>
	<div class="h-full overflow-hidden flex flex-col">
		<!-- <BasePageLoading v-if="referAndEarnStore.appLoadingStatus" class="!z-[999] !absolute opacity-80" /> -->
		<!-- <div
			v-if="referAndEarnStore.showFilter"
			class="absolute left-0 top-0 z-[30] w-[100%] h-[100%] bg-[rgba(0,0,0,0.3)]"
			@click="referAndEarnStore.showFilter = false"
		/> -->
		<section class="modal-header shrink-0">
			<div class="flex justify-between w-full">
				<button class="invisible">
					<BaseIcon name="arrow-left" class="text-lowlight" />
				</button>
				<button class="modal__close" @click="closePopup()">
					<BaseIcon name="close" class="text-lowlight" />
				</button>
			</div>
			<h3 class="modal__title section-title text-center mb-8">{{ $t('AF0005') }}</h3>
		</section>

		<div class="flex items-center justify-between relative gap-[10px]">
			<BaseDatePicker
				v-model="referAndEarnStore.historyParam.Date"
				class="flex-1"
				:active="referAndEarnStore.historyParam.Date ? 2 : 1"
				:placeholder="$t('DL0049')"
				format="yyyy-MM-dd"
			/>
			<div
				class="dl-filter cursor-pointer"
				:class="{ active: referAndEarnStore.showFilter }"
				@click="referAndEarnStore.showFilter = !referAndEarnStore.showFilter"
			>
				<BaseIcon name="dl-filter" class="text-[22px] text-white" />
				<span class="ml-[20px] text-[14px] text-white">{{ $t(referAndEarnStore.filterText) }}</span>
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
		<div class="dl-th">
			<div>{{ $t('U0025') }}</div>
			<div>{{ $t('DL0046') }}</div>
			<div>{{ $t('U0005') }}</div>
			<div>{{ $t('AF0060') }}</div>
		</div>
		<div class="dl-friends-list" :class="{ '!bg-transparent': referAndEarnStore.historyList.length == 0 && !referAndEarnStore.appLoadingStatus }">
			<div v-for="(item, index) in referAndEarnStore.historyList" :key="index" class="dl-tr">
				<div>{{ item.username }}</div>
				<div>{{ item.is_direction_relation == 1 ? $pt(useSysConfigStore().rewardTypesMaps[item.reward_type]?.title) : $t('DL0032') }}</div>
				<div>{{ configStore.currency_symbol }} {{ item.reward }}</div>
				<div>{{ Helper.formatDate(item.Time, 1) }}</div>
			</div>
			<BaseInfinite
				v-model="referAndEarnStore.historyFinish"
				:empty-distance="86"
				:show-empty-txt="true"
				:empty="!referAndEarnStore.historyList.length"
				@load="referAndEarnStore.loadHistoryData"
			/>
		</div>
		<!-- <div class="dl-friends-footer">
			<p>Subtotal??? : 15000</p>
			<p>Cumulative??? : 15000</p>
			<p>Total Acumulado??? : <span class="main-color">15000</span></p>
		</div> -->
	</div>
</template>
<script setup lang="ts">
	// import { format } from 'date-fns'
	// const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
	import Helper from '~~/apis/tool/Helper'
	const configStore = useSysConfigStore()
	const referAndEarnStore = useReferAndEarnStore()
	watchEffect(() => {
		if (referAndEarnStore.historyDate != referAndEarnStore.historyParam.Date) {
			referAndEarnStore.historyDate = referAndEarnStore.historyParam.Date
			referAndEarnStore.historyList = []
			referAndEarnStore.historyParam.page = 0
			referAndEarnStore.historyFinish = InfiniteTypeEnum.init
			referAndEarnStore.loadHistoryData()
		}
	})
	onMounted(() => {
		referAndEarnStore.historyParam.page = 0
	})
</script>
<style lang="scss" scoped>
	.text-lowlight {
		color: $text-lowlight;
	}
	.dl-friends-footer {
		@apply flex justify-around items-center absolute bottom-[32px] w-[596px] h-[52px];
		background: $block-bg;
		box-shadow: 0px -5px 5px 0px #00000080;
		p {
			@apply text-[12px];
			color: $color-white;
		}
	}
	.gray-color {
		color: $gray;
	}
	.main-color {
		color: $main;
	}
	.dl-filter {
		@apply flex items-center px-[15px] pt-[9px] pb-[6px] min-w-[293px] h-[44px] rounded-md;
		border: 1px solid $block-bg;
		background: $block-bg-2;
		&.active {
			// background: $btn-main;
			color: $main;
		}
	}
	.dl-filter-tab {
		@apply absolute top-[53px] z-[40] right-0 w-[293px] rounded-md;
		box-shadow: 0px 4px 12px 0px #000000b2;
		div {
			@apply flex items-center relative h-[40px] text-[12px] font-[400] indent-[17px] cursor-pointer select-none;
			background: $block-bg-2;
			p:nth-child(1) {
				@apply max-w-[180px];
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
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
		.active {
			background: $block-bg;
		}
		.dot {
			@apply absolute inset-y-0 right-[15px] top-[10px] flex items-center pr-[8px] w-[16px] h-[16px];
			border-radius: 50%;
			background: $chat-select-dot1;
			span {
				@apply absolute top-[4px] left-[4px] w-[8px] h-[8px];
				border-radius: 50%;
				background: $chat-select-dot2;
			}
		}
	}
	.dl-friends-list {
		@apply px-[16px] pb-[10px] overflow-y-auto rounded-b-md;
		background: $block-bg-2;
		:deep(.mx-auto) {
			margin-bottom: 150px;
		}
		:deep(img) {
			margin-bottom: 0 !important;
		}
	}
	.dl-th {
		@apply mt-[20px] px-[30px] rounded-t-md;
		background: $block-bg-2;
	}
	.dl-th,
	.dl-tr {
		@apply flex items-center min-h-[50px] py-[3px];
		div {
			@apply flex-1 text-center;
		}
	}
	.dl-tr {
		@apply px-[15px];
		div {
			color: $text-lowlight;
		}
	}
	.dl-tr:nth-child(odd) {
		background: $bg;
	}
	.dl-th div:nth-child(1),
	.dl-tr div:nth-child(1) {
		@apply text-left max-w-[140px];
	}
	.dl-tr div:nth-child(1) {
		@apply overflow-hidden text-ellipsis whitespace-nowrap;
	}
	.dl-th div:nth-child(3),
	.dl-tr div:nth-child(3) {
		@apply max-w-[110px];
	}
	.dl-th div:nth-child(4),
	.dl-tr div:nth-child(4) {
		@apply text-right max-w-[110px];
	}
</style>
