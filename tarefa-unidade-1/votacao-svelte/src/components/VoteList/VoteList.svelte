<script>
  import { createEventDispatcher } from 'svelte';
  import Button from '../Button/Button.svelte';

  export let display = 'horizontal';
  export let disabled = false;
  export let options = [];

  const dispatch = createEventDispatcher();

  let selectedVote = null;

  function onSelectVote(selectedOption) {
    selectedVote = selectedOption;
    dispatch('vote', selectedOption);
  }
</script>

<style lang="scss">
  $selector: '.vote-list';

  #{$selector} {
    &__list {
      margin: 0;
      padding: 0;
    }

    &__list-item {
      list-style: none;
    }

    &--horizontal {
      margin: 0 -4px;

      #{$selector}__list-item {
        display: inline;
        margin: 0 4px;
      }
    }

    &--vertical {
      margin: -4px 0;

      #{$selector}__list-item {
        display: block;
        margin: 4px 0;
      }
    }
  }
</style>

<div
  class="vote-list"
  class:vote-list--horizontal={display === 'horizontal'}
  class:vote-list--vertical={display === 'vertical'}
>
  <ul class="vote-list__list">
    {#each options as option}
      <li class="vote-list__list-item">
        <Button
          on:click={onSelectVote}
          selected={selectedVote === option}
          disabled={disabled}
          text={option}
        />
      </li>
    {/each}
  </ul>
</div>