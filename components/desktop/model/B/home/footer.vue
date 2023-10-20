<template>
	<footer v-if="!hide" class="home-footer-pc wrap gap-y-[36px]">
		<div class="flex w-full justify-between footer-pc-top">
			<div v-if="!footerIconHide || !footerShareHide || !!$pt(footerConfig.info)" class="flex-1">
				<BaseImg
					v-if="!footerIconHide"
					class="footer-logo mb-[24px]"
					:src="getResConfigImage('logo-h', 'logo')"
					alt="logo"
					@click="toHome()"
				/>
				<p
					v-if="!!$pt(footerConfig.info)"
					class="brand-about text-left"
					@click="configStore.clickApg($event)"
					v-html="
						$pt(footerConfig.info).replace(
							$pt(footerConfig.info_strong),
							`<strong class='text-second pointer' id='apg-text'>${$pt(footerConfig.info_strong)}</strong>`
						)
					"
				/>
				<div v-if="!footerConfig.icon_hide" class="flex mt-[20px]">
					<BaseImg
						v-if="useUrlWwwAfun().value"
						class="mr-8 w-[48px]"
						:class="{ pointer: !!url.sel_url }"
						:src="url.sel_image"
						alt="footer1"
						@click="toApgSel()"
					/>
					<div v-else-if="resConfig['footer-icon-1']" class="mr-8 h-[49px] items-center justify-center flex">
						<BaseImg :src="getResConfigImage('footer-icon-1')" alt="footer" class="w-full" />
					</div>
					<div v-else class="mr-8 w-[48px] h-[49px]" :class="{ pointer: !!url.sel_url }">
						<iframe id="koyoz" class="w-[48px] h-[49px]" :src="configStore.afunphoto" frameborder="0" scrolling="no" />
					</div>

					<div v-if="resConfig['footer-icon-2']" class="h-[49px]">
						<BaseImg :src="getResConfigImage('footer-icon-2')" alt="footer" class="h-full" />
					</div>
					<div v-else class="h-[49px]">
						<BaseImg :src="getResConfigImage('footer-icon-2', ImageKeyEnum.home)" alt="footer" class="h-full" />
					</div>
				</div>
			</div>
			<ul
				v-if="footerConfig.pc_list?.length"
				class="text-center w-[820px] grid grid-cols-5 gap-x-[2%] gap-y-[40px] ml-[60px] grid-flow-col-dense"
			>
				<!-- :style="{ 'grid-column-start': 5 - (index % 5) }" -->
				<li v-for="(item, index) in footerConfig.pc_list" :key="index">
					<h4 class="footer-title color-text-white uppercase mb-[12px] text-left">{{ $pt(item.title) }}</h4>
					<div class="footer-link flex flex-col flex-wrap items-start gap-[8px] text-left text-[12px] pointer">
						<a v-for="(temp, count) in item.list" :key="`${index}_${count}`" @click="pageConfigClick(temp.click_id, temp.click_params)">{{
							$pt(temp.title)
						}}</a>
					</div>
					<!-- <a class="pointer-hover" @click="pageConfigClick(item.click_id, item.click_params)">{{ $pt(item.title) }}</a> -->
				</li>
			</ul>
		</div>
		<div v-if="!footerShareHide" class="sns-list gap-x-[24px] flex justify-center">
			<a
				v-for="(item, index) in footerShareList"
				:key="index"
				class="footer-link pointer footer-icon-container"
				target="_blank"
				@click="item.url && Helper.toOutLink(item.url)"
			>
				<BaseIcon :name="item.icon" class="footer-icon" />
			</a>
		</div>
		<div v-if="$pt(footerConfig.disclaimer)" class="brand-about text-left">{{ $pt(footerConfig.disclaimer) }}</div>
		<div v-if="copyRightText()" class="copyright text-[12px]">{{ copyRightText() }}</div>
	</footer>
</template>

<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	const url = useUrlApgSel()
	const configStore = useSysConfigStore()
	const app = useNuxtApp() as any
	const toApgSel = () => {
		if (url.value.sel_url) {
			Helper.toOutLink(url.value.sel_url)
		}
	}
	const footerConfig = computed(() => {
		return configStore.pageConfig?.index?.footer?.config ?? { icon_hide: '1' }
	})
	const footerIconHide = computed(() => {
		return !!Number(footerConfig.value?.logo_hide)
	})
	const hide = computed(() => {
		return !configStore.pageConfig?.index?.footer
	})
	const footerShareHide = computed(() => {
		return !!Number(footerConfig.value.share_hide)
	})
	const footerShareList = computed(() => {
		let list = footerConfig.value.share?.list || []
		return list
	})

	const copyRightText = () => {
		if (Number(footerConfig.value.year)) {
			return app.$t('H0017', { year: footerConfig.value.year })
		}
		return footerConfig.value.year
	}
</script>
<style scoped lang="scss">
	.home-footer-pc {
		background: $dark-bg-05 !important;
		color: #585e77 !important;
		.footer-pc-top {
			padding-bottom: 50px;
			border-bottom: 1px solid $block-bg;
		}
		.footer-title {
			font-size: 16px;
		}
		a {
			color: #585e77 !important;
		}
		.footer-icon-container {
			width: 50px;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1.5px solid #7075ed;
			border-radius: 10px;
			position: relative;
			.footer-icon {
				background: $home-btn-second;
				background-clip: text;
				color: transparent;
			}
			&:hover {
				border: none;
				&::after {
					content: '';
					border-radius: 10px;
					background: $home-btn-second;
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 1;
				}
				.footer-icon {
					z-index: 2;
					background: #fff;
					background-clip: text;
					color: transparent;
				}
			}
		}
	}
</style>
