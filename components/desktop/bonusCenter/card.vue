<template>
	<div class="bonus-center-card flex w-full items-center justify-center" :class="{ 'bonus-center-card-active': active }" @click="emits('onClick')">
		<BaseImg :src="src" class="w-[118px] shrink-0 mr-[30px]" />
		<div class="flex-1 flex flex-col h-full">
			<div class="bonus-center-card-content">
				<div class="card-content">
					<h3 class="card-content-title">{{ title }}</h3>
					<p class="card-content-text" v-html="content" />
				</div>
			</div>
			<button class="sys-btn w-[180px] !p-[0]" :class="[active ? 'btn-highlight-text' : 'btn-main-text']">{{ btnText }}</button>
			<BaseDot class="bonus-center-dot" :show="active" />
		</div>
	</div>
</template>
<script setup lang="ts">
	defineProps({
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
		padding: 20px;
		border: 0.6px solid $block-bg;
		background: $block-bg-2;
		border-radius: 8px;
		position: relative;

		.bonus-center-card-content {
			display: flex;
			flex: 1;

			.card-content {
				flex: 1;
				.card-content-title {
					font-size: 18px;
					// line-height: 24px;
					color: $color-white;
					text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.34);
					font-weight: 700;
					margin-bottom: 8px;
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
			@apply w-[14px] h-[14px] absolute top-[1px] right-[0px];
		}
		&.bonus-center-card-active {
			.bonus-center-card-content {
				.card-content {
					.card-content-text {
						color: $color-white;
					}
				}
			}

			background: $bonus-center-card-bg;
		}
	}
</style>
