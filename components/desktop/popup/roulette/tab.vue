<template>
	<div class="flex justify-between shrink-0 mx-[105px] mt-[28px] gap-[20px] relative z-[10]">
		<button
			v-for="(wheel, idx) in rouletteStore.currentRouletteCfg.list"
			v-show="configStore.pageConfig.sysConfig.rouletteConfig.statusList[idx]"
			:key="wheel.title"
			class="roulette-tab-btn"
			:class="[{ 'roulette-tab-btn-active': rouletteStore.isActive(idx) }]"
			:style="{
				backgroundImage: `url(${getResConfigImage(
					rouletteStore.isActive(idx) ? `${wheel.fixed}_bg` : 'disabled_bg',
					ImageKeyEnum.roulette
				)})`,
			}"
			@click="rouletteStore.changeActiveIndex(idx)"
		>
			<BaseImg
				v-show="rouletteStore.isActive(idx)"
				class="roulette-tab-icon"
				:src="getResConfigImage(`${wheel.fixed}_icon`, ImageKeyEnum.roulette)"
				alt=""
			/>
			<BaseImg
				v-show="!rouletteStore.isActive(idx)"
				class="roulette-tab-icon roulette-tab-icon-disabled"
				:src="getResConfigImage(`${wheel.fixed}_icon_disabled`, ImageKeyEnum.roulette)"
			/>
			<p v-if="rouletteStore.isActive(idx)" class="roulette-tab-text">
				<span>{{ $t(wheel.title) }}</span>
				<span v-if="wheel.min_vip_limit > userStore.vip_level" class="roulette-lock">{{ $t('RO0018', { vip: wheel.min_vip_limit }) }}</span>
			</p>
		</button>
	</div>
</template>
<script setup lang="ts">
	const rouletteStore = useRouletteStore()
	const userStore = useUserStore()
	const configStore = useSysConfigStore()
</script>
<style scoped lang="scss">
	.roulette-tab-btn {
		flex-shrink: 0;
		border-radius: 8px;
		overflow: hidden;
		width: 111px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 8px;
		gap: 14px;
		height: 50px;

		background-repeat: no-repeat;
		background-size: cover;
		&.roulette-tab-btn-active {
			flex: 1;
		}
	}

	.roulette-tab-text {
		text-shadow: 0px 1px 0px rgba(8, 31, 112, 0.7);
		color: $color-white;
		font-size: 14px;
		font-weight: 600;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		line-height: 1.2;
		.roulette-lock {
			font-weight: 500;
			color: #fff500;
		}
	}
	.roulette-tab-icon {
		width: 50px;
		height: 50px;
	}
	.roulette-tab-icon-disabled {
		height: 46px;
		width: 46px;
	}
</style>
