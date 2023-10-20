<template>
	<div class="modal-reward-history">
		<DesktopPopupHeader :title="$t('REW0009')" :invisible="!useRoute().hash?.includes('userInfo')" />
		<div class="modal__content flex flex-col flex-1">
			<div class="mt-[32px] pl-[12px] h-[44px] shrink-0 flex gap-[12px] items-center card-block filters-wrap">
				<h3 class="text-[14px] font-medium placeholder-color">{{ $t('T0001') }}</h3>
				<BaseRecordSelect :list="rewardsStore.selectComp" @change="rewardsStore.selectChange" />
			</div>
			<div class="mt-[32px] overflow-y-scroll flex flex-col gap-y-[12px] reward-history-content-wrap">
				<div
					v-for="(item, index) in rewardsStore.rewardHistoryData"
					:key="index"
					class="flex items-center justify-between shrink-0 gap-[12px] card-block px-[24px] py-[11px] font-medium"
				>
					<p class="w-[220px] shrink-0 text-[14px]">{{ $pt(configStore.rewardTypesMaps[item.bill_type]?.title) }}</p>
					<div class="flex flex-col flex-grow gap-[12px] items-start">
						<p v-if="item.point" class="text-[14px] font-medium text-second">
							<BasePoint :value="item.point" />
						</p>
						<template v-if="item.props && item.props.length">
							<p v-for="(temp, count) in item.props" :key="`${index}_${count}`" class="text-[14px] font-medium text-second">
								{{ $pt(temp.item_lang)?.item_name }}
							</p>
						</template>
					</div>
					<p class="shrink-0 text-[12px] text-lowlight">{{ Helper.formatDate(item.itime) }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const configStore = useSysConfigStore()
	const rewardsStore = useRewardsStore()
	onMounted(rewardsStore.rewardHistoryMounted)
</script>
