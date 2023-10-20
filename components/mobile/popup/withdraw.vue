<template>
	<SkinHeader :is-home="false" :title="$t('U0002')" :back="withdrawStore.mobileBack" />

	<div v-if="!userStore.userInfo.email_bind && !userStore.userInfo.phone_bind" class="px-4">
		<h2 class="text-[18px] text-center">{{ $t('W0019') }}</h2>
		<p class="mt-[30px] text-[14px]" v-html="$t('W0027')" />
		<p class="text-second text-[14px] mt-[12px]" @click="openPopup(PopupEnum.account)">{{ $t('W0028') }}</p>
	</div>
	<div v-else class="h-full">
		<template v-if="!userStore.userInfo.is_pay && !resConfig['withdraw-unnecessary-pay']">
			<div class="mt-4 px-4">{{ $t('W0024') }}</div>
		</template>
		<div v-else class="modal__content flex flex-col justify-between flex-1 overflow-scroll h-full">
			<div v-if="withdrawStore.inLobbyPage" class="px-4">
				<section class="mb-8 text-left">
					<h3 class="block-title font-bold mb-3 mt-[10px]">{{ $t('D0003') }}</h3>
					<ul class="mx-auto">
						<li
							v-for="(item, index) in withdrawStore.pay_list"
							:key="item.group_id"
							class="relative sys-btn btn-outline w-full text-left flex items-center justify-between mb-[16px] !px-[12px] !h-[50px]"
							@click="withdrawStore.goWithdraw(item)"
						>
							<BaseImg
								v-if="index == 0"
								class="absolute w-[22px] top-0 ml-[-13px] mt-[-1px]"
								:src="getResConfigImage('hot', ImageKeyEnum.deposit)"
								alt=""
							/>
							<div class="flex items-center">
								<BaseImg
									v-if="withdrawStore.getIconKeyByGroupId(item.group_id)"
									class="w-[30px]"
									:alt="$pt(item.group_name)"
									:src="getResConfigImage(withdrawStore.getIconKeyByGroupId(item.group_id), ImageKeyEnum.deposit)"
								/>
								<div v-else class="w-[30px]" />
								<span class="color-text-white ml-[12px] text-[14px]">{{ $pt(item.group_name) }}</span>
							</div>
							<div class="flex items-center">
								<div v-if="item.max_put_point || item.min_put_point" class="color-text-white mr-[2px] text-[14px]">
									<BaseNumber :value="item.min_put_point || 0" />
									-
									<BaseNumber v-if="item.max_put_point" :value="item.max_put_point" />
									<span v-else>∞</span>
									<span class="ml-[4px]">{{ item.pay_key == PutTypeEnum.usdt ? 'U' : configStore.currency_symbol }}</span>
								</div>
								<div class="-rotate-[90deg] ml-[10px]">
									<BaseArrowDown class="text-[12px]" />
								</div>
							</div>
						</li>
					</ul>
				</section>
			</div>
			<div v-else class="h-full">
				<component :is="currentComponent" class="h-full" />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const userStore = useUserStore()
	const configStore = useSysConfigStore()
	const withdrawStore = useWithdrawStore()
	const pix = resolveComponent('mobile/popup/withdrawPix')
	const spei = resolveComponent('mobile/popup/withdrawSpei')
	const virtual = resolveComponent('mobile/popup/withdrawVirtual')
	const currentComponent = computed(() => {
		if (withdrawStore.isInPixPage) {
			return pix
		} else if (withdrawStore.isInSqeiPage) {
			return spei
		} else {
			return virtual
		}
	})

	onMounted(withdrawStore.mounted)
</script>
