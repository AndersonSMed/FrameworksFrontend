<template>
  <div class="voting-card">
    <template v-if="isVotingEnabled">
      <h3 class="voting-card__title">{{title}}</h3>
      <div class="voting-card__cabinet">
        <vote-list :options="votingOptions" :onVote="onVote" />
      </div>
    </template>
    <template v-else>
      <result :votes="currentVotes" />
    </template>
  </div>
</template>

<script>
import VoteList from '../VoteList/VoteList.vue';
import Result from '../Result/Result.vue';

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: 'open'
    },
    votes: {
      type: Array,
      default: () => []
    }
  },
  data: function() {
    return {
      currentVotes: this.votes
    }
  },
  methods: {
    onVote: function(selectedOption) {
      this.currentVotes = this.currentVotes.map((item) =>
        (item.option === selectedOption ? { ...item, count: item.count + 1 } : item)
      )
    }
  },
  computed: {
    isVotingEnabled: function() {
      return this.state === 'open';
    },
    votingOptions: function() {
      return this.votes.map(vote => vote.option);
    }
  },
  components: { VoteList, Result }
}
</script>

<style lang="scss">
@import './VotingCard.scss';
</style>