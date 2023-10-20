<template>
	<div
		id="apg-37238f5e-0b08-434d-bb87-15c5ac45f2d6"
		style="opacity: 0; position: absolute; z-index: -1"
		data-apg-seal-id="37238f5e-0b08-434d-bb87-15c5ac45f2d6"
		data-apg-image-size="256"
		data-apg-image-type="basic-light-large"
		@click.stop="toDoOut()"
	/>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	const count = ref(0)
	const url = useUrlApgSel()
	const toDoOut = () => {
		Helper.toOutLink(url.value.sel_url)
		// window.open(this.url, '_blank');
	}
	const initUrl = () => {
		setTimeout(() => {
			let doc: any = (window as any).apg_37238f5e_0b08_434d_bb87_15c5ac45f2d6
			if (doc) {
				doc.init()
				var a: any = document.getElementById('apg-37238f5e-0b08-434d-bb87-15c5ac45f2d6')
				if (a && a.children[0] && a.children[0].children && a.children[0].children[0] && a.children[0].children[0].href) {
					url.value.sel_url = a.children[0].children[0].href
					a.children[0].children[0].removeAttribute('href')
					a.onClick = function () {}
					if (a.children[0].children[0].children[0]) {
						url.value.sel_image = a.children[0].children[0].children[0].src
						a.remove()
						return
					}
				}
			}
			count.value++
			if (count.value < 20) {
				initUrl()
			}
		}, 1000)
	}
	onMounted(() => {
		var script = document.createElement('script')
		script.setAttribute('src', 'https://37238f5e-0b08-434d-bb87-15c5ac45f2d6.snippet.antillephone.com/apg-seal.js')
		document.head.appendChild(script)
		nextTick(() => {
			initUrl()
		})
	})
</script>
