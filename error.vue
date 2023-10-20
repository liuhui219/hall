<template>
	<div v-if="error.statusCode == 401" id="container" class="flex col">
		<div class="top flex a-c r-b">
			<div class="flex col top-text">
				<div>ACCESS</div>
				<div>DENIED</div>
			</div>
			<img src="https://www.afunimg10.com/assets/img/person.png" alt="" class="top-img" />
		</div>
		<div class="detail flex col">
			<div class="detail-1">This website is using a security service to protect itself from online attacks.</div>
			<ul>
				<li class="flex">
					<img src="https://www.afunimg10.com/assets/img/point.png" alt="" />
					<div><span>Ray ID:&nbsp;</span><span id="r-i" /></div>
				</li>
				<li class="flex">
					<img src="https://www.afunimg10.com/assets/img/point.png" alt="" />
					<div><span>Timestamp:&nbsp;</span><span id="t-t" /></div>
				</li>
				<li class="flex">
					<img src="https://www.afunimg10.com/assets/img/point.png" alt="" />
					<div><span>Your IP address:&nbsp;</span><span id="y-i-a" /></div>
				</li>
				<li class="flex">
					<img src="https://www.afunimg10.com/assets/img/point.png" alt="" />
					<div><span>Requested URL:&nbsp;</span><span id="r-u" /></div>
				</li>
				<li class="flex">
					<img src="https://www.afunimg10.com/assets/img/point.png" alt="" />
					<div><span>Error reference number:&nbsp;</span><span id="e-f-b" /></div>
				</li>
				<li class="flex">
					<img src="https://www.afunimg10.com/assets/img/point.png" alt="" />
					<div id="u-a" />
				</li>
			</ul>
		</div>
		<div class="footer r-c a-c flex">
			<img src="https://www.afunimg10.com/assets/img/logo.png" alt="" />
		</div>
	</div>
	<div v-else>
		<div>{{ data.error.statusCode }}</div>
		<div>{{ data.error.statusMessage }}</div>
		<div v-html="data.error.stack" />
	</div>
</template>

<script setup lang="ts">
	import { mapFace } from './apis/types'

	const data = defineProps({
		error: {
			type: Object,
			default: (): mapFace => ({}),
		},
	})
	const list: Array<String> = ['https://api.my-ip.io/ip.json', 'https://ipinfo.io/json']
	function setIpHtml(text?: string) {
		const ip = document.getElementById('y-i-a')
		if (!text) {
			text = 'unkown'
		}
		if (ip) {
			ip.innerHTML = text
		}
	}
	function ipGet(list: Array<String | URL>) {
		let up = list.pop()
		let ip = ''
		if (typeof up == 'string') {
			ip = up
		}
		fetch(ip)
			.then(function (res) {
				res.json().then(function (data) {
					if (data.ip) {
						setIpHtml(data.ip)
					} else if (list.length) {
						ipGet(list)
					} else if (ip) {
						setIpHtml()
					}
				})
			})
			.catch((err) => {
				if (list.length) {
					ipGet(list)
				} else {
					setIpHtml()
				}
			})
	}

	function initMini(num: Number): string {
		return num < 10 ? '0' + num : '' + num
	}
	function randomNum() {
		return Math.ceil(Math.random() * 9) + 1020
	}
	function randomString() {
		let arr = 'abcdefghij789ABCDEFGklmnopqwxyz0123456HIJKLMNOrstuvPQRSTUVWXYZ'
		return arr[Math.ceil(Math.random() * (arr.length - 1))]
	}
	function renderRayID() {
		var a = ''
		for (var i = 0; i < 18; i++) {
			a += randomString()
		}
		return a
	}
	function getTime() {
		var date = new Date()
		var month = initMini(date.getMonth() + 1)
		var year = date.getFullYear() + ''
		var day = initMini(date.getDate())
		var hours = initMini(date.getHours())
		var minutes = initMini(date.getMinutes())
		var second = initMini(date.getSeconds())
		return year + '-' + month + '-' + day + '  ' + hours + ':' + minutes + ':' + second + ' ' + 'UTC+' + (0 - date.getTimezoneOffset() / 60)
	}
	function initConfig() {
		ipGet(list)
		const id = document.getElementById('r-i')
		if (id) {
			id.innerHTML = renderRayID()
		}
		const time = document.getElementById('t-t')
		if (time) {
			time.innerHTML = getTime()
		}
		const local = document.getElementById('r-u')
		if (local) {
			local.innerHTML = window.location.href
		}
		const ref = document.getElementById('e-f-b')
		if (ref) {
			ref.innerHTML = ' 1020'
		}
		// document.getElementById('s-i').innerHTML = '<b></b><div>Server ID: ' + 'FL_2F741' + '</div>';
		const ua = document.getElementById('u-a')
		if (ua) {
			ua.innerHTML = window.navigator.userAgent.toString()
		}
	}
	onMounted(() => {})
</script>

<style scoped>
	html,
	body {
		background-color: #15171a;
		color: #fff;
	}
	.flex {
		display: flex;
	}
	.col {
		flex-direction: column;
	}
	.r-b {
		justify-content: space-between;
	}
	.r-c {
		justify-content: center;
	}
	.a-c {
		align-items: center;
	}

	.flex-1 {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}
	#container {
		width: 100%;
		margin: auto;
		min-height: 100%;
		overflow-x: hidden;
	}
	.top {
		padding-left: 70px;
		padding-right: 40px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.top-text {
		font-size: 30px;
		color: #f3c63c;
		text-shadow: 0 2px rgba(0, 0, 0, 0.3);
	}
	.top-img {
		width: 115px;
		height: 127px;
	}
	.detail {
		padding: 37px 26px 26px;
		background-color: #1e2024;
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
		overflow-x: hidden;
		font-size: 14px;
		color: #a0a6ad;
		flex: 1;
	}
	.detail div {
		/* line-height: 18px; */
	}
	.detail-1 {
		margin-bottom: 20px;
	}
	li {
		margin-bottom: 15px;
	}
	li img {
		width: 4px;
		height: 4px;
		flex-shrink: 0;
		margin-top: 7px;
		margin-right: 10px;
	}
	li span {
		flex-shrink: 0;
		word-break: break-all;
	}
	li > div > span {
		word-break: break-all;
	}
	#y-i-a,
	#r-u {
		color: #90e81a;
	}
	.footer {
		flex-shrink: 0;
		min-height: 100px;
		padding-bottom: 15px;
	}
	.footer img {
		width: 82px;
		height: 32px;
	}
	div::-webkit-scrollbar {
		display: none;
	}
</style>
