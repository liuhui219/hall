<template>
	<div class="h-full overflow-hidden flex flex-col">
		<section class="modal-header shrink-0">
			<div class="flex justify-between w-full">
				<button class="invisible">
					<BaseIcon name="arrow-left" class="text-lowlight" />
				</button>
				<button class="modal__close" @click="closePopup()">
					<BaseIcon name="close" class="text-lowlight" />
				</button>
			</div>
			<h3 class="modal__title section-title text-center mb-8">{{ $t('AF0005') }}</h3>
		</section>
		<div class="mb-[24px] shrink-0">
			<BaseTab :list="referAndEarnStore.tabList" :active="referAndEarnStore.tabIndexActive" @change="referAndEarnStore.changeTabIndexActive" />
		</div>
		<div v-show="referAndEarnStore.tabIndexActive == 0" class="flex flex-col flex-1 overflow-hidden">
			<div class="grid grid-cols-2 gap-x-2 mb-8">
				<BaseInput
					v-model:value="referAndEarnStore.friendsId"
					:placeholder="$t('AF0028')"
					@blur="referAndEarnStore.blurGetData()"
					@clear="referAndEarnStore.blurGetData()"
				/>
				<BaseSelect
					:model-value="referAndEarnStore.type"
					:list="referAndEarnStore.inviteRecordList"
					:lang-bol="1"
					@change="referAndEarnStore.changeType"
				/>
			</div>
			<div class="flex flex-col justify-between h-full">
				<div class="py-3 px-6">
					<ul class="flex text-lowlight text-[14px]">
						<li class="w-[80px]">ID</li>
						<li class="w-[90px] text-right">{{ $t('H0005') }}</li>
						<li class="flex-1 text-right">{{ $t('AF0030') }}</li>
						<li class="w-[120px] text-right">{{ $t('U0005') }}</li>
						<li class="w-[130px] text-right">{{ $t('AF0060') }}</li>
					</ul>
				</div>
				<section class="flex-1 overflow-auto mb-20">
					<div v-for="(item, index) in referAndEarnStore.inviteRecordData" :key="index" class="py-3 px-6 card-block mb-3">
						<ul class="flex items-center text-[14px]">
							<li class="w-[80px]">{{ item.user_id }}</li>
							<li class="w-[90px] text-right"><BasePoint :value="item.deposit_point" /></li>
							<li class="flex-1 text-right"><BasePoint :value="item.flow" /></li>
							<li class="w-[120px] text-right"><BasePoint :value="item.total_give_point" /></li>
							<li class="w-[130px] text-right text-xs text-lowlight">{{ Helper.formatDate(item.register_time, 1) }}</li>
						</ul>
					</div>
				</section>
			</div>
		</div>
		<div v-show="referAndEarnStore.tabIndexActive == 1" class="flex flex-col flex-1 overflow-hidden">
			<div class="grid grid-cols-2 gap-x-2 mb-8">
				<BaseInput
					v-model:value="referAndEarnStore.friendsId2"
					:placeholder="$t('AF0028')"
					@blur="referAndEarnStore.blurGetData()"
					@clear="referAndEarnStore.blurGetData()"
				/>
				<BaseSelect
					:model-value="referAndEarnStore.type2"
					:list="referAndEarnStore.inviteRecordList"
					:lang-bol="1"
					@change="referAndEarnStore.changeType"
				/>
			</div>
			<div class="flex flex-col justify-between h-full">
				<div class="py-3 px-6">
					<ul class="flex text-lowlight text-[14px]">
						<li class="w-[80px]">ID</li>
						<li class="w-[90px] text-right">{{ $t('AF0061') }}</li>
						<li class="flex-1 text-right">{{ $t('V0009') }}</li>
						<li class="w-[130px] text-right">{{ $t('U0005') }}</li>
						<li class="w-[130px] text-right">{{ $t('AF0060') }}</li>
					</ul>
				</div>
				<section class="flex-1 overflow-auto mb-20">
					<div v-for="(item, index) in referAndEarnStore.inviteRecordData2" :key="index" class="py-3 px-6 card-block mb-3">
						<ul class="flex items-center color-text-white text-[14px]">
							<li class="w-[80px]">{{ item.user_id }}</li>
							<li class="w-[90px] text-right">{{ item.pid }}</li>
							<li class="flex-1 text-right">{{ item.level - 1 }}</li>
							<li class="w-[130px] text-right"><BasePoint :value="item.total_give_point" /></li>
							<li class="w-[130px] text-right text-xs text-lowlight">{{ Helper.formatDate(item.register_time, 1) }}</li>
						</ul>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const configStore = useSysConfigStore()
	const referAndEarnStore = useReferAndEarnStore()
	onMounted(referAndEarnStore.getRecord)
</script>
