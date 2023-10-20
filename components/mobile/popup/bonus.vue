<template>
	<SkinHeader :is-home="false" :title="$t('BH0008')" />
	<div class="modal__content flex flex-col flex-1 px-4 overflow-hidden">
		<div class="pl-[12px] h-[42px] shrink-0 flex gap-[5px] items-center card-block filters-wrap mt-[10px]">
			<BaseRecordSelect :list="bonusStore.selectComp" @change="bonusStore.selectChange" />
		</div>
		<div class="mt-[16px] pb-[12px] overflow-y-scroll flex flex-col gap-y-[12px] reward-history-content-wrap">
			<div v-for="(item, index) in bonusStore.list" :key="index" class="flex flex-col shrink-0 gap-[10px] card-block p-[12px] font-medium">
				<p class="text-[14px] color-text-white">{{ $pt(configStore.rewardTypesMaps[item.opt_code]?.title) }}</p>
				<p class="text-[14px] font-medium text-second flex justify-between">
					<span><BasePoint :value="item.point" /></span>
					<span :class="[item.status == 2 ? 'error' : 'color-text']">{{ $t(item.status == 2 ? 'BH0018' : 'BH0017') }}</span>
				</p>
				<p class="text-[12px] text-lowlight">{{ Helper.formatDate(item.itime, 1) }}</p>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const bonusStore = useBonusStore()
	const configStore = useSysConfigStore()
	onMounted(bonusStore.mounted)
</script>
