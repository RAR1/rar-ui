<template>
  <component :is="tag" :ref="_ref" :class="buttonKls" @click="handleClick">
    <span v-if="$slots.default">
      <slot />
    </span>
  </component>
</template>

<script lang="ts" setup name="RarButton">
import { computed } from 'vue'
import { useNamespace } from '@rar-ui/hooks'
import { buttonEmits, buttonProps } from './button'
import { useButton } from './use-button'

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const ns = useNamespace('button')
const { _ref, handleClick } = useButton(props, emit)

const buttonKls = computed(() => [
  ns.b(),
  ns.is('disabled', props.disabled),
  ns.is('loading', props.loading),
])

defineExpose({
  ref: _ref,
})
</script>

<style lang="scss" scoped></style>
