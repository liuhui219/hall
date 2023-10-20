<template>
	<div :class="['login-modal register-modal', { active: loginStore.modal }]">
		<div class="pt-[45px] pb-[25px] shrink-0 text-[20px] login-white">{{ $t('L1001') }}</div>
		<BaseIcon name="close" class="p-[15px] absolute right-0 top-0 z-[1] text-[14px] login-close-color" @click="closePopup()" />
		<div class="w-full flex-1 overflow-y-auto overflow-x-hidden mt-[2px] register-content">
			<div class="modal-body mt-[-22px]">
				<div class="modal-form">
					<BaseLoginInput
						v-model:value="loginStore.account"
						v-model:error="loginStore.accountError"
						class="mt-[2px]"
						:error-message="loginStore.accountErrorMessage"
						:index="0"
						:placeholder="$t('L1020')"
						type="text"
						@blur="loginStore.validAccount"
						@enter="changeNext(0)"
					>
						<template
							v-if="
								loginStore.account &&
								loginStore.account.indexOf('@') == -1 &&
								loginStore.account.length > 2 &&
								!isNaN(Number(loginStore.account.substring(0, 3)))
							"
							#prepend
						>
							<CompSelectAcode v-model="loginStore.acode" />
						</template>
					</BaseLoginInput>
					<BaseLoginInput
						v-model:value="loginStore.password"
						v-model:error="loginStore.passwordError"
						:error-message="configStore.passwordTip"
						:index="1"
						:placeholder="$t('L1007')"
						type="password"
						@blur="loginStore.validPassword"
						@enter="changeNext()"
					/>
					<BaseCheckbox v-model="loginStore.rememberCheck" class="pt-[4px] pb-[7px]" size="m">{{ $t('L1003') }}</BaseCheckbox>
					<button
						class="sys-btn btn-m btn-l btn-full-width uppercase btn-highlight"
						:index="2"
						@click="loginStore.handleClickSubmitByValid()"
					>
						{{ $t('L1001') }}
					</button>
					<div class="pt-[6px] pb-[8px]">
						<div class="quick-link quick-link-center mb-[14px]">
							<a @click="openPopup(PopupEnum.reset)">{{ $t('L1009') }}</a>
						</div>
						<div class="quick-link quick-link-center">
							<div>
								{{ $t('L1030') }}
								<a class="login-main pointer" @click="openRegister">{{ $t('L1002') }}</a>
							</div>
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
	const loginStore = useLoginStore()
	const changeNext = (index?: number) => {
		if (index != null) {
			let doc = document.querySelector(`input[index='${index + 1}']`) as HTMLElement
			if (doc) {
				doc?.focus()
			}
		} else {
			if (!loginStore.disabledSubmit) {
				loginStore.handleClickSubmit()
			}
		}
	}
	onMounted(loginStore.comMounted)
	onUnmounted(loginStore.comUnMounted)
</script>
