<template>
	<div class="h-full flex flex-col overflow-hidden">
		<SkinHeader :is-home="false" :title="$t('DL0050')" />

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
</script>
<style scoped lang="scss">
	.dl-spin-rule {
		@apply mx-[20px] px-[15px] py-[9px] rounded-md;
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
