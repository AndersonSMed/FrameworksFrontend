<script>
  import { createEventDispatcher } from 'svelte';

  export let disabled = false;
  export let selected = false;
  export let text = '';

  const dispatch = createEventDispatcher();

  function onClick(event) {
    dispatch('click', event);
  }
</script>

<style lang="scss">
  $selector: '.btn';

  #{$selector} {
    transition: all 0.2s;

    &--selected {
      box-shadow: 0px 0px 3px 1px #999;
    }
  }
</style>

<button
  type="button"
  on:click={onClick}
  class="btn"
  class:btn--selected={(selected && !disabled)}
  {disabled}
>
  {text}
</button>
