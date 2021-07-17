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
  @import './Button.scss';
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
