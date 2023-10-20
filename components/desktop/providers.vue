<template>
	<div class="px-[12px] pb-[40px] wrap min-h-[80vh]">
		<div class="flex justify-between items-center h-[50] mt-[50px]">
			<div class="flex items-center">
				<BaseIcon name="arrow-left" class="color-text-white font-bold !text-[24px]" @click="pageRouterBack()" />
				<h1 class="ml-[15px] color-text-white font-bold text-[24px] capitalize">providers</h1>
			</div>
			<div class="shrink-0 flex items-center gap-[12px]">
				<BaseInput v-model:value="pragmaticStore.searchText" class="search-input !mb-0 !w-[568px]" :placeholder="$t('T0001')">
					<template #prepend>
						<div class="pl-[12px]">
							<BaseIcon name="search" class="color-text-white !relative !right-0 !bottom-0" />
						</div>
					</template>
				</BaseInput>
				<div class="sys-select sys-select-pc">
					<BaseSelect
						v-model="pragmaticStore.sortVal"
						class="sys-select-chat !w-[140px] z-[2] class-game-select"
						:list="['Popular', 'A-Z', 'Z-A']"
						:dot="true"
					/>
				</div>
			</div>
		</div>
		<template v-if="pragmaticStore.list.length">
			<div class="mt-[48px] provider-cards-wrap">
				<div v-for="(item, key) in pragmaticStore.list" :key="key" class="provider-card" @click="toProvider(item)">
					<div class="provider-card-img-wrap">
						<BaseImg :src="configStore.getProviderByPlat(item).logo" alt="" />
					</div>
					<p class="provider-card-title">{{ configStore.gamePlatMap[item].length }} games</p>
				</div>
			</div>
			<div class="mt-[48px] text-center text-[16px] font-medium">
				<p
					class="text-lowlight"
					v-html="
						$t('PR0001', {
							show_num: `<span class='color-text'>${pragmaticStore.list.length}</span>`,
							all_num: `<span class='color-text'>${pragmaticStore.allList.length}</span>`,
						})
					"
				/>
				<div v-if="pragmaticStore.list.length < pragmaticStore.allList.length" class="mt-[24px] flex justify-center">
					<button class="sys-btn game-load-more w-[300px]" @click="pragmaticStore.showMore()">{{ $t('G0007') }}</button>
				</div>
			</div>
		</template>
		<div v-else class="pt-[30px] px-[27px] flex w-full shrink-0 flex-col items-center justify-center">
			<BaseImg :src="getResConfigImage('empty', ImageKeyEnum.home)" class="w-[93px]" />
			<div class="text-[12px]" style="color: #b7b7b7">{{ $t('NH0004') }}</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const pragmaticStore = usePragmaticStore()
</script>
<style scoped lang="scss">
	.provider-cards-wrap {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		column-gap: 15px;
		row-gap: 20px;
		.provider-card {
			color: $text-lowlight;
			background: $block-bg-2;
			border-radius: $border-radius;
			@apply h-[102px] flex flex-col items-center gap-[12px] py-[16px] px-[28px] font-medium;
		}
		.provider-card-img-wrap {
			height: 47px;
			img {
				height: 100%;
			}
		}
		.provider-card-title {
			font-size: 12px;
		}
	}
</style>
