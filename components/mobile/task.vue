<template>
	<div class="task-view task-view-mobile">
		<section class="task-top relative mb-[16px] mt-[16px] w-[91%] mx-auto h-0 pb-[62.667%]">
			<div class="task-top-text absolute top-[38px] left-6 z-[2]">
				<p class="task-top-text text-[32px] font-bold text-second mb-1 w-[60%]">{{ $t('TA0005') }}</p>
				<p class="w-7/12 text-xs">{{ $t('TA0006') }}</p>
			</div>
			<BaseImg :src="getResConfigImage('task-banner', ImageKeyEnum.task)" alt="vision" class="top-img absolute left-0 top-0 w-full z-[1]" />
		</section>
		<section class="px-4 pb-8">
			<div class="card-block px-3 pb-3 pt-12 mb-8">
				<ul class="grid grid-cols-4 gap-3 mb-4">
					<li v-for="(task, index) in taskStore.progress" :key="index">
						<div class="award-box card-block-dark text-center py-1 mb-3" :class="{ achieve: taskStore.progressActive >= index }">
							<div class="vision">
								<BaseImg v-if="task.status == 2" :src="getResConfigImage('award-active', ImageKeyEnum.task)" alt="" />
								<BaseImg
									v-else-if="task.status < 2"
									:src="getResConfigImage('award-achieve', ImageKeyEnum.task)"
									alt=""
									@click="taskStore.receiveTask(task)"
								/>
							</div>
							<div class="h-[44px] flex flex-col items-center justify-center">
								<template v-if="task.reward.point || !task.reward.props.length">
									<BaseImg class="icon mx-auto" :src="getResConfigImage('coin-r', ImageKeyEnum.task)" alt="" />
									<span v-if="task.reward.point || !task.reward.props.length" class="color-text-white">
										<BasePoint :value="task.reward.point" :show-symbol="false" :precision="2" :b-delete-zero-point="true" />
									</span>
								</template>

								<BaseImg
									v-else
									class="mx-auto w-[28px] mb-1"
									:src="getResConfigImage(`rprop${task.reward.props[0].item_type}`, ImageKeyEnum.rewards)"
									alt=""
								/>
							</div>
						</div>
					</li>
				</ul>
				<div class="bar-block mb-6">
					<div class="bar-bg mb-3">
						<div class="bar" :style="{ width: taskStore.taskPercentage }">
							<BaseImg class="bar-icon icon" :src="getResConfigImage('coin-star', ImageKeyEnum.task)" alt="point" />
						</div>
					</div>
					<div class="grid grid-cols-4 gap-3">
						<div v-for="(task, index) in taskStore.progress" :key="index" class="text-center">
							<span class="circle" />
							<p class="color-text-white">
								<BaseNumber :value="task.need_task_point" :precision="2" :b-delete-zero-point="true" />
							</p>
						</div>
					</div>
				</div>
				<div class="flex justify-between">
					<p class="color-text text-xs flex items-center">
						<span class="mr-1">{{ $t('R0031') }} </span>
						<span>{{ taskStore.renderTimeLeft }}</span>
					</p>
					<p class="color-text text-xs flex items-center">
						<span class="mr-1">{{ $t('TA0001') }} </span>
						<BaseImg class="icon mr-1" :src="getResConfigImage('coin-star', ImageKeyEnum.task)" alt="" />
						<BaseNumber :value="taskStore.task_point" />
					</p>
				</div>
			</div>
			<BaseTab :is-sticky="taskStore.loaded" :list="taskStore.tabList" :active="taskStore.tabIndex" @change="taskStore.changeTabIndex" />
			<p class="px-3 py-4 color-text-white text-xs flex items-center" :class="{ 'opacity-0': taskStore.tabIndex == 0 }">
				<span class="mr-1">{{ $t('R0031') }}</span>
				<span>{{ taskStore.renderTimeLeft }}</span>
			</p>
			<ul>
				<li v-for="(task, index) in taskStore.taskList" :key="index" class="card-block flex items-stretch p-3 mb-3">
					<div class="flex-1 pr-3">
						<h3 class="text-[14px] font-bold mb-1">{{ $pt(task.lang_task)?.name }}</h3>
						<p class="text-lowlight text-xs mb-3">{{ $pt(task.lang_task)?.task_desc }}</p>
						<div v-if="task.showRate" class="bar-block">
							<div class="flex items-center justify-between text-xs text-lowlight mb-1">
								<p><BaseNumber :value="task.task_self_num" /> / <BaseNumber :value="task.task_num" /></p>
								<p class="bar-value" :class="task.achievementColor">{{ task.achievementRate }}%</p>
							</div>
							<div class="bar-bg">
								<div class="bar" :class="task.achievementColor" :style="{ width: task.achievementRate + '%' }" />
							</div>
						</div>
					</div>
					<div class="border-left flex shrink-0 flex-col items-center">
						<div class="flex justify-center items-center mb-4 w-[140px]">
							<p v-if="task.reward.point" class="flex gap-1 items-center">
								<BaseImg class="icon" :src="getResConfigImage('coin-r', ImageKeyEnum.task)" alt="" />
								<span><BasePoint :value="task.reward.point" :precision="2" :b-delete-zero-point="true" :show-symbol="false" /></span>
							</p>
							<p v-if="task.reward.task_int" class="flex gap-1 items-center ml-[8px]">
								<BaseImg class="icon" :src="getResConfigImage('coin-star', ImageKeyEnum.task)" alt="" />
								<span><BaseNumber :value="task.reward.task_int" :precision="0" /></span>
							</p>
						</div>
						<button v-if="task.task_status == 0" class="sys-btn btn-highlight w-[125px] btn-m" @click="taskStore.skipWay(task)">
							{{ ![1001, 1002, 2001, 2002, 6001].includes(task.task_type) ? $t('TA0009') : $t('TA0010') }}
						</button>
						<button v-else class="sys-btn btn-disable btn-m w-[125px]" disabled>{{ $t('TA0007') }}</button>
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>
<script lang="ts" setup>
	const taskStore = useTaskStore()
	const configStore = useSysConfigStore()
</script>
