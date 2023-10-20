<template>
	<div class="desktop-box" :class="{ active: chatStore.chatHide }">
		<BasePageLoading class="!absolute" :http="true" :show="chatStore.bShowLoading" />
		<div v-if="chatStore.showMb" class="absolute left-0 top-0 w-[100%] h-[100%] z-[999] chatMb" @click="chatStore.closeMb()" />
		<section class="chat-header-wrap">
			<button class="back-btn" @click="chatStore.setMobileNavShow()"><BaseIcon name="forward rotate-0" /></button>
			<div class="header-title chat-header-title">CHAT</div>
			<div class="chat-header-right">
				<button class="back-btn2" @click="chatStore.setMobileNavShow()">
					<BaseIcon name="select-arrow-down" class="back-icon text-[12px] text-white" />
				</button>
				<BaseSelect
					class="sys-select-chat ml-[12px] z-[99999]"
					:model-value="chatStore.currRoomIndex"
					:list="chatStore.roomList"
					:size="'m'"
					:dot="true"
					:chat-is-show="chatStore.chatIsShow"
					@click="handleClick()"
					@change="(index) => handleChange(index)"
				/>
				<div class="chat-help-btn">
					<button @click="chatStore.switchHelp()">
						<BaseIcon name="help" class="text-[23px]" />
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
				<!-- 
                    月 日  如：June28
                    判断是否隔天（ MM-DD） 是则显示
                -->
				<div class="flex">
					<div v-if="item.isNextDay" class="next-day">
						{{ $t('DY00' + Helper.formatDate(item.itime, 5).split('-')[0]) }}<span />{{ Helper.formatDate(item.itime, 5).split('-')[1] }}
					</div>
				</div>
				<div class="user-info-header" :style="{ padding: item.isRepeat ? '0px 15px' : '20px 15px 0' }">
					<div v-if="!item.isRepeat" class="userinfo-header">
						<div class="userinfo-header-mask">
							<BaseImg :src="useSysConfigStore().getAvatarSrc(item.avatar)" class="w-full h-full" />
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
								<BaseImg :src="item.msg" class="rounded" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="chat-bottom">
			<div v-if="chatStore.newMessage" class="new-message" @click="chatStore.toNewMessage">{{ chatStore.newMessage }}</div>
			<div v-if="chatStore.showEmoji || chatStore.showGif" class="chat-tab-box">
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
				<div v-if="chatStore.showGif" class="h-[225px] p-[5px] rounded-lg">
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
				<div v-if="chatStore.showEmoji || chatStore.showGif" class="edit-box flex">
					<div :class="[chatStore.showEmoji ? 'edit-active' : '', 'edit-tab']" @click="chatStore.switchEditTab(1)">
						<BaseIcon tabindex="-1" name="emoji" class="btn-emo p-[7px]" />
					</div>
					<div :class="[chatStore.showGif ? 'edit-active' : '', 'edit-tab']" @click="chatStore.switchEditTab(2)">
						<BaseIcon tabindex="-1" name="gif" class="btn-emo p-[7px]" />
					</div>
				</div>
				<!-- :style="{ right: chatStore.showSendButton ? '53px' : '3px' }"></span> -->
				<span v-if="chatStore.showEmoji || chatStore.showGif" class="chat-tab-span" />
			</div>
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
					class="btn-emo"
					@click="chatStore.changeEditTab(1)"
				/>
				<BaseIcon
					v-if="chatStore.showEmoji || chatStore.showGif"
					tabindex="-1"
					name="keyboard"
					class="btn-emo"
					@click="chatStore.changeEditTab(2)"
				/>
			</div>
			<!-- v-if="chatStore.showSendButton" -->
			<BaseIcon v-if="chatStore.showSendButton" ix-pos="upright" tabindex="-1" name="send" class="send-btn" @click="chatStore.sendText" />
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
	.chatMb {
		top: $pc-header-height;
	}
	.chat-header-wrap {
		@apply relative;
		height: $pc-header-height;
		.back-btn {
			@apply px-[17px] pl-0 items-center;
		}
		.back-btn2 {
			@apply shrink-0 bottom-0 items-center;
		}
		.chat-header-right {
			.chat-help-btn {
				@apply relative;
				span {
					@apply left-0;
					border-left: 12px solid transparent;
					border-right: 12px solid transparent;
				}
			}
		}
	}
	.chat-help-dec {
		@apply ml-[-134px] w-[268px] p-[11px];
	}
	.chat-bottom {
		margin-top: 3px;
		.chat-content {
			&.hide-send {
				@apply w-[calc(100%-2px)];
			}
			.btn-emo {
				@apply bottom-[3px] p-[8px] text-lg;
			}
		}
		.chat-tab-box {
			@apply top-[-281px] w-[76%] h-[270px];
			.emoji-picker {
				height: 225px;
			}
			.gif-picker {
				@apply pb-[5px] h-[225px];
				.gif-item {
					height: 56px;
				}
			}
			.edit-box {
				@apply relative left-0 p-[7px] rounded-lg;
				.edit-tab {
					@apply rounded-lg;
				}
				.btn-emo {
					font-size: 18px;
				}
			}
			.chat-tab-span {
				bottom: -6px;
				right: 54px;
			}
		}
	}
	.chat__content {
		height: calc(100vh - 160px);
		.next-day {
			span {
				margin-right: $chat-month-space;
			}
		}
		.user-info-header {
			.user-info-name {
				padding: 7px;
			}
		}
	}
</style>
