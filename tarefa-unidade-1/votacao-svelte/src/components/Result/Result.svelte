<script>
  export let votes = [];

  function calculatePercentage(target, total) {
    return `${((target / total) * 100).toFixed(0)}%`;
  }

  function getTotalVotes() {
    return votes.reduce((acc, { count }) => acc + count, 0);
  }

  function getVotePercentage(votesCount) {
    return calculatePercentage(votesCount, getTotalVotes());
  }

  function getVoteMessage(vote) {
    return `${vote.option} - ${vote.count} votes (${getVotePercentage(vote.count)})`;
  }
</script>

<style lang="scss">
  $selector: '.result';

  #{$selector} {
    margin: -4px 0;
    
    &__list {
      margin: 0;
      padding: 0;
      list-style-position: inside;
    }

    &__list-item {
      margin: 4px 0;
    }
  }
</style>

<div class="result">
  <ol class="result__list">
    {#each votes as vote}
      <li class="result__list-item">
        {getVoteMessage(vote)}
      </li>
    {/each}
  </ol>
</div>