<template>
	<div class="rewards-view rewards-view-mobile home-view">
		<div class="mt-[24px] text-center flex flex-col justify-between">
			<div>
				<h1 class="text-[20px] font-bold">{{ $t('REW0001') }}</h1>
				<p class="text-[12px] mt-[8px] font-medium text-lowlight">{{ $t('REW0002') }}</p>
			</div>
			<div class="mt-[24px] mx-[16px] p-[16px] flex flex-col items-center border-radius redeem-promo-code">
				<h2 class="w-full text-[16px] font-bold text-left">{{ $t('R0003') }}</h2>
				<div class="mt-[12px] flex gap-[8px] justify-between w-full">
					<BaseInput v-model:value="rewardsStore.codeText" class="rewards-input inputDiv" :placeholder="$t('REW0011')" />
					<button
						class="sys-btn btn-m inputBtn"
						:class="getDisabledBtnClass(rewardsStore.codeText, 1)"
						@click="rewardsStore.giftcodereward()"
					>
						{{ $t('R0005') }}
					</button>
				</div>
			</div>
		</div>
		<div class="mt-[16px] mx-[16px] flex tabs-wrap">
			<h2 class="tab" :class="{ active: rewardsStore.tabId === 0 }" @click="rewardsStore.changeData(0)">
				{{ $t('U0005') }}
			</h2>
			<h2 class="tab" :class="{ active: rewardsStore.tabId === 1 }" @click="rewardsStore.changeData(1)">
				{{ $t('R0006') }}
			</h2>
		</div>
		<div v-show="rewardsStore.tabId === 0" class="pb-[48px] rewards">
			<div class="mt-[24px] flex flex-wrap gap-y-[16px]">
				<div v-for="reward in rewardsStore.rewardsList" :key="reward.id" class="w-full mx-[16px] rewards-card-wrap">
					<MobileRewardsRcard :data="reward" />
				</div>
			</div>
			<div v-if="!rewardsStore.rewardsList.length" class="mt-[80px] text-center text-[16px] font-medium">
				<p class="text-lowlight">{{ $t('REW0006') }}</p>
			</div>
		</div>
		<div v-show="rewardsStore.tabId === 1" class="pb-[48px] props">
			<div class="mt-[24px] flex flex-wrap gap-y-[16px]">
				<div v-for="prop in rewardsStore.showPropsList" :key="prop.item_id" class="w-full mx-[16px] rewards-card-wrap">
					<MobileRewardsPcard :data="prop" />
				</div>
			</div>
			<div v-if="!rewardsStore.showPropsList.length" class="mt-[80px] text-center text-[16px] font-medium">
				<p class="text-lowlight">{{ $t('REW0007') }}</p>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const rewardsStore = useRewardsStore()
</script>
<style scoped lang="scss">
	.rewards-view-mobile {
		.redeem-promo-code {
			background: $block-bg-2;
			.inputDiv {
				width: 70%;
			}
			.inputBtn {
				// width: 20%;
			}
		}

		.tab {
			color: $text-lowlight;
			border-bottom: 1px solid $block-bg;
			@apply p-[8px] text-[16px] font-bold  w-1/2 text-center;

			&.active {
				color: $color-white;
				border-bottom: 3px solid $second;
			}
		}
	}
</style>
