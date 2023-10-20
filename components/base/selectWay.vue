<template>
	<div class="btn-icon-group">
		<template v-for="(item, index) in list" :key="item.key">
			<button :style="{fontSize: fontSize}" :class="[item.class, `sysicon-${item.icon}`, { active: way === item.way }]" @click="handleClick(item.way)" />
			<b v-if="index != list.length - 1" class="mx-[12px] w-[1px] inline-block h-[24px] shrink-0 line" />
		</template>
	</div>
</template>
<script setup lang="ts">
	const a = defineProps({
		way: {
			type: Number,
			default: 0,
		},
		list: {
			type: <any>Array,
			default: () => [],
		},
		fontSize: {
			type:String,
			default: "30px"
		}
	})
	const emits = defineEmits(['change'])
	const handleClick = (index: number) => {
		emits('change', index)
	}
</script>
