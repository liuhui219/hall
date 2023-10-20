<template>
	<div class="text-center">
		<div v-if="usePagePadding().value.homeHeader" class="sub-header-wrap px-4">
			<h1 class="sub-header-title">{{ $t('H0002') }}</h1>
		</div>
		<ul class="px-4 mt-[16px]">
			<li v-for="(data, index) in promotionStore.openList" :key="index" class="mb-[16px]">
				<div class="w-full">
					<section class="text-left p-4 pr-[32%] promotion-card relative">
						<BaseImg :src="$pt(data.content)?.img" alt="vision" class="absolute right-0 bottom-0 top-0 m-auto w-[30%]" />

						<div class="flex flex-col justify-center min-h-[105px] mb-2">
							<h3 class="block-title font-bold mb-2 color-text-white whitespace-pre-wrap">{{ $pt(data.content)?.title }}</h3>
							<p class="text-xs color-text-white whitespace-pre-wrap opacity-70">{{ $pt(data.content)?.desc }}</p>
						</div>
						<!-- @click.stop="pageConfigClick($pt(data.content)?.click_type, $pt(data.content)?.click_value)" -->
						<button class="sys-btn btn-m btn-highlight w-full" @click="promotionStore.openDetail(data._id)">
							{{ $t('BC0041') }}
						</button>
						<!-- <button class="text-second absolute right-4 bottom-4 flex items-center">
							<span class="mr-1">{{ $t('PRO0001') }}</span>
							<BaseArrowDown />
						</button> -->
					</section>
				</div>
				<!-- <mobilePromotionContent :data="item" :index="index" /> -->
			</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
	const promotionStore = usePromotionStore()
</script>
