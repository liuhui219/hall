<template>
	<div class="h-full overflow-hidden flex flex-col">
		<section class="modal-header shrink-0">
			<div class="flex justify-between w-full">
				<button class="invisible">
					<BaseIcon name="arrow-left" class="text-lowlight" />
				</button>
				<button class="modal__close" @click="closePopup()">
					<BaseIcon name="close" class="text-lowlight" />
				</button>
			</div>
			<h3 class="modal__title section-title text-center mb-8">{{ $t('DL0050') }}</h3>
		</section>

		<div class="dl-spin-rule">
			<p>
				1.{{ $t('DL0056').split('5')[0] }} {{ configStore.currency_symbol }}5
				{{ $t('DL0056').split('5')[1] }}
			</p>
			<p>2.{{ $t('DL0057') }}</p>
			<p>3.{{ $t('DL0058') }}</p>

			<p class="mt-[20px]">
				<span>{{ $t('DL0059') }}</span>
			</p>
			<p>
				<span>{{ $t('DL0060').split(',')[0] }}</span
				>, {{ $t('DL0060').split(',')[1] }}
			</p>
			<p>
				{{ $t('DL0061').split(':')[0] }}: <span>{{ $t('DL0061').split(':')[1] }}:{{ $t('DL0061').split(':')[2] }}</span>
			</p>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const referAndEarnStore = useReferAndEarnStore()
</script>
<style lang="scss" scoped>
	.dl-spin-rule {
		@apply px-[20px] py-[25px] rounded-md;
		background: $block-bg-2;
		p {
			@apply text-[14px];
			color: $text-base;
			span {
				color: $main;
			}
		}
	}
</style>
