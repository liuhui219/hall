<template>
	<SkinHeader :is-home="false" :title="accountStore.showPcTitle ? $t('ST0001') : ''" :back="accountStore.back" />
	<div class="finance-view finance-view-mobile text-center mb-[80px]">
		<div v-if="accountStore.inLobbyPage" class="pt-4 pb-8">
			<section class="px-4 text-left">
				<div class="account-modal-form modal-form flex-1 overflow-auto !pt-[0]">
					<div v-if="sysConfig.kycConfig.status"
						class="settings-item"
						@click="accountStore.toKycVerify()"
					>
						<p>ID Verification</p>
						<div v-if="userStore.data.kyc?.status == 0">
							<span >{{ $t('ST0004') }}</span>
							<BaseIcon class="ml-[10px] rotate-[270deg]" name="select-arrow-down" />
						</div>
						<div v-else>
							<span>{{ userStore.data.kyc?.cpf_account }}</span>
							<BaseIcon v-if="userStore.data.kyc?.status == 1" class="ml-[10px] warning" name="alert-warning" />
							<BaseIcon v-if="userStore.data.kyc?.status == 2" class="ml-[10px] text-second" name="alert-success" />
							<BaseIcon v-if="userStore.data.kyc?.status == 3" class="ml-[10px] error" name="alert-error" />
						</div>
					</div>

					<div
						class="settings-item"
						@click="
							accountStore.edit(
								accountStore.verifyData.is_set_password == 1 ? accountStore.editTypes.password : accountStore.editTypes.newPassword
							)
						"
					>
						<p>{{ $t('U0028') }}</p>
						<div>
							<span v-if="accountStore.verifyData.is_set_password == 0">{{ $t('ST0004') }}</span>
							<span v-if="accountStore.verifyData.is_set_password == 1">{{ $t('L1048') }}</span>
							<BaseIcon class="pointer ml-[10px] rotate-[270deg]" tabindex="-1" name="select-arrow-down" />
						</div>
					</div>

					<div class="settings-item" @click="accountStore.edit(accountStore.editTypes.account, accountStore.verifyData.account)">
						<p>{{ $t('U0025') }}</p>
						<div v-if="accountStore.verifyData.account">
							<span class="have-value">{{ accountStore.verifyData.account }}</span>
						</div>
						<div v-if="accountStore.verifyData.account == ''">
							<span>{{ $t('ST0004') }}</span>
							<BaseIcon class="pointer ml-[10px] rotate-[270deg]" tabindex="-1" name="select-arrow-down" />
						</div>
					</div>

					<div class="settings-item" @click="accountStore.edit(accountStore.editTypes.email, accountStore.verifyData.email)">
						<p>{{ $t('U0026') }}</p>
						<div>
							<span v-if="accountStore.verifyData.email == ''">{{ $t('ST0004') }}</span>
							<span v-if="accountStore.verifyData.email">{{ accountStore.verifyData.email }}</span>
							<!-- 邮箱 有设置 且 已认证 -->
							<BaseIcon
								v-if="accountStore.verifyData.email && userStore.data.email_bind"
								class="pointer ml-[10px] settings-error"
								tabindex="-1"
								name="alert-success"
							/>
							<!-- 邮箱 有设置 且 没认证 -->
							<BaseIcon
								v-if="accountStore.verifyData.email && !userStore.data.email_bind"
								class="pointer ml-[10px] settings-error"
								tabindex="-1"
								name="alert-warning"
							/>
							<!-- 邮箱 没设置 或 没认证 -->
							<BaseIcon
								v-if="!accountStore.verifyData.email || !userStore.data.email_bind"
								class="pointer ml-[10px] rotate-[270deg]"
								tabindex="-1"
								name="select-arrow-down"
							/>
						</div>
					</div>

					<div class="settings-item" @click="accountStore.edit(accountStore.editTypes.tel, accountStore.verifyData.phone)">
						<p>{{ $t('ST0002') }}</p>
						<div>
							<span v-if="accountStore.verifyData.phone">{{ accountStore.verifyData.phone }}</span>
							<!-- 手机号 有设置 且 已认证 -->
							<BaseIcon
								v-if="accountStore.verifyData.phone && userStore.data.phone_bind"
								class="pointer ml-[10px] settings-error"
								tabindex="-1"
								name="alert-success"
							/>
							<!-- 手机号 有设置 且 没认证 -->
							<BaseIcon
								v-if="accountStore.verifyData.phone && !userStore.data.phone_bind"
								class="pointer ml-[10px] settings-error"
								tabindex="-1"
								name="alert-warning"
							/>
							<!-- 手机号 没设置 或 没认证 -->
							<span v-if="accountStore.verifyData.phone == ''" :class="{ 'have-value': accountStore.verifyData.phone }">{{
								$t('ST0004')
							}}</span>
							<BaseIcon
								v-if="accountStore.verifyData.phone == '' || !userStore.data.phone_bind"
								class="pointer ml-[10px] rotate-[270deg]"
								tabindex="-1"
								name="select-arrow-down"
							/>
						</div>
					</div>

					<div class="settings-item" @click="accountStore.edit(accountStore.editTypes.real_name, accountStore.verifyData.real_name)">
						<p>{{ $t('W0030') }}</p>
						<div>
							<span v-if="accountStore.verifyData.real_name" class="have-value">{{ accountStore.verifyData.real_name }}</span>
							<span v-if="!accountStore.verifyData.real_name">{{ $t('ST0004') }}</span>
							<BaseIcon class="pointer ml-[10px] rotate-[270deg]" tabindex="-1" name="select-arrow-down" />
						</div>
					</div>

					<div class="settings-item" @click="accountStore.edit(accountStore.editTypes.birth, accountStore.verifyData.birth)">
						<p>{{ $t('ST0003') }}</p>
						<div>
							<span :class="{ 'have-value': accountStore.birth.year }">
								{{
									accountStore.birth.year
										? accountStore.birth.year + '-' + accountStore.birth.month + '-' + accountStore.birth.date
										: $t('ST0004')
								}}
							</span>
							<BaseIcon class="pointer ml-[10px] rotate-[270deg]" tabindex="-1" name="select-arrow-down" />
						</div>
					</div>
				</div>
			</section>

			<!-- <section class="px-4 text-left">
				<h3 class="text-[14px] font-bold">{{ $t('U0001') }}</h3>
				<div class="account-modal-form modal-form flex-1 overflow-auto">
					<BaseInput v-model:value="userStore.uid" :readonly="true" @click-icon="userStore.copyUid()">
						<template #append>
							<BaseIcon class="pointer p-[10px]" tabindex="-1" name="copy" @click="userStore.copyUid()" />
						</template>
					</BaseInput>

					<BaseInput v-model:value="accountStore.verifyData.nickname" :readonly="true">
						<template #append>
							<BaseIcon
								class="pointer p-[10px]"
								tabindex="-1"
								name="edit"
								@click="accountStore.edit(accountStore.editTypes.nickname, accountStore.verifyData.nickname)"
							/>
						</template>
					</BaseInput>
					<BaseInput v-model:value="accountStore.verifyData.account" :readonly="true" :placeholder="$t('U0001')">
						<template #append>
							<BaseIcon
								class="pointer p-[10px]"
								tabindex="-1"
								name="edit"
								@click="accountStore.edit(accountStore.editTypes.account, accountStore.verifyData.account)"
							/>
						</template>
					</BaseInput>
					<BaseInput
						v-model:value="accountStore.verifyData.email"
						:placeholder="`${$t('U0009')}`"
						type="email"
						:readonly="true"
						@click-icon="accountStore.edit(accountStore.editTypes.email, accountStore.verifyData.email)"
					>
						<template #append>
							<div v-if="accountStore.verifyData.email" class="h-full flex items-center">
								<p
									class="px-2 text-xs text-second"
									@click.stop="accountStore.toVerify(accountStore.editTypes.email, accountStore.verifyData.email)"
								>
									{{ userStore.data.email_bind ? $t('AC0009') : $t('AC0008') }}
								</p>
								<span v-show="!userStore.data.email_bind" class="text-lowlight"> | </span>
							</div>
							<BaseIcon
								v-if="!userStore.data.email_bind"
								class="pointer p-[10px]"
								tabindex="-1"
								name="edit"
								@click="accountStore.edit(accountStore.editTypes.email, accountStore.verifyData.email)"
							/>
						</template>
					</BaseInput>
					<BaseInput v-model:value="accountStore.verifyData.phone" :placeholder="$t('U0011')" type="tel" :readonly="true">
						<template #prepend>
							<CompSelectAcode v-model="accountStore.verifyData.acode" />
						</template>
						<template #append>
							<div v-if="accountStore.verifyData.phone" class="h-full flex items-center">
								<p
									class="px-2 text-xs text-second"
									@click.stop="accountStore.toVerify(accountStore.editTypes.tel, accountStore.verifyData.phone)"
								>
									{{ userStore.data.phone_bind ? $t('AC0009') : $t('AC0008') }}
								</p>
								<span v-show="!userStore.data.phone_bind" class="text-lowlight"> | </span>
							</div>
							<BaseIcon
								v-if="!userStore.data.phone_bind"
								class="pointer p-[10px]"
								tabindex="-1"
								name="edit"
								@click="accountStore.edit(accountStore.editTypes.tel, accountStore.verifyData.phone)"
							/>
						</template>
					</BaseInput>
					<BaseInput v-model:value="accountStore.password" :placeholder="$t('L1007')" type="password" :readonly="true">
						<template #append>
							<BaseIcon
								class="pointer p-[10px]"
								tabindex="-1"
								name="edit"
								@click="accountStore.edit(accountStore.editTypes.password)"
							/>
						</template>
					</BaseInput>
				</div>
			</section>
			<section class="px-4 mb-8 text-left">
				<h3 class="text-[14px] font-bold">{{ $t('AC0002') }}</h3>
				<div class="account-modal-form modal-form flex-1">
					<BaseInput
						v-model:value="accountStore.personalInfo.fname"
						:readonly="!!userStore.data.fname"
						:error-message="configStore.nameTip"
						:error="!!accountStore.personalInfo.fname && fnameError"
						:remind="!accountStore.personalInfo.fname"
						:index="1"
						:placeholder="$t('D0007')"
					>
						<template v-if="!!userStore.data.fname" #append>
							<BaseIcon class="pointer p-[10px]" tabindex="-1" name="Verified" />
						</template>
					</BaseInput>

					<BaseInput
						v-model:value="accountStore.personalInfo.lname"
						:readonly="!!userStore.data.lname"
						:error-message="configStore.nameTip"
						:error="!!accountStore.personalInfo.lname && lnameError"
						:remind="!accountStore.personalInfo.lname"
						:index="2"
						:placeholder="$t('D0008')"
					>
						<template v-if="!!userStore.data.lname" #append>
							<BaseIcon class="pointer p-[10px]" tabindex="-1" name="Verified" />
						</template>
					</BaseInput>
					<BaseDate :form-data="accountStore.birth" :placeholder="$t('AC0011')" @change-date="accountStore.updateBirth" />
					<div class="grid gap-x-2 gap-y-4 grid-cols-2">
						<BaseSelect
							v-model="accountStore.countryIndex"
							class="basis-1/2"
							:placeholder="$t('AC0004')"
							:list="configStore.countryNameList"
						/>
						<BaseSelect v-model="accountStore.stateIndex" class="basis-1/2" :placeholder="$t('AC0010')" :list="accountStore.stateList" />
						<BaseInput v-model:value="accountStore.personalInfo.city" :index="3" :placeholder="$t('AC0005')" />
						<BaseInput v-model:value="accountStore.personalInfo.postal_code" :index="4" :placeholder="$t('AC0006')" />
					</div>
					<BaseInput v-model:value="accountStore.personalInfo.street_address" :index="5" :placeholder="$t('AC0007')" />
				</div>
			</section>
			<section class="px-4 absolute bottom-[30px] w-full text-center">
				<button
					class="sys-btn btn-full-width"
					:class="[getDisabledBtnClass((accountStore.personalInfo.fname && fnameError) || (accountStore.personalInfo.lname && lnameError))]"
					@click="accountStore.save()"
				>
					{{ $t('AC0003') }}
				</button>
			</section> -->
		</div>
		<div v-else class="h-full">
			<MobilePopupAccountEdit
				v-if="accountStore.currentPage === accountStore.pageTypes.edit"
				v-model:value="accountStore.currentValue"
				v-model:acode="accountStore.editAcode"
				:type="accountStore.currentType"
			/>
			<MobilePopupAccountKycVerify v-else-if="accountStore.currentPage === accountStore.pageTypes.kyc" />
			<MobilePopupAccountVerify v-else :type="accountStore.currentType" :default-value="accountStore.currentValue" />
		</div>
	</div>
</template>
<script lang="ts" setup>
	const accountStore = useAccountStore()
	const configStore = useSysConfigStore()
	const userStore = useUserStore()

	const fnameError = computed(() => configStore.nameError(accountStore.personalInfo.fname))
	const lnameError = computed(() => configStore.nameError(accountStore.personalInfo.lname))
	watchEffect(() => {
		if (accountStore.countryIndex || !accountStore.countryIndex) {
			if (!accountStore.isInit) {
				accountStore.stateIndex = -1
			} else {
				accountStore.isInit = false
			}
		}
	})
	onMounted(accountStore.mounted)
	onUnmounted(accountStore.unmounted)
</script>
<style scoped lang="scss">
	.settings-item {
		@apply flex justify-between mb-[16px] pl-[12px] pr-[8px] py-[10px] cursor-pointer rounded-md;
		border: 0.5px solid $block-bg;
		background: $block-bg-2;
		p {
			@apply text-[14px];
			color: #ffffff;
		}
		div {
			@apply flex items-center;
			color: $text-lowlight;
			span {
				@apply text-[14px];
			}
			.have-value {
				color: #ffffff;
			}
			.settings-success {
				color: $second;
			}
			.settings-error {
				color: $main;
			}
		}
	}
</style>
