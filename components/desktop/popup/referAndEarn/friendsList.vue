<template>
	<div class="h-full overflow-hidden flex flex-col relative">
		<!-- <BasePageLoading v-if="referAndEarnStore.appLoadingStatus" class="!z-[999] !absolute opacity-80" /> -->
		<section class="modal-header shrink-0">
			<div class="flex justify-between w-full">
				<button class="invisible">
					<BaseIcon name="arrow-left" class="text-lowlight" />
				</button>
				<button class="modal__close" @click="closePopup()">
					<BaseIcon name="close" class="text-lowlight" />
				</button>
			</div>
			<h3 class="modal__title section-title text-center mb-8">{{ $t('DL0027') }}</h3>
		</section>
		<!-- 排序及日期选择器 -->
		<!-- <BaseDatePicker v-model="referAndEarnStore.friendParam.time_range" range :placeholder="$t('DL0049')" format="yyyy-MM-dd" /> -->
		<!-- <div class="flex items-center justify-between relative mt-[20px]">
			<BaseDatePicker v-model="dateValue" :placeholder="$t('DL0049')" format="yyyy-MM-dd" />
			<div class="dl-sort" :class="{ 'active': referAndEarnStore.showSort }" @click="referAndEarnStore.showSort = !referAndEarnStore.showSort">
				<BaseIcon name="dl-sort" class="text-[16px]" />
			</div>
			<div v-if="referAndEarnStore.showSort" class="dl-sort-tab">
				<div class="dl-sort-tab-item mb-[3px]">
					<p>{{ $t('DL0041') }}</p>
					<div>
						<span class="active-top"></span>
						<span></span>
					</div>
				</div>

				<div class="dl-sort-tab-item">
					<p>{{ $t('DL0042') }}</p>
					<div>
						<span></span>
						<span class="active-bottom"></span>
					</div>
				</div>
			</div>
		</div> -->

		<div class="grid grid-cols-4 gap-[8px] dl-score-tab">
			<button :class="{ active: referAndEarnStore.friendTabIndex == 1 }" @click="referAndEarnStore.switchFriendTab(1)">
				{{ $t('AF0010') }}
			</button>
			<button :class="{ active: referAndEarnStore.friendTabIndex == 2 }" @click="referAndEarnStore.switchFriendTab(2)">
				{{ $t('DL0010') }}
			</button>
			<button :class="{ active: referAndEarnStore.friendTabIndex == 3 }" @click="referAndEarnStore.switchFriendTab(3)">
				{{ $t('DL0011') }}
			</button>
			<button :class="{ active: referAndEarnStore.friendTabIndex == 4 }" @click="referAndEarnStore.switchFriendTab(4)">
				{{ $t('DL0012') }}
			</button>
		</div>

		<div class="dl-th" :class="{ 'rounded-b-md': referAndEarnStore.friendList.length == 0 && !referAndEarnStore.appLoadingStatus }">
			<div>{{ $t('RO0007') }}</div>
			<div>{{ $t('U0005') }}</div>
		</div>
		<div class="dl-friends-list" :class="{ '!bg-transparent': referAndEarnStore.friendList.length == 0 && !referAndEarnStore.appLoadingStatus }">
			<div v-for="(item, index) in referAndEarnStore.friendList" :key="index" class="dl-tr">
				<div>
					<span @click="referAndEarnStore.viewFriendsInfo(item.uid)">{{ item.username }}</span>
				</div>
				<div>{{ configStore.currency_symbol }}{{ item.reward == '' ? $fp($cp(item.reward_int64)) : item.reward }}</div>
			</div>
			<BaseInfinite
				v-model="referAndEarnStore.friendFinish"
				:empty-distance="86"
				:show-empty-txt="true"
				:empty="!referAndEarnStore.friendList.length"
				@load="referAndEarnStore.loadFriendData"
			/>
		</div>
	</div>
	<!-- 查看好友信息 -->
	<div
		v-if="referAndEarnStore.showFriendInfo"
		class="absolute top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.4)] z-[666]"
		@click="referAndEarnStore.closeFriendInfo()"
	/>
	<ul v-if="referAndEarnStore.showFriendInfo" class="dl-friends-info">
		<div>
			<div />
			<BaseIcon name="close" class="close-icon" @click="referAndEarnStore.closeFriendInfo()" />
		</div>
		<li>
			<p>{{ $t('U0025') }} :</p>
			<p>{{ referAndEarnStore.friendChildInfo.username }}</p>
		</li>
		<li>
			<p>{{ $t('DL0051') }} :</p>
			<p>{{ Helper.formatDate(Number(referAndEarnStore.friendChildInfo.registration_time), 1) }}</p>
		</li>
		<li v-if="referAndEarnStore.friendChildInfo.recharge_amount">
			<p>{{ $t('DL0052') }} :</p>
			<p>{{ configStore.currency_symbol }}{{ referAndEarnStore.friendChildInfo.recharge_amount }}</p>
		</li>
		<li v-if="referAndEarnStore.friendChildInfo.bet_amount">
			<p>{{ $t('AF0030') }} :</p>
			<p>{{ configStore.currency_symbol }}{{ referAndEarnStore.friendChildInfo.bet_amount }}</p>
		</li>
		<li v-if="referAndEarnStore.friendChildInfo.total_reward">
			<p>{{ $t('AF0017') }} :</p>
			<p>{{ configStore.currency_symbol }}{{ referAndEarnStore.friendChildInfo.total_reward }}</p>
		</li>
		<li>
			<p>{{ $t('DL0053') }} :</p>
			<p>VIP {{ referAndEarnStore.friendChildInfo.vip_level }}</p>
		</li>
	</ul>
</template>
<script setup lang="ts">
	// import { format,addDays  } from 'date-fns'
	import Helper from '~~/apis/tool/Helper'
	const referAndEarnStore = useReferAndEarnStore()
	const configStore = useSysConfigStore()
	onMounted(() => {
		referAndEarnStore.friendParam.page = 0
		referAndEarnStore.showFriendInfo = false
		// referAndEarnStore.friendParam.time_range = ref([format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 1), 'yyyy-MM-dd')])
	})
</script>
<style lang="scss" scoped>
	.dl-sort {
		@apply px-[20px] pt-[10px] pb-[7px] ml-[14px] rounded-md cursor-pointer;
		background: $disable-color;
		&.active {
			background: $btn-main;
			color: $text-button;
		}
	}
	.dl-score-tab {
		@apply mt-[20px] grid grid-cols-4 gap-[8px];
		button {
			@apply flex-1 h-[40px] text-[13px] rounded-md;
			border: 1px solid $disable-color;
			background: $disable-color;
		}
		.active {
			color: $second;
			border-color: $second;
		}
	}
	.dl-sort-tab {
		@apply absolute top-[55px] right-[0] px-[17px] py-[17px] rounded-md;
		background: $block-bg-2;
		box-shadow: 0px 4px 12px 0px #000000b2;
		.dl-sort-tab-item {
			@apply flex items-center justify-between ml-[3px] h-[30px] text-[14px] font-[400] cursor-pointer select-none;
			p {
				@apply text-[14px];
			}
			div {
				@apply flex flex-col items-center ml-[10px] max-w-[30px];
				span {
					@apply w-[0] h-[0] border-[5px] border-solid border-transparent;
					&:first-child {
						@apply mb-[3px] border-t-[0];
						border-bottom-color: $gray;
					}
					&:last-child {
						@apply border-b-[0];
						border-top-color: $gray;
					}
					&.active-top {
						border-bottom-color: $main;
					}
					&.active-bottom {
						border-top-color: $main;
					}
				}
			}
		}
		&::before {
			content: '';
			position: absolute;
			top: -7px;
			right: 21px;
			width: 15px;
			height: 15px;
			background: $block-bg-2;
			transform: rotateZ(45deg);
		}
	}
	.dl-score-tab {
		button {
			@apply flex-1 h-[40px] text-[13px] rounded-md;
			border: 1px solid transparent;
			color: $text-base;
			background: $disable-color;
		}
		.active {
			color: $second;
			border-color: $second;
		}
	}
	.dl-friends-list {
		@apply px-[16px] pb-[10px] rounded-b-md overflow-y-auto;
		background: $block-bg-2;
		:deep(.mx-auto) {
			margin-bottom: 150px;
		}
		:deep(img) {
			margin-bottom: 0 !important;
		}
	}
	.dl-th {
		@apply mt-[20px] px-[15px] rounded-t-md;
		background: $block-bg-2;
	}
	.dl-th,
	.dl-tr {
		@apply flex items-center min-h-[40px];
		div {
			@apply flex-1;
		}
	}
	.dl-th div:nth-child(1),
	.dl-tr div:nth-child(1) {
		@apply text-left indent-[20px];
	}

	.dl-th div:nth-child(2),
	.dl-tr div:nth-child(2) {
		@apply max-w-[35%];
	}
	.dl-tr div:nth-child(1) span {
		@apply cursor-pointer;
		color: $main;
		text-decoration: underline;
	}
	.dl-tr:nth-child(odd) {
		background: $bg;
	}
	.dl-friends-info {
		@apply absolute bottom-[0] left-[0] px-[25px] pt-[20px] w-[100%] h-[320px] z-[888];
		background: $block-bg-2;
		div {
			@apply flex justify-between items-center mb-[10px];
			.close-icon {
				@apply text-[24px] cursor-pointer;
				color: #74787e;
			}
		}
		li {
			@apply flex h-[40px];
			p {
				@apply flex-1 flex items-center text-[14px];
				color: $text-lowlight;
			}
			p:nth-child(1) {
				@apply indent-[20px];
			}
			p:nth-child(2) {
				@apply max-w-[40%];
			}
		}
		li:last-child {
			border-bottom: none;
		}
	}
</style>
