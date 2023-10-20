<template>
	<SkinHeader :is-home="false" :title="$t('H0048')" />
	<div class="mx-[auto] avatar">
		<div class="border-bg" />
		<div class="avatar-img-box">
			<BaseImg :src="getResConfigImage('h_' + accountStore.avatarIndex, ImageKeyEnum.userinfo)" class="w-[100px] h-[100px]" />
		</div>
	</div>

	<div class="avatar-list">
		<div v-for="index in 15" :key="index" :class="{ active: accountStore.avatarIndex == index - 1 }">
			<BaseImg
				:src="getResConfigImage('h_' + (index - 1), ImageKeyEnum.userinfo)"
				class="w-[56px] h-[56px]"
				@click="accountStore.selectAvatar(index - 1)"
			/>
		</div>
	</div>

	<BaseInput
		v-model:value="accountStore.currentValue"
		:error="!!accountStore.currentValue && configStore.nicknameError(accountStore.currentValue)"
		:error-message="configStore.nicknameTip"
		:placeholder="$t('U0025')"
		class="mt-[30px] mx-[15px] cursor-pointer profile-edit-ipt"
	/>
	<div class="fixed bottom-[32px] left-0 w-[100%] px-[15px]">
		<button class="sys-btn btn-highlight w-full" @click="accountStore.updateProfile()">
			{{ $t('AC0003') }}
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
		@apply p-[3px] mt-[20px] w-[114px] h-[114px] rounded-full overflow-hidden;
		border: 2px solid transparent;
		position: relative;
		.border-bg {
			@apply absolute top-0 left-0 w-full h-full rounded-full;
			background: linear-gradient(180deg, #ffe03a 0%, #cafa10 100%);
		}
		.avatar-img-box {
			@apply relative z-[1] overflow-hidden rounded-full;
			border: 2px solid $bg;
		}
	}
	.avatar-list {
		@apply grid gap-[12px] grid-cols-5 justify-items-center max-h-[490px] mx-[15px] mt-[30px] overflow-y-auto;
		div {
			@apply overflow-hidden rounded-full w-[56px] h-[56px] cursor-pointer;
		}
		.active {
			@apply border-2 border-yellow-400;
			border: 2.67px solid $second;
		}
	}
	.profile-edit-ipt {
		:deep(.input-wrap) {
			border: 0.6px solid $block-bg;
		}
		:deep(.btn-clear) {
			@apply text-[18px];
			color: $gray;
		}
	}
</style>
