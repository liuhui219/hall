<template>
	<SkinHeader :is-home="false" :title="$t('T0016')" />
	<div class="modal__content flex flex-col flex-1 overflow-hidden">
		<div class="modal__content flex flex-col flex-1 px-[16px] overflow-hidden">
			<CompTimeAndTypeSelect
				v-model="transactionStore.date"
				class="my-[10px]"
				:filter-list="transactionStore.typeList"
				:clearable="false"
				:translation-type="1"
				filter-text-key="text"
				:active-index="transactionStore.typeIndex"
				@on-click-item="transactionStore.chageType"
				@on-time-change="transactionStore.changeTime"
			/>

			<div id="transaction-scroll" class="overflow-y-scroll flex flex-col gap-y-[12px]">
				<div v-for="(item, index) in transactionStore.list" :key="index" class="transaction-card">
					<div class="transaction-card-header">
						<p>{{ $t(transactionStore.getBillTypeText(item.bill_type)) }}</p>
						<span class="small">{{ Helper.formatDate(item.created_at, 1) }}</span>
					</div>
					<div class="transaction-card-content">
						<div v-if="!item.amount2 || item.amount" class="flex w-full">
							<div class="transaction-card-content-item">
								<div class="font-[600]" :class="[item.amount < 0 ? 'error' : 'second']">
									{{ item.amount < 0 ? '-' : '+' }}
									<BasePoint :value="Math.abs(item.amount)" />
								</div>
								<div class="small">
									<div class="point-symbol-c">C</div>
									{{ $t('T0020') }}
								</div>
							</div>
							<div class="transaction-card-content-item">
								<div><BasePoint class="font-[600]" :show-plus="true" :value="item.opening_balance" /></div>
								<div class="small">{{ $t('T0023') }}</div>
							</div>
							<div class="transaction-card-content-item">
								<div><BasePoint class="font-[600]" :show-plus="true" :value="item.closing_balance" /></div>
								<span class="small">{{ $t('T0024') }}</span>
							</div>
						</div>
						<div v-if="item.amount2" class="flex w-full">
							<div class="transaction-card-content-item">
								<div class="font-[600]" :class="[item.amount2 < 0 ? 'error' : 'second']">
									{{ item.amount2 < 0 ? '-' : '+' }}
									<BasePoint :value="Math.abs(item.amount2)" />
								</div>
								<div class="small">
									<div class="point-symbol-b">B</div>
									{{ $t('T0020') }}
								</div>
							</div>
							<div class="transaction-card-content-item">
								<div><BasePoint class="font-[600]" :show-plus="true" :value="item.opening_balance2" /></div>
								<span class="small">{{ $t('T0023') }}</span>
							</div>
							<div class="transaction-card-content-item">
								<div><BasePoint class="font-[600]" :show-plus="true" :value="item.closing_balance2" /></div>
								<span class="small">{{ $t('T0024') }}</span>
							</div>
						</div>
					</div>
					<div class="transaction-card-footer">
						<span>ID: </span>
						<span class="flex-1 truncate whitespace-nowrap mx-[4px]">{{ item.bill_no }}</span>
						<BaseIcon name="copy" @click="Helper.copyText(item.bill_no)" />
					</div>
				</div>
				<BaseInfinite v-model="transactionStore.finish" :empty="!transactionStore.list.length" @load="transactionStore.loadData" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	const transactionStore = useTransactionStore()
	onMounted(transactionStore.mounted)
</script>
<style scoped lang="scss">
	.small {
		font-size: 12px;
		transform: scale(0.8334);
		display: flex;
		align-items: center;
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
		}
		.point-symbol-c {
			background: #6bb91e;
		}
		.point-symbol-b {
			background: #7931d4;
		}
	}
	.transaction-card {
		border-radius: 6px;
		background: $block-bg-2;
		padding: 0 10px;
		font-size: 12px;
		color: $text-lowlight;
		font-weight: 400;
		.transaction-card-header {
			width: 100%;
			padding: 10px 0;
			display: flex;
			justify-content: space-between;
			p {
				color: $color-white;
			}
		}
		.transaction-card-content {
			border-radius: 6px;
			background: $dark-bg-03;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 12px 0;
			width: 100%;
			gap: 16px;
			.transaction-card-content-item {
				width: 100%;
				flex: 1;
				flex-shrink: 0;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				& > div:first-child {
					font-size: 14px;
					color: $text-base;
					margin-bottom: 4px;
					&.error {
						color: $error;
					}
					&.second {
						color: $second;
					}
				}
			}
		}
		.transaction-card-footer {
			padding: 10px 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 10px;
		}
	}
</style>
