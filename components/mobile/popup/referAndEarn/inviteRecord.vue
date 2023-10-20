<template>
	<div class="h-full flex flex-col overflow-hidden">
		<SkinHeader :is-home="false" :title="$t('AF0005')" />
		<div class="px-4 mb-[12px] shrink-0 mt-[10px]">
			<BaseTab :list="referAndEarnStore.tabList" :active="referAndEarnStore.tabIndexActive" @change="referAndEarnStore.changeTabIndexActive" />
		</div>
		<div v-show="referAndEarnStore.tabIndexActive == 0" class="flex flex-col flex-1 overflow-hidden pt-2">
			<div class="grid grid-cols-2 gap-x-2 mb-3 pb-3 px-4 shrink-0">
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
			<div class="overflow-x-hidden overflow-y-auto px-4 flex-1 overflow-touch">
				<ul>
					<li
						v-for="(item, index) in referAndEarnStore.inviteRecordData"
						:key="index"
						class="card-block mb-3 py-3 px-4 flex flex-wrap items-center text-[14px]"
					>
						<div class="flex justify-between items-center w-full pb-3 mb-3 card-border-b">
							<div class="flex items-center">
								<p class="text-lowlight mr-2">ID</p>
								<p class="text-lowlight">{{ item.user_id }}</p>
							</div>
							<p class="text-lowlight text-xs">{{ Helper.formatDate(item.register_time, 1) }}</p>
						</div>
						<div class="flex justify-between w-full">
							<div class="card-border-r flex-1 text-center">
								<p class="text-xs text-lowlight mb-1">{{ $t('H0005') }}</p>
								<p class="color-text-white">
									<BasePoint :value="item.deposit_point" />
								</p>
							</div>
							<div class="text-center w-[40%]">
								<p class="text-xs text-lowlight mb-1">{{ $t('AF0030') }}</p>
								<p class="color-text-white">
									<BasePoint :value="item.flow" />
								</p>
							</div>
							<div class="card-border-l flex-1 text-center">
								<p class="text-xs text-lowlight mb-1">{{ $t('U0005') }}</p>
								<p class="color-text-white">
									<BasePoint :value="item.total_give_point" />
								</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div v-show="referAndEarnStore.tabIndexActive == 1" class="flex flex-col flex-1 overflow-hidden pt-2">
			<div class="grid grid-cols-2 gap-x-2 mb-3 pb-3 shrink-0 px-4">
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
			<div class="overflow-x-hidden overflow-y-auto flex-1 px-4 overflow-touch">
				<ul>
					<li
						v-for="(item, index) in referAndEarnStore.inviteRecordData2"
						:key="index"
						class="card-block mb-3 py-3 px-4 flex flex-wrap items-center text-[14px]"
					>
						<div class="flex justify-between w-full pb-3 mb-3 card-border-b">
							<div class="flex items-center">
								<p class="text-lowlight mr-2">ID</p>
								<p class="text-lowlight">{{ item.user_id }}</p>
							</div>
							<p class="text-lowlight text-xs">{{ Helper.formatDate(item.register_time, 1) }}</p>
						</div>
						<div class="flex justify-between w-full">
							<div class="card-border-r flex-1 text-center">
								<p class="text-xs text-lowlight mb-1">{{ $t('AF0061') }}</p>
								<p class="color-text-white">{{ item.pid }}</p>
							</div>
							<div class="text-center w-[40%]">
								<p class="text-xs text-lowlight mb-1">{{ $t('V0009') }}</p>
								<p class="color-text-white">{{ item.level - 1 }}</p>
							</div>
							<div class="card-border-l flex-1 text-center">
								<p class="text-xs text-lowlight mb-1">{{ $t('U0005') }}</p>
								<p class="color-text-white">
									<BasePoint :value="item.total_give_point" />
								</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const referAndEarnStore = useReferAndEarnStore()
	onMounted(referAndEarnStore.getRecord)
</script>
<style scoped lang="scss">
	.card-border-b {
		border-bottom: 1px solid $color-btn-border;
	}

	.card-border-r {
		border-right: 1px solid $color-btn-border;
	}
	.card-border-l {
		border-left: 1px solid $color-btn-border;
	}
</style>
