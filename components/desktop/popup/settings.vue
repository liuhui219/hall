<template>
	<DesktopPopupHeader title="{{ $t('ST0001') }}" :invisible="true" />
	<div>123</div>
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
<style scoped lang="scss"></style>
