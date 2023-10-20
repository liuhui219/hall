<template>
	<SkinHeader :is-home="false" :title="$t('U0004')" />
	<div class="modal__content flex flex-col flex-1 overflow-hidden">
		<div class="px-4 mt-[10px]">
			<BaseTab :list="betHistoryStore.tabList" :active="betHistoryStore.tabIndexActive" @change="betHistoryStore.changeTabIndexActive" />
		</div>
		<div class="px-4">
			<div class="mt-[16px] pl-[12px] shrink-0 flex gap-[12px] items-center card-block filters-wrap">
				<BaseRecordSelect :list="betHistoryStore.selectComp" @change="betHistoryStore.selectChange" />
			</div>
		</div>

		<div ref="target" class="mt-[16px] overflow-y-auto flex flex-col flex-1">
			<!-- <PullRefresh v-model="betHistoryStore.refreshing" pulling-text="loading" loading-text="refreshing" @refresh="betHistoryStore.refresh" loosing-text="release to refresh" success-text="refreshed"> -->
			<div class="pb-[12px] gap-y-[12px] flex flex-col px-4">
				<div
					v-for="(item, index) in betHistoryStore.list"
					:key="index"
					class="flex flex-col shrink-0 gap-[10px] card-block p-[12px] font-medium"
				>
					<p class="text-[14px]">{{ item.gname }}</p>
					<div class="flex justify-between items-center">
						<p class="text-[12px] text-lowlight"><BasePoint :value="item.bet" /></p>
						<p :class="betHistoryStore.renderPointClass(item.hit - item.bet)" class="text-[16px] font-bold">
							<BasePoint :value="item.hit - item.bet" />
						</p>
					</div>
					<p class="text-[12px] text-lowlight">{{ Helper.formatDate(item.itime, 1) }}</p>
				</div>
			</div>
			<BaseListLoading :target="target" :loading="betHistoryStore.loading" @load="betHistoryStore.loadData" />
			<!-- </PullRefresh> -->
		</div>
	</div>
</template>
<script lang="ts" setup>
	import Helper from '~~/apis/tool/Helper'

	const target = ref()
	// import PullRefresh from "pull-refresh-vue3";
	const configStore = useSysConfigStore()
	const betHistoryStore = useBetHisotryStore()
	onMounted(betHistoryStore.mounted)
</script>
