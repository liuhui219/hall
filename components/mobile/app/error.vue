<template>
	<div>network error</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	if (!useUrlError().value) {
		setTimeout(() => {
			let newUrl = useUrlConfig().value.href
			if (useUrlcApp().value) {
				newUrl = window.location.href
			}
			const resParam = new Date().toISOString()
			let newParam = 'error=' + resParam
			newUrl = Helper.urlAddParam(newUrl, newParam)
			window.location.href = newUrl
		}, 1000)
	}
</script>
