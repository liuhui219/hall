<template>
	<div
		class="menu-hide-item"
		:style="{ height: height + 'px', width: height != 52 ? '100%' : '64px' }"
		:class="{ active: active, 'color-item': height != 52 }"
		@click="handleClick"
	>
		<BaseImg v-if="src" :src="src" class="w-[60%]" />
		<BaseIcon v-else-if="name" :name="name" :font-size="name.includes('ic-') ? '12.5px' : ''" />
		<BaseDot :show="dot" class="navigation-dot" />
		<div v-if="text" class="menu-hide-text">{{ needTranslation ? $t(text) : text }}</div>
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
		src: {
			type: String,
			default: '',
		},
		dot: {
			type: [Boolean, Number],
			default: false,
		},
		height: {
			type: Number,
			default: 52,
		},
		active: {
			type: Boolean,
			default: false,
		},
		needTranslation: {
			type: Boolean,
			default: true,
		},
	})
	const emits = defineEmits(['onClick'])
	const handleClick = () => {
		emits('onClick')
	}
</script>
<style scoped lang="scss">
	.menu-hide-item {
		background: transparent;
		background-size: contain;
		background-repeat: no-repeat;
		margin-bottom: 0;
		position: relative;
		color: $menu-text-lowlight;
		font-size: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		cursor: pointer;
		pointer-events: auto;
		.menu-hide-text {
			width: 0;
			display: flex;
			align-items: center;
			height: 100%;
			overflow: hidden;
			position: absolute;
			left: 72px;
			top: 0;
			opacity: 0;
			border-radius: 6px;
			font-size: 14px;
			background: $menu-block-bg-2;
			color: $menu-white;
			&::before {
				content: '';
				position: absolute;
				top: 15px;
				border-width: 8px;
				border-style: solid;
				left: -14px;
				top: 12px;
				z-index: -1;
				border-radius: 10px;
				border-color: transparent $menu-block-bg-2 transparent transparent;
			}
		}
		&.color-item {
			&:hover {
				color: $menu-white;
				.menu-hide-text {
					transition: opacity 0.3s;
					opacity: 1;
					overflow: visible;
					width: max-content;
					padding: 0 8px;
				}
			}
			&.active,
			&.active:hover {
				color: $menu-second;
			}
		}
		&:not(.color-item):hover {
			background: $menu-block-bg-2;
			color: $menu-white;
			.menu-hide-text {
				transition: opacity 0.3s;
				opacity: 1;
				overflow: visible;
				width: max-content;
				padding: 0 8px;
			}
		}
		&:not(.color-item).active,
		&:not(.color-item).active:hover {
			background: $block-bg-2;
			i {
				color: $menu-white;
			}
		}
		.navigation-dot {
			left: 36px;
			top: 14px;
		}
		.menu-text {
			margin-left: 10px;
			font-size: 14px;
		}
	}
</style>
