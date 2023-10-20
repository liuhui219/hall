<template>
	<div class="overflow-y-auto">
		<DesktopPopupHeader :title="$t('H0048')" :invisible="true" />
		<div class="flex justify-between mt-[30px] mx-[4px]">
			<div class="min-w-[21px]" />
			<div>
				<div class="mx-[auto] avatar">
					<div class="overflow-hidden rounded-full">
						<BaseImg :src="configStore.getAvatarSrc(userStore.data.headimg)" class="w-full" />
					</div>
				</div>
				<h2 class="mt-[16px] mb-[10px] text-[20px] font-[600] text-center">{{ accountStore.verifyData.nickname }}</h2>
				<div class="flex items-center">
					<div class="flex items-center px-[9px] py-[4px] mr-[10px] rounded-md profile-vip-box">
						<BaseImg
							v-if="userStore.data.vip_level"
							:src="getResConfigImage('vip_' + userStore.data.vip_level, ImageKeyEnum.userinfo)"
							class="mr-[5px] w-[28px]"
						/>
						<span class="ml-[1px] text-[16px] font-[700]">VIP</span>
						<span class="ml-[1px] text-[16px] font-[700]">{{ userStore.data.vip_level }}</span>
					</div>
					<div class="text-[14px] color-white">ID:{{ userStore.uid }}</div>
					<BaseIcon
						class="ml-[6px] pointer text-[14px] profile-copy"
						tabindex="-1"
						name="dl-copy"
						@click="Helper.copyText(userStore.uid, true)"
					/>
				</div>
			</div>
			<BaseIcon name="profile_edit" class="text-lowlight text-[24px] profile_edit" @click="openPopup(PopupEnum.myProfileEdit)" />
		</div>

		<div class="profile-panel">
			<h2 class="mb-[16px] text-[16px] font-[600] pl-[10px]">{{ $t('MP0008') }}</h2>
			<div class="profile-panel-tab">
				<div>
					<p>{{ $t('MP0001') }}</p>
					<p>{{ Helper.formatDate(userStore.data.register_time, 4) }}</p>
				</div>
				<p class="vertical-line" />
				<div>
					<p>{{ $t('MP0002') }}</p>
					<p>
						<span>{{ configStore.currency_symbol }} {{ $fp($cp(userStore.data.bet_amount_point)) }}</span>
					</p>
				</div>
				<p class="vertical-line" />
				<div>
					<p>{{ $t('MP0003') }}</p>
					<p>
						<span>{{ configStore.currency_symbol }} {{ $fp($cp(userStore.data.hit_amount_point)) }}</span>
					</p>
				</div>
			</div>
		</div>

		<div class="profile-top">
			<h2 class="mb-[16px] text-[16px] font-[600]">{{ $t('MP0004') }}</h2>
			<p class="mb-[20px] Horizontal-line" />

			<div class="overflow-y-auto max-h-[245px]">
				<div v-if="userStore.data.user_favorite_three_games.length">
					<div v-for="(item, index) in userStore.data.user_favorite_three_games" :key="index" class="flex items-center profile-top-item">
						<BaseImg :src="configStore.getGameByGameId(item.gid).src" class="mr-[20px] w-[90px] h-[90px]" />
						<div>
							<h3>{{ configStore.getGameByGameId(item.gid).name }}</h3>
							<div class="profile-list-p1">
								<p>{{ $t('MP0006') }}</p>
								<p>{{ $t('T0009') }}</p>
							</div>
							<div class="profile-list-p2">
								<p>{{ $fp($cp(item.bet_amount_point)) }}</p>
								<p>{{ $fp($cp(item.hit_amount_point)) }}</p>
							</div>
						</div>
					</div>
				</div>
				<div v-else class="mt-[35px] h-[65px] text-center text-[14px] font-[500] low-light">
					{{ $t('MP0005') }}
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const accountStore = useAccountStore()
	const configStore = useSysConfigStore()
	const userStore = useUserStore()
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
	.color-white {
		color: $color-white;
	}
	.low-light {
		color: $text-lowlight;
	}
	h2 {
		color: $color-white;
	}
	.profile-panel {
		@apply mt-[24px]  py-[14px] rounded-md;
		background: $block-bg-2;
		border: 0.5px solid $block-bg;
		.profile-panel-tab {
			@apply flex;
			div {
				@apply w-[33%] text-center;
				p {
					&:first-child {
						@apply mb-[5px] text-[12px] font-[500];
						color: $color-white;
					}
					&:last-child {
						@apply text-[16px] font-[600];
						color: $color-white;
					}
				}
				span {
					color: $main;
				}
			}
		}
	}
	.profile-top {
		@apply mt-[24px] px-[10px] pt-[14px] rounded-md;
		background: $block-bg-2;
		.profile-top-item {
			@apply mb-[16px] w-[100%];
			h3 {
				@apply mb-[6px] text-[14px] font-[600];
			}
			div {
				@apply flex-1;
				.profile-list-p1 {
					@apply flex justify-between;
					p {
						@apply text-[14px] font-[500];
						color: $text-lowlight;
						&:last-child {
							@apply w-[200px];
						}
					}
				}
				.profile-list-p2 {
					@apply flex justify-between;
					p {
						@apply text-[14px] font-[500];
						&:first-child {
							color: $main;
						}
						&:last-child {
							@apply w-[200px];
							color: $down-03;
						}
					}
				}
			}
		}
	}
	.vertical-line {
		@apply w-[1px] h-[50px];
		background: $block-bg;
	}
	.Horizontal-line {
		@apply h-[1px];
		background: $block-bg;
	}
	:deep(.modal__close) {
		i {
			@apply text-[24px];
		}
	}
	.avatar {
		@apply p-[5px] w-[130px] h-[130px];
		border-radius: 50%;

		border: 3px solid #ffe03a;
	}
	.profile_edit {
		color: $gray;
	}
	.profile-vip-box {
		background: $block-bg-2;
		span {
			color: $main;
		}
	}
	.profile-copy {
		color: $placeholder-color;
	}
</style>
