<template>
	<div class="register-modal-code-content">
		<SkinHeader :is-home="false" title="" class="register-code" />
		<div class="finance-view finance-view-mobile flex flex-col shrink-0 pt-[15px] px-[20px]">
			<div class="text-[20px] mb-[16px] login-white">{{ rStore.codeTip }}</div>
			<div
				class="mb-[24px] text-[14px] text-login-text"
				v-html="$t('L1045', { acode: `<em class='login-white'>${acode}</em>`, phone: `<em class='login-white'>${phone}</em>` })"
			/>
			<BaseLoginInput
				v-model:value="code"
				v-model:error="rStore.codeError"
				:error-message="rStore.codeTip"
				:no-back="true"
				:placeholder="$t('L1038')"
				@blur="rStore.validCode"
				@click="rStore.clickRegisterInput('code')"
			>
				<template #verify>
					<div class="btn-verify">
						<button
							tabindex="-1"
							style="border-left: 1px solid #393e41"
							class="sys-btn same-height border-none min-w-[100px]"
							:class="{ 'send-code-btn-complete': rStore.verifyText.send, 'send-code-btn': !rStore.verifyText.send }"
							@click="rStore.sendCode()"
						>
							{{ rStore.verifyText.text }}
						</button>
					</div>
				</template>
			</BaseLoginInput>
			<div class="mt-[15px] text-login-text">
				{{ text }}
				<em class="text-login-main" @click="closePopup()">{{ $t('L1048') }}</em>
			</div>
			<button
				class="sys-btn btn-m btn-l btn-highlight btn-full-width uppercase mt-[150px] !h-[50px] !text-[16px]"
				@click="rStore.validCodeSubmit"
			>
				{{ $t('L1034') }}
			</button>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const rStore = useRegisterStore()
	const code = computed({
		get: () => {
			return rStore.way == LoginWayEnum.email ? rStore.emailCode : rStore.phoneCode
		},
		set: (val) => {
			if (rStore.way == LoginWayEnum.email) {
				rStore.emailCode = val
			} else {
				rStore.phoneCode = val
			}
		},
	})
	const minutes = computed(() => {
		const from = useSysConfigStore().getCodeDuration
		return parseFloat((parseInt(from[rStore.way]) / 60).toFixed(2))
	})
	const acode = computed(() => {
		return rStore.way == LoginWayEnum.email ? '' : rStore.acode + ' '
	})
	const phone = computed(() => {
		return rStore.way == LoginWayEnum.email ? rStore.email : rStore.phone
	})
	const text = computed(() => {
		return rStore.way == LoginWayEnum.email ? useNuxtApp().$t('L1047') : useNuxtApp().$t('L1046')
	})

	onMounted(() => {
		rStore.regTimer()
	})
</script>
<style scoped lang="scss">
	.register-code {
		background: $login-bg;
	}
</style>
