<template>
	<SkinHeader :is-home="false" :title="`${$t('CI0001')}`" />
	<section class="h-full overflow-y-auto overflow-x-hidden shrink-0">
		<div class="border-radius check-in-content flex flex-col gap-[16px]">
			<div class="flex flex-wrap gap-[12px] shrink-0">
				<div
					v-for="item in checkinStore.list"
					:key="`${item.day}-${item.receive ? 1 : 2}-${item.current ? 1 : 2}`"
					class="check-in-item point"
					:class="{
						'flex-1': item.last,
						'receive-bg': item.receive,
						'receive-bg-last': item.receive && item.last,
						active: item.current && !item.receive,
					}"
				>
					<BaseImg
						v-if="item.receive"
						class="absolute z-[4] -right-[23px] -top-[31px]"
						:src="getResConfigImage('receive', ImageKeyEnum.checkin)"
					/>
					<template v-if="item.current && !item.receive">
						<svg
							v-if="!item.last"
							xmlns="http://www.w3.org/2000/svg"
							width="69"
							height="89"
							viewBox="0 0 69 89"
							fill="none"
							class="absolute bottom-[0] left-0 right-0 m-auto"
						>
							<mask id="mask0_2990_13607" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="69" height="89">
								<g style="mix-blend-mode: overlay">
									<rect x="0.388672" width="68" height="88.5" rx="6" fill="#4FD5FF" />
								</g>
							</mask>
							<g mask="url(#mask0_2990_13607)">
								<rect x="0.488672" y="0.1" width="67.8" height="88.8" rx="5.9" stroke="#75F1F0" stroke-width="0.2" />
								<g filter="url(#filter0_f_2990_13607)">
									<ellipse cx="34.3887" cy="94" rx="34" ry="21" fill="#34FEF2" />
								</g>
							</g>
							<defs>
								<filter
									id="filter0_f_2990_13607"
									x="-25.6113"
									y="47"
									width="120"
									height="94"
									filterUnits="userSpaceOnUse"
									color-interpolation-filters="sRGB"
								>
									<feFlood flood-opacity="0" result="BackgroundImageFix" />
									<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
									<feGaussianBlur stdDeviation="13" result="effect1_foregroundBlur_2990_13607" />
								</filter>
							</defs>
						</svg>
						<svg
							v-else
							xmlns="http://www.w3.org/2000/svg"
							width="147"
							height="89"
							viewBox="0 0 147 89"
							fill="none"
							class="absolute bottom-[0] left-0 right-0 m-auto"
						>
							<mask id="mask0_3000_165363" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="147" height="89">
								<g style="mix-blend-mode: overlay">
									<rect y="0.438477" width="147" height="88.5" rx="6" fill="#4FD5FF" />
								</g>
							</mask>
							<g mask="url(#mask0_3000_165363)">
								<rect x="0.1" y="0.538477" width="146.8" height="88.8" rx="5.9" stroke="#75F1F0" stroke-width="0.2" />
								<g filter="url(#filter0_f_3000_165363)">
									<ellipse cx="73" cy="94" rx="61" ry="21" fill="#34FEF2" />
								</g>
							</g>
							<defs>
								<filter
									id="filter0_f_3000_165363"
									x="-14"
									y="47"
									width="174"
									height="94"
									filterUnits="userSpaceOnUse"
									color-interpolation-filters="sRGB"
								>
									<feFlood flood-opacity="0" result="BackgroundImageFix" />
									<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
									<feGaussianBlur stdDeviation="13" result="effect1_foregroundBlur_3000_165363" />
								</filter>
							</defs>
						</svg>
					</template>

					<div
						class="check-in-item-content"
						:style="{
							'background-image':
								item.last && !item.current
									? `url(${getResConfigImage(`mask${item.receive ? 1 : ''}`, ImageKeyEnum.checkin)})`
									: item.receive
									? `url(${getResConfigImage('receive-bg', ImageKeyEnum.checkin)})`
									: '',
						}"
						:class="{ 'check-in-item-content-receive': item.receive }"
					>
						<div class="pl-[7px] pt-[7px] pb-[3px] text-[18px] font-[600]">
							{{ `0${item.day}` }}
						</div>
						<div
							class="check-in-animate-container"
							:class="{ click: item.day == checkinStore.clickId && !checkinStore.clickStatus }"
							@animationend="checkinStore.animationend"
						>
							<BaseImg :src="getResConfigImage('star-1', ImageKeyEnum.checkin)" />
							<BaseImg :src="getResConfigImage('star-2', ImageKeyEnum.checkin)" />
							<BaseImg :src="getResConfigImage('star-3', ImageKeyEnum.checkin)" />
							<BaseImg :src="getResConfigImage('star-4', ImageKeyEnum.checkin)" />
							<BaseImg :src="getResConfigImage('star-5', ImageKeyEnum.checkin)" />
						</div>
						<template v-if="!item.last">
							<BaseImg v-if="item.more" class="w-[55px] m-auto" :src="getResConfigImage('more', ImageKeyEnum.checkin)" />
							<template v-else>
								<BaseImg
									v-if="item.rewards[0]"
									class="w-[30px] mx-auto mb-[8px]"
									:src="getResConfigImage(`rprop${item.rewards[0]}`, ImageKeyEnum.rewards)"
								/>
								<BaseImg
									v-if="item.rewards[1]"
									class="w-[30px] mx-auto mb-[8px]"
									:class="{ 'has-reawrd-prop': item.rewards[0] }"
									:src="getResConfigImage(`rprop${item.rewards[1]}`, ImageKeyEnum.rewards)"
								/>
								<BaseImg
									v-if="item.point"
									class="w-[30px] mx-auto mb-[8px]"
									:class="{ 'has-reawrd-coin': item.rewards[1] || item.rewards[0] }"
									:src="getResConfigImage('coin', ImageKeyEnum.checkin)"
								/>
							</template>

							<div v-if="item.random">&nbsp;</div>
							<div v-else-if="item.point && !item.random" class="text-center text-[12px] leading-[14.4px]">
								<BasePoint :value="item.point" />
							</div>
							<div v-else-if="!item.random" class="text-center text-[12px] leading-[14.4px]">X1</div>
							<div v-else class="text-[12px] leading-[14.4px]">&nbsp;</div>
						</template>
						<template v-else>
							<template v-if="item.random">
								<BaseImg v-if="item.more" class="m-auto w-[70px]" :src="getResConfigImage('more', ImageKeyEnum.checkin)" />
								<template v-else>
									<BaseImg
										v-if="item.rewards[0]"
										class="w-[30px] mx-auto mb-[8px]"
										:src="getResConfigImage(`rprop${item.rewards[0]}`, ImageKeyEnum.rewards)"
									/>
									<BaseImg
										v-if="item.rewards[1]"
										:class="{ 'has-reawrd-prop': item.rewards[0] }"
										class="w-[30px] mx-auto mb-[8px]"
										:src="getResConfigImage(`rprop${item.rewards[1]}`, ImageKeyEnum.rewards)"
									/>
									<BaseImg
										v-if="item.point"
										class="w-[30px] mx-auto mb-[8px]"
										:class="{ 'has-reawrd-coin': item.rewards[1] || item.rewards[0] }"
										:src="getResConfigImage('coin', ImageKeyEnum.checkin)"
									/>

									<div class="check-in-animate-container" :class="{ click: item.day == checkinStore.clickId }">
										<BaseImg :src="getResConfigImage('star-1', ImageKeyEnum.checkin)" />
										<BaseImg :src="getResConfigImage('star-2', ImageKeyEnum.checkin)" />
										<BaseImg :src="getResConfigImage('star-3', ImageKeyEnum.checkin)" />
										<BaseImg :src="getResConfigImage('star-4', ImageKeyEnum.checkin)" />
										<BaseImg :src="getResConfigImage('star-5', ImageKeyEnum.checkin)" />
									</div>
								</template>
								<div>&nbsp;</div>
							</template>
							<template v-else>
								<div class="flex justify-evenly">
									<BaseImg
										v-if="item.point"
										class="w-[30px] mx-auto mb-[8px]"
										:src="getResConfigImage('coin', ImageKeyEnum.checkin)"
									/>
									<BaseImg
										v-if="item.rewards[0]"
										class="w-[30px] mx-auto mb-[8px]"
										:src="getResConfigImage(`rprop${item.rewards[0]}`, ImageKeyEnum.rewards)"
									/>
								</div>
								<div class="flex justify-evenly">
									<div class="flex w-full">
										<div v-if="item.point" class="text-center text-[12px] leading-[14.4px] flex-1">
											<BasePoint :value="item.point" />
										</div>
										<div v-if="item.rewards[0]" class="text-center text-[12px] leading-[14.4px] flex-1">X1</div>
									</div>
								</div>
							</template>
						</template>
					</div>
				</div>
			</div>
			<button
				class="sys-btn check-in-button"
				:class="{ 'check-in-button-disabled': !checkinStore.currentItem || checkinStore.currentItem.receive }"
				@click="checkinStore.doCheckin()"
			>
				{{ checkinStore.currentItem && checkinStore.currentItem.receive ? $t('CI0013') : $t('BC0035') }}
			</button>
			<div v-if="checkinStore.currentItem && (checkinStore.currentItem.deposit_limit || checkinStore.currentItem.turnover_limit)">
				<p class="text-[14px]">{{ $t('CI0014') }}</p>
				<ul class="text-[12px] checkin-ul">
					<li v-if="checkinStore.currentItem.deposit_limit">
						{{ $t('BC0012') }} <BasePoint :value="checkinStore.currentItem.deposit_limit" />
					</li>
					<li v-if="checkinStore.currentItem.turnover_limit">
						{{ $t('MP0006') }} <BasePoint :value="checkinStore.currentItem.turnover_limit" />
					</li>
				</ul>
			</div>
		</div>
		<div class="check-in-rule card-block">
			<div class="check-in-rule-header" :style="{ 'background-image': `url(${getResConfigImage('rule', ImageKeyEnum.checkin)})` }">
				{{ $t('CI0002') }}
			</div>
			<div class="text-[12px] color-text check-in-rule-text whitespace-pre-wrap" v-html="$pt(configStore.checkinCfg.rules)" />
		</div>
	</section>
</template>
<script lang="ts" setup>
	const configStore = useSysConfigStore()
	const checkinStore = useCheckInStore()
	onMounted(checkinStore.mounted)
	onBeforeUnmount(checkinStore.unmounted)
</script>
