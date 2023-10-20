<template>
	<div class="px-[12px]">
		<div class="flex justify-between items-center h-[68px] shrink-0">
			<div class="flex item-center sub-header-wrap">
				<BaseIcon name="arrow-left" class="color-text-white" @click="pageRouterBack()" />
				<h1 class="ml-[15px] text-[16px] color-text-white capitalize">{{ providerStore.titlePlatText }}</h1>
			</div>
			<div class="sys-select sys-select-pc shrink-0">
				<BaseSelect
					v-model="providerStore.selectValue"
					class="sys-select-chat !w-[110px] z-[2] class-game-select"
					:list="['Popular', 'A-Z', 'Z-A']"
					:size="'m'"
					:dot="true"
				/>
			</div>
		</div>
		<BaseInput v-model:value="providerStore.searchText" class="mb-[25px]" :placeholder="$t('T0001')">
			<template #prepend>
				<div class="pl-[12px]">
					<BaseIcon name="search" class="color-text-white" />
				</div>
			</template>
		</BaseInput>
		<div class="pb-[40px]">
			<MobileGameList v-if="providerStore.list.length" :game-list="providerStore.list" :num="30" />
			<div v-else class="flex w-full flex-col items-center justify-center">
				<BaseImg :src="getResConfigImage('empty', ImageKeyEnum.home)" class="w-[25%]" />
				<div class="text-[12px]" style="color: #b7b7b7">{{ $t('NH0004') }}</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const providerStore = useProviderStore()
</script>
