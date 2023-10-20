<template>
	<div class="finance-view finance-view-mobile text-center h-full flex flex-col">
		<section class="pb-8 flex flex-col justify-between h-full">
			<!-- 新增密码 -->
			<div v-if="accountStore.isNewPassword" class="modal-form flex-1">
				<h1>{{ $t('ST0005') }}</h1>
				<h2>{{ $t('ST0006') }}</h2>
				<!-- :error="!!accountStore.addNewPassword && configStore.passwordError(accountStore.addNewPassword)" -->
				<BaseInput
					v-model:value="accountStore.addNewPassword"
					v-model:error="accountStore.validError.addNewPasswordError"
					:error-message="configStore.passwordTip"
					:remind="true"
					:index="2"
					:placeholder="$t('U0014')"
					type="password"
					@blur="accountStore.myProfileValid('addNewPassword')"
				/>
			</div>
			<!-- 修改密码 -->
			<div v-else-if="accountStore.isEditPassword" class="modal-form flex-1">
				<h1>{{ $t('ST0008') }}</h1>
				<h2>{{ $t('ST0009') }}</h2>
				<BaseInput v-model:value="accountStore.editCurrentPassword" :index="1" :placeholder="$t('U0013')" type="password" />
				<!-- :error="!!accountStore.editNewPassword && configStore.passwordError(accountStore.editNewPassword)" -->
				<BaseInput
					v-model:value="accountStore.editNewPassword"
					v-model:error="accountStore.validError.newPasswordError"
					:error-message="configStore.passwordTip"
					:remind="true"
					:index="2"
					:placeholder="$t('U0014')"
					type="password"
					@blur="accountStore.myProfileValid('newPassword')"
				/>
				<!-- :error="accountStore.editConfirmPasswordValid" -->
				<BaseInput
					v-model:value="accountStore.editConfirmPassword"
					v-model:error="accountStore.validError.confirmPasswordError"
					:index="3"
					:placeholder="$t('L1025')"
					type="password"
					:error-message="$t('U0023')"
					@blur="accountStore.myProfileValid('confirmPassword')"
				/>
			</div>
			<!-- 真实全名 -->
			<div v-else-if="accountStore.currentType == accountStore.editTypes.real_name" class="modal-form flex-1">
				<h1>{{ $t('W0030') }}</h1>
				<h2>{{ $t('ST0019') }}</h2>
				<!-- :error="!!accountStore.currentValue && configStore.realnameError(accountStore.currentValue)" -->
				<BaseInput
					v-model:value="accountStore.currentValue"
					v-model:error="accountStore.validError.realnameError"
					:error-message="configStore.realnameTip"
					:remind="true"
					:placeholder="$t('D0015')"
					@blur="accountStore.myProfileValid('real_name')"
				/>
			</div>
			<!-- 账号 -->
			<div v-else-if="accountStore.currentType == accountStore.editTypes.account" class="modal-form flex-1">
				<h1>{{ $t('U0025') }}</h1>
				<h2>{{ $t('ST0011') }}</h2>
				<!-- :error="!!accountStore.currentValue && configStore.accountError(accountStore.currentValue)" -->
				<BaseInput
					v-model:value="accountStore.currentValue"
					v-model:error="accountStore.validError.accountError"
					:error-message="configStore.accountTip"
					:remind="true"
					:placeholder="$t('L1028')"
					@blur="accountStore.myProfileValid('account')"
				/>
			</div>
			<!-- 生日 -->
			<div v-else-if="accountStore.currentType == accountStore.editTypes.birth" class="modal-form !mb-[8px] flex-1">
				<h1>{{ $t('ST0003') }}</h1>
				<h2>{{ $t('ST0020') }}</h2>
				<BaseDate
					:form-data="accountStore.birth"
					:placeholder="$t('ST0021')"
					:placeholder2="$t('ST0022')"
					:placeholder3="$t('ST0023')"
					@change-date="accountStore.updateBirth"
				/>
				<p v-if="accountStore.validError.birthError" class="text-left error-msg text-xs">{{ $t('ST0020') }}</p>
			</div>
			<!-- 邮箱 -->
			<div v-else-if="accountStore.currentType == accountStore.editTypes.email" class="modal-form flex-1">
				<h1>{{ $t('U0026') }}</h1>
				<h2>{{ $t('ST0012') }}</h2>
				<!-- :error="!!accountStore.currentValue && configStore.emailError(accountStore.currentValue)" -->
				<BaseInput
					v-model:value="accountStore.currentValue"
					v-model:error="accountStore.validError.emailError"
					:error-message="configStore.emailTip"
					:index="1"
					:placeholder="$t(accountStore.editPlaceholder)"
					:type="accountStore.currentType"
					@blur="accountStore.myProfileValid('email')"
				/>
			</div>
			<!-- 手机号 -->
			<div v-else-if="accountStore.currentType == accountStore.editTypes.tel" class="modal-form flex-1 edit-phone">
				<h1>{{ $t('ST0002') }}</h1>
				<h2>{{ $t('ST0017') }}</h2>
				<!-- :error="!!accountStore.currentValue && configStore.phoneError(accountStore.currentValue)" -->
				<BaseInput
					v-model:value="accountStore.currentValue"
					v-model:error="accountStore.validError.phoneError"
					:error-message="configStore.phoneTip"
					:index="1"
					:placeholder="$t(accountStore.editPlaceholder)"
					:type="accountStore.currentType"
					@blur="accountStore.myProfileValid('tel')"
				>
					<template #prepend>
						<CompSelectAcode v-model="accountStore.editAcode" />
						<span class="w-[1px] h-[14px] bg-white" />
					</template>
				</BaseInput>
			</div>

			<div v-else class="modal-form flex-1">
				<BaseInput
					v-model:value="accountStore.currentValue"
					:error="accountStore.disabled"
					:remind="false"
					:index="1"
					:placeholder="$t(accountStore.editPlaceholder)"
					:type="accountStore.currentType"
				>
					<template v-if="accountStore.currentType == accountStore.editTypes.tel" #prepend>
						<CompSelectAcode v-model="accountStore.editAcode" />
					</template>
				</BaseInput>
			</div>
			<button class="sys-btn btn-full-width btn-highlight" @click="accountStore.saveEdit()">{{ $t('AC0003') }}</button>
		</section>
	</div>
</template>
<script lang="ts" setup>
	const accountStore = useAccountStore()
	const configStore = useSysConfigStore()
	const disabledClass = computed(() => {
		return getDisabledBtnClass(accountStore.disabled)
	})
	watchEffect(accountStore.changeDisabled)
</script>
<style scoped lang="scss">
	.settings-btn {
		background: $main !important;
	}
	.modal-form {
		h1 {
			@apply mb-[5px] text-[20px] font-[500] text-left;
			color: #ffffff;
		}
		h2 {
			@apply mb-[40px] text-[14px] font-[500] text-left;
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
	:deep(.color-text-white) {
		// padding-right: 5px !important;
	}
	.edit-phone {
		:deep(input) {
			padding-left: 5px;
		}
	}
</style>
