<template>
	<section class="home-search home-search-pc shrink-0 ml-[20px]">
		<BaseInput v-model:value="searchText" :readonly="true" :placeholder="$t('L1043')" @click="homeStore.changeShowSearchResult()">
			<template #append>
				<BaseIcon name="search" class="pl-[12px] home-search-icon" />
			</template>
		</BaseInput>
		<DesktopModelBSearchResult :info="configStore.pageConfig?.index?.search" />
	</section>
</template>
<script setup lang="ts">
	const searchText = ref('')
	const homeStore = useHomeStore()
	const configStore = useSysConfigStore()
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})
</script>
