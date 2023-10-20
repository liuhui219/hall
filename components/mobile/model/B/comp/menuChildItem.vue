<template>
	<div class="menu-item" :class="{ active: active }" @click="handleClick()">
		<BaseIcon v-if="name" :name="name" :font-size="name.includes('ic-') ? '12.5px' : ''" />
		<p class="menu-text">{{ needTranslation ? $t(text) : text }}</p>

		<BaseDot :show="dot || dotCount" class="navigation-dot" />
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
	})
	const emits = defineEmits(['onClick'])
	const handleClick = () => {
		emits('onClick')
	}
</script>
<style scoped lang="scss">
	#root-p {
		.menu-item:hover {
			background: $menu-block-bg-2;
			color: $menu-white;
		}
	}
	.menu-item {
		background: $menu-bg;
		background-size: contain !important;
		background-repeat: no-repeat !important;
		position: relative;
		height: 46px;
		padding: 0 15px;
		color: $menu-text-lowlight;
		font-size: 18px;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		cursor: pointer;
		&.small {
			height: 37px;
		}
		&.active {
			background: $menu-block-bg-2;
			color: $menu-white;
		}

		.navigation-dot {
			position: absolute;
			left: 42px;
			top: 14px;
		}
		.menu-text {
			margin-left: 12px;
			font-size: 14px;
		}
	}
</style>
