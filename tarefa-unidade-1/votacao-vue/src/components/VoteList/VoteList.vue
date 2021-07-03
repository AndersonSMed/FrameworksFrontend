<template>
  <div :class="{
      'vote-list': true,
      'vote-list--horizontal': display === 'horizontal',
      'vote-list--vertical': display === 'vertical',
    }"
  >
    <ul class="vote-list__list">
      <li v-for="option in options" :key="option" class="vote-list__list-item">
        <simple-button
          :text="option"
          :onClick="onSelectVote(option)"
          :disabled="disabled"
          :selected="selectedVote === option"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SimpleButton from '../SimpleButton/SimpleButton.vue';

export default {
  props: {
    display: {
      type: String,
      default: 'horizontal',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    onVote: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      selectedVote: null,
    };
  },
  methods: {
    onSelectVote(selectedOption) {
      return () => {
        this.onVote(selectedOption);
      };
    },
  },
  components: { SimpleButton },
};
</script>

<style lang="scss">
@import './VoteList.scss';
</style>
