<template>
	<div class="menu-item-container" :class="{ active: active, open: open && $slots.open, small: size == 0, disabled: disabled }">
		<div class="menu-item" @click="handleClick($slots.open)">
			<BaseIcon v-if="name" :name="name" :font-size="name.includes('ic-') ? '12.5px' : ''" />
			<p class="menu-text">{{ needTranslation ? $t(text) : text }}</p>
			<button
				v-if="$slots.open"
				class="absolute text-[16px] w-[40px] h-full flex items-center justify-center right-0 top-0 bottom-0 transition-all duration-200"
				:class="[open ? 'rotate-[0deg]' : '-rotate-[90deg]']"
			>
				<BaseArrowDown />
			</button>
			<BaseDot :show="dot || dotCount" class="navigation-dot" />
		</div>
		<slot name="open" :open="open" />
	</div>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		name: {
			type: String,
			default: '',
		},
		text: {
			type: String,
			default: '',
		},
		dot: {
			type: [Boolean, Number],
			default: false,
		},
		dotCount: {
			type: Number,
			default: 0,
		},
		size: {
			type: Number,
			default: 1,
		},
		active: {
			type: Boolean,
			default: false,
		},
		needTranslation: {
			type: Boolean,
			default: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		small: {
			type: Boolean,
			default: false,
		},
		defaultOpen: {
			type: Boolean,
			default: false,
		},
	})
	const open = ref(propsConf.defaultOpen)
	const emits = defineEmits(['onClick'])
	const handleClick = (slot: any) => {
		if (slot) {
			open.value = !open.value
		}
		emits('onClick')
	}
</script>
<style scoped lang="scss">
	#root-p {
		.menu-item:hover {
			color: $menu-white;
		}
		.menu-item.open {
			.menu-item:hover {
				background: $menu-block-bg-2;
			}
		}
	}
	.menu-item-container {
		border-radius: 6px;
		overflow: hidden;

		&.disabled {
			opacity: 0.6;
			pointer-events: none;
			.menu-item {
				color: $menu-gray;
			}
		}
		&.active {
			.menu-item {
				color: $color-white;
			}
		}
		&.open {
			.menu-item {
				color: $color-white;
				background: $menu-bg;
			}
		}
	}
	.menu-item {
		background: $block-bg-2;
		background-size: contain !important;
		background-repeat: no-repeat !important;
		position: relative;
		height: 40px;
		padding: 0 20px;
		color: $menu-text-lowlight;
		font-size: 14px;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		cursor: pointer;
		.navigation-dot {
			position: absolute;
			left: 30px !important;
			top: 12px;
		}
		.menu-text {
			margin-left: 12px;
			font-size: 14px;
		}
	}
	#root-p {
		.menu-item {
			.navigation-dot {
				top: 8px;
			}
		}
	}
</style>
