<template>
	<DesktopPopupHeader :title="$pt(title)" />
	<div class="modal-roulette w-full mt-[12px] overflow-auto">
		<div v-for="(item, index) in content" :key="index" class="card-block mb-[12px] px-[12px] py-[12px]">
			<h4 class="color-text-white whitespace-pre-wrap" v-html="$pt(item.title)" />
			<p v-if="$pt(item.desc)" class="mt-[12px] text-lowlight whitespace-pre-wrap" v-html="$pt(item.desc)" />
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const keys: string[] = Object.keys(configStore.pageConfig.textConfig)
	const route = useRoute()
	let find = keys.find((el: string) => route.hash.includes('/' + el)) as string
	const contentConfig = configStore.pageConfig.textConfig[find] || {}
	const title = contentConfig.title || {}
	const content = contentConfig.list || []
</script>
