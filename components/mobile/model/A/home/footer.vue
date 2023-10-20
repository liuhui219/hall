<template>
	<div v-if="!hide" class="home-footer gap-y-[24px]">
		<BaseImg v-if="!footerIconHide" class="footer-logo" :src="getResConfigImage('logo-h', 'logo')" alt="logo" @click="toHome()" />
		<div v-if="!footerShareHide" class="flex w-full gap-[14px]">
			<a v-for="(item, index) in footerShareList" :key="index" target="_blank" @click="item.url && Helper.toOutLink(item.url)">
				<BaseIcon :name="item.icon" class="!text-[24px] text-[#74787E]" />
			</a>
		</div>
		<ul v-if="footerConfig.mobile_list?.length" class="flex flex-wrap justify-between gap-y-[20px] w-full mb-[10px]">
			<li
				v-for="(item, index) in footerConfig.mobile_list"
				:key="index"
				class="shrink-0 flex flex-col gap-[15px] items-start w-[45%] overflow-hidden"
			>
				<h4 class="footer-title uppercase">{{ $pt(item.title) }}</h4>
				<a v-for="(temp, count) in item.list" :key="`${index}_${count}`" @click="pageConfigClick(temp.click_id, temp.click_params)">
					{{ $pt(temp.title) }}
				</a>
				<!-- <a @click="pageConfigClick(item.click_id, item.click_params)">{{ $pt(item.title) }}</a> -->
			</li>
		</ul>

		<p
			v-if="!!$pt(footerConfig.info)"
			class="brand-about"
			@click="configStore.clickApg($event)"
			v-html="$pt(footerConfig.info).replace($pt(footerConfig.info_strong), `<strong id='apg-text'>${$pt(footerConfig.info_strong)}</strong>`)"
		/>
		<div v-if="!footerConfig.icon_hide" class="flex justify-center gap-[8px] w-full">
			<BaseImg v-if="useUrlWwwAfun().value" :src="url.sel_image" alt="footer1" class="mr-8 w-[48px]" @click="toApgSel()" />
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
		<div v-if="$pt(footerConfig.disclaimer)" class="mx-auto text-left">{{ $pt(footerConfig.disclaimer) }}</div>
		<div v-if="copyRightText()" class="copyright w-full text-center">{{ copyRightText() }}</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const url = useUrlApgSel()
	const { $t } = useNuxtApp() as any
	const toApgSel = () => {
		if (url.value.sel_url) {
			Helper.toOutLink(url.value.sel_url)
		}
	}
	const configStore = useSysConfigStore()
	const footerConfig = computed((): any => {
		return configStore.pageConfig?.index?.footer?.config ?? { icon_hide: '1', logo_hide: '' }
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
			return $t('H0017', { year: footerConfig.value.year })
		}
		return footerConfig.value.year
	}
</script>
