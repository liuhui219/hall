<template>
	<div class="vip-nl-container">
		<div>
			<div class="vip-nl-banner" :style="{ backgroundImage: `url(${getResConfigImage('banner', ImageKeyEnum.vip)})` }">
				<div class="vip-nl-bnaner-title">
					<div class="w-[216px]">
						<div class="warning text-[20px] font-[600] mb-[1px]">{{ $t('V0026') }}</div>
						<p class="leading-[1.166] text-[12px]">
							{{ $t('V0027') }}
						</p>
					</div>
					<div class="vip-nl-setup-container">
						<button class="vip-nl-setup-title" @click="openLoginOrRegister()">{{ $t('V0028') }}</button>
						<div class="vip-nl-setup-context">
							<div v-for="item in setupList" :key="item.value" class="vip-nl-setup-context-item">
								<BaseImg :src="getResConfigImage(`setup_${item.value}`, ImageKeyEnum.vip)" class="max-w-[100px] mx-auto shrink-0" />
								<p class="vip-nl-setup-context-text">{{ $t(item.text) }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="vip-nl-reward">
				<MobileVipLine />
				<div class="vip-nl-reward-title">{{ $t('V0036') }}</div>
				<MobileVipLine class="-rotate-[180deg]" />
			</div>
		</div>
		<div class="vip-nl-margin">
			<div class="reward-item-container">
				<div v-for="(item, index) in vipStore.list" :key="index" class="reward-item">
					<div class="reward-item-context">
						<div class="reward-item-title">{{ $t(item.title) }}</div>
						<p>{{ $t(item.text) }}</p>
					</div>
					<BaseImg :src="getResConfigImage(item.image, ImageKeyEnum.vip)" class="reward-item-image" />
				</div>
			</div>
		</div>
		<div v-if="resConfig['telegram-group']" class="vip-nl-margin vip-nl-help">
			<h3 class="vip-nl-help-title">{{ $t('V0071') }}</h3>
			<div class="vip-nl-help-context">
				<p>{{ $t('V0072') }}</p>
				<button class="sys-btn btn-main-text" @click="pageConfigClick(1, resConfig['telegram-group'])">{{ $t('V0073') }}</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const vipStore = useVipStore()
	const setupList = [
		{ value: 1, text: 'V0033', title: '' },
		{ value: 2, text: 'V0034', title: '' },
		{ value: 3, text: 'V0035', title: '' },
	]
</script>

<style scoped lang="scss">
	.vip-nl-container {
		padding-bottom: 46px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.vip-nl-margin {
		margin: 0 16px;
	}
	.vip-nl-banner {
		width: 100%;
		height: calc(100vw / 375px * 276px);
		background-size: 100% 100%;
		position: relative;
		margin-bottom: 210px; //比例不是375/667时有问题
		.vip-nl-bnaner-title {
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 54%;
			text-align: center;
			width: calc(100% - 32px);
			margin-left: 16px;
			overflow: hidden;
		}
	}
	.vip-nl-setup-container {
		position: relative;
		padding-top: 30px;
		margin-top: 11px;
		width: 100%;
		.vip-nl-setup-title {
			display: flex;
			min-width: 180px;
			height: 40px;
			padding: 8px 12px;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			border-radius: 20px;
			background: linear-gradient(180deg, #ffdb5c 0%, #f90 100%);
			color: $down-03;
			font-size: 14px;
			position: absolute;
			top: 5px;
			left: 0;
			right: 0;
			margin: auto;
			width: max-content;
		}
		.vip-nl-setup-context {
			width: 100%;
			padding: 22px 8px 15px;

			flex-shrink: 0;
			display: flex;
			gap: 6px;
			border-radius: 10px;
			border: 3px solid $block-bg-2;
			background: $bg;
			.vip-nl-setup-context-item {
				background: $block-bg-2;
				border-radius: 8px;
				padding: 0px 2px;
				height: 160px;
				flex: 1;
				flex-shrink: 0;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				flex-shrink: 0;
				overflow: hidden;
			}
			.vip-nl-setup-context-text {
				width: calc(100% / 0.625 - 10px);
				position: relative;
				left: calc((100% - 100% / 0.625) / 2);
				min-height: 50px;
				font-size: 16px;
				transform: scale(0.625);
				text-align: center;
				flex: 1;
				line-height: 1.2;
				margin: -20px 5px 0;
			}
		}
	}
	.vip-nl-reward {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 20px;
		font-weight: 600;
		text-transform: uppercase;
		.vip-nl-reward-title {
			background: linear-gradient(180deg, #fef1d1 0%, #fabf29 100%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			margin: 0 12px;
		}
	}
	.reward-item-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		.reward-item {
			width: 100%;
			flex-shrink: 0;
			border-radius: 6px;
			border: 1px solid $disable-color;
			background: $block-bg-2;
			color: $text-lowlight;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-left: 20px;
			.reward-item-context {
				flex: 1;
				font-size: 12px;
				text-transform: capitalize;

				.reward-item-title {
					color: $main;
					font-size: 14px;
					margin-bottom: 8px;
				}
			}
			.reward-item-image {
				width: 103px;
				height: 103px;
			}
		}
	}

	.vip-nl-help {
		.vip-nl-help-title {
			margin-bottom: 12px;
			color: $color-white;
			font-size: 20px;
			font-weight: bold;
		}

		.vip-nl-help-context {
			padding: 24px;
			background: $block-bg-2;
			display: flex;
			flex-direction: column;
			gap: 24px;
			font-size: 12px;
			color: $text-lowlight;
			border-radius: 6px;
		}
	}
</style>
