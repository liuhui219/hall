<template>
	<div v-if="userStore.data.all_put_code" class="rollover">
		<div class="flex justify-between rollover-title">
			<span>{{ $t('W0029') }}</span>
			<span>
				<em><BasePoint :value="userStore.data.ready_put_code" /></em> /
				<em class="warning"><BasePoint :value="userStore.data.all_put_code" /></em>
			</span>
		</div>
		<div class="flex w-full items-center">
			<div class="flex-1 rollover-progress"><p :style="{ width: width }" /></div>
			<div class="ml-[12px] text-right">{{ width }}</div>
		</div>
	</div>
</template>
<script setup>
	const configStore = useSysConfigStore()
	const userStore = useUserStore()
	const width = computed(() => {
		return userStore.data.all_put_code ? (Math.min(userStore.data.ready_put_code / userStore.data.all_put_code, 1) * 100).toFixed(2) + '%' : '0%'
	})
</script>
