<template>
	<section class="modal-header shrink-0">
		<div class="flex justify-between w-full">
			<button class="invisible">
				<BaseIcon name="arrow-left" class="text-lowlight" />
			</button>
			<button class="modal__close" @click="closePopup()">
				<BaseIcon name="close" class="text-lowlight" />
			</button>
		</div>
		<h3 class="modal__title section-title text-center mb-[30px]">{{ $t('BC0024') }}</h3>
	</section>
	<div class="overflow-y-auto">
		<div class="mb-[10px] text-[24px] text-center font-[600]">
			{{ referAndEarnStore.sliceLang(0, $t('DL0002')) }}
			<span class="dl-money-span"> {{ configStore.currency_symbol }}1000 </span>
			{{ referAndEarnStore.sliceLang(1, $t('DL0002')) }}
		</div>
		<div class="text-[14px] mb-[45px] text-center font-[500]">{{ $t('DL0003') }}</div>

		<BaseImg
			class="mx-[auto] mb-[29px] h-[290px] w-[460px]"
			:src="getResConfigImage('dl_pc_normal_banner', ImageKeyEnum.referAndEarn)"
			alt="PC banner"
		/>

		<p class="dl-learn-more" @click="navigateTo('/refer-and-earn')">{{ $t('DL0067') }} ></p>

		<p class="text-[18px] font-[600]">{{ $t('DL0005') }}</p>

		<button class="refer-earn-btn mt-[13px]" @click="Helper.copyText(referAndEarnStore.shareUrl, true)">
			<span class="color-text flex-1 truncate text-left mr-[10px]">{{ referAndEarnStore.shareUrl }}</span>
			<BaseIcon name="dl-copy" class="dl-copy" />
		</button>

		<div class="flex justify-center items-center py-[25px]">
			<span class="or-line" />
			<span class="mx-[30px]">{{ $t('L1004') }}</span>
			<span class="or-line" />
		</div>

		<div class="flex justify-center gap-x-8">
			<a
				v-for="(item, index) in referAndEarnStore.dlShareList"
				:key="index"
				class="link text-lowlight pointer"
				@click="referAndEarnStore.clickShare(item.url)"
			>
				<BaseIcon :name="item.icon" class="dl-invite-icon text-[40px]" />
			</a>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const configStore = useSysConfigStore()
	const referAndEarnStore = useReferAndEarnStore()
	onMounted(referAndEarnStore.replaceShareListImg)
</script>
<style lang="scss" scoped>
	.dl-money-span {
		color: $main;
	}
	.dl-learn-more {
		@apply text-[16px] text-center cursor-pointer;
		color: $text-lowlight;
	}
	.dl-copy {
		color: $second;
	}
	.or-line {
		@apply w-[225px] h-[1px];
		background: $block-bg;
	}
	.dl-invite-icon {
		color: $gray;
	}
	.refer-earn-btn {
		@apply px-[12px] py-[9px] w-[100%] flex justify-between items-center rounded-md;
		border: 1px solid $block-bg;
		background: $block-bg-2;
		&:active {
			filter: brightness(0.8);
		}
	}
</style>
