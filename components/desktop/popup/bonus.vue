<template>
	<div class="modal-reward-history">
		<DesktopPopupHeader :title="$t('BH0008')" :invisible="!useRoute().hash?.includes('userInfo')" />
		<div class="modal__content flex flex-col flex-1">
			<div class="mt-[32px] pl-[12px] h-[44px] shrink-0 flex gap-[12px] items-center card-block filters-wrap">
				<h3 class="text-[14px] font-medium placeholder-color">{{ $t('T0001') }}</h3>
				<BaseRecordSelect :list="bonusStore.selectComp" @change="bonusStore.selectChange" />
			</div>
			<div class="mt-[32px] overflow-y-scroll flex flex-col gap-y-[12px] reward-history-content-wrap">
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
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	const configStore = useSysConfigStore()
	const bonusStore = useBonusStore()
	onMounted(bonusStore.mounted)
</script>
