<script>
  import VoteList from '../VoteList/VoteList.svelte';
  import Result from '../Result/Result.svelte';

  export let state = 'open';
  export let title = '';
  export let votes = [];

  let previousVotes = null;

  let currentVotes = null;

  function getVotingOptions() {
    return votes.map(item => item.option);
  }

  function onSelectVote(selectedVote) {
    currentVotes = currentVotes.map(
      (item) => (
        item.option === selectedVote
          ? { ...item, count: item.count + 1 }
          : item
      )
    )
  }

  $: {
    if (previousVotes !== votes) {
      currentVotes = votes;
      previousVotes = votes;
      console.log(votes, currentVotes, previousVotes)
    }
  }
</script>

<style lang="scss">
  $selector: '.voting-card';

  #{$selector} {
    background-color: lightblue;
    border: 1px solid blue;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 8px 16px;
    width: 100%;

    &__title {
      margin: 0;
    }

    &__cabinet {
      padding-top: 8px;
    }
  }
</style>

<div class="voting-card">
  {#if state === 'open'}
    <h3 class="voting-card__title">{title}</h3>
    <div class="voting-card__cabinet">
      <VoteList
        options={getVotingOptions()}
        on:vote={onSelectVote}
      />
    </div>
  {:else if state === 'closed'}
    <Result votes={currentVotes} />
  {/if}
</div>