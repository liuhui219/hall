<template>
	<div>
		<div class="flex flex-col h-full">
			<iframe :src="otherStore.url" frameborder="0" allowtransparency="true" class="flex-1" @load="otherStore.iFrameLoad" />
		</div>
	</div>
</template>
<script setup lang="ts">
	const otherStore = useOtherStore()
</script>
