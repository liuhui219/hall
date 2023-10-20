<template>
	<div class="relative flex flex-1 flex-col w-full justify-center items-center">
		<div class="flex flex-1 w-full flex-col flex-1">
			<iframe :src="otherStore.url" frameborder="0" allowtransparency="true" class="flex-1" @load="otherStore.iFrameLoad" />
		</div>
	</div>
</template>
<script setup lang="ts">
	const otherStore = useOtherStore()
</script>
