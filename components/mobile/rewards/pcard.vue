<template>
	<div class="rewards-card">
		<div
			class="relative px-[16px] h-[63px] rounded-t-[6px] flex items-center bg-cover bg-center bg-no-repeat"
			:style="{ 'background-image': `url(${getResConfigImage('titleProp', ImageKeyEnum.rewards)})` }"
		>
			<p class="font-bold text-[16px] max-w-[203px]">{{ $pt(data.cfg.item_lang)?.item_name }}</p>
			<div class="absolute z-0 right-[16px] rewards-card-icon-wrap">
				<BaseImg class="w-[50px]" :src="getResConfigImage(`rprop${data.cfg.item_type}`, ImageKeyEnum.rewards)" alt="" />
			</div>
		</div>
		<div class="relative z-0 p-[16px] rounded-b-[6px] rewards-card-content-wrap flex flex-col justify-between">
			<p class="text-[12px] font-medium text-lowlight max-w-[300px] overflow-wrap">
				{{ $pt(data.cfg.item_lang)?.task_desc }}
			</p>

			<div class="mt-[12px] w-full">
				<button
					v-if="data.used_status"
					class="sys-btn btn-m w-full flex justify-center btn-highlight items-center gap-[8px]"
					@click="rewardsStore.gotoType(data.cfg.item_type)"
				>
					<!-- <span>{{ $t(rewardsStore.returnCard(data.cfg.item_type).btnText) }}</span> -->
					<span>{{ data.cfg.item_type == 1 ? $t('H0036') : $t('R0010') }}</span>
					<!-- <BaseImg v-if="data.used_status == 1" class="animate-spin"
						:src="getResConfigImage('loading', 'rewards')" width="18" alt="" /> -->
				</button>
				<button
					v-else
					class="sys-btn btn-m w-full flex justify-center items-center gap-[8px] btn-highlight"
					@click="rewardsStore.useNow(data)"
				>
					<span>{{ $t('REW0003') }}</span>
				</button>
				<p v-if="data.used_status == 3" class="mt-[12px] text-[12px] text-error">{{ $t('R0001') }}</p>
				<p v-else class="mt-[12px] text-center text-[12px] text-lowlight">
					<template v-if="!!rewardsStore.remainPcardTime(data)">
						{{ $t('REW0004') }}:
						<span class="inline-block flex-1 min-w-[112px] text-left ml-[4px] color-text-white whitespace-nowrap">{{
							rewardsStore.remainPcardTime(data)
						}}</span>
					</template>
					<template v-else>&nbsp;</template>
				</p>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const rewardsStore = useRewardsStore()
	defineProps({
		data: {
			type: Object,
			default: () => ({}),
		},
	})
</script>
