<template>
	<div class="brand-ambassador-view wrap">
		<div class="my-[76px]">
			<h1 class="text-[48px] font-bold text-center">{{ $t('H0029') }}</h1>
			<div class="mt-[48px]">
				<BaseImg class="w-full object-contain" :src="$pt(baStore.data.pc_banner_url)" alt="" />
			</div>
			<section class="mt-[48px]">
				<h2 class="text-[24px] font-bold">{{ $pt(baStore.data.cooperation1.title) }}</h2>
				<p class="mt-[24px] text-[16px] font-medium placeholder-color">{{ $pt(baStore.data.cooperation1.content) }}</p>
			</section>
			<section class="mt-[48px]">
				<h2 class="text-[24px] font-bold">{{ $pt(baStore.data.cooperation2.title) }}</h2>
				<swiper
					class="mt-[24px]"
					:effect="'coverflow'"
					:pagination="{ el: '.brand-ambassador-swiper-pagination', type: 'bullets' }"
					:autoplay="{ delay: 2000 }"
					:loop="true"
					:grab-cursor="true"
					:centered-slides="true"
					:slides-per-view="1.6"
					:loop-prevents-slide="true"
					:coverflow-effect="{
						rotate: 0,
						stretch: 60,
						depth: 100,
						scale: 0.8,
						slideShadows: false,
					}"
					:modules="modules"
				>
					<swiper-slide
						v-for="photo in baStore.data.cooperation2.swiper_list"
						:key="`photo-${photo.sort}`"
						@click="pageConfigClick(1, photo.link)"
					>
						<div class="overflow-hidden slide-img-wrap border-radius">
							<BaseImg class="object-cover" :src="$pt(photo.img_url)" alt="" />
						</div>
					</swiper-slide>
				</swiper>
				<div class="mt-[24px] text-center brand-ambassador-swiper-pagination" />
				<p class="mt-[24px] text-[16px] font-medium placeholder-color">{{ $pt(baStore.data.cooperation2.content) }}.</p>
			</section>
			<section class="mt-[48px]">
				<h2 class="text-[24px] font-bold">{{ $pt(baStore.data.mediaReports.title) }}</h2>
				<div class="mt-[24px] flex gap-x-[12px]">
					<div
						v-for="media in baStore.data.mediaReports.media_list"
						:key="`media-${media.sort}`"
						class="w-[150px] h-[90px] media-img-wrap"
						@click="pageConfigClick(1, media.link)"
					>
						<BaseImg class="object-cover" :src="media.logo_url" alt="" />
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
<script setup lang="ts">
	const baStore = userBrandAmbassadorStore()
	const modules = reactive([SwiperPagination, SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
</script>
