<template>
	<div v-if="userStore.isLogin" class="flex items-center mx-[16px] marquee-container">
		<BaseImg class="h-[18px] mr-[10px]" :src="getResConfigImage('marquee', ImageKeyEnum.home)" alt="marquee" />
		<marquee-text :key="textLength" :duration="(textLength * 70) / 1000" :repeat="Math.ceil(Math.max(120 / textLength, 2))">
			<span
				v-for="(item, index) in info.list"
				:key="index"
				class="ml-[50px]"
				:class="{ pointer: item.click_id }"
				@click="pageConfigClick(item.click_id, item.click_params)"
			>
				{{ $pt(item.text) }}
			</span>
		</marquee-text>
	</div>
</template>

<script setup lang="ts">
	import MarqueeText from 'vue-marquee-text-component'
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({ list: [] }),
		},
	})
	const userStore = useUserStore()
	const textLength = computed(() => {
		let len = propsConf.info.list.reduce((res: any, cur: any) => {
			return (useNuxtApp().$pt(cur.text)?.length || 0) + 10 + res
		}, 0)
		return len
	})
</script>

<style scoped lang="scss">
	.marquee-container {
		width: calc(100% - 32px);
		padding: 10px;
		background: $home-block-bg-2;
		border: 0.5px solid $home-block-bg;
		border-radius: 6px;
		color: $home-text-base;
		font-size: 12px;
		font-weight: 400;
		text-transform: capitalize;
	}
</style>
