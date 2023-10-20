<template>
	<SkinHeader :is-home="false" :title="$t('U0003')" />
	<div class="modal__content flex flex-col flex-1 overflow-hidden">
		<div class="px-4 mt-[10px]">
			<BaseTab :list="transactionStore.tabList" :active="transactionStore.tabIndexActive" @change="transactionStore.changeTabIndexActive" />
		</div>
		<div class="px-4">
			<div class="mt-[16px] shrink-0 flex gap-[12px] items-center card-block border-[1px] filters-wrap pl-[12px]">
				<BaseRecordSelect :list="transactionStore.selectComp" @change="transactionStore.selectChange" />
			</div>
		</div>
		<div class="mt-[16px] overflow-y-auto flex flex-col gap-y-[12px] transaction-content-wrap">
			<template v-if="transactionStore.tabIndexActive === 0">
				<div v-for="(item, index) in transactionStore.payList" :key="index" class="gap-y-[12px] flex flex-col px-4">
					<div class="flex flex-col shrink-0 gap-[10px] card-block p-[12px] font-medium">
						<p class="text-[14px] color-text-white">{{ item.usdt_point ? $t('TR0008') : $t('TR0002') }}</p>
						<div class="flex justify-between items-center">
							<p :class="transactionStore.renderDepositClass(item.status).class">
								{{ transactionStore.renderDepositClass(item.status).text }}
							</p>
							<p class="text-[16px] font-bold warning">
								<BasePoint :value="item.usdt_point || item.point" :show-usdt="!!item.usdt_point" />
							</p>
						</div>
						<p>{{ Helper.formatDate(item.time_unix, 1) }}</p>
					</div>
				</div>
			</template>
			<div v-if="transactionStore.tabIndexActive === 1" class="pb-[12px] gap-y-[12px] flex flex-col px-4">
				<div
					v-for="(item, index) in transactionStore.withdrawList"
					:key="index"
					class="flex flex-col shrink-0 justify-center py-[12px] gap-[10px] card-block font-medium"
				>
					<p class="px-[12px] text-[14px] color-text-white">{{ $pt(item.type_name) }}</p>
					<div class="px-[12px] flex justify-between items-center">
						<p :class="transactionStore.renderWithdrawClass(item.status).class">
							{{ transactionStore.renderWithdrawClass(item.status).text }}
						</p>
						<p class="text-[16px] font-bold error">
							<BasePoint :value="item.usdt_point || item.point" :show-usdt="!!item.usdt_point" />
						</p>
					</div>
					<p class="px-[12px]">{{ Helper.formatDate(item.time_unix, 1) }}</p>
					<hr class="withdraw-card-divide" />
					<p class="px-[12px] text-[12px]">{{ $t('T0007') }} {{ item.reason }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	// import PullRefresh from "pull-refresh-vue3";
	const configStore = useSysConfigStore()
	const transactionStore = useTransactionStore()
	onMounted(transactionStore.mounted)
</script>
