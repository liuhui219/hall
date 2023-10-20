<template>
	<div v-if="carouselList.length" class="carousel-pc mb-[36px]" :class="{ 'carousel-nl': !userStore.isLogin, 'mt-[32px]': userStore.isLogin }">
		<swiper v-if="userStore.isLogin" :slides-per-view="3" :space-between="16" :loop="isLoop" :autoplay="autoPalyConfig" :modules="modules">
			<swiper-slide v-for="(item, index) in carouselList" :key="index">
				<div class="carousel-item" @click="pageConfigClick(item.click_id, item.click_params, `banner_click_${index}`)">
					<BaseImg :src="$pt(item.url)" alt="banner" />
				</div>
			</swiper-slide>
		</swiper>

		<swiper v-else :slides-per-view="1" :loop="isLoop" :autoplay="autoPalyConfig" :modules="modules">
			<swiper-slide v-for="(item, index) in carouselList" :key="index">
				<div class="carousel-item" @click="pageConfigClick(item.click_id, item.click_params, `banner_click_${index}`)">
					<BaseImg :src="$pt(item.url)" alt="banner" />
				</div>
			</swiper-slide>
		</swiper>
		<div
			v-if="!userStore.isLogin"
			class="carousel-nl-container"
			:style="{ backgroundImage: `url(${getResConfigImage('carousel_text_p', ImageKeyEnum.home)})` }"
		>
			<button class="sys-btn btn-main btn-m carousel-nl-container-btn" @click="openRegister()">{{ $t('L1002') }}</button>
			<div class="carousel-nl-container-text">
				<p>{{ $t('L1042') }}</p>
			</div>
		</div>
	</div>
	<!-- <div v-else class="mb-20 rounded-[20px] carousel-pc overflow-hidden">
		<BaseImg :src="$pt(info.unlogin_image?.pc)" alt="banner"></BaseImg>
	</div> -->
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})
	const userStore = useUserStore()
	const carouselList = computed(() => {
		if (userStore.isLogin) {
			return propsConf.info.list.filter(
				(el: any) => el.login_type != CarouselLoginTypeEnum.notLogin && el.device_type != CarouselDeviceTypeEnum.mobile && el.allowed
			)
		} else {
			return propsConf.info.list.filter(
				(el: any) => el.login_type == CarouselLoginTypeEnum.notLogin && el.device_type != CarouselDeviceTypeEnum.mobile && el.allowed
			)
		}
	})
	const isLoop = computed(() => {
		if (userStore.isLogin) {
			return carouselList.value.length > 2
		} else {
			return carouselList.value.length > 1
		}
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
	const modules = reactive([SwiperAutoplay])
	const carouselKey = ref(0)
	onActivated(() => {
		carouselKey.value++
	})
</script>
