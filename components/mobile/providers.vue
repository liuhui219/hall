<template>
	<div class="px-[12px]">
		<div class="flex justify-between items-center h-[68px] shrink-0">
			<div class="flex item-center sub-header-wrap">
				<BaseIcon name="arrow-left" class="color-text-white" @click="pageRouterBack()" />
				<h1 class="ml-[15px] text-[16px] color-text-white capitalize">providers</h1>
			</div>
			<div class="sys-select sys-select-pc shrink-0">
				<BaseSelect
					v-model="pragmaticStore.sortVal"
					class="sys-select-chat !w-[110px] z-[2] class-game-select"
					:list="['Popular', 'A-Z', 'Z-A']"
					:size="'m'"
					:dot="true"
				/>
			</div>
		</div>
		<BaseInput v-model:value="pragmaticStore.searchText" class="mb-[25px]" :placeholder="$t('T0001')" @input="pragmaticStore.changeSearchText">
			<template #prepend>
				<div class="pl-[12px]">
					<BaseIcon name="search" class="color-text-white" />
				</div>
			</template>
		</BaseInput>
		<template v-if="pragmaticStore.list.length">
			<div class="pb-[40px] provider-cards-wrap provider-cards-wrap-mobile">
				<div v-for="(item, key) in pragmaticStore.list" :key="key" class="provider-card" @click="toProvider(item)">
					<div class="provider-card-img-wrap">
						<BaseImg :src="configStore.getProviderByPlat(item).logo" alt="" />
					</div>
					<p class="provider-card-title">{{ configStore.gamePlatMap[item].length }} games</p>
				</div>
			</div>
			<div class="mb-[32px] text-center text-[16px] font-medium">
				<p
					class="text-lowlight"
					v-html="
						$t('PR0001', {
							show_num: `<span class='color-text'>${pragmaticStore.list.length}</span>`,
							all_num: `<span class='color-text'>${pragmaticStore.allList.length}</span>`,
						})
					"
				/>
				<p v-if="pragmaticStore.list.length < pragmaticStore.allList.length" class="mt-[24px] text-second" @click="pragmaticStore.showMore()">
					<span>{{ $t('G0007') }}</span>
					<br />
					<BaseArrowDown />
				</p>
			</div>
		</template>
		<div v-else class="flex w-full flex-col items-center justify-center">
			<BaseImg :src="getResConfigImage('empty', ImageKeyEnum.home)" class="w-[25%]" />
			<div class="text-[12px]" style="color: #b7b7b7">{{ $t('NH0004') }}</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const pragmaticStore = usePragmaticStore()
</script>
<style scoped lang="scss">
	.provider-cards-wrap.provider-cards-wrap-mobile {
		gap: 12px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		@apply gap-y-[12px];
		.provider-card {
			color: $text-lowlight;
			background: $block-bg-2;
			border-radius: $border-radius;
			@apply px-[14px] h-[102px] flex flex-col items-center gap-[12px] py-[16px] font-medium;
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
