<template>
	<SkinHeader :is-home="false" :title="$t('U0007')" />
	<div class="modal__content flex flex-col flex-1 overflow-hidden">
		<div class="px-4 mt-[10px]">
			<BaseTab :list="messageStore.tabList" :active="messageStore.tabIndexActive" @change="messageStore.switchTab" />
		</div>
		<div class="mt-[16px] overflow-y-auto flex flex-col message-content-wrap">
			<!-- <PullRefresh v-model="messageStore.refreshing" pulling-text="loading" loading-text="refreshing" @refresh="messageStore.refresh" loosing-text="release to refresh" success-text="refreshed"> -->
			<div class="gap-y-[12px] flex flex-col px-4 pb-[24px]">
				<div v-for="item in messageStore.list" :key="item.id">
					<div class="p-[12px] flex flex-col border-radius cursor-pointer card-block collapse-transition">
						<div @click="messageStore.handleAccordion(item)">
							<div v-if="messageStore.expandedId != item.id">
								<div class="flex items-center justify-between">
									<h4 class="w-[260px] mr-[8px] text-[14px] font-medium color-text-white truncate">
										{{ messageStore.renderItemContent(item).title }}
									</h4>
									<div class="flex items-center gap-[10px] justify-end">
										<BaseDot :show="!item.red_status && !item.page_read" />
										<BaseArrowDown class="white text-[14px]" />
									</div>
								</div>
								<p class="text-[12px] mt-[8px] font-medium color-text truncate">
									{{ messageStore.renderItemContent(item).content?.split('\n')[0] }}
								</p>
							</div>
							<Collapse :when="messageStore.expandedId == item.id" class="v-collapse">
								<div :class="messageStore.expandedId == item.id ? 'opacity-100' : 'opacity-0'">
									<div class="flex items-start justify-between">
										<h4 class="w-[260px] text-[14px] color-text-white font-medium color-text">
											{{ messageStore.renderItemContent(item).title }}
										</h4>
										<BaseArrowDown class="color-text text-[14px] rotate-180" />
									</div>
									<p class="text-[12px] color-text mt-[8px] font-medium whitespace-pre-wrap">
										{{ messageStore.renderItemContent(item).content }}
									</p>
								</div>
							</Collapse>
							<p class="text-[12px] mt-[16px] font-medium color-text text-right">{{ Helper.formatDate(item.time_unix || 0) }}</p>
						</div>
					</div>
				</div>
			</div>
			<!-- </PullRefresh> -->
		</div>
	</div>
</template>
<script setup lang="ts">
	// import PullRefresh from "pull-refresh-vue3";
	import { Collapse } from 'vue-collapsed'
	import Helper from '~~/apis/tool/Helper'
	const messageStore = useMessageStore()
	onMounted(messageStore.mounted)
	onBeforeUnmount(messageStore.unmounted)
</script>
