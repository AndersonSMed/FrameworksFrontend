<template>
  <div class="result">
    <ol class="result__list">
      <li
        v-for="vote in votes"
        :key="vote.option"
        class="result__list-item"
      >
       {{ getVoteMessage(vote) }}
      </li>
    </ol>
  </div>
</template>

<script>
function calculatePercentage(target, total) {
  return `${((target / total) * 100).toFixed(0)}%`;
}

export default {
  props: {
    votes: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getVoteMessage(vote) {
      const votePercentage = calculatePercentage(vote.count, this.totalVotes);
      return `${vote.option} - ${vote.count} votes (${votePercentage})`;
    },
  },
  computed: {
    totalVotes() {
      return this.votes.reduce((acc, { count }) => acc + count, 0);
    },
  },
};
</script>

<style lang="scss">
@import './Result.scss';
</style>
