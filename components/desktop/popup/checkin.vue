<template>
	<section class="modal-header">
		<div class="flex justify-end w-full">
			<button class="modal__close" @click="closePopup()">
				<BaseIcon name="close" class="text-lowlight text-[18px]" />
			</button>
		</div>
		<h3 class="modal__title section-title text-center">{{ $t('CI0001') }}</h3>
	</section>
	<div class="w-[500px] m-auto mt-[12px] overflow-auto">
		<div class="border-radius check-in-content flex flex-col gap-[16px]">
			<div class="flex flex-wrap gap-[15px] shrink-0">
				<div
					v-for="item in checkinStore.list"
					:key="`${item.day}-${item.receive ? 1 : 2}-${item.current ? 1 : 2}`"
					class="check-in-item"
					:class="{
						'flex-1': item.last,
						'receive-bg': item.receive,
						'receive-bg-last': item.receive && item.last,
						active: item.current && !item.receive,
						pointer: item.current && !item.receive,
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
							width="100"
							height="132"
							viewBox="0 0 100 132"
							fill="none"
							class="absolute bottom-0 left-0 right-0 mx-auto"
						>
							<mask id="mask0_2995_104916" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="132">
								<g style="mix-blend-mode: overlay">
									<rect width="100" height="131.637" rx="6" fill="#4FD5FF" />
								</g>
							</mask>
							<g mask="url(#mask0_2995_104916)">
								<rect x="0.1" y="0.1" width="99.8" height="132.18" rx="5.9" stroke="#75F1F0" stroke-width="0.2" />
								<g filter="url(#filter0_f_2995_104916)">
									<ellipse cx="50" cy="139.818" rx="50" ry="31.2358" fill="#34FEF2" />
								</g>
							</g>
							<defs>
								<filter
									id="filter0_f_2995_104916"
									x="-26"
									y="82.582"
									width="152"
									height="114.471"
									filterUnits="userSpaceOnUse"
									color-interpolation-filters="sRGB"
								>
									<feFlood flood-opacity="0" result="BackgroundImageFix" />
									<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
									<feGaussianBlur stdDeviation="13" result="effect1_foregroundBlur_2995_104916" />
								</filter>
							</defs>
						</svg>
						<svg
							v-else
							xmlns="http://www.w3.org/2000/svg"
							width="215"
							height="133"
							viewBox="0 0 215 133"
							fill="none"
							class="absolute bottom-[0] left-0 right-0 m-auto"
						>
							<g filter="url(#filter0_iii_3000_165671)">
								<rect y="0.363281" width="215" height="132" rx="6" fill="url(#paint0_linear_3000_165671)" />
							</g>
							<mask id="mask0_3000_165671" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="215" height="132">
								<g style="mix-blend-mode: overlay">
									<rect y="0.363281" width="215" height="131.637" rx="6" fill="#4FD5FF" />
								</g>
							</mask>
							<g mask="url(#mask0_3000_165671)">
								<rect x="0.1" y="0.463281" width="214.8" height="132.18" rx="5.9" stroke="#75F1F0" stroke-width="0.2" />
								<g filter="url(#filter1_f_3000_165671)">
									<ellipse cx="103" cy="140" rx="103" ry="31" fill="#34FEF2" />
								</g>
							</g>
							<defs>
								<filter
									id="filter0_iii_3000_165671"
									x="0"
									y="0.363281"
									width="215"
									height="133"
									filterUnits="userSpaceOnUse"
									color-interpolation-filters="sRGB"
								>
									<feFlood flood-opacity="0" result="BackgroundImageFix" />
									<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
									<feColorMatrix
										in="SourceAlpha"
										type="matrix"
										values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
										result="hardAlpha"
									/>
									<feOffset dy="1" />
									<feGaussianBlur stdDeviation="0.5" />
									<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
									<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
									<feBlend mode="normal" in2="shape" result="effect1_innerShadow_3000_165671" />
									<feColorMatrix
										in="SourceAlpha"
										type="matrix"
										values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
										result="hardAlpha"
									/>
									<feOffset dy="-1.5" />
									<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
									<feColorMatrix type="matrix" values="0 0 0 0 0.3125 0 0 0 0 0.95875 0 0 0 0 1 0 0 0 1 0" />
									<feBlend mode="normal" in2="effect1_innerShadow_3000_165671" result="effect2_innerShadow_3000_165671" />
									<feColorMatrix
										in="SourceAlpha"
										type="matrix"
										values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
										result="hardAlpha"
									/>
									<feOffset />
									<feGaussianBlur stdDeviation="1" />
									<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
									<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
									<feBlend mode="normal" in2="effect2_innerShadow_3000_165671" result="effect3_innerShadow_3000_165671" />
								</filter>
								<filter
									id="filter1_f_3000_165671"
									x="-26"
									y="83"
									width="258"
									height="114"
									filterUnits="userSpaceOnUse"
									color-interpolation-filters="sRGB"
								>
									<feFlood flood-opacity="0" result="BackgroundImageFix" />
									<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
									<feGaussianBlur stdDeviation="13" result="effect1_foregroundBlur_3000_165671" />
								</filter>
								<linearGradient
									id="paint0_linear_3000_165671"
									x1="107.5"
									y1="0.363281"
									x2="107.5"
									y2="132.363"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#30E7A5" />
									<stop offset="1" stop-color="#2684DB" />
								</linearGradient>
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
						<div class="pl-[7px] pb-[9px] pt-[7px] text-[24px]">{{ `0${item.day}` }}</div>
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
							<BaseImg v-if="item.more" class="m-auto w-[70px]" :src="getResConfigImage('more', ImageKeyEnum.checkin)" />
							<template v-else>
								<BaseImg
									v-if="item.rewards[0]"
									class="w-[48px] m-auto mb-[6px]"
									:src="getResConfigImage(`rprop${item.rewards[0]}`, ImageKeyEnum.rewards)"
								/>
								<BaseImg
									v-if="item.rewards[1]"
									class="w-[48px] m-auto mb-[6px]"
									:class="{ 'has-reawrd-prop': item.rewards[0] }"
									:src="getResConfigImage(`rprop${item.rewards[1]}`, ImageKeyEnum.rewards)"
								/>
								<BaseImg
									v-if="item.point"
									class="w-[48px] m-auto mb-[6px]"
									:class="{ 'has-reawrd-coin': item.rewards[1] || item.rewards[0] }"
									:src="getResConfigImage('coin', ImageKeyEnum.checkin)"
								/>
							</template>
							<div v-if="item.random">&nbsp;</div>
							<div v-else-if="item.point && !item.random" class="text-center text-[16px]">
								<BasePoint :value="item.point" />
							</div>

							<div v-else-if="!item.random" class="text-center text-[16px]">X1</div>
							<div v-else class="text-[16px]">&nbsp;</div>
						</template>
						<template v-else>
							<template v-if="item.random">
								<BaseImg v-if="item.more" class="m-auto w-[100px]" :src="getResConfigImage('more', ImageKeyEnum.checkin)" />
								<template v-else>
									<BaseImg
										v-if="item.rewards[0]"
										class="w-[48px] m-auto mb-[6px]"
										:src="getResConfigImage(`rprop${item.rewards[0]}`, ImageKeyEnum.rewards)"
									/>
									<BaseImg
										v-if="item.rewards[1]"
										class="w-[48px] m-auto mb-[6px]"
										:class="{ 'has-reawrd-prop': item.rewards[0] }"
										:src="getResConfigImage(`rprop${item.rewards[1]}`, ImageKeyEnum.rewards)"
									/>
									<BaseImg
										v-if="item.point"
										class="w-[48px] m-auto mb-[6px]"
										:class="{ 'has-reawrd-coin': item.rewards[1] || item.rewards[0] }"
										:src="getResConfigImage('coin', ImageKeyEnum.checkin)"
									/>
								</template>
								<div>&nbsp;</div>
							</template>
							<template v-else>
								<div class="flex justify-evenly">
									<BaseImg
										v-if="item.point"
										class="w-[48px] m-auto mb-[6px]"
										:src="getResConfigImage('coin', ImageKeyEnum.checkin)"
									/>
									<BaseImg
										v-if="item.rewards[0]"
										class="w-[48px] m-auto mb-[6px]"
										:src="getResConfigImage(`rprop${item.rewards[0]}`, ImageKeyEnum.rewards)"
									/>
								</div>
								<div class="flex justify-evenly">
									<div v-if="item.point" class="text-center text-[12px] flex-1">
										<BasePoint :value="item.point" />
									</div>
									<div v-if="item.rewards[0]" class="text-center text-[12px] flex-1">X1</div>
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
				<p class="text-[16px]">{{ $t('CI0014') }}</p>
				<ul class="text-[14px] checkin-ul">
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
			<div class="text-[16px] color-text check-in-rule-text whitespace-pre-wrap" v-html="$pt(configStore.checkinCfg.rules)" />
			<!-- <ul class="text-[16px] text-lowlight check-in-rule-text">
				<li>{{ $t('CI0005') }}.</li>
				<li v-html="$t('CI0006', { day: `<em>7 ${$t('CI0011')}</em>` })" />
				<li>
					{{ $t('CI0007') }}
					<ul>
						<li v-for="item in checkinStore.cfg.List" :key="item.day" v-html="checkinStore.getDayRule(item)" />
					</ul>
				</li>
				<li>{{ $t('CI0009') }}</li>
				<li>{{ $t('CI0010') }}</li>
			</ul> -->
		</div>
	</div>
</template>
<script lang="ts" setup>
	const configStore = useSysConfigStore()
	const checkinStore = useCheckInStore()
	onMounted(checkinStore.mounted)
	onBeforeUnmount(checkinStore.unmounted)
</script>
<style scoped lang="scss">
	.check-in-content {
		margin-top: 18px;
		padding-top: 30px;
		padding-bottom: 20px;
		padding-left: 27.5px;
		padding-right: 27.5px;
		.check-in-day {
			font-size: 36px;
		}
		.check-in-item {
			width: calc((100% - 15px * 3) / 4);
			height: 132px;

			.check-in-item-content {
				padding-bottom: 2px;
			}
			.has-reawrd-coin {
				@apply absolute w-[28px] bottom-[29px] right-[53%];
			}
			.has-reawrd-prop {
				@apply absolute w-[36px] bottom-[44px] left-[50%] -z-[1];
			}
			.check-in-animate-container {
				@apply absolute top-0 bottom-0 right-0 left-0 m-auto w-[80px] h-[80px];
				&.click {
					img:first-child {
						animation: starMovePc1 0.8s forwards;
					}
					img:nth-child(2) {
						animation: starMovePc2 0.8s 50ms forwards;
					}
					img:nth-child(3) {
						animation: starMovePc3 0.75s 80ms forwards;
					}
					img:nth-child(4) {
						animation: starMovePc4 0.5s 200ms forwards;
					}
					img:nth-child(5) {
						animation: starMovePc5 0.7s 120ms forwards;
					}
				}

				img {
					opacity: 1;
					left: 0;
					right: 0;
					bottom: 0;
					top: 0;
					width: 0;
					height: 0;
					margin: auto;
					@apply absolute;
				}
			}
		}
	}
	.check-in-rule {
		.check-in-rule-header {
			@apply text-[24px] h-[40px];
		}
	}

	@keyframes starMovePc1 {
		0% {
			width: 0;
			height: 0;
			opacity: 0;
			transform: translate3d(0, 0, 0);
		}
		2% {
			width: 18px;
			height: 18px;
			opacity: 0.1;
			transform: translate3d(0, 0, 0);
		}
		40% {
			width: 18px;
			height: 18px;
			opacity: 1;
			transform: translate3d(18px, -40px, 0);
		}
		100% {
			width: 18px;
			height: 18px;
			opacity: 0;
			transform: translate3d(18px, -40px, 0);
		}
	}
	@keyframes starMovePc2 {
		0% {
			width: 0;
			height: 0;
			opacity: 0;
			transform: translate3d(0, 0, 0);
		}
		2% {
			width: 18px;
			height: 18px;
			opacity: 0.1;
			transform: translate3d(0, 0, 0);
		}
		40% {
			width: 18px;
			height: 18px;
			opacity: 1;
			transform: translate3d(-32px, -30px, 0);
		}
		100% {
			width: 18px;
			height: 18px;
			opacity: 0;
			transform: translate3d(-32px, -30px, 0);
		}
	}
	@keyframes starMovePc3 {
		0% {
			width: 0;
			height: 0;
			opacity: 0;
			transform: translate3d(0, 0, 0);
		}
		2% {
			width: 20px;
			height: 20px;
			opacity: 0.1;
			transform: translate3d(0, 0, 0);
		}
		40% {
			width: 20px;
			height: 20px;
			opacity: 1;
			transform: translate3d(30px, -24px, 0);
		}
		100% {
			width: 14px;
			height: 14px;
			opacity: 0;
			transform: translate3d(30px, -24px, 0);
		}
	}
	@keyframes starMovePc4 {
		0% {
			width: 0;
			height: 0;
			opacity: 0;
			transform: translate3d(0, 0, 0);
		}
		2% {
			width: 24px;
			height: 24px;
			opacity: 0.1;
			transform: translate3d(0, 0, 0);
		}
		40% {
			width: 24px;
			height: 24px;
			opacity: 1;
			transform: translate3d(-25px, 30px, 0);
		}
		100% {
			width: 18px;
			height: 18px;
			opacity: 0;
			transform: translate3d(-25px, 30px, 0);
		}
	}
	@keyframes starMovePc5 {
		0% {
			width: 0;
			height: 0;
			opacity: 0;
			transform: translate3d(0, 0, 0);
		}
		2% {
			width: 24px;
			height: 24px;
			opacity: 0.1;
			transform: translate3d(0, 0, 0);
		}
		40% {
			width: 24px;
			height: 24px;
			transform: translate3d(30px, 30px, 0);
			opacity: 1;
		}
		100% {
			width: 16px;
			height: 16px;
			transform: translate3d(30px, 30px, 0);
			opacity: 0;
		}
	}
	.checkin-ul {
		margin-top: 2px;
		list-style-type: disc;
		list-style-position: outside;
		margin-left: 16px;
		text-indent: -4px;
	}
</style>
