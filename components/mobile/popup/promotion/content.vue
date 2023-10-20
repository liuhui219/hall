<template>
	<div class="h-full flex flex-col overflow-hidden rounded-[6px]">
		<section class="text-left pb-[12px] h-[145px] bg-block-bg-2 shrink-0 relative rounded-b-none">
			<BaseIcon name="close" class="p-[12px] text-[16px] absolute right-0 top-0 gray" @click="closePopup()" />
			<BaseImg :src="$pt(promotionStore.activity.content)?.img" alt="" class="absolute bottom-0 left-0 w-[34.7vw] h-[34.7vw]" />
			<div class="flex-1 flex flex-col justify-end h-full items-start pt-[12px] pr-[12px] pl-[34.8vw]">
				<h3 class="block-title font-bold mb-2 color-text-white truncate line-clamp-2 whitespace-break-spaces overflow-hidden">
					{{ $pt(promotionStore.activity.content)?.title }}
				</h3>
				<p class="basis-1/2 text-xs text-lowlight truncate line-clamp-2 whitespace-break-spaces">
					{{ $pt(promotionStore.activity.content)?.desc }}
				</p>
			</div>
		</section>
		<section class="promotion-content-container flex-1 flex flex-col overflow-hidden whitespace-pre-wrap bg-bg">
			<div
				class="text-left text-lowlight flex-1 overflow-auto text-[14px] px-[15px] pb-[12px] mt-[12px]"
				v-html="$pt(promotionStore.activity.content)?.activity_text"
			/>
			<div class="bg-block-bg-2 px-[15px] pt-[17px] pb-[13px]">
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
