<template>
	<section class="userinfo-wallet shrink-0" :class="{ 'userinfo-wallet-notoggle': !showToggle }">
		<div
			v-if="showToggle"
			class="userinfo-wallet-title"
			:style="{ 'background-image': `url(${getResConfigImage('wallet', ImageKeyEnum.userinfo)})` }"
		>
			{{ $t('BH0010') }}
		</div>
		<div class="wallet-point-container" :class="{ 'pb-[12px]': !showToggle }">
			<div class="wallet-point">
				<p class="text-second text-[14px] capitalize">{{ $t('BH0011') }}</p>
				<p class="color-text-white mb-[4px]">
					<BasePoint :value="userStore.data.point" />
				</p>

				<div class="userinfo-wallet-balance relative">
					<BaseImg
						:src="getResConfigImage('hammer', ImageKeyEnum.userinfo)"
						alt=""
						class="absolute w-[24px] bottom-[2px]"
						:style="{ left: userRollerLeft }"
					/>
					<p class="progress" :style="{ width: userRoller + '%' }" />
				</div>
			</div>
			<b class="w-[1px] shrink-0 h-full" />
			<div class="flex-1 flex-col flex items-center justify-between h-full relative">
				<p class="text-second flex text-[14px] capitalize">
					{{ $t('V0004') }}
				</p>
				<p class="color-text-white mb-[4px]">
					<BasePoint :value="walletStore.totalPoint" />
				</p>
				<BaseImg
					:class="{ invisible: !userGiveRoller }"
					:src="getResConfigImage('hammer', ImageKeyEnum.userinfo)"
					alt=""
					class="absolute w-[24px] bottom-[4px]"
					:style="{ left: userGiveRollerLeft }"
				/>
				<div class="userinfo-wallet-bonus relative" :class="{ invisible: !userGiveRoller }">
					<p class="progress" :style="{ width: userGiveRoller + '%' }" />
				</div>
			</div>
		</div>
		<BaseImg
			v-if="showToggle"
			:src="getResConfigImage('arrow_down', ImageKeyEnum.userinfo)"
			class="h-[26px] transition duration-300 ease-in-out relative z-[50] pointer wallet-show-more"
			:class="{ 'rotate-[180deg]': toggleStatus }"
			@click="updateOpenStatus"
		/>
		<div :style="{ display: toggleStatus ? '' : 'none' }" class="w-full absolute h-full top-0 m-auto wallet-list" @click="updateOpenStatus">
			<div v-if="walletStore.list.length == 0" />
			<div
				class="flex flex-col h-full w-full overflow-hidden wallet-list-container"
				:class="{ 'px-[28px!important]': isDesktop && !isPcHome, 'pt-[12px]': isPcHome }"
			>
				<div class="card-block flex items-center justify-center text-center shrink-0 h-[46px] mb-[10px] pl-[8px]" @click.stop="() => {}">
					<p class="w-[25%] shrink-0 text-[12px] color-text-white">{{ $t('BH0013') }}</p>
					<p class="w-[42%] text-[12px] color-text-white">{{ $t('V0004') }}</p>
					<p class="w-[15%] shrink-0 text-[12px] color-text-white text-start">{{ $t('W0029') }}</p>
					<p class="w-[18%] shrink-0 text-[12px] color-text-white flex items-center justify-end mr-[12px]">
						<button @click="walletStore.changeSort">
							<BaseImg
								:src="getResConfigImage('change', ImageKeyEnum.userinfo)"
								alt=""
								class="w-[18px] pointer"
								:class="{ 'rotate-[180deg]': walletStore.sort == 1 }"
							/>
						</button>
					</p>
				</div>

				<div class="flex-1 overflow-y-auto overflow-x-hidden pb-[20px] wallet-list-content">
					<div v-if="!walletStore.list.length" class="flex justify-center mt-[24px] text-lowlight text-[12px]">
						{{ $t('BH0007') }}
					</div>
					<template v-else>
						<div
							v-for="(item, index) in walletStore.list"
							:key="`${item.id}_${index}`"
							class="flex items-center justify-center text-center mb-[10px] userinfo-card-border pl-[8px] card-block"
							@click.stop="() => {}"
						>
							<p class="w-[25%] text-[12px] color-text-white truncate">
								{{ $pt(configStore.rewardTypesMaps[item.optCode]?.title) }}
							</p>
							<p class="w-[42%] text-[12px] text-second">
								<BasePoint :value="item.point" />
							</p>
							<p class="w-[15%] text-[12px] color-text-white text-start">X <BaseNumber :value="item.web_code" /></p>
							<p class="w-[18%] text-[12px] color-text-white flex items-center justify-end mr-[10px]">
								<button @click="walletStore.handleGet(item.id)">
									<BaseImg :src="getResConfigImage('claim', ImageKeyEnum.userinfo)" class="w-[24px]" />
								</button>
								<button class="ml-[20px]" @click="walletStore.handleDel(item.id)">
									<BaseIcon name="close" class="text-lowlight text-[16px]" />
								</button>
							</p>
						</div>
					</template>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		scrollTop: {
			type: String,
			default: '0px',
		},
		top: {
			type: String,
			default: '290px',
		},
		showToggle: {
			type: Boolean,
			default: true,
		},
		bottom: {
			type: String,
			default: '0px',
		},
		isPcHome: {
			type: Boolean,
			default: false,
		},
	})
	const userStore = useUserStore()
	const configStore = useSysConfigStore()
	const walletStore = useWalletStore()
	const app = useNuxtApp() as any
	const isDesktop: boolean = app.$device.isDesktop
	const closeHeight = isDesktop && !propsConf.isPcHome ? '70px' : '0px'
	const toggleStatus = ref(!propsConf.showToggle)
	const userRoller = computed(() => {
		return userStore.data.all_put_code && userStore.data.ready_put_code
			? parseFloat((((userStore.data.ready_put_code || 0) / userStore.data.all_put_code) * 100).toFixed(2))
			: 0
	})
	const userRollerLeft = computed(() => {
		return `calc(${userRoller.value}% - 10px)`
	})
	const userGiveRoller = computed(() => {
		return walletStore.totalCode && walletStore.totalCodeC ? parseFloat(((walletStore.totalCodeC / walletStore.totalCode) * 100).toFixed(2)) : 0
	})
	const userGiveRollerLeft = computed(() => {
		return `calc(${userGiveRoller.value}% - 10px)`
	})
	const updateOpenStatus = () => {
		if (propsConf.showToggle) {
			toggleStatus.value = !toggleStatus.value
			if (toggleStatus.value) {
				walletStore.handleList()
			}
		}
	}
	onMounted(walletStore.handleList)
	onUnmounted(() => {
		toggleStatus.value = false
	})
</script>
<style scoped lang="scss">
	.userinfo-wallet {
		.wallet-point-container {
			@apply flex flex-1 items-center justify-center w-full mb-[4px] relative;
			.wallet-point {
				@apply flex-1 flex flex-col items-center justify-between h-full relative;
			}
		}

		.wallet-list {
			height: calc(100% - v-bind(closeHeight));
			top: v-bind(closeHeight);
			.wallet-list-container {
				position: absolute;
				z-index: 2;
				padding: 15px 16px 20px;
				background-color: $bg;
				height: calc(100% - v-bind(top) + v-bind(closeHeight) - v-bind('propsConf.bottom') + v-bind('propsConf.scrollTop'));
				top: calc(v-bind(top) - v-bind(closeHeight) - v-bind('propsConf.scrollTop'));
				.wallet-list-content {
					padding: 0 !important;
					height: 100%;
					overflow-x: hidden;
					overflow-y: auto;
				}
			}
		}
	}
</style>
