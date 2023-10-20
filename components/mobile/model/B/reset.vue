<template>
	<div :class="['login-modal register-modal', { active: resetStore.modal }]">
		<div class="pt-[45px] pb-[25px] shrink-0 text-[20px] login-white">{{ $t('L1013') }}</div>
		<BaseIcon name="close" class="p-[15px] absolute right-0 top-0 z-[1] text-[14px] login-close-color" @click="openLogin()" />
		<div class="w-full h-full overflow-visible register-content">
			<div class="modal-body mt-[-24px]">
				<div class="modal-reset-password">
					<div class="modal-form">
						<template v-if="resetStore.status == 0">
							<BaseLoginInput
								v-model:value="resetStore.account"
								v-model:error="resetStore.accountError"
								:error-message="$t('L1036')"
								:index="0"
								:placeholder="$t('L1036')"
								type="text"
								@blur="resetStore.validAccountA"
								@enter="changeNext(0)"
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
									v-model:value="resetStore.newPassword"
									:index="2"
									:remind="!resetStore.newPassword"
									:error="!!resetStore.newPassword && configStore.passwordError(resetStore.newPassword)"
									:error-message="configStore.passwordTip"
									:placeholder="$t('L1024')"
									type="password"
									@enter="changeNext(2)"
								/>
								<BaseLoginInput
									v-model:value="resetStore.confrimPassword"
									:index="3"
									:error="!!resetStore.confrimPassword && resetStore.confrimPasswordError"
									:error-message="$t('E0007')"
									:remind="!resetStore.confrimPassword"
									:placeholder="$t('L1025')"
									type="password"
									@enter="changeNext(3)"
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
					<div class="h-[30px] shrink-0" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const configStore = useSysConfigStore()
	const resetStore = useResetStore()
	const changeNext = (index?: number) => {
		if (index != null) {
			if (index < 3) {
				let doc = document.querySelector(`input[index='${index + 1}']`) as HTMLElement
				if (doc) {
					doc.focus()
				}
			} else {
				if (!resetStore.changeSubmitDisabled) {
					resetStore.handleClickReset()
				}
			}
		} else {
			if (!resetStore.disabledSubmit) {
				resetStore.handleClickSubmit()
			}
		}
	}
</script>
