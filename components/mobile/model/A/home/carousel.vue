<template>
	<div :key="carouselKey" class="carousel" :class="{ 'carousel-nl': !userStore.isLogin }">
		<swiper v-if="userStore.isLogin" :loop="isLoop" :autoplay="autoPalyConfig" :modules="modules">
			<swiper-slide
				v-for="(item, index) in carouselList"
				:key="index"
				@click="pageConfigClick(item.click_id, item.click_params, `banner_click_${index}`)"
			>
				<div class="carousel-item">
					<BaseImg :src="$pt(item.url)" alt="banner 1" />
				</div>
			</swiper-slide>
		</swiper>
		<swiper v-else :loop="isLoop" :autoplay="autoPalyConfig" :modules="modules">
			<swiper-slide
				v-for="(item, index) in carouselList"
				:key="index"
				@click="pageConfigClick(item.click_id, item.click_params, `banner_click_${index}`)"
			>
				<div class="carousel-item">
					<BaseImg :src="$pt(item.url)" alt="banner 1" />
				</div>
			</swiper-slide>
		</swiper>
		<div
			v-if="!userStore.isLogin"
			class="carousel-nl-container"
			:style="{ backgroundImage: `url(${getResConfigImage('carousel_text_m', ImageKeyEnum.home)})` }"
		>
			<button class="sys-btn btn-main btn-m carousel-nl-container-btn" @click="openRegister()">{{ $t('L1002') }}</button>
			<div class="carousel-nl-container-text">
				<p>{{ $t('L1042') }}</p>
			</div>
		</div>
		<div v-else-if="resConfig.marqueeConfig.status" class="flex overflow-hidden marquee">
			<div class="marquee-left mr-[20px]">
				<span>Online</span>
				<BaseNumber class="ml-[6px]" :value="appStore.onlineCount" />
			</div>
			<div class="flex items-center marquee-right">
				<BaseImg class="h-[17px] mr-[2px]" :src="getResConfigImage('laba', ImageKeyEnum.home)" alt="laba" />
				<swiper
					class="marquee-swiper"
					:loop="true"
					:autoplay="{ delay: 0, disableOnInteraction: false }"
					:speed="4000"
					:space-between="50"
					:allow-touch-move="false"
					:modules="modules"
				>
					<swiper-slide v-for="(item, index) in homeStore.recent" :key="index">
						<div>
							<span
								v-html="
									$t('H0003', {
										// symbol: configStore.currency_symbol,
										uid: item.user,
										point: `<em class='text-number'>${configStore.currency_symbol}${$fp($cp(item.point))}</em>`,
										game: configStore.getGameByGameId(item.game_id).name,
									})
								"
							/>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})

	const appStore = useAppStore()
	const userStore = useUserStore()
	const carouselList = computed(() => {
		if (userStore.isLogin) {
			return propsConf.info.list.filter(
				(el: any) => el.login_type != CarouselLoginTypeEnum.notLogin && el.device_type != CarouselDeviceTypeEnum.desktop && el.allowed
			)
		} else {
			return propsConf.info.list.filter(
				(el: any) => el.login_type == CarouselLoginTypeEnum.notLogin && el.device_type != CarouselDeviceTypeEnum.desktop && el.allowed
			)
		}
	})
	const isLoop = computed(() => {
		return carouselList.value.length > 1
	})
	const autoPalyConfig = computed(() => {
		if (isLoop.value) {
			return {
				delay: 5000,
				disableOnInteraction: false,
			}
		} else {
			return false
		}
	})
	const homeStore = useHomeStore()
	const configStore = useSysConfigStore()
	const modules = reactive([SwiperAutoplay])
	const carouselKey = ref(0)
	onActivated(() => {
		carouselKey.value++
	})
</script>
