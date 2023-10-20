<template>
	<section class="modal-header">
		<div class="flex justify-between w-full">
			<button :class="{ invisible: invisible }" @click="handleBack">
				<BaseIcon name="arrow-left" class="text-lowlight text-[24px]" />
			</button>
			<button class="modal__close" @click="handleClose">
				<BaseIcon name="close" class="text-lowlight text-[16px]" />
			</button>
		</div>
		<h3 class="modal__title section-title text-center">{{ title }}</h3>
	</section>
</template>
<script lang="ts" setup>
	const propsConf = defineProps({
		title: {
			type: String,
			default: '',
		},
		invisible: {
			type: Boolean,
			default: true,
		},
		back: {
			type: Function,
			default: null,
		},
		close: {
			type: Function,
			default: null,
		},
	})
	const handleBack = () => {
		if (propsConf.back && typeof propsConf.back == 'function') {
			propsConf.back()
		} else {
			closePopup()
		}
	}
	const handleClose = () => {
		if (propsConf.close) {
			propsConf.close()
		} else {
			if (propsConf.invisible) {
				closePopup()
			} else {
				closeAllPopup()
			}
		}
	}
</script>
