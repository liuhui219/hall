<template>
	<div v-if="chatStore.showMb" class="absolute left-0 top-0 w-[100%] h-[100%] z-[1]" @click="chatStore.closeMb()" />
	<BasePageLoading :http="true" :show="chatStore.bShowLoading" />
	<section class="chat-header-wrap">
		<button class="back-btn rotate-90" @click="goBack()"><BaseIcon name="select-arrow-down" class="text-white" /></button>
		<button class="back-btn2" @click="goBack()"><BaseIcon name="select-arrow-down" class="back-icon text-[12px] text-white" /></button>
		<div class="header-title chat-header-title">CHAT</div>
		<div class="chat-header-right">
			<BaseSelect
				class="sys-select-chat ml-[12px] z-[2]"
				:model-value="chatStore.currRoomIndex"
				:list="chatStore.roomList"
				:size="'m'"
				:dot="true"
				:chat-is-show="chatStore.chatIsShow"
				@click="handleClick()"
				@change="(index) => handleChange(index)"
			/>
			<div class="chat-help-btn relative">
				<button @click="chatStore.switchHelp()">
					<BaseIcon name="help" class="text-[23px] text-[#B2BABB]" />
				</button>
				<span v-if="chatStore.showHelp" />
			</div>
		</div>
	</section>
	<div v-if="chatStore.showHelp" class="chat-help-dec">
		<div>{{ $t('CH001') }}</div>
		<div>{{ $t('CH002') }}</div>
		<div>{{ $t('CH003') }}</div>
		<div>{{ $t('CH004') }}</div>
		<div>{{ $t('CH005') }}</div>
		<div>{{ $t('CH006') }}</div>
		<div>{{ $t('CH007') }}</div>
	</div>
	<div class="modal__content chat__content">
		<div v-for="(item, index) in chatStore.list" :key="index">
			<div class="flex">
				<div v-if="item.isNextDay" class="next-day">
					{{ $t('DY00' + Helper.formatDate(item.itime, 5).split('-')[0]) }}<span />{{ Helper.formatDate(item.itime, 5).split('-')[1] }}
				</div>
			</div>
			<div class="user-info-header" :style="{ padding: item.isRepeat ? '0px 15px' : '20px 15px 0' }">
				<div v-if="!item.isRepeat" class="userinfo-header">
					<div class="userinfo-header-mask">
						<div class="userinfo-header-mask">
							<BaseImg :src="useSysConfigStore().getAvatarSrc(item.avatar)" class="w-full h-full" />
						</div>
					</div>
					<!-- <span>
						{{ item.vip }}
					</span> -->
				</div>
				<div v-if="item.isRepeat" class="repeat-header" />
				<div class="flex flex-1 repeat-n">
					<div class="flex-1">
						<div v-if="!item.isRepeat" class="user-info-id">
							<div class="mr-[8px] text-white text-[14px] font-normal">{{ item.nick }}</div>
							<div class="text-[12px]">{{ Helper.formatDate(item.itime, 10) }}</div>
						</div>
						<div v-if="item.type === 0" class="user-info-name" :style="{ marginTop: item.isRepeat ? '5px' : '0' }">
							{{ item.msg }}
						</div>
						<div
							v-if="item.type === 1"
							class="bg-black rounded inline-block text-0 align-top"
							:style="{ marginTop: item.isRepeat ? '5px' : '0' }"
						>
							<BaseImg :id="'chatImg' + index" :src="item.msg" class="rounded" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="chat-bottom">
		<div v-if="chatStore.newMessage" class="new-message" @click="chatStore.toNewMessage">{{ chatStore.newMessage }}</div>
		<!-- <div class="chat-tab-box">
			<EmojiPicker
				v-if="chatStore.showEmoji"
				class="emoji-picker"
				:native="true"
				:hide-search="true"
				:hide-group-names="true"
				:disable-skin-tones="true"
				theme="light"
				@select="chatStore.selectEmoji"
			/>
			<div v-if="chatStore.showGif" class="h-[190px] p-[5px] rounded-lg overflow-hidden">
				<div class="gif-picker">
					<div v-for="(item, index) in chatStore.gifList" :key="index" class="gif-item">
						<BaseImg
							class="w-full h-full"
							:src="item.images.preview_gif.url"
							alt=""
							@click="chatStore.selectGif(item.images.preview_gif.url)"
						/>
					</div>
				</div>
			</div>
			<div v-if="chatStore.showEmoji || chatStore.showGif" class="edit-box flex p-[8px] rounded-lg">
				<div :class="[chatStore.showEmoji ? 'edit-active' : '', 'edit-tab']" @click="chatStore.switchEditTab(1)">
					<BaseIcon tabindex="-1" name="emoji" class="btn-emo p-[7px] text-[22px]" />
				</div>
				<div :class="[chatStore.showGif ? 'edit-active' : '', 'edit-tab']" @click="chatStore.switchEditTab(2)">
					<BaseIcon tabindex="-1" name="gif" class="btn-emo p-[7px] text-[22px]" />
				</div>
			</div>
			<span v-if="chatStore.showEmoji || chatStore.showGif" class="chat-tab-span" />
		</div> -->
		<div :class="[chatStore.showSendButton ? 'chat-content show-send' : 'chat-content hide-send']">
			<div class="editor-box">
				<textarea
					id="editorId"
					ref="editor"
					v-model="chatStore.editorText"
					class="editorss w-full"
					:style="{ overflowY: chatStore.editScroll ? 'scroll' : 'visible' }"
					spellcheck="false"
					:placeholder="$t('CH008')"
					@click="chatStore.txtClick"
					@input="chatStore.txtInput"
					@focus="chatStore.txtFocus"
					@blur="chatStore.txtBlur"
					@keyup.enter="chatStore.sendText"
				/>
				<div class="hide-text" />
			</div>
			<BaseIcon
				v-if="!chatStore.showEmoji && !chatStore.showGif"
				tabindex="-1"
				name="emoji"
				class="btn-emo text-[25px]"
				@click="chatStore.changeEditTab(1)"
			/>
			<BaseIcon
				v-if="chatStore.showEmoji || chatStore.showGif"
				tabindex="-1"
				name="keyboard"
				class="btn-emo text-[25px]"
				@click="chatStore.changeEditTab(2)"
			/>
		</div>
		<!-- v-if="chatStore.showSendButton" -->
		<BaseIcon v-if="chatStore.showSendButton" ix-pos="upright" tabindex="-1" name="send" class="send-btn" @click="chatStore.sendText" />
	</div>
	<div v-if="chatStore.showEmoji || chatStore.showGif" class="edit-box flex">
		<div :class="[chatStore.showEmoji ? 'edit-active' : '', 'edit-tab']" @click="chatStore.switchEditTab(1)">
			<BaseIcon tabindex="-1" name="emoji" class="btn-emo p-[8px] text-[22px]" />
		</div>
		<div :class="[chatStore.showGif ? 'edit-active' : '', 'edit-tab']" @click="chatStore.switchEditTab(2)">
			<BaseIcon tabindex="-1" name="gif" class="btn-emo p-[8px] text-[22px]" />
		</div>
	</div>
	<!-- <EmojiPicker
		v-if="chatStore.showEmoji"
		class="emoji-picker"
		:native="true"
		:hide-search="true"
		:hide-group-names="true"
		:disable-skin-tones="true"
		theme="dark"
		@select="chatStore.selectEmoji"
	/> -->
	<div v-if="chatStore.showEmoji" class="emoji-ul">
		<ul class="emoji-list">
			<li v-for="(item, index) in chatStore.EmojiList" :key="index" class="emoji-item" @click="chatStore.selectEmoji(item.emoji)">
				{{ item.emoji }}
			</li>
		</ul>
		<div class="fixed bottom-[5px] right-[3.3%] w-[20%] h-[43px] rounded-[10px] text-center emo-delete-box" @click="chatStore.deleteEmoji()">
			<BaseIcon tabindex="-1" name="emoji-delete" class="emo-delete mt-[10px] text-[38px] text-[#757FA5]" />
		</div>
	</div>

	<div v-if="chatStore.showGif" class="gif-box">
		<div v-for="(item, index) in chatStore.gifList" :key="index" class="gif-item">
			<BaseImg class="w-full h-full" :src="item.images.preview_gif.url" alt="" @click="chatStore.selectGif(item.images.preview_gif.url)" />
		</div>
	</div>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'
	import EmojiPicker from 'vue3-emoji-picker'
	import 'vue3-emoji-picker/css'
	const chatStore = useChatStore()
	const configStore = useSysConfigStore()
	onMounted(chatStore.mounted)
	onBeforeUnmount(chatStore.unmounted)
	const goBack = () => {
		closePopup()
	}
	const handleChange = (index: number) => {
		chatStore.closeMb()
		if (index == chatStore.currRoomIndex) return
		chatStore.changeRoom(index)
		// configStore.useUpdateLang(sysConfig.chatConfig.roomList[chatStore.currRoomIndex].lang)
	}
	const handleClick = () => {
		chatStore.showHelp = false
		chatStore.showMb = true
	}
</script>

<style scoped lang="scss">
	.emoji-ul {
		@apply relative overflow-y-auto h-[300px] flex;
		.emoji-list {
			@apply flex flex-wrap justify-start;
			padding: 8px 5px 3px;
			.emoji-item {
				@apply text-center text-[27px] cursor-pointer;
				flex-basis: 12.5%;
				padding: 4px 0;
			}
		}
		.emo-delete-box {
			background-color: $block-bg-2;
			.emo-delete {
				line-height: 43px;
			}
		}
	}
	.vfm__conten {
		padding-top: 0 !important;
	}
	.chat-header-wrap {
		height: $app-header-height;
		position: relative;
		z-index: 1;
		.back-btn {
			@apply top-[1px] left-[10px] pr-[1px] text-[18px];
		}
		.back-btn2 {
			@apply ml-[15px] pl-[3px] pr-[4px];
			.back-icon {
				transform: scale(0.7, 0.7) rotate(90deg) !important;
			}
		}
		.chat-header-title {
			left: $chat-header-title-left;
		}
		.chat-header-right {
			.chat-help-btn {
				span {
					@apply left-[-3px] bottom-[-38px];
					border-left: 15px solid transparent;
					border-right: 15px solid transparent;
				}
			}
		}
	}
	.chat-help-dec {
		@apply ml-[-47%] w-[94%] p-[15px];
		margin-top: 14px;
	}
	.chat-bottom {
		min-height: 76px;
		padding-left: 17px;
		.chat-content {
			.editor-box {
				width: calc(100% - 30px);
			}
			.editor {
				padding: 0 40px 0 10px;
				max-height: 120px;
				overflow-y: scroll;
			}
			.editor:empty:before {
				content: attr(placeholder);
				color: #bbb;
			}
			.editor:focus:before {
				content: none;
			}
			.btn-emo {
				padding: 8px;
			}
		}
		.chat-tab-box {
			@apply top-[-247px] w-[81%];
			.emoji-picker {
				padding-top: 7px;
				height: 190px;
			}
			.gif-picker {
				@apply pb-[0px] h-[190px];
				.gif-item {
					height: $chat-gif-height;
				}
			}
			.chat-tab-span {
				@apply bottom-[-7px] right-[56px];
			}
		}
	}
	.chat__content {
		.user-info-name {
			padding: 5px 10px;
		}
		.next-day {
			span {
				margin-right: $chat-month-space;
			}
		}
	}

	.edit-box {
		background: $block-bg-2;
		padding: 0 10px 10px;
		.edit-tab {
			padding-top: 5px;
			margin-right: 5px;
		}
		.edit-active {
			background: $chat-bg-2;
			border-radius: 5px;
		}
		.btn-emo {
			color: $chat-emo-color;
		}
	}
	.emoji-picker {
		width: 100%;
		height: 300px;
		background: $home-tab-bar-bg;
		border-radius: 0;
		:deep(.v3-header) {
			// display: none;
		}
		:deep(.v3-footer) {
			display: none;
		}
	}
	.gif-box {
		@apply h-[300px] flex flex-wrap justify-start overflow-y-auto p-[5px];
	}
	.gif-item {
		@apply flex-1 h-[100px] rounded overflow-hidden;
		margin: 0 5px 5px 0;
		width: calc((100% - 10px) / 3);
		min-width: calc((100% - 10px) / 3);
		max-width: calc((100% - 10px) / 3);
		&:nth-child(3n) {
			margin-right: 0;
		}
	}
</style>
