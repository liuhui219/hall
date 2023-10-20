<template>
	<div class="brand-ambassador-view brand-ambassador-view-mobile">
		<div class="mb-[32px]">
			<div class="sub-header-wrap px-[16px]">
				<h1 class="sub-header-title">{{ $t('H0029') }}</h1>
			</div>
			<div class="px-[16px] mt-[10px]">
				<BaseImg class="w-full object-contain" :src="$pt(baStore.data.banner_url)" alt="" />
			</div>
			<section class="mt-[32px] px-[16px]">
				<h2 class="text-[20px] font-bold">{{ $pt(baStore.data.cooperation1.title) }}</h2>
				<p class="mt-[12px] text-[14px] font-medium placeholder-color">
					{{ $pt(baStore.data.cooperation1.content) }}
				</p>
			</section>
			<section class="mt-[24px] px-[16px]">
				<h2 class="text-[20px] font-bold">{{ $pt(baStore.data.cooperation2.title) }}</h2>
				<swiper
					class="mt-[12px]"
					:pagination="{ el: '.brand-ambassador-swiper-pagination', type: 'bullets' }"
					:autoplay="{ delay: 2000 }"
					:loop="true"
					:grab-cursor="true"
					:centered-slides="true"
					:slides-per-view="1"
					:loop-prevents-slide="true"
					:modules="modules"
				>
					<swiper-slide
						v-for="photo in baStore.data.cooperation2.swiper_list"
						:key="`photo-${photo.sort}`"
						@click="pageConfigClick(1, photo.link)"
					>
						<div class="border-radius overflow-hidden slide-img-wrap">
							<BaseImg class="object-cover" :src="$pt(photo.img_url)" alt="" />
						</div>
					</swiper-slide>
				</swiper>
				<div class="mt-[12px] text-center brand-ambassador-swiper-pagination" />
				<p class="mt-[12px] text-[14px] font-medium placeholder-color">{{ $pt(baStore.data.cooperation2.content) }}</p>
			</section>
			<section class="mt-[24px] px-[16px]">
				<h2 class="text-[20px] font-bold">{{ $pt(baStore.data.mediaReports.title) }}</h2>
				<div class="mt-[12px] flex flex-wrap justify-between gap-y-[6px]">
					<div
						v-for="media in baStore.data.mediaReports.media_list"
						:key="`media-${media.sort}`"
						class="w-[23%] media-img-wrap shrink-0"
						@click="pageConfigClick(1, media.link)"
					>
						<BaseImg class="object-cover" :src="media.logo_url" alt="" />
					</div>
					<div class="w-[23%] h-0" />
					<div class="w-[23%] h-0" />
					<div class="w-[23%] h-0" />
				</div>
			</section>
		</div>
	</div>
</template>
<script setup lang="ts">
	const baStore = userBrandAmbassadorStore()

	const modules = reactive([SwiperPagination, SwiperAutoplay, SwiperNavigation, SwiperEffectCoverflow])
</script>
