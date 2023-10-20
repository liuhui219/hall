<template>
	<DesktopPopupHeader :title="$t('U0007')" :invisible="!useRoute().hash?.includes('userInfo')" />
	<div class="modal__content flex flex-col flex-1 overflow-hidden">
		<div class="mt-[32px] shrink-0">
			<BaseTab :list="messageStore.tabList" :active="messageStore.tabIndexActive" @change="messageStore.switchTab" />
		</div>
		<div class="mt-[32px] overflow-y-scroll flex-1 flex flex-col message-content-wrap">
			<div v-for="item in messageStore.list" :key="item.id">
				<div class="p-[12px] mb-[12px] flex flex-col border-radius cursor-pointer card-block collapse-transition">
					<div @click="messageStore.handleAccordion(item)">
						<div v-if="item.id != messageStore.expandedId">
							<div class="flex items-center justify-between">
								<h4 class="w-[530px] mr-[8px] text-[14px] font-medium color-text-white truncate">
									{{ messageStore.renderItemContent(item).title }}
								</h4>
								<BaseDot :show="!item.red_status && !item.page_read" />
								<BaseArrowDown class="white text-[16px]" />
							</div>
							<p class="text-[12px] mt-[8px] font-medium color-text truncate">
								{{ messageStore.renderItemContent(item).content?.split('\n')[0] }}
							</p>
						</div>
						<Collapse :when="item.id == messageStore.expandedId" class="v-collapse">
							<div :class="item.id == messageStore.expandedId ? 'opacity-100' : 'opacity-0'">
								<div class="flex items-start justify-between">
									<h4 class="w-[530px] text-[14px] font-medium color-text-white">
										{{ messageStore.renderItemContent(item).title }}
									</h4>
									<BaseArrowDown class="color-text text-[16px] rotate-180" />
								</div>
								<p class="text-[12px] mt-[8px] font-medium color-text whitespace-pre-wrap">
									{{ messageStore.renderItemContent(item).content }}
								</p>
							</div>
						</Collapse>
						<p class="text-[12px] mt-[16px] font-medium color-text text-right">
							{{ Helper.formatDate(item.time_unix || 0) }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { Collapse } from 'vue-collapsed'
	import Helper from '~~/apis/tool/Helper'
	const messageStore = useMessageStore()
	onMounted(messageStore.mounted)
	onBeforeUnmount(messageStore.unmounted)
</script>
