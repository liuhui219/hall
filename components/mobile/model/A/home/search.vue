<template>
	<section class="home-search px-[12px] flex" :class="{ 'relative z-[11]': homeStore.showSearchResult }">
		<BaseInput :readonly="true" class="flex-1 shrink-0 overflow-hidden" :placeholder="$t('L1043')" @click="homeStore.changeShowSearchResult()">
			<template #prepend>
				<div class="pl-[12px]">
					<BaseIcon name="search" class="home-search-icon" />
				</div>
			</template>
		</BaseInput>
		<button v-if="userStore.isLogin" class="sys-btn btn-m ml-[10px] shrink-0" @click="navigateTo('mygame')">
			<BaseIcon name="star2" class="warning !text-[20px]" />
		</button>
		<!-- home-search  -->
		<MobileModelASearchResult :info="propsConf.info" />
	</section>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})

	const homeStore = useHomeStore()
	const userStore = useUserStore()
	// const modules = reactive([SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow]);//测试服有报错
</script>
