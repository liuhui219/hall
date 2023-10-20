<template>
	<div class="px-[12px]">
		<div class="flex justify-between items-center h-[68px] shrink-0">
			<div class="flex item-center sub-header-wrap">
				<BaseIcon name="arrow-left" class="color-text-white" @click="pageRouterBack()" />
				<h1 class="ml-[15px] text-[16px] color-text-white capitalize">{{ $pt(classGameStore.classGameBase.title) }}</h1>
			</div>
			<div class="sys-select sys-select-pc shrink-0">
				<BaseSelect
					v-model="classGameStore.selectValue"
					class="!w-[110px] class-game-select"
					:list="['Popular', 'A-Z', 'Z-A']"
					:dot="true"
					@change="classGameStore.changeSort"
				/>
			</div>
		</div>
		<BaseInput v-model:value="classGameStore.searchText" class="mb-[25px]" :placeholder="$t('T0001')">
			<template #prepend>
				<div class="pl-[12px]">
					<BaseIcon name="search" class="color-text-white" />
				</div>
			</template>
		</BaseInput>
		<div class="pb-[40px]">
			<MobileGameList v-if="classGameStore.classGameList.length" :game-list="classGameStore.classGameList" :num="30" />
			<div v-else class="flex w-full flex-col items-center justify-center">
				<BaseImg :src="getResConfigImage('empty', ImageKeyEnum.home)" class="w-[25%]" />
				<div class="text-[12px]" style="color: #b7b7b7">{{ $t('NH0004') }}</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const classGameStore = useClassGameStore()
</script>
