<template>
	<div v-if="userStore.isLogin" class="flex items-center marquee-container">
		<BaseImg class="h-[18px] mr-[10px]" :src="getResConfigImage('marquee', ImageKeyEnum.home)" alt="marquee" />
		<marquee-text :key="textLength" :duration="(textLength * 70) / 1000" :repeat="Math.ceil(Math.max(400 / textLength, 2))">
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
		width: 100%;
		padding: 15px 20px;
		background: $home-bg;
		border: 0.5px solid $home-block-bg;
		border-radius: 6px;
		font-size: 12px;
		color: $home-text-base;
		font-weight: 400;
		text-transform: capitalize;
	}
</style>
