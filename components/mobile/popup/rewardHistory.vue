<template>
	<SkinHeader :is-home="false" :title="$t('REW0009')" />
	<div class="modal__content flex flex-col flex-1 px-4 overflow-hidden">
		<div class="pl-[12px] h-[42px] shrink-0 flex gap-[5px] items-center card-block filters-wrap mt-[10px]">
			<BaseRecordSelect :list="rewardsStore.selectComp" @change="rewardsStore.selectChange" />
		</div>
		<div class="mt-[16px] pb-[12px] overflow-y-scroll flex flex-col gap-y-[12px] reward-history-content-wrap">
			<div
				v-for="(item, index) in rewardsStore.rewardHistoryData"
				:key="index"
				class="flex flex-col shrink-0 gap-[10px] card-block p-[12px] font-medium"
			>
				<p class="text-[14px]">{{ $pt(configStore.rewardTypesMaps[item.bill_type]?.title) }}</p>
				<p v-if="item.point" class="text-[14px] font-medium text-second">
					<BasePoint :value="item.point" />
				</p>
				<template v-if="item.props && item.props.length">
					<p v-for="(temp, count) in item.props" :key="`${index}_${count}`" class="text-[16px] font-medium text-second">
						{{ $pt(temp.item_lang)?.item_name }}
					</p>
				</template>

				<p class="text-[12px] text-lowlight">{{ Helper.formatDate(item.itime) }}</p>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const rewardsStore = useRewardsStore()
	const configStore = useSysConfigStore()
	onMounted(rewardsStore.rewardHistoryMounted)
</script>
