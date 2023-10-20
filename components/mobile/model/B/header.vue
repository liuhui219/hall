<template>
	<header class="header" :class="{ back: isInBack, 'is-down-tip': userStore.bDownTip && !otherPageHead }">
		<section v-if="otherPageHead" class="sub-header-wrap w-full">
			<button v-if="showBack" class="back-btn" @click="goBack()"><BaseIcon name="arrow-left" /></button>
			<h1 class="sub-header-title">{{ !isHome ? propsConf.title : $t(pagePadding.title) }}</h1>
			<BaseIcon v-if="showClose" name="close" class="header-close-icon" @click="handleClose" />
		</section>
		<section v-else class="flex justify-between w-full px-[15px]">
			<div class="left">
				<BaseImg
					class="logo"
					:src="getResConfigImage(`${userStore.isLogin ? 'logo-icon' : 'logo-h'}`, 'logo')"
					alt="logo"
					@click="toHome()"
				/>
			</div>
			<div v-if="userStore.isLogin" class="right tools-g">
				<div class="wallet relative" @click="homeStore.changeShowWallet()">
					<BaseImg :src="getResConfigImage('symbol', ImageKeyEnum.home)" class="w-[26px] mr-[6px]" />
					<div class="amount flex items-center">
						<span class="mr-[6px] color-text-white point-container">
							<BasePoint
								:value="
									useSysConfigStore().wallet_type == 0
										? userStore.data.point
										: userStore.data.point + userStore.data.user_point.bonus
								"
								:show-symbol="false"
								:decimal-non-emphasis="true"
							/>
						</span>
						<BaseArrowDown
							class="transition-all duration-300 text-[6px] placeholder-color font-bold"
							:class="{ 'rotate-[180deg]': homeStore.showWallet }"
						/>
						<button
							class="sys-btn btn-m btn-highlight btn-deposit uppercase relative !text-[12px] !rounded-[12px] ml-[16px]"
							@click.stop="toDeposit()"
						>
							{{ $t('H0005') }}
						</button>
					</div>
					<span v-if="depositStore.bonusTime" class="header-bonus-time header-bonus">
						{{ Helper.renderTimeRemainNoDay(depositStore.bonusTime - depositStore.currentTime) }}
					</span>
					<span v-else-if="depositStore.propsList.length" class="header-bonus">{{ $t('V0004') }}</span>
				</div>

				<button class="sys-btn btn-m btn-icon relative" @click="homeStore.openMenuInfo()">
					<BaseDot :show="messageStore.unreadEmailCount" class="absolute right-[4px] top-[3px]" />
					<BaseImg :src="useSysConfigStore().getAvatarSrc(userStore.data.headimg)" class="w-[40px] rounded-full" />
				</button>
			</div>
			<div v-else class="right tools-login">
				<button class="sys-btn btn-login uppercase" @click="openLogin">{{ $t('L1001') }}</button>
				<button class="sys-btn btn-m btn-highlight uppercase" @click="openRegister">
					{{ $t('L1002') }}
				</button>
			</div>
		</section>
	</header>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	const propsConf = defineProps({
		isHome: {
			type: Boolean,
			default: true,
		},
		title: {
			type: String,
			default: '',
		},
		showBack: {
			type: Boolean,
			default: true,
		},
		back: {
			type: Function,
			default: null,
		},
		showClose: {
			type: Boolean,
			default: false,
		},
	})
	const userStore = useUserStore()
	const depositStore = useDepositStore()
	const homeStore = useHomeStore()
	const messageStore = useNoticeAndMessageStore()
	const navagationStore = useNavigationStore()
	const configStore = useSysConfigStore()
	const dialog = useDialogStore()
	const modal = usePopupConfig()
	const pagePadding = usePagePadding()
	const emits = defineEmits(['close'])
	const isInBack = computed(() => {
		return propsConf.isHome && !!(navagationStore.mobileNavShow || modal.value[0].name || modal.value[1].name)
	})
	const goBack = () => {
		if (propsConf.back) {
			propsConf.back()
		} else {
			if (!propsConf.isHome) {
				closePopup()
			} else {
				pageRouterBack()
			}
		}
	}
	const handleClose = () => {
		emits('close')
	}
	const otherPageHead = computed(() => {
		return !pagePadding.value.homeHeader || !propsConf.isHome
	})
</script>
