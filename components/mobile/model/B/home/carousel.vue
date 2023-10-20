<template>
	<div :key="carouselKey" class="carousel" :class="{ 'carousel-nl !mb-[15px]': !userStore.isLogin }">
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
		<div v-if="!userStore.isLogin" class="carousel-nl-container">
			<button class="sys-btn btn-main btn-m carousel-nl-container-btn" @click="openRegister()">{{ $t('L1002') }}</button>
		</div>
	</div>
	<!-- <div v-else class="carousel"><BaseImg :src="$pt(info.unlogin_image?.mobile)" alt="banner" /></div> -->
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})
	const modules = reactive([SwiperAutoplay])
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
	const carouselKey = ref(0)
	onActivated(() => {
		carouselKey.value++
	})
</script>
