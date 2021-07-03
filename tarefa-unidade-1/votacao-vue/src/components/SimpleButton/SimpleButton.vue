<template>
  <button
    @click="onClick"
    :class="{ btn: true, 'btn--selected': (selected && !disabled)}"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    selected: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
@import './SimpleButton.scss';
</style>
