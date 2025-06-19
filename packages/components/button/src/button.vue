<template>
  <div :class="{ isDisabled: disabled }">这是button</div>
</template>

<script lang="ts" setup>
const { disabled = false } = defineProps<{
  disabled?: boolean
}>()
</script>

<style lang="scss" scoped></style>
