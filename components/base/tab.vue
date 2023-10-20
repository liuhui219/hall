<template>
	<div v-if="list.length" class="flex sys-tabs-wrap" :class="{ sticky: isSticky }">
		<h2
			v-for="(item, index) in list"
			:key="index"
			class="sys-tab"
			:class="[{ active: active === item[indexKey] }]"
			@click="changeActive(item[indexKey])"
		>
			{{ isSystemData ? $pt(item[titleKey]) : $t(item[titleKey]) + (item.tip || '') }}
			<p class="sys-tab-bottom" />
		</h2>
		<p class="sys-tab-bottom" />
	</div>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		active: {
			type: Number,
			default: 0,
		},
		list: {
			type: Array<any>,
			// [{index: 1, text: ''}]  indexKey
			default: () => [],
		},
		isSticky: {
			type: Boolean,
			default: false,
		},
		isSystemData: {
			type: Boolean,
			default: false,
		},
		titleKey: {
			type: String,
			default: 'text',
		},
		indexKey: {
			type: String,
			default: 'index',
		},
	})
	const emits = defineEmits(['change'])
	const changeActive = (index: number) => {
		emits('change', index)
	}
</script>
