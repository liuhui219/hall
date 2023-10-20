<template>
	<div class="px-[12px] wrap min-h-[80vh]">
		<div class="flex justify-between items-center h-[50] mt-[50px]">
			<div class="flex items-center">
				<BaseIcon name="arrow-left" class="color-text-white font-bold !text-[24px]" @click="pageRouterBack()" />
				<h1 class="ml-[15px] color-text-white font-bold text-[24px] capitalize">{{ providerStore.titlePlatText }}</h1>
			</div>
			<div class="shrink-0 flex items-center gap-[12px]">
				<BaseInput v-model:value="providerStore.searchText" class="search-input !mb-0 !w-[568px]" :placeholder="$t('T0001')">
					<template #prepend>
						<div class="pl-[12px]">
							<BaseIcon name="search" class="color-text-white !relative !right-0 !bottom-0" />
						</div>
					</template>
				</BaseInput>
				<div class="sys-select sys-select-pc">
					<BaseSelect
						v-model="providerStore.selectValue"
						class="sys-select-chat !w-[140px] z-[2] class-game-select"
						:list="['Popular', 'A-Z', 'Z-A']"
						:size="'m'"
						:dot="true"
					/>
				</div>
			</div>
		</div>

		<div class="my-[48px] provider-cards-wrap">
			<DesktopGameList v-if="providerStore.list.length" :game-list="providerStore.list" />
			<div v-else class="pt-[30px] px-[27px] flex w-full shrink-0 flex-col items-center justify-center">
				<BaseImg :src="getResConfigImage('empty', ImageKeyEnum.home)" class="w-[93px]" />
				<div class="text-[12px]" style="color: #b7b7b7">{{ $t('NH0004') }}</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const providerStore = useProviderStore()
</script>
