<template>
	<div class="modal-bets-history">
		<DesktopPopupHeader :title="$t('U0004')" :invisible="!useRoute().hash?.includes('userInfo')" />
		<div class="modal__content flex flex-col flex-1 overflow-hidden">
			<div class="mt-[32px]">
				<BaseTab :list="betHistoryStore.tabList" :active="betHistoryStore.tabIndexActive" @change="betHistoryStore.changeTabIndexActive" />
			</div>
			<div class="mt-[32px] pl-[12px] h-[44px] shrink-0 flex gap-[12px] items-center card-block filters-wrap">
				<h3 class="text-[14px] font-medium placeholder-color">{{ $t('T0001') }}</h3>
				<BaseRecordSelect :list="betHistoryStore.selectComp" @change="betHistoryStore.selectChange" />
			</div>
			<div ref="target" class="mt-[32px] overflow-y-scroll flex flex-col gap-y-[12px] bets-history-content-wrap">
				<div
					v-for="(item, index) in betHistoryStore.list"
					:key="index"
					class="flex items-center shrink-0 gap-[12px] card-block px-[24px] h-[44px] font-medium"
				>
					<p class="w-[200px] text-[14px] truncate flex-1">{{ item.gname }}</p>
					<p class="w-[80px] text-[12px] text-lowlight text-right whitespace-nowrap shrink-0">
						<BasePoint :value="item.bet" />
					</p>
					<p
						class="w-[120px] text-right text-[16px] font-bold whitespace-nowrap shrink-0"
						:class="betHistoryStore.renderPointClass(item.hit - item.bet)"
					>
						<BasePoint :value="item.hit - item.bet" />
					</p>
					<p class="text-[12px] text-lowlight shrink-0">{{ Helper.formatDate(item.itime, 1) }}</p>
				</div>
				<BaseListLoading :target="target" :loading="betHistoryStore.loading" @load="betHistoryStore.loadData" />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import Helper from '~~/apis/tool/Helper'
	const target = ref()
	const configStore = useSysConfigStore()
	const betHistoryStore = useBetHisotryStore()
	onMounted(betHistoryStore.mounted)
</script>
<style scoped lang="scss">
	.modal-bets-history {
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		.filters-wrap {
			border: 1px solid $color-btn-border;
		}

		.bets-history-content-wrap {
			flex: 1;
		}
	}
</style>
