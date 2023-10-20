<template>
	<div class="rewards-view rewards-view-pc wrap">
		<div
			class="mt-[76px] py-[48px] h-[306px] border-radius text-center flex flex-col justify-between redeem-promo-code"
			:style="{ backgroundImage: `url(${getResConfigImage('reward-bg', ImageKeyEnum.rewards)})` }"
		>
			<div>
				<h1 class="text-[48px] font-bold">{{ $t('REW0001') }}</h1>
				<p class="mt-[8px] text-[24px] font-bold text-lowlight">{{ $t('REW0002') }}</p>
			</div>
			<div class="mx-auto flex flex-col items-center w-[550px]">
				<div class="flex gap-[12px] w-full">
					<BaseInput v-model:value="rewardsStore.codeText" class="rewards-input flex-grow" :placeholder="$t('REW0011')" :clear="false" />
					<button class="sys-btn btn-m" :class="getDisabledBtnClass(rewardsStore.codeText, 1)" @click="rewardsStore.giftcodereward()">
						{{ $t('R0005') }}
					</button>
				</div>
				<!-- <p class="mt-[12px] text-right text-[12px] text-second w-full">{{ $t("R0004") }}</p> -->
			</div>
		</div>

		<div v-if="rewardsStore.rewardsList.length" class="mt-[48px] rewards pb-[48px]">
			<h2 class="text-[24px] font-bold">{{ $t('U0005') }}</h2>
			<div class="mt-[24px] flex flex-wrap gap-y-[24px]">
				<div v-for="reward in rewardsStore.rewardsList" :key="reward.id" class="rewards-card-wrap">
					<DesktopRewardsRcard :data="reward" />
				</div>
			</div>
		</div>
		<div v-if="rewardsStore.showPropsList.length" class="mt-[48px] props pb-[48px]">
			<h2 class="text-[24px] font-bold">{{ $t('R0006') }}</h2>
			<div class="mt-[24px] flex flex-wrap gap-y-[24px]">
				<div v-for="prop in rewardsStore.showPropsList" :key="prop.item_id" class="rewards-card-wrap">
					<DesktopRewardsPcard :data="prop" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const rewardsStore = useRewardsStore()
</script>
<style scoped lang="scss">
	.rewards-view-pc {
		.redeem-promo-code {
			background-repeat: no-repeat;
			background-size: cover;
		}

		.rewards-card-wrap {
			$gap-x: 24px;
			$card-width: calc((100% - $gap-x * 2) / 3);
			width: $card-width;

			&:not(:nth-child(3n)) {
				margin-right: $gap-x;
			}
		}
	}
</style>
