<template>
	<div class="promotion-content flex flex-col h-full">
		<section class="text-left bg-block-bg-2 relative rounded-[15px] rounded-b-none shrink-0">
			<div class="flex items-center">
				<div class="h-[48px] flex items-center justify-end absolute right-0 top-0">
					<BaseIcon name="close" class="p-[12px] text-[24px]" style="color: #4a4a4a" @click="closePopup()" />
				</div>
				<BaseImg :src="$pt(promotionStore.activity.content)?.img" alt="" class="w-[200px] h-[200px] absolute bottom-0 left-0 z-2" />
				<div class="w-[237px] shrink-0 flex items-end" />
				<div class="flex-1 flex flex-col justify-center items-start pt-[12px] pr-[12px] h-[186px]">
					<h3 class="text-[24px] font-bold mb-2 color-text-white whitespace-pre-wrap">
						{{ $pt(promotionStore.activity.content)?.title }}
					</h3>
					<p class="text-[16px] text-lowlight truncate line-clamp-1 whitespace-break-spaces">
						{{ $pt(promotionStore.activity.content)?.desc }}
					</p>
				</div>
			</div>
		</section>
		<section class="promotion-content-container flex flex-col overflow-hidden whitespace-pre-wrap bg-bg flex-1 rounded-[15px] rounded-t-none">
			<div
				class="text-left text-lowlight flex-1 overflow-auto text-[14px] px-[20px] my-[20px]"
				v-html="$pt(promotionStore.activity.content)?.activity_text"
			/>
			<div class="px-[20px] pb-[30px] pt-[20px] bg-block-bg-2">
				<button
					v-if="$pt(promotionStore.activity.content)?.button_text"
					class="sys-btn btn-m btn-highlight btn-full-width"
					@click="pageConfigClick($pt(promotionStore.activity.content)?.click_type, $pt(promotionStore.activity.content)?.click_value)"
				>
					{{ $pt(promotionStore.activity.content).button_text }}
				</button>
			</div>
		</section>
	</div>
</template>
<script setup lang="ts">
	defineProps({
		data: {
			type: Object,
			default: {},
		},
	})
	const promotionStore = usePromotionStore()
</script>
