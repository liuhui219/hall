<template>
	<div class="modal-transaction overflow-hidden flex flex-col flex-1">
		<DesktopPopupHeader :title="$t('U0003')" :invisible="!useRoute().hash?.includes('userInfo')" />
		<div class="modal__content flex flex-col flex-1 overflow-hidden">
			<div class="mt-[32px]">
				<BaseTab :list="transactionStore.tabList" :active="transactionStore.tabIndexActive" @change="transactionStore.changeTabIndexActive" />
			</div>
			<div class="mt-[32px] h-[44px] px-[12px] shrink-0 flex gap-[12px] items-center card-block filters-wrap border-[1px] border-btn">
				<h3 class="text-[14px] font-medium placeholder-color">{{ $t('T0001') }}</h3>
				<BaseRecordSelect :list="transactionStore.selectComp" @change="transactionStore.selectChange" />
			</div>
			<div class="mt-[32px] overflow-y-scroll flex flex-col gap-y-[12px] transaction-content-wrap flex-1">
				<template v-if="transactionStore.tabIndexActive === 0">
					<div
						v-for="(item, index) in transactionStore.payList"
						:key="index"
						class="flex items-center shrink-0 gap-[12px] card-block px-[24px] h-[44px] font-medium"
					>
						<p class="w-[150px] text-[14px]">{{ item.usdt_point ? $t('TR0008') : $t('TR0002') }}</p>
						<p class="w-[120px] text-[16px] font-bold warning">
							<BasePoint :value="item.usdt_point || item.point" :show-usdt="!!item.usdt_point" />
						</p>
						<div class="flex justify-between flex-grow text-[12px]">
							<p :class="transactionStore.renderDepositClass(item.status).class">
								{{ transactionStore.renderDepositClass(item.status).text }}
							</p>
							<p class="text-lowlight">{{ Helper.formatDate(item.time_unix, 1) }}</p>
						</div>
					</div>
					<BaseListLoading :loading="transactionStore.loading" @load="transactionStore.loadData" />
				</template>
				<template v-if="transactionStore.tabIndexActive === 1">
					<div
						v-for="(item, index) in transactionStore.withdrawList"
						:key="index"
						class="flex flex-col shrink-0 justify-center py-[12px] gap-[12px] card-block font-medium"
					>
						<div class="flex items-center gap-x-[12px] px-[24px]">
							<p class="w-[150px] text-[14px]">{{ $pt(item.type_name) }}</p>
							<p class="w-[120px] text-[16px] font-bold error">
								<BasePoint :value="item.usdt_point || item.point" :show-usdt="!!item.usdt_point" />
							</p>
							<div class="flex justify-between item-center flex-grow text-[12px]">
								<p :class="transactionStore.renderWithdrawClass(item.status).class">
									{{ transactionStore.renderWithdrawClass(item.status).text }}
								</p>
								<p class="text-lowlight">{{ Helper.formatDate(item.time_unix, 1) }}</p>
							</div>
						</div>
						<hr class="withdraw-card-divide border-[1px] border-btn" />
						<p class="px-[24px] text-[12px] text-lowlight">{{ $t('T0007') }} {{ item.reason }}</p>
					</div>
					<BaseListLoading :loading="transactionStore.loading" @load="transactionStore.loadData" />
				</template>
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
