<template>
	<div class="relative w-full h-full">
		<BaseImg class="w-full h-full position-center z-[0]" :src="getResConfigImage('active_04_bg1', ImageKeyEnum.home)" />
		<BaseImg class="w-full h-full position-center z-[1] active_04_animate" :src="getResConfigImage('active_04_bg2', ImageKeyEnum.home)" />
		<BaseImg class="w-[33%] position-center z-[2]" :src="getResConfigImage('active_04_point', ImageKeyEnum.home)" />
	</div>
</template>
<script setup></script>
