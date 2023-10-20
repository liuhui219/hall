<template>
	<div :class="['register-modal', { active: rStore.modal }]">
		<BaseIcon name="close" class="p-[20px] absolute -right-[2px] -top-[2px] z-[1] text-[14px] login-close-color" @click="closePopup()" />
		<div class="w-full flex-1 flex flex-col pt-[30px] overflow-hidden register-content">
			<div class="modal-body flex-1 overflow-hidden flex flex-col">
				<BaseTab class="login-tab shrink-0" :list="rStore.list" :active="rStore.way" index-key="way" @change="rStore.updateWay" />
				<div class="modal-form flex-1 overflow-y-auto">
					<BaseLoginInput
						v-if="rStore.way === LoginWayEnum.email"
						v-model:value="rStore.email"
						v-model:error="rStore.emailError"
						:index="1"
						:clear="false"
						:placeholder="$t('L1006')"
						type="email"
						:error-message="$t('L1039')"
						@enter="changeNext(0)"
						@blur="rStore.validEmail()"
						@click="rStore.clickRegisterInput('login')"
					/>
					<BaseLoginInput
						v-if="rStore.way === LoginWayEnum.phone"
						v-model:value="rStore.phone"
						v-model:error="rStore.phoneError"
						:index="0"
						:clear="false"
						:placeholder="$t('L1008')"
						type="tel"
						:error-message="$t('E0009')"
						@enter="changeNext(0)"
						@blur="rStore.validPhone()"
						@click="rStore.clickRegisterInput('login')"
					>
						<template #prepend>
							<CompSelectAcode v-model="rStore.acode" />
						</template>
					</BaseLoginInput>

					<BaseLoginInput
						v-model:value="rStore.password"
						v-model:error="rStore.passwordError"
						:index="0"
						:placeholder="$t('L1007')"
						type="password"
						:error-message="configStore.passwordTip"
						@blur="rStore.validPassword()"
						@enter="changeNext()"
						@click="rStore.clickRegisterInput('password')"
					/>

					<BaseLoginInput
						v-show="rStore.showInviteCode && !rStore.inviteCodeReadonly"
						v-model:value="rStore.invite_code"
						v-model:error="rStore.inviteCodeError"
						size="l"
						:index="2"
						:clear="!rStore.inviteCodeReadonly"
						:disabled="rStore.inviteCodeReadonly"
						:error-message="$t('L1026')"
						type="tel"
						:placeholder="$t('L1014')"
						@blur="rStore.validInviteCode()"
						@enter="changeNext(1)"
						@click="rStore.clickRegisterInput('referral')"
					/>

					<div class="check-container pt-[6px] pb-[3px]">
						<BaseCheckbox v-model="rStore.check" size="m" class="mb-[4px]">
							{{ $t('L1017') }} <a class="register-private" @click.prevent.stop="rStore.clickRegisterPrivacy">{{ $t('L1018') }}</a>
							{{ $t('L1019') }}
						</BaseCheckbox>
						<div v-if="rStore.checkError && !rStore.check" class="error-msg pl-[24px] text-[12px]">{{ $t('L1041') }}</div>
						<BaseCheckbox v-model="rStore.checkEmail" size="m">{{ $t('L1015') }}</BaseCheckbox>
					</div>
					<div v-if="!rStore.showInviteCode && !rStore.inviteCodeReadonly" class="register-invite-code" @click="rStore.changeInviteCode()">
						{{ $t('L1035') }}
					</div>
					<button class="sys-btn btn-m btn-l btn-full-width uppercase btn-highlight" @click="rStore.handleClickRegisterSubmit()">
						{{ $t('L1002') }}
					</button>
					<div class="quick-link quick-link-center">
						<div>
							{{ $t('L1016') }}
							<a class="login-main" @click="openLogin">{{ $t('L1001') }}</a>
						</div>
					</div>
					<div v-if="sysConfig['oneAllConfig'].status" class="thirdparty-login">
						<div class="flex w-full items-center">
							<div class="thirdparty-line" />
							<div class="mx-[13px]">{{ $t('L1031') }}</div>
							<div class="thirdparty-line" />
						</div>
						<div class="mb-[8px] mt-[10px] w-full">
							<div id="oneall-container" />
							<!-- <div class="h-[50px] flex items-center justify-center" /> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const rStore = useRegisterStore()
	const loginStore = useLoginStore()
	const changeNext = (index?: number) => {
		if (index != null) {
			let doc = document.querySelector(`input[index='${index + 1}']`) as HTMLElement
			if (doc) {
				doc.focus()
			}
		} else {
			if (!rStore.disabledSubmit) {
				rStore.handleClickSubmit()
			}
		}
	}

	onMounted(() => {
		rStore.mounted()
		loginStore.comMounted()
	})
	onUnmounted(() => {
		rStore.unmounted()
		loginStore.comUnMounted()
	})
</script>
