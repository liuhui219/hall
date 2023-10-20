<template>
	<SkinHeader :is-home="false" :title="$t('BC0024')" />
	<BasePageLoading v-if="referAndEarnStore.appLoadingStatus" class="!z-[999] !absolute opacity-80" />
	<div class="dl-mobile-dividing-line !mb-[0px]">&nbsp;</div>
	<div class="overflow-y-auto">
		<div class="px-[15px] mt-[15px]">
			<div class="mb-[10px] text-[24px] text-center font-[600]">
				{{ referAndEarnStore.sliceLang(0, $t('DL0002')) }}
				<span class="dl-money-span"> {{ configStore.currency_symbol }}1000 </span>
				{{ referAndEarnStore.sliceLang(1, $t('DL0002')) }}
			</div>
			<div class="text-[14px] mb-[20px] text-center font-[500]">{{ $t('DL0003') }}</div>

			<BaseImg class="w-[96%] mx-[auto] mb-[15px]" :src="getResConfigImage('dl_h5_banner', 'referAndEarn')" alt="h5 banner" />
			<p class="dl-learn-more" @click="navigateTo('/refer-and-earn')">{{ $t('DL0067') }} ></p>
		</div>

		<!-- 登录 -->
		<div class="mb-4 pt-[10px] px-[15px]">
			<p class="block-title font-bold mb-2">{{ $t('DL0005') }}</p>

			<button class="refer-earn-btn mt-[15px] mb-[10px]" @click="Helper.copyText(referAndEarnStore.shareUrl, true)">
				<span v-if="useUserStore().isAgencyUser" class="mr-[20px]">link</span>
				<span class="color-text flex-1 truncate text-left mr-[10px]">{{ referAndEarnStore.shareUrl }}</span>
				<BaseIcon name="dl-copy" class="dl-copy-color" />
			</button>

			<!-- code码 仅代理用户展示 -->
			<!-- <button v-if="useUserStore().isAgencyUser" class="refer-earn-btn" @click="Helper.copyText(referAndEarnStore.referCode, true)">
				<span class="mr-[20px]">{{ $t('REW0011') }}</span>
				<span class="color-text flex-1 truncate text-left mr-[10px]">{{ referAndEarnStore.referCode }}</span>
				<BaseIcon name="dl-copy" class="dl-copy-color" />
			</button> -->

			<div class="flex justify-center items-center mb-[10px]">
				<span class="or-line" />
				<span class="mx-[45px] dl-invite-or-mobile">{{ $t('L1004') }}</span>
				<span class="or-line" />
			</div>

			<div class="flex justify-center gap-x-8">
				<a
					v-for="(item, index) in configStore.shareList"
					:key="index"
					class="link text-[40px] dl-invite-icon-mobile"
					target="_blank"
					@click="referAndEarnStore.clickShare(item.url)"
				>
					<BaseIcon :name="item.icon" />
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const configStore = useSysConfigStore()
	const referAndEarnStore = useReferAndEarnStore()
	const dl_h5_banner2 = `url(${getResConfigImage('dl_h5_banner2', 'referAndEarn')})`
</script>
<style scoped lang="scss">
	.dl-learn-more {
		@apply text-[16px] text-center;
		color: $text-lowlight;
	}
	.dl-banner-btn {
		@apply mx-[auto] mb-[20px] py-[10px] w-[294px] rounded-md text-[16px] text-center font-[500];
		color: $text-button;
		background: $second;
	}
	.dl-money-span {
		color: $btn-main;
	}
	.dl-copy-color {
		color: $main;
	}
	.dl_dl_h5_banner {
		@apply flex flex-row-reverse mx-[15px] pt-[20px] pb-[17px];
		background-image: v-bind(dl_h5_banner2);
		background-size: 101% 100%;
		background-position: center;
		background-repeat: no-repeat;
		div {
			h1 {
				@apply mb-[5px] w-[186px] text-[24px] font-[600];
			}
			div {
				@apply p-[12px] w-[186px] rounded-md;
				background-color: rgba(0, 0, 0, 0.1);
				border: 0.2px solid #6caa6e;
				p {
					@apply text-[12px] font-[500];
				}
			}
		}
	}
	.dl-mobile-card {
		@apply px-[22px] pt-[22px] pb-[15px] mb-[20px] mx-[15px] rounded-lg;
		background: $block-bg-2;
		div {
			@apply flex items-center;
			.dl-mobile-card-img {
				@apply mr-[13px];
			}
			p {
				@apply text-[16px] font-[500];
			}
		}
		button {
			@apply flex justify-center items-center mt-[13px] w-[100%] h-[43px] text-[15px] rounded-lg;
			background: $btn-main;
			color: $text-button;
		}
	}
	.refer-earn-btn {
		@apply px-[12px] py-[9px] w-[100%] flex justify-between items-center rounded-md;
		border: 1px solid $block-bg;
		background: $block-bg-2;
		&:active {
			filter: brightness(0.8);
		}
	}
	.or-line {
		@apply w-[128px] h-[1px];
		background: $block-bg-2;
	}
	.dl-invite-or-mobile {
		color: $text-lowlight;
	}
	.dl-invite-icon-mobile {
		color: $gray;
	}
	.dl-panel-mobile {
		@apply px-[20px] py-[20px] mb-[20px];
		background: $block-bg-2;
		.dl-panel-header-mobile {
			@apply flex items-center justify-between mb-[15px];
			h1 {
				@apply text-[18px] font-[600];
			}
			p {
				@apply flex items-center relative;
				span {
					@apply mr-[4px] text-[12px] font-[400];
					color: $text-lowlight;
				}
				.dl-panel-icon {
					@apply text-[12px] text-white -rotate-90;
					color: $text-lowlight;
				}
			}
		}
		.dl-panel-content-mobile {
			@apply flex justify-between items-center;
			div {
				@apply flex flex-col items-center w-[32%] text-center;
				h1 {
					@apply mb-[10px] text-[18px] font-[600];
				}
				h2 {
					@apply text-[12px] font-[400];
					color: $text-lowlight;
				}
			}
			.vertical-line {
				@apply w-[1px] h-[30px];
				background: $block-bg;
			}
		}
		button {
			@apply flex justify-center items-center mt-[15px] mx-[auto] w-[90%] h-[43px] text-[15px] rounded-lg;
			background: $btn-main;
			color: $text-button;
		}
	}
	.dl-score-box-mobile {
		@apply px-[15px] py-[20px] mb-[20px];
		background: $block-bg-2;
		.dl-score-tab {
			@apply flex gap-[5px];
			button {
				@apply flex-1 h-[40px] text-[13px] rounded-md;
				border: 1px solid transparent;
				color: $text-base;
				background: $disable-color;
			}
			.active {
				color: $second;
				border-color: $second;
			}
		}
		.dl-score-list {
			@apply mt-[15px] rounded-md overflow-hidden;
			border: 1px solid $block-bg;
			li {
				@apply flex items-center grid grid-cols-3 min-h-[40px] text-[14px];
				color: $text-lowlight;
				p:nth-child(1) {
					@apply col-span-2 pl-[20px];
				}
				p:nth-child(2) {
					@apply pl-[22px];
				}
			}
			li:nth-child(even) {
				background: $block-bg-2;
			}
			li:nth-child(odd) {
				background: $bg;
			}
		}
	}
	.dl-learn-box-mobile {
		@apply px-[15px] py-[20px] mb-[20px];
		background: $block-bg-2;
		.dl-learn-describe {
			color: $text-lowlight;
		}
		.dl-card-contact-mobile {
			@apply flex py-[10px] mx-[25px] rounded-lg;
			background: $block-bg;
		}
	}
	.dl-faq-box-mobile {
		@apply py-[10px] px-[20px] mb-[20px];
		h1 {
			@apply mb-[5px] text-[18px] font-[600];
		}
		.dl-faq-item {
			@apply flex justify-between items-center py-[8px] px-[12px];
			border-radius: 3px;
			background: $block-bg-2;
			p {
				@apply text-[12px];
				color: $text-lowlight;
			}
			.dl-faq-icon {
				@apply text-[18px];
				color: $gray;
			}
		}
	}
</style>
