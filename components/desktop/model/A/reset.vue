<template>
	<div class="login-modal-content">
		<BaseImg :src="getResConfigImage('banner_pc', ImageKeyEnum.login)" class="w-[360px] h-[600px]" />

		<div class="modal-content-login">
			<div class="modal-body flex flex-col">
				<div class="modal-header login-close-container">
					<BaseIcon name="close" class="login-close-color text-[18px]" @click="openLogin()" />
				</div>
				<div class="shrink-0 pt-[37px] pb-[40px] flex items-center text-[20px] login-white">{{ $t('L1013') }}</div>
				<div class="modal-form reset-modal-form flex-1 overflow-auto">
					<template v-if="resetStore.status == 0">
						<BaseLoginInput
							v-model:value="resetStore.account"
							v-model:error="resetStore.accountError"
							:error-message="$t('L1036')"
							:index="0"
							:placeholder="$t('L1036')"
							type="text"
							@blur="resetStore.validAccountA"
						>
							<template
								v-if="
									resetStore.account &&
									resetStore.account.indexOf('@') == -1 &&
									resetStore.account.length > 2 &&
									!isNaN(Number(resetStore.account.substring(0, 3)))
								"
								#prepend
							>
								<CompSelectAcode v-model="resetStore.acode" />
							</template>
						</BaseLoginInput>
						<BaseLoginInput
							v-model:value="resetStore.code"
							v-model:error="resetStore.code_error"
							:error-message="$t('L1038')"
							:placeholder="$t('L1038')"
							@blur="resetStore.validCodeA"
						>
							<template #verify>
								<div class="btn-verify">
									<button
										tabindex="-1"
										class="sys-btn same-height border-none min-w-[60px]"
										:class="{
											'send-code-btn-complete': resetStore.verifyText.send,
											'send-code-btn': !resetStore.verifyText.send,
										}"
										@click="resetStore.sendCode()"
									>
										{{ resetStore.verifyText.text }}
									</button>
								</div>
							</template>
						</BaseLoginInput>
						<button
							:class="{ 'btn-disable': resetStore.disabledSubmit }"
							class="sys-btn btn-m btn-l btn-full-width btn-highlight mt-[11px]"
							@click="resetStore.handleClickSubmitA"
						>
							{{ $t('L1011') }}
						</button>
					</template>
					<template v-else>
						<TransitionGroup appear name="fade">
							<BaseLoginInput
								key="reset-desktop-a-newpassword"
								v-model:value="resetStore.newPassword"
								:index="2"
								:remind="!resetStore.newPassword"
								:error="!!resetStore.newPassword && configStore.passwordError(resetStore.newPassword)"
								:error-message="configStore.passwordTip"
								:placeholder="$t('L1024')"
								type="password"
							/>
							<BaseLoginInput
								key="reset-desktop-a-confirmpassword"
								v-model:value="resetStore.confrimPassword"
								:index="3"
								:error="!!resetStore.confrimPassword && resetStore.confrimPasswordError"
								:error-message="$t('E0007')"
								:remind="!resetStore.confrimPassword"
								:placeholder="$t('L1025')"
								type="password"
							/>
							<button
								key="reset-btn"
								class="sys-btn btn-m btn-l btn-full-width"
								:class="getDisabledBtnClass(resetStore.changeSubmitDisabled)"
								@click="resetStore.handleClickReset"
							>
								{{ $t('L1012') }}
							</button>
						</TransitionGroup>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const resetStore = useResetStore()
</script>
