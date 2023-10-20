<template>
	<div
		class="sys-input login-input"
		:class="{
			'input-format': !!$slots.format,
		}"
	>
		<div class="input-wrap" :class="{ 'big-radius': isBigRadius, 'border-none': !hasBorder, 'no-back': noBack, 'border-error': canShowError }">
			<slot name="prepend" />
			<input
				ref="inputRef"
				v-model="inputValue"
				:type="inputType"
				:readonly="!!readonly || !!disabled"
				:disabled="!!disabled"
				:index="index"
				autocapitalize="off"
				autocorrect="off"
				autocomplete="new-text"
				:inputMode="inputMode"
				:placeholder="placeholder"
				:maxlength="maxlength"
				:class="{ 'verify-input': $slots.verify }"
				@focus="focusHandler"
				@blur="blurHandler"
				@keyup="handleKeyUp"
				@keyup.enter="handleEnter"
				@input="onInput"
				@paste="onPaste"
			/>
			<slot name="format" :value="formatValue" />
			<BaseIcon v-if="clearButton" tabindex="-1" name="close" class="btn-clear" @click="clearInput" />
			<slot name="append" />
			<button
				v-if="showPasswordToggle"
				tabindex="-1"
				:class="{
					'btn-show-password': true,
					'sysicon-show-password': !showPassword,
					'sysicon-hide-password': showPassword,
				}"
				@click="toggleShowPassword"
			/>
			<slot name="verify" />
		</div>
		<div v-if="canShowError" class="error-msg text-[14px] font-bold input-error-msg" v-html="errorMessage" />
	</div>
</template>
<script setup lang="ts">
	const propsConf = defineProps({
		placeholder: {
			type: String,
			default: '',
		},
		value: {
			type: [String, Number],
			default: '',
		},
		clear: {
			type: Boolean,
			default: true,
		},
		type: {
			type: String,
			default: '',
		},
		decimal: {
			type: Number,
			default: 2,
		},
		index: {
			type: Number,
			default: 0,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		error: {
			type: Boolean,
			default: false,
		},
		errorMessage: {
			type: String,
			default: '',
		},
		maxlength: {
			type: Number,
			defalut: undefined,
		},
		remind: {
			type: Boolean,
			default: false,
		},
		inputRefBol: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		hasBorder: {
			type: Boolean,
			default: true,
		},
		inputBack: {
			type: Boolean,
			default: false,
		},
		isBigRadius: {
			type: Boolean,
			default: false,
		},
		inputFormat: {
			type: Function,
			default: null,
		},
		noBack: {
			type: Boolean,
			default: false,
		},
	})
	const emits = defineEmits(['update:value', 'update:error', 'focus', 'blur', 'clear', 'keyup', 'enter', 'paste'])
	const showPassword = ref(false)
	const formatValue = computed(() => {
		return propsConf.value as string
	})
	const inputType = ref(propsConf.type ?? 'text')
	const inputRef = ref()
	const showPasswordToggle = computed(() => {
		return propsConf.type == 'password' && !propsConf.readonly && !propsConf.disabled
	})
	const focusState = ref(false)
	const canShowError = computed({
		get: () => propsConf.error,
		set: (val) => {
			emits('update:error', val)
		},
	})
	const showRemind = ref(propsConf.remind && !propsConf.error && focusState.value)
	watchEffect(() => {
		let result = propsConf.remind && !propsConf.error && focusState.value
		setTimeout(() => {
			showRemind.value = result
		})
	})
	const onPaste = (event: any) => {
		emits('paste', event)
	}
	const oldValue = ref(propsConf.value)
	const onInput = (event: any) => {
		canShowError.value = false
		let value: any = `${event.target.value}`
		if (propsConf.inputFormat && typeof propsConf.inputFormat == 'function') {
			value = propsConf.inputFormat(value, oldValue.value)
			event.target.value = value
			oldValue.value = value
			emits('update:value', value)
		} else {
			if (propsConf.type == 'number') {
				if (propsConf.decimal) {
					let index = value.indexOf('.')
					let len = 1 + propsConf.decimal
					if (index > -1 && index < value.length - len) {
						value = parseFloat(value.slice(0, index + len))
						event.target.value = value
						emits('update:value', value)
					}
				} else {
					let reg = new RegExp('[^0-9]', 'g')
					value = value.replace(reg, '')
					event.target.value = value
					emits('update:value', value)
				}
			} else if (propsConf.type == 'tel') {
				value = value.replace(/[^0-9]/g, '')
				event.target.value = value
				emits('update:value', value)
			}
		}
	}

	const inputMode = computed(() => {
		if (inputType.value == 'tel') {
			return 'tel'
		} else if (inputType.value == 'number') {
			if (propsConf.decimal) {
				return 'decimal'
			} else {
				return 'numeric'
			}
		} else if (inputType.value == 'email') {
			return 'email'
		} else {
			return 'text'
		}
	})
	const clearInput = () => {
		emits('update:value', '')
		emits('clear', '')
	}

	const clearButton = computed(() => propsConf.clear && !!propsConf.value && !propsConf.readonly && !propsConf.disabled)
	const inputValue = computed({
		get: () => {
			return propsConf.value
		},
		set: (val: any) => {
			emits('update:value', val)
		},
	})

	const focusHandler = () => {
		if (propsConf.readonly || propsConf.disabled) return
		focusState.value = true
		emits('focus')
	}
	const blurHandler = () => {
		focusState.value = false
		emits('blur')
	}
	const handleKeyUp = (el: any) => {
		emits('keyup', el)
	}
	const handleEnter = () => {
		emits('enter')
	}
	const toggleShowPassword = () => {
		showPassword.value = !showPassword.value
		if (showPassword.value) {
			inputType.value = 'text'
		} else {
			inputType.value = 'password'
		}
	}
	watchEffect(() => {
		if (propsConf.inputRefBol) {
			inputRef.value?.focus()
		}
	})
</script>
<style lang="scss" scoped>
	.sys-input.login-input {
		margin-bottom: 12px;

		.input-wrap {
			background: transparent;
			border-radius: 8px;
			border: 1px solid $block-bg;
			height: 50px;
			&.reset-input {
				margin-bottom: 19px;
			}
			[class^='sysicon-'],
			[class*=' sysicon-'],
			input::-webkit-input-placeholder {
				color: $login-text;
			}

			.btn-verify {
				height: 100%;
				background: transparent;
				border-radius: 0;
				button {
					border-radius: 0;
					background: transparent;
				}
			}
		}
	}
</style>
