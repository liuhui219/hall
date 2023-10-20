<template>
	<section class="promote-block" :style="{ backgroundImage: `url(${getResConfigImage('join-bg', ImageKeyEnum.home)})` }">
		<div v-if="userStore.isLogin">
			<h4 class="section-title">{{ $t('H0036') }}</h4>
			<p class="text-5xl font-bold mb-6" v-html="renderDepositBonus(5)" />
			<button class="sys-btn btn-promote color-text-white uppercase" @click="openPopup(PopupEnum.deposit)">{{ $t('H0005') }}</button>
		</div>
		<div v-else>
			<h4 class="section-title">{{ $pt(info.title) }}</h4>
			<ul class="join-box flex flex-wrap items-center justify-between mb-6">
				<li
					v-for="(item, index) in info.list"
					:key="index"
					class="join-item flex justify-between items-center"
					:class="{ 'mt-4': index > 2 }"
				>
					<span class="text-lowlight">{{ $pt(item.title) }}</span>
					<span class="bar-value">{{ item.value }}</span>
				</li>
			</ul>
			<button class="sys-btn btn-promote color-text-white uppercase" @click="openRegister">{{ $t('L1002') }}</button>
		</div>
	</section>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const userStore = useUserStore()
	const app = useNuxtApp()
	const propsConf = defineProps({
		info: {
			type: Object,
			default: () => ({}),
		},
	})
	const renderDepositBonus = (value: any) => {
		return app.$t('H0037', { progress: `<span class="text-second">${value}%</span>` })
	}
</script>
