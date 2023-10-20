<template>
	<div class="navbar fixed">
		<button
			v-for="item in list"
			:key="`navbar-${item.text}`"
			class="no-hover"
			:class="{ current: activeName == item.text }"
			@click="changeActive(item)"
		>
			<BaseIcon :name="item.name" class="animate__animated text-[18px]" :class="{ animate__jello: activeName == item.text && isChanged }" />
			<div>{{ item.isTranslation ? item.title : $t(item.title) }}</div>
			<!-- todo: 活动中心有红点 -->
			<BaseDot v-if="item.name == 'gift'" :show="userStore.bonusRedPoint" class="absolute right-[24px] top-[6px]" />
		</button>
	</div>
</template>

<script setup lang="ts">
	const { $t } = useNuxtApp() as any
	const userStore = useUserStore()
	//text文本不区分大小写需和路由名称一致
	const list = ref([
		{ name: 'menu', text: 'Menu', hash: 'menu', title: 'H0018' },
		{ name: 'poker', text: 'Casino', path: 'casino', title: 'H0023' },
		// { name: 'crown', text: 'Vip', path: 'vip', title: 'TR0001' },
		{ name: 'home', text: 'Home', path: '', title: 'H0052' },
		{ name: 'gift', text: 'bonus-center', path: 'bonus-center', title: 'BC0001' },
		// { name: 'member', text: 'userInfo', hash: 'userInfo', title: 'H0048' },
		{ name: 'chatb', text: 'Chat', hash: 'chat', title: 'Chat', isTranslation: true },
	])
	if (!sysConfig.chatConfig.status) {
		list.value = list.value.filter((el: any) => el.hash != 'chat')
	}
	const isChanged = ref(false)
	const navigationStore = useNavigationStore()
	const changeActive = (from: any) => {
		isChanged.value = true
		const hash: string = from.hash
		if (hash) {
			if (hash == 'menu') {
				if (isPageInSome('menu')) {
					closePopup('menu')
					return
				}
			}
			openPopup(hash)
		} else {
			if (from.path.includes('casino')) {
				useCasinoStore().toCasino()
			} else {
				navigateTo('/' + from.path)
			}
		}
	}
	const activeName = computed(() => {
		const route = useRoute()
		let hash = (route.hash || '').toLocaleUpperCase()
		let hashFind = list.value.find((el) => el.hash && hash.includes(el.text.toLocaleUpperCase()))
		if (hashFind) {
			return hashFind.text
		}
		let path = (route.path || '').replace('/', '').toLocaleUpperCase()
		if (!path || useUrlCh().value.replace(/\//gi, '').toLocaleUpperCase() == path.replace(/\//gi, '')) {
			path = 'HOME'
		}
		let modalFind = list.value.find((el) => path.includes(el.text.toLocaleUpperCase()))
		if (modalFind) {
			return modalFind.text
		}
		return ''
	})
	watchEffect(() => {
		navigationStore.setMobileNavShow(activeName.value == 'Menu')
	})
</script>
<style scoped lang="scss">
	.navbar {
		left: 0;
		bottom: 0;
		z-index: zIndex('navbar');
		width: 100%;
		height: $app-navbar-height;
		user-select: none;
		background: $block-bg-2;
		display: flex;
		width: 100%;
		height: calc($app-navbar-height + env(safe-area-inset-bottom));
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0px -12px 24px #000000;
		& > button {
			position: relative;
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: $text-base;
			cursor: pointer;
			& > .icon {
				margin-bottom: 4px;
				font-size: 18px;
			}
			&.current {
				color: $second;
			}
		}
	}
</style>
