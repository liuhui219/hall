<template>
	<div class="login-modal-content login-modal-content-noimg">
		<div class="modal-content-login">
			<div class="modal-body flex flex-col">
				<div class="modal-header login-close-container">
					<BaseIcon name="close" class="login-close-color text-[18px]" @click="closePopup()" />
				</div>
				<div class="shrink-0 pt-[37px] pb-[40px] flex items-center text-[20px] login-white">{{ $t('L1001') }}</div>
				<div class="modal-form flex-1 overflow-auto">
					<BaseLoginInput
						v-model:value="loginStore.account"
						v-model:error="loginStore.accountError"
						:error-message="loginStore.accountErrorMessage"
						:index="0"
						:placeholder="$t('L1020')"
						type="text"
						@blur="loginStore.validAccount"
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
						:index="1"
						:error-message="configStore.passwordTip"
						:placeholder="$t('L1007')"
						type="password"
						@blur="loginStore.validPassword"
					/>
					<div class="py-[11px]">
						<BaseCheckbox v-model="loginStore.rememberCheck" size="xl">{{ $t('L1003') }}</BaseCheckbox>
					</div>

					<button class="sys-btn btn-m btn-full-width uppercase btn-highlight" @click="loginStore.handleClickSubmitByValid">
						{{ $t('L1001') }}
					</button>
					<div class="quick-link quick-link-center mt-[4px]">
						<a class="pointer" @click="openPopup(PopupEnum.reset)">{{ $t('L1009') }}</a>
					</div>
					<div v-if="sysConfig['oneAllConfig'].status" class="thirdparty-login mt-[34px]">
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
					<div class="quick-link quick-link-center mb-[10px]">
						<div>
							{{ $t('L1030') }}
							<a class="login-main pointer" @click="openRegister">{{ $t('L1002') }}</a>
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
	onMounted(loginStore.comMounted)
	onUnmounted(loginStore.comUnMounted)
</script>
