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
  @import './VoteList.scss';
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