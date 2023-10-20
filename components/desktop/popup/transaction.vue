<template>
	<div class="modal-transaction overflow-hidden flex flex-col flex-1">
		<DesktopPopupHeader :title="$t('T0016')" :invisible="!useRoute().hash?.includes('userInfo')" />
		<div class="modal__content flex flex-col flex-1 overflow-hidden">
			<CompTimeAndTypeSelect
				v-model="transactionStore.date"
				class="mt-[32px]"
				:filter-list="transactionStore.typeList"
				:clearable="false"
				:translation-type="1"
				filter-text-key="text"
				:active-index="transactionStore.typeIndex"
				@on-click-item="transactionStore.chageType"
				@on-time-change="transactionStore.changeTime"
			/>
			<div class="mt-[20px] overflow-hidden flex flex-col transaction-content-wrap transaction-card-container">
				<div class="transaction-card transaction-header mx-[16px]">
					<div>ID</div>
					<div>{{ $t('RO0007') }}</div>
					<div>{{ $t('T0020') }}</div>
					<div>{{ $t('T0023') }}</div>
					<div>{{ $t('T0024') }}</div>
					<div>{{ $t('T0017') }}</div>
				</div>
				<div class="flex flex-col overflow-y-auto transaction-card-scroll show-scroll-bar px-[16px]">
					<div v-for="(item, index) in transactionStore.list" :key="index" class="transaction-card">
						<div @click="Helper.copyText(item.bill_no)">
							<span>{{ item.bill_no }}</span> <BaseIcon name="copy" class="pointer" />
						</div>
						<div>{{ $t(transactionStore.getBillTypeText(item.bill_type)) }}</div>
						<div>
							<p v-if="!item.amount2 || item.amount" :class="[item.amount < 0 ? 'error' : 'text-second']">
								<span class="point-symbol-c">C</span>
								{{ item.amount < 0 ? '-' : '+' }}
								<BasePoint :value="Math.abs(item.amount)" />
							</p>
							<p v-if="item.amount2" :class="[item.amount2 < 0 ? 'error' : 'text-second']">
								<span class="point-symbol-b">B</span>
								{{ item.amount2 < 0 ? '-' : '+' }}
								<BasePoint :value="Math.abs(item.amount2)" />
							</p>
						</div>
						<div>
							<p v-if="!item.amount2 || item.amount"><BasePoint :value="item.opening_balance" /></p>
							<p v-if="item.amount2"><BasePoint :value="item.opening_balance2" /></p>
						</div>
						<div>
							<p v-if="!item.amount2 || item.amount"><BasePoint :value="item.closing_balance" /></p>
							<p v-if="item.amount2"><BasePoint :value="item.closing_balance2" /></p>
						</div>
						<div>{{ Helper.formatDate(item.created_at, 1) }}</div>
					</div>
					<BaseInfinite v-model="transactionStore.finish" :empty="!transactionStore.list.length" @load="transactionStore.loadData" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	const configStore = useSysConfigStore()
	const transactionStore = useTransactionStore()
	onMounted(transactionStore.mounted)
</script>
<style lang="scss" scoped>
	.transaction-card {
		border-radius: 6px;
		background: $block-bg-2;
		display: flex;
		padding: 4px 6px;
		min-height: 44px;
		font-size: 12px;
		color: $text-lowlight;
		font-weight: 400;

		flex-shrink: 0;
		align-items: center;
		gap: 4px;
		& > div {
			flex-shrink: 0;
			text-align: center;
			overflow: hidden;
			padding: 0;

			p {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 19px;
			}
			& > p:nth-child(2) {
				margin-top: 4px;
			}
		}
		& > div:first-child {
			width: 76px;
			margin-right: 4px;
			white-space: nowrap;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			& > span {
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		& > div:last-child {
			width: 80px;
		}
		& > div:nth-child(5) {
			flex: 1;
		}
		& > div:nth-child(4) {
			flex: 1;
		}
		& > div:nth-child(3) {
			flex: 1;
		}
		& > div:nth-child(2) {
			width: 60px;
		}
		&.error {
			color: $error;
		}
		&.second {
			color: $second;
		}
	}
	.transaction-card-container {
		background-color: $block-bg-2;
		border-radius: 6px;
		.transaction-card-scroll {
			& > .transaction-card:nth-child(odd) {
				background: $bg;
			}
		}
	}
	.point-symbol-b,
	.point-symbol-c {
		width: 19px;
		height: 19px;
		border-radius: 50%;
		color: #fff;
		font-size: 12px;
		font-weight: 600;
		margin-right: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		transform: scale(0.8334);
	}
	.point-symbol-c {
		background: #6bb91e;
	}
	.point-symbol-b {
		background: #7931d4;
	}
</style>
