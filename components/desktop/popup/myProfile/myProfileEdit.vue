<template>
	<div>
		<DesktopPopupHeader title="" :invisible="true" />
		<div class="mx-[auto] avatar">
			<div class="border-bg" />
			<div class="avatar-img-box">
				<BaseImg :src="getResConfigImage('h_' + accountStore.avatarIndex, ImageKeyEnum.userinfo)" class="w-[108px] h-[108px]" />
			</div>
		</div>

		<div class="avatar-list">
			<div v-for="index in 15" :key="index" :class="{ active: accountStore.avatarIndex == index - 1 }">
				<BaseImg
					:src="getResConfigImage('h_' + (index - 1), ImageKeyEnum.userinfo)"
					class="w-[75px] h-[75px]"
					@click="accountStore.selectAvatar(index - 1)"
				/>
			</div>
		</div>

		<BaseInput
			v-model:value="accountStore.currentValue"
			:error="!!accountStore.currentValue && configStore.nicknameError(accountStore.currentValue)"
			:error-message="configStore.nicknameTip"
			:placeholder="$t('U0025')"
			class="mt-[20px] mb-[195px] cursor-pointer profile-edit-ipt"
		/>

		<button
			class="sys-btn w-[calc(100%-60px)] btn-highlight min-h-[43px] absolute left-[30px] bottom-[32px]"
			@click="accountStore.updateProfile()"
		>
			{{ $t('AC0003') }}{{ accountStore.avatarIndex }}
		</button>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	const accountStore = useAccountStore()
	const configStore = useSysConfigStore()
	const userStore = useUserStore()
	onMounted(() => {
		accountStore.currentValue = accountStore.verifyData.nickname
		accountStore.avatarIndex = Helper.getAvatarIndex(userStore.data.headimg)
	})
</script>
<style scoped lang="scss">
	.avatar {
		@apply p-[3px] mb-[25px] w-[130px] h-[130px] min-h-[130px] rounded-full overflow-hidden;
		border: 3px solid transparent;
		position: relative;
		.border-bg {
			@apply absolute top-0 left-0 w-full h-full rounded-full;
			background: linear-gradient(180deg, #ffe03a 0%, #cafa10 100%);
		}
		.avatar-img-box {
			@apply relative z-[1] overflow-hidden rounded-full;
			border: 5px solid $bg;
		}
	}
	.avatar-list {
		@apply grid gap-[35px] grid-cols-5 justify-items-center max-h-[315px] w-[540px] mx-[auto];
		div {
			@apply overflow-hidden rounded-full w-[75px] h-[75px] cursor-pointer;
		}
		.active {
			@apply border-2 border-yellow-400;
			border: 2.67px solid $second;
		}
	}
	.profile-edit-ipt {
		:deep(.btn-clear) {
			@apply text-[14px];
			color: $gray;
		}
	}
	:deep(.modal__close) {
		i {
			@apply text-[24px];
		}
	}
</style>
