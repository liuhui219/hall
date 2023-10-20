<template>
	<div class="task-view task-view-pc wrap">
		<section class="relative mt-[24px] mb-[32px]">
			<div class="absolute bottom-[80px] left-[8%]">
				<p class="task-top-text text-[48px] font-bold text-second mb-1 text-center text-shadow">
					{{ $t('TA0005') }}
				</p>
				<p class="text-center text-[28px]">{{ $t('TA0006') }}</p>
			</div>
			<BaseImg :src="getResConfigImage('task-banner-pc', ImageKeyEnum.task)" alt="task banner" class="top-img w-full" />
		</section>
		<section class="card-block flex items-center p-8">
			<div class="px-8">
				<div class="mb-[112px]">
					<p class="text-lowlight section-title flex items-center justify-center mb-6">
						<span class="mr-1">{{ $t('R0031') }}</span>
						<span class="color-text inline-block w-[152px] whitespace-nowrap">{{ taskStore.renderBaseTimeLeft }}</span>
					</p>
					<p class="text-lowlight section-title flex items-center justify-center">
						<span class="mr-2">{{ $t('TA0001') }} </span>
						<BaseImg class="icon mr-1" :src="getResConfigImage('coin-star', ImageKeyEnum.task)" alt="" />
						<span class="color-text"><BaseNumber :value="taskStore.task_point" :precision="0" /></span>
					</p>
				</div>
				<ul class="grid grid-cols-4 gap-6 mb-8">
					<li v-for="(task, index) in taskStore.progress" :key="index" class="cursor-point">
						<div class="award-box card-block-dark text-center py-1 mb-3" :class="{ achieve: taskStore.progressActive >= index }">
							<div class="vision" :class="{ pointer: task.status == 1 }">
								<BaseImg v-show="task.status == 2" :src="getResConfigImage('award-active', ImageKeyEnum.task)" alt="task-active" />
								<BaseImg
									v-show="task.status < 2"
									:src="getResConfigImage('award-achieve', ImageKeyEnum.task)"
									alt="task-achieve"
									@click="taskStore.receiveTask(task)"
								/>
							</div>
							<div class="h-[70px] mb-2 flex flex-col items-center justify-center">
								<template v-if="task.reward.point || !task.reward.props.length">
									<BaseImg class="icon mx-auto mb-1" :src="getResConfigImage('coin-r', ImageKeyEnum.task)" alt="" />
									<span class="section-title">
										<BasePoint :value="task.reward.point" :precision="2" :b-delete-zero-point="true" :show-symbol="false" />
									</span>
								</template>

								<BaseImg
									v-else
									class="mx-auto w-[45px]"
									:src="getResConfigImage(`rprop${task.reward.props[0].item_type}`, ImageKeyEnum.rewards)"
									alt=""
								/>
							</div>
						</div>
					</li>
				</ul>
				<div class="bar-block mb-6">
					<div class="bar-bg mb-2">
						<div class="bar" :style="{ width: taskStore.taskPercentage }">
							<BaseImg class="icon bar-icon" :src="getResConfigImage('coin-star', ImageKeyEnum.task)" alt="point" />
						</div>
					</div>
					<div class="grid grid-cols-4 gap-6">
						<div v-for="(task, index) in taskStore.progress" :key="index" class="text-center">
							<span class="circle" />
							<p class="section-title"><BaseNumber :value="task.need_task_point" :precision="2" :b-delete-zero-point="true" /></p>
						</div>
					</div>
				</div>
			</div>
			<section class="flex-1 h-[620px] flex flex-col card-block-dark p-6">
				<BaseTab :list="taskStore.showTabList" :active="taskStore.tabIndex" @change="taskStore.changeTabIndex" />
				<p class="px-3 py-4 color-text text-xs flex items-center" :class="{ 'opacity-0': taskStore.tabIndex == 0 }">
					<span class="mr-1">{{ $t('R0031') }}</span>
					<span class="color-text">{{ taskStore.renderTimeLeft }}</span>
				</p>
				<ul class="flex-1 overflow-auto">
					<li v-for="(task, index) in taskStore.taskList" :key="index" class="card-block flex items-stretch p-3 mb-3">
						<div class="flex-1 pr-3">
							<h3 class="text-[14px] font-bold mb-1">{{ $pt(task.lang_task)?.name }}</h3>
							<p class="text-lowlight text-xs mb-3">{{ $pt(task.lang_task)?.task_desc }}</p>
							<div v-show="task.showRate" class="bar-block">
								<div class="flex items-center justify-between text-xs text-lowlight mb-1">
									<p><BaseNumber :value="task.task_self_num" /> / <BaseNumber :value="task.task_num" /></p>
									<p class="bar-value" :class="task.achievementColor">{{ task.achievementRate }}%</p>
								</div>
								<div v-if="task.showRate" class="bar-bg">
									<div class="bar" :class="task.achievementColor" :style="{ width: task.achievementRate + '%' }" />
								</div>
							</div>
						</div>
						<div class="border-left shrink-0 flex flex-col items-center">
							<div class="flex items-center mb-4 w-[145px] justify-center">
								<p v-if="task.reward.point" class="flex gap-1 items-center">
									<BaseImg class="w-4 h-4" :src="getResConfigImage('coin-r', ImageKeyEnum.task)" alt="" />
									<span>
										<BasePoint :value="task.reward.point" :precision="2" :b-delete-zero-point="true" :show-symbol="false" />
									</span>
								</p>
								<p v-if="task.reward.task_int" class="flex gap-1 items-center ml-[8px]">
									<BaseImg class="w-4 h-4" :src="getResConfigImage('coin-star', ImageKeyEnum.task)" alt="" />
									<span>
										<BaseNumber :value="task.reward.task_int" :precision="0" :show-symbol="false" />
									</span>
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
		</section>
	</div>
</template>
<script lang="ts" setup>
	const configStore = useSysConfigStore()
	const taskStore = useTaskStore()
</script>
