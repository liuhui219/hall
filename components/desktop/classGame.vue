<template>
	<div class="px-[12px] wrap">
		<div class="flex justify-between items-center h-[50] mt-[50px]">
			<div class="flex items-center">
				<BaseIcon name="arrow-left" class="color-text-white font-bold !text-[24px]" @click="pageRouterBack()" />
				<h1 class="ml-[15px] color-text-white font-bold text-[24px] capitalize">{{ $pt(classGameStore.classGameBase.title) }}</h1>
			</div>
			<div class="shrink-0 flex items-center gap-[12px]">
				<BaseInput v-model:value="classGameStore.searchText" class="!mb-0 !w-[568px] search-input" :placeholder="$t('T0001')">
					<template #prepend>
						<div class="pl-[12px]">
							<BaseIcon name="search" class="color-text-white !relative !right-0 !bottom-0" />
						</div>
					</template>
				</BaseInput>
				<div class="sys-select sys-select-pc">
					<BaseSelect
						v-model="classGameStore.selectValue"
						class="!w-[140px] class-game-select"
						:dot="true"
						:list="['Popular', 'A-Z', 'Z-A']"
						@change="classGameStore.changeSort"
					/>
				</div>
			</div>
		</div>

		<div class="pb-[40px]">
			<DesktopGameList v-if="classGameStore.classGameList.length" :game-list="classGameStore.classGameList" :num="30" />
			<div v-else class="pt-[30px] px-[27px] flex w-full shrink-0 flex-col items-center justify-center">
				<BaseImg :src="getResConfigImage('empty', ImageKeyEnum.home)" class="w-[93px]" />
				<div class="text-[12px]" style="color: #b7b7b7">{{ $t('NH0004') }}</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const classGameStore = useClassGameStore()
</script>
