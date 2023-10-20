<template>
	<section class="home-search flex-1 shrink-0">
		<!-- {{info }} -->
		<BaseInput v-model:value="searchText" :readonly="true" :placeholder="$t('L1043')" @click="homeStore.changeShowSearchResult()">
			<template #prepend>
				<BaseIcon name="search" class="pl-[12px] home-search-icon" />
			</template>
		</BaseInput>
		<DesktopModelASearchResult :info="configStore.pageConfig?.index?.search" />
		<!-- <DesktopSearchpanel v-if="searchText" class="mt-[12px]" :list="info.list" :text="searchText" /> -->
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
