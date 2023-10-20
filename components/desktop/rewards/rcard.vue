<template>
	<div class="rewards-card">
		<div
			class="relative px-[16px] h-[63px] rounded-t-[6px] flex items-center bg-cover bg-center bg-no-repeat"
			:style="{ 'background-image': `url(${getResConfigImage('titleReward', ImageKeyEnum.rewards)})` }"
		>
			<p class="font-bold text-[16px] max-w-[270px]">{{ $pt(data.title) || '' }}</p>
			<div class="absolute z-0 right-[16px] rewards-card-icon-wrap">
				<BaseImg class="w-[50px]" :src="getResConfigImage(`rcade${data.reward_type}`, ImageKeyEnum.rewards)" alt="" />
			</div>
		</div>

		<div class="relative z-0 p-[16px] rounded-b-[6px] rewards-card-content-wrap flex flex-col justify-between h-[128px]">
			<p class="text-[12px] font-medium text-lowlight overflow-wrap">{{ $pt(data.desc) || '' }}</p>
			<div class="w-full">
				<!-- <button
                    class="sys-btn btn-m btn-highlight w-full flex justify-center items-center gap-[8px]">Successful!
                    Receive
                    50% deposit bonus!</button> -->
				<button
					class="sys-btn btn-m w-full flex justify-center items-center gap-[8px] btn-highlight"
					:class="getDisabledBtnClass(data.end_itime > 0 && data.end_itime - rewardsStore.currentTime < 0)"
					@click="rewardsStore.rewardsSubmit(data)"
				>
					<span>{{ $t('REW0005') }}</span>
					<!-- <BaseImg class="animate-spin" :src="getResConfigImage('loading', 'rewards')" width="18"
                        alt=""></BaseImg> -->
				</button>
				<p class="mt-[12px] text-center text-[12px] text-lowlight">
					<template v-if="data.end_itime > 0">
						{{ $t('REW0004') }}:
						<span :class="true ? 'color-text-white' : 'text-error'">{{ rewardsStore.remainRcardTime(data.end_itime) }}</span>
					</template>
					<template v-else>&nbsp;</template>
				</p>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const configStore = useSysConfigStore()
	const rewardsStore = useRewardsStore()
	const propsConf = defineProps({
		data: {
			type: Object,
			default: {},
		},
	})
</script>
