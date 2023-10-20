<template>
	<div class="finance-view finance-view-mobile text-center h-full flex flex-col">
		<section class="px-4 pb-8 flex flex-col justify-between h-full">
			<div class="modal-form flex-1">
				<h1>{{ $t('ST0013') }}</h1>
				<h2>{{ $t('ST0014') }}{{ accountStore.currentValue }}</h2>
				<BaseInput v-model:value="accountStore.code" :placeholder="$t('ST0015')" :type="accountStore.currentType" class="!mb-[10px]">
					<template #verify>
						<div class="btn-verify">
							<button
								tabindex="-1"
								class="sys-btn mr-[12px] !h-[100%]"
								:class="[getDisabledBtnClass(accountStore.sendText?.disabled)]"
								@click="accountStore.sendCode()"
							>
								{{ accountStore.sendText?.text }}
							</button>
						</div>
					</template>
				</BaseInput>
				<p v-if="accountStore.validError.verify" class="text-left error-msg text-xs">{{ $t('L1044', { value: 6 }) }}</p>
			</div>
			<!-- :class="getDisabledBtnClass(!accountStore.code)" -->
			<button class="sys-btn btn-full-width btn-highlight" @click="accountStore.saveVerify()">
				{{ $t('L1011') }}
			</button>
		</section>
	</div>
</template>
<script lang="ts" setup>
	const accountStore = useAccountStore()
</script>
<style scoped lang="scss">
	.modal-form {
		h1 {
			@apply mb-[10px] text-[20px] font-[500] text-left;
			color: #ffffff;
		}
		h2 {
			@apply mb-[20px] text-[14px] font-[500] text-left;
			color: $text-lowlight;
		}
	}
	:deep(.input-wrap) {
		background: $block-bg-2;
	}
	:deep(.sys-date) {
		background: $block-bg-2;
	}
	:deep(.btn-highlight) {
		background: $main !important;
	}
	.btn-verify {
		.sys-btn {
			@apply px-[0px] border-0;
			color: $second;
			background: transparent !important;
		}
		:deep(.btn-highlight) {
			color: $second;
			background: transparent !important;
		}
	}
</style>
