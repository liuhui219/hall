<template>
	<div class="finance-view finance-view-mobile text-center h-full flex flex-col">
		<section class="px-4 pt-4 pb-8 flex flex-col justify-between h-full">
			<div class="modal-form flex-1">
				<h1>ID VERIFICATION</h1>
				<h2 v-if="userStore.data.kyc?.status == 0" class="text-lowlight">Fill in the real infomation to better protect your account.</h2>
				<h2 v-if="userStore.data.kyc?.status == 1" class="warning">The identity information is being verified. Please don't worry, it will be done soon.</h2>
				<h2 v-if="userStore.data.kyc?.status == 3" class="error">ID verification failed. Please provide other valid information to complete verification. </h2>
				<BaseInput
					v-model:value="accountStore.currentValue"
					v-model:error="accountStore.validError.realnameError"
					:error-message="configStore.realnameTip"
					:remind="true"
					:readonly="userStore.data.kyc?.status > 0"
					:placeholder="$t('D0015')"
					@blur="accountStore.myProfileValid('real_name')"
				>
					<template v-if="userStore.data.kyc?.status > 0" #append>
						<div class="sysicon-lock text-lowlight pr-[10px]" />
					</template>
				</BaseInput>

				<BaseInput
					v-model:value="accountStore.currentValue2"
					v-model:error="accountStore.validError.cpfAccountError"
					:maxlength="14"
					:error-message="$t('D0013')"
					:input-format="withdrawStore.cpfInputFormat"
					type="tel"
					:placeholder="$t('D0006')"
					:readonly="userStore.data.kyc?.status > 0"
					@paste="withdrawStore.cpfPasteFormat"
					@blur="accountStore.validCpfAccount"
				>
					<template v-if="userStore.data.kyc?.status > 0" #append>
						<div class="sysicon-lock text-lowlight pr-[10px]" />
					</template>

					<template v-if="true || accountStore.currentValue2.length <= 14" #format="{ value }">
						<div v-if="!!value" class="cpf-value flex items-center">
							<span v-for="item in 3" :key="item - 1" :class="{ 'has-input': !!value[item - 1] }">
								{{ value[item - 1] || '2' }}
							</span>
							.
							<span v-for="item in 3" :key="item + 3" :class="{ 'has-input': !!value[item + 3] }">
								{{ value[item + 3] || '2' }}
							</span>
							.
							<span v-for="item in 3" :key="item + 7" :class="{ 'has-input': !!value[item + 7] }">
								{{ value[item + 7] || '2' }}
							</span>
							-
							<span v-for="item in 2" :key="item + 11" :class="{ 'has-input': !!value[item + 11] }">
								{{ value[item + 11] || '2' }}
							</span>
						</div>
					</template>
					<!-- <template v-else #format="{ value }">
						<div v-if="!!value" class="cpf-value flex items-center">
							<span v-for="item in 2" :key="item - 1" :class="{ 'has-input': !!value[item - 1] }">
								{{ value[item - 1] || '2' }}
							</span>
							.
							<span v-for="item in 3" :key="item + 2" :class="{ 'has-input': !!value[item + 2] }">
								{{ value[item + 2] || '2' }}
							</span>
							.
							<span v-for="item in 3" :key="item + 6" :class="{ 'has-input': !!value[item + 6] }">
								{{ value[item + 6] || '2' }}
							</span>
							/
							<span v-for="item in 4" :key="item + 11" :class="{ 'has-input': !!value[item + 10] }">
								{{ value[item + 10] || '2' }}
							</span>
							-
							<span v-for="item in 2" :key="item + 15" :class="{ 'has-input': !!value[item + 15] }">
								{{ value[item + 15] || '2' }}
							</span>
						</div>
					</template> -->
				</BaseInput>

				<div v-if="userStore.data.kyc?.status == 3">
					<h3>• Upload valid government id</h3>
					<h3>• Upload proof of residence.</h3>
					<h3>• Online photo shoot.</h3>
				</div>
			</div>
			<div v-if="userStore.data.kyc?.status != 1 && userStore.data.kyc?.status != 2" class="fixed bottom-[32px] left-[0] w-[100%] px-[15px]">
				<!-- 【验证中 + 验证通过】不需要有操作按钮 -->
				<button class="sys-btn btn-full-width btn-main" @click="accountStore.verifyCpfAccount()">
					<!-- 【验证不通过】需要高级验证 -->
					{{ `${userStore.data.kyc?.status == 3 ? 'Verify Now' : $t('L1011') }` }}
				</button>
				
				<button v-if="accountStore.pageOpenType == 1" class="sys-btn btn-full-width btn-disable-bg mt-[16px]" @click="closePopup()">
					skip
				</button>
			</div>
		</section>
	</div>
</template>
<script lang="ts" setup>
	const accountStore = useAccountStore()
	const configStore = useSysConfigStore()
	const userStore = useUserStore()
	const depositStore = useDepositStore()
	const withdrawStore = useWithdrawStore()
</script>
<style scoped lang="scss">
	.modal-form {
		padding-top: 0;
		h1 {
			@apply mb-[10px] text-[20px] font-[500] text-left;
			color: $color-white;
		}
		h2 {
			@apply mb-[20px] text-[14px] font-[500] text-left;
		}
		h3 {
			@apply text-[14px] font-[400] text-left;
			color: $text-lowlight;
		}
	}
	// :deep(.input-wrap) {
	// 	background: $block-bg-2;
	// }
</style>
