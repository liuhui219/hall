<template>
	<div class="h-full flex flex-col overflow-hidden">
		<!-- <BasePageLoading v-if="referAndEarnStore.appLoadingStatus" class="!z-[999] !absolute opacity-80" /> -->
		<SkinHeader :is-home="false" :title="$t('DL0027')" />
		<div class="dl-mobile-dividing-line" />
		<!-- 排序及日期选择器 -->
		<!-- <div class="flex items-center justify-between relative mx-[10px] mb-[20px]">
			<BaseDatePicker v-model="dateValue" placeholder="请选择日期" format="yyyy-MM-dd" />
			<div class="dl-filter" :class="{ 'active': referAndEarnStore.showSort }" @click="referAndEarnStore.showSort = !referAndEarnStore.showSort">
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

		<div class="dl-score-tab mx-[10px] mt-[20px]">
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
		<div class="overflow-y-auto mx-[10px] dl-friend-box">
			<div
				class="dl-friends-list"
				:class="{ '!bg-transparent': referAndEarnStore.friendList.length == 0 && !referAndEarnStore.appLoadingStatus }"
			>
				<div v-for="(item, index) in referAndEarnStore.friendList" :key="index" class="dl-tr">
					<div>
						<span @click="referAndEarnStore.viewFriendsInfo(item.uid)">{{ item.username }}</span>
					</div>
					<div>{{ configStore.currency_symbol }}{{ item.reward == '' ? $fp($cp(item.reward_int64)) : item.reward }}</div>
				</div>
				<BaseInfinite
					v-model="referAndEarnStore.friendFinish"
					:empty="!referAndEarnStore.friendList.length"
					:empty-distance="50"
					:show-empty-txt="true"
					@load="referAndEarnStore.loadFriendData"
				/>
			</div>
		</div>
		<!-- 查看好友信息 -->
		<div
			v-if="referAndEarnStore.showFriendInfo"
			class="absolute w-[100%] h-[100%] bg-[rgba(0,0,0,0.7)] z-[666]"
			@click="referAndEarnStore.closeFriendInfo()"
		/>
		<ul v-if="referAndEarnStore.showFriendInfo" class="dl-friends-info">
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
			<BaseIcon name="close" class="close-icon" @click="referAndEarnStore.closeFriendInfo()" />
		</ul>
	</div>
</template>
<script setup lang="ts">
	const referAndEarnStore = useReferAndEarnStore()
	const configStore = useSysConfigStore()
	onMounted(() => {
		referAndEarnStore.friendParam.page = 0
		referAndEarnStore.showFriendInfo = false
	})
	// import { format } from 'date-fns'
	// const dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
</script>
<style scoped lang="scss">
	.dl-filter {
		@apply px-[15px] pt-[9px] pb-[6px] rounded-md;
		border: 1px solid $block-bg;
		background: $block-bg-2;
		&.active {
			background: $btn-main;
			color: $text-button;
		}
	}
	.dl-filter-tab {
		@apply absolute top-[53px] right-[15px] rounded-md;
		div {
			@apply flex items-center h-[40px] text-[12px] font-[400] indent-[17px] cursor-pointer select-none;
			box-shadow: 0px 4px 12px 0px #000000b2;
		}
		div:nth-child(even) {
			background: $bg;
		}
		div:nth-child(odd) {
			background: $block-bg-2;
		}
		div:first-child {
			@apply rounded-t-md;
		}
		div:last-child {
			@apply rounded-b-md;
		}
		&::before {
			content: '';
			position: absolute;
			top: -6px;
			right: 20px;
			width: 13px;
			height: 13px;
			background: $block-bg-2;
			transform: rotateZ(45deg);
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
			right: 18px;
			width: 15px;
			height: 15px;
			background: $block-bg-2;
			transform: rotateZ(45deg);
		}
	}
	.dl-score-tab {
		@apply grid grid-cols-4 gap-[5px];
		button {
			@apply flex-1 h-[40px] text-[13px] rounded-md;
			border: 1px solid $block-bg;
			background: $block-bg;
		}
		.active {
			color: $second;
			border-color: $second;
		}
	}
	.dl-friend-box {
		:deep(img) {
			margin-bottom: 0 !important;
		}
	}
	.dl-friends-list {
		@apply px-[12px] pb-[10px] rounded-b-md;
		background: $block-bg-2;
	}
	.dl-th,
	.dl-tr {
		@apply flex items-center min-h-[40px] px-[12px];
		div {
			@apply flex-1;
		}
	}
	.dl-th {
		@apply mt-[10px] mx-[10px] px-[23px] rounded-t-md;
		background: $block-bg-2;
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
	.dl-friends-info {
		@apply absolute bottom-[0] left-[0] px-[16px] pt-[5px] w-[100%] h-[250px] z-[888];
		background: $block-bg-2;
		li {
			@apply flex h-[40px];
			border-bottom: 1px solid $block-bg;
			p {
				@apply flex-1 flex items-center text-[14px] overflow-hidden whitespace-nowrap text-ellipsis;
				color: $text-lowlight;
			}
			p:nth-child(1) {
				@apply indent-[5px];
			}
			p:nth-child(2) {
				@apply indent-[15px];
			}
		}
		li:last-child {
			border-bottom: none;
		}
		.close-icon {
			@apply absolute top-[-35px] right-[14px] text-[24px] cursor-pointer;
			color: #74787e;
		}
	}
</style>
