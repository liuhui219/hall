<template>
	<div class="wrap text-center">
		<div class="py-[72px]">
			<h1 class="text-[48px] font-bold text-center mb-[36px]">{{ $t('H0002') }}</h1>
			<ul class="grid grid-cols-3 gap-6">
				<li v-for="(data, index) in promotionStore.openList" :key="index" class="mb-8">
					<!-- <desktopPromotionContent :data="item" :index="index" /> -->
					<div class="w-full">
						<section class="text-left p-4 pr-[35%] promotion-card relative">
							<BaseImg :src="$pt(data.content)?.img" class="absolute right-0 bottom-0 top-0 m-auto w-[39%]" />

							<div class="flex flex-col justify-center h-[105px] mb-2">
								<h3 class="block-title font-bold mb-2 color-text-white whitespace-pre-wrap">{{ $pt(data.content)?.title }}</h3>
								<p class="color-text-white whitespace-pre-wrap opacity-70">{{ $pt(data.content)?.desc }}</p>
							</div>
							<button class="sys-btn btn-m btn-highlight w-[200px]" @click="promotionStore.openDetail(data._id)">
								{{ $t('BC0041') }}
							</button>
							<!-- <button class="text-second absolute right-4 bottom-4 flex items-center">
								<span class="mr-1">{{ $t('PRO0001') }}</span>
								<BaseArrowDown />
							</button> -->
						</section>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const promotionStore = usePromotionStore()
</script>
