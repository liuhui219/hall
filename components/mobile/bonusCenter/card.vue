<template>
	<div class="bonus-center-card flex flex-col w-full" :class="{ 'bonus-center-card-active': active }" @click="emits('onClick')">
		<div class="bonus-center-card-content">
			<BaseImg :src="src" class="w-[70px]" />
			<div class="card-content">
				<h3 class="card-content-title truncate line-clamp-1 whitespace-break-spaces">{{ title }}</h3>
				<p class="card-content-text truncate line-clamp-3 whitespace-break-spaces" v-html="content" />
			</div>
		</div>
		<button class="sys-btn shrink-0 mr-[11px]" :class="[active ? 'btn-highlight-text' : 'btn-main-text']">{{ btnText }}</button>
		<BaseDot class="bonus-center-dot" :show="active" />
	</div>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		active: {
			type: Boolean,
			default: false,
		},
		src: {
			type: String,
			default: '',
		},
		btnText: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			default: '',
		},
		content: {
			type: String,
			default: '',
		},
		arrow: {
			type: Boolean,
			default: true,
		},
	})
	const emits = defineEmits(['onClick'])
</script>
<style lang="scss" scoped>
	.bonus-center-card {
		height: 167px;
		padding: 23px 11px 18px 22px;
		background-size: 100% 100%;
		border-radius: 8px;
		background-repeat: no-repeat;
		border: 0.6px solid $block-bg;
		position: relative;
		background-color: $block-bg-2;

		.bonus-center-card-content {
			display: flex;
			flex: 1;
			justify-content: space-between;
			align-items: flex-start;
			.card-content {
				margin-left: 15px;
				margin-right: 15px;
				flex: 1;
				.card-content-title {
					font-size: 18px;
					// line-height: 24px;
					color: $color-white;
					text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.34);
					font-weight: 700;
					margin-bottom: 10px;
				}
				.card-content-text {
					color: $text-lowlight;
					font-size: 14px;
					font-weight: 500;
					line-height: 1.2;
				}
			}
			.card-next {
				color: $text-lowlight;
				font-size: 20px;
				rotate: -90deg;
			}
		}
		.bonus-center-dot {
			background: $error;
			@apply w-[14px] h-[14px] absolute top-[0px] right-[0px];
		}
		&.bonus-center-card-active {
			.bonus-center-card-content {
				.card-content {
					.card-content-text {
						color: $color-white;
					}
				}
			}

			background-image: $bonus-center-card-bg;
		}
	}
</style>
