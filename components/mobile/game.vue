<template>
	<div class="game-iframe">
		<div class="iframe-box" :style="{ height: !bottomMenu || !navbarShow ? '100%' : 'calc(100% - 40px)' }">
			<iframe
				ref="iframe"
				:src="gameStore.url"
				frameborder="0"
				allowtransparency="true"
				allow="autoplay"
				auto=" "
				allowfullscreen="true"
				@load="gameStore.iFrameLoad"
			/>
		</div>
		<div v-show="bottomMenu">
			<div v-show="navbarShow" class="game_navbar">
				<button
					v-for="item in list"
					:key="`navbar-${item.text}`"
					class="no-hover"
					:class="{ current: activeName == item.text }"
					@click="changeActive(item)"
				>
					<BaseIcon :name="item.name" class="animate__animated text-[18px]" />
				</button>
			</div>
			<div v-show="!navbarShow" class="game_footer-icon" @click="navbarShow = true">
				<BaseIcon name="download" size="64" color="#fff" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	const gameStore = useGameStore()
	const iframe = ref()
	const gameTipBox = ref()
	const rect = ref({ x: 10, y: 10 })
	const startPoint = ref({ x: 0, y: 0 })
	const startRect: any = {}
	const onTouchstart = (e: TouchEvent) => {
		const { clientX, clientY } = e.changedTouches[0]
		startPoint.value = { x: clientX, y: clientY } // 开始点
		startRect.value = { ...rect.value } // 开始元素位置
	}
	const onTouchmove = (e: TouchEvent) => {
		const { clientX, clientY } = e.changedTouches[0]
		const diffX = clientX - startPoint.value.x // 手指横向移动距离
		const diffY = clientY - startPoint.value.y // 手指纵向移动距离
		const distX = startRect.value.x + diffX // 元素移动的距离
		const distY = startRect.value.y + diffY // 元素移动的距离
		if (distX >= iframe.value.clientWidth - gameTipBox.value.offsetWidth) {
			rect.value.x = iframe.value.clientWidth - gameTipBox.value.offsetWidth
		} else if (distX <= 0) {
			rect.value.x = 0
		} else {
			rect.value.x = distX
		}
		if (distY >= iframe.value.clientHeight - gameTipBox.value.offsetHeight) {
			rect.value.y = iframe.value.clientHeight - gameTipBox.value.offsetHeight
		} else if (distY <= 0) {
			rect.value.y = 0
		} else {
			rect.value.y = distY
		}
	}

	const bottomMenu = computed(() => {
		return gameStore.jumpMode == 0
	})
	const navbarShow = ref(true) // 是否切换出现
	const activeName = ref('back')
	const list = [
		{ name: 'menu', text: 'Menu', hash: 'menu' },
		{ name: 'download', text: 'show' },
		{ name: 'deposit', text: 'deposit', hash: 'deposit' },
		{ name: 'sign-out', text: 'back' },
	]
	const changeActive = (from: any) => {
		const hash: string = from.hash
		if (hash) {
			openPopup(hash)
		} else {
			if (from.text == 'show') {
				navbarShow.value = false
			} else {
				const gameStore = useGameStore()
				gameStore.gameToHome()
			}
		}
	}

	onMounted(() => {
		;(window as any).iframeWin = iframe.value?.contentWindow
	})
</script>
<style scoped lang="scss">
	.game-iframe {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		.iframe-box {
			width: 100%;
			display: flex;
			iframe {
				width: 100%;
				flex: 1;
			}
		}
		.game_navbar {
			width: 100%;
			height: 40px;
			user-select: none;
			background: $block-bg-2;
			display: flex;
			box-shadow: 0px -12px 24px #000000;
			& > button {
				position: relative;
				flex: 1;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				color: $text-base;
				cursor: pointer;
				& > .icon {
					font-size: 18px;
				}
				&.current {
					color: $second;
				}
			}
		}
		.game_footer-icon {
			width: 30px;
			height: 30px;
			background: rgba(0, 0, 0, 0.3);
			display: flex;
			justify-content: center;
			border-radius: 50%;
			flex-direction: row;
			align-items: center;
			position: fixed;
			left: 50%;
			margin-left: -15px;
			bottom: 5px;
			transform: rotate(180deg);
		}
	}
</style>
