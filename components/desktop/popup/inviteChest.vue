<template>
	<div class="invite-chest-header-back" @click="pageRouterBack()">
		<BaseIcon name="select-arrow-down" />
	</div>
	<div class="modal__content flex flex-col flex-1 overflow-auto min-h-[100%]">
		<div class="relative">
			<BaseImg :src="getResConfigImage('bj_01', ImageKeyEnum.inviteChest)" alt="" />
			<BaseImg :src="getResConfigImage('font_header', ImageKeyEnum.inviteChest)" alt="" class="absolute w-[52%] top-[3.3%] left-[7.5%]" />
			<div class="absolute z-[1] top-[28%] font-bold text-[14px] color-text-white text-center w-[82%] m-auto left-0 right-0 leading-[1.2]">
				{{ $t('IC0001') }}
			</div>
			<div
				class="absolute top-[32.15%] font-bold left-0 right-0 m-auto text-center color-text-white text-[13px] flex items-center justify-center"
				style="color: #2d1183"
			>
				<template v-if="configStore.inviteChestCfg.data?.reset_period != 4">
					<div class="w-[47%] text-right">REDEFINIR EM:&nbsp;</div>
					<div class="flex-1 text-left">
						<em style="color: #ff5400">{{ inviteChestStore.renderTotal.day }}</em
						>D <em style="color: #ff5400">{{ inviteChestStore.renderTotal.hour }}</em
						>H <em style="color: #ff5400">{{ inviteChestStore.renderTotal.minute }}</em
						>M <em style="color: #ff5400">{{ inviteChestStore.renderTotal.second }}</em
						>S
					</div>
				</template>
				<div v-else>
					{{ $t('IC0007') }}
				</div>
			</div>
			<div class="absolute flex items-center justify-center w-[76%] left-0 right-0 top-[34.8%] m-auto text-[12px]">
				<div class="color-text-white flex-1 shrink-0 text-center flex flex-col h-[60px]">
					<div class="flex-1 flex flex-col justify-center w-[150px] m-auto">
						<div>{{ $t('IC0002') }}</div>
					</div>
					<span style="color: #fafb48; font-size: 18px"><BaseNumber :value="inviteChestStore.data.invite_people_num" /></span>
				</div>
				<div class="color-text-white flex-1 shrink-0 text-center flex flex-col h-[60px]">
					<div class="flex-1 flex flex-col justify-center">
						<div>{{ $t('IC0003') }}</div>
					</div>
					<span style="color: #fafb48; font-size: 18px"><BaseNumber :value="inviteChestStore.data.valid_people_num" /></span>
				</div>
			</div>
			<div
				class="invite-chest-btn scale-btn"
				:style="{ backgroundImage: `url(${getResConfigImage('btn', ImageKeyEnum.inviteChest)})` }"
				:class="{ disabled: inviteChestStore.isCopied }"
				@click="!inviteChestStore.isCopied && Helper.copyText(inviteChestStore.shareUrl, true)"
			>
				<BaseImg
					v-show="!inviteChestStore.isCopied"
					:src="getResConfigImage('font_convite', ImageKeyEnum.inviteChest)"
					alt=""
					class="w-[80%]"
				/>
				<BaseImg v-show="inviteChestStore.isCopied" :src="getResConfigImage('font_copy', ImageKeyEnum.inviteChest)" alt="" class="w-[80%]" />
			</div>
			<BaseImg :src="getResConfigImage('font_gift', ImageKeyEnum.inviteChest)" alt="" class="absolute top-[52.5%] h-[38px] left-[6%]" />
			<div class="absolute z-[2] flex flex-wrap justify-between w-full left-0 px-[8%] top-[60%] gap-y-4">
				<div v-for="item in inviteChestStore.data.list" :key="item" class="invite-chest-gift-container">
					<div class="invite-chest-gift-item" :style="{ backgroundImage: `url(${getResConfigImage('back_1', ImageKeyEnum.inviteChest)})` }">
						<BaseImg
							:src="getResConfigImage(`chest_${Math.ceil(item.index)}`, ImageKeyEnum.inviteChest)"
							alt=""
							class="w-[54%] m-auto right-0 left-0 top-[12%] absolute"
						/>
						<div class="w-[66%] m-auto right-0 left-0 bottom-[40%] absolute">
							<BaseImg :src="getResConfigImage('back_2', ImageKeyEnum.inviteChest)" alt="" />
							<span
								class="text-[12px] color-text-white absolute left-0 right-0 bottom-0 top-[1px] m-auto flex items-center justify-center"
							>
								{{ Math.min(inviteChestStore.data.valid_people_num, item.people_num_limit) }}
								<BaseImg :src="getResConfigImage('dbar', ImageKeyEnum.inviteChest)" alt="" class="h-[75%] mx-[2px]" />
								{{ item.people_num_limit }}</span
							>
						</div>
						<p class="invite-chest-gift">
							<BasePoint :value="item.reward.point" :precision="0" />
						</p>
					</div>
					<div
						class="invite-chest-reward-btn"
						:class="{ [`invite-chest-reward-btn-${item.status}`]: true, 'scale-btn': item.status == 2 }"
						:data-text="$t(item.status == 1 ? 'IC0004' : 'REW0005')"
						:style="{ backgroundImage: `url(${getResConfigImage(`btn_${item.status}`, ImageKeyEnum.inviteChest)})` }"
						@click="item.status == 2 && inviteChestStore.doInviteChest(item)"
					>
						{{ $t(item.status == 1 ? 'IC0004' : 'REW0005') }}
					</div>
				</div>
			</div>
			<BaseImg :src="getResConfigImage('font_rules', ImageKeyEnum.inviteChest)" alt="" class="absolute h-[38px] top-[94.5%] left-[7.5%]" />
		</div>
		<div class="relative">
			<BaseImg :src="getResConfigImage('bj_02', ImageKeyEnum.inviteChest)" alt="" class="absolute z-[1] top-0 left-0 w-[100%]" />
			<div class="invite-chest-rule-content" :style="{ backgroundImage: `url(${getResConfigImage('bj_03', ImageKeyEnum.inviteChest)})` }">
				<div class="relative z-[2]" v-html="$pt(configStore.inviteChestCfg.rules)" />
			</div>
		</div>
		<div class="relative">
			<BaseImg :src="getResConfigImage('bj_04', ImageKeyEnum.inviteChest)" alt="" />
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	const inviteChestStore = useInviteChestStore()
	const configStore = useSysConfigStore()
	onMounted(inviteChestStore.mounted)
	onUnmounted(inviteChestStore.unmouted)
	// import PullRefresh from "pull-refresh-vue3";
</script>
<style scoped lang="scss">
	.invite-chest-header-back {
		@apply absolute;
	}
	.invite-chest-btn {
		@apply w-[50%] pt-5;
	}
	.invite-chest-reward-btn {
		position: relative;
		font-size: 12px;
		text-align: center;
		background-size: contain;
		background-repeat: no-repeat;
		height: 24.8%;
		margin-top: 8px;
		padding-top: 6px;

		&::after {
			padding-top: 6px;
		}
	}
</style>
