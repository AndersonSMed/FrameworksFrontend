import { VotingCard } from '../components';

export default {
  title: 'Organisms/VotingCard',
  component: VotingCard,
  argTypes: {
    state: { options: ['open', 'closed'], control: { type: 'radio' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VotingCard },
  template: '<voting-card v-bind="$props" />',
});

export const OpenVotingCard = Template.bind({});
OpenVotingCard.args = {
  title: 'Is this the real life?',
  state: 'open',
  votes: [
    {
      option: 'Yes',
      count: 30,
    },
    {
      option: 'No',
      count: 1,
    },
    {
      option: 'I do not know :(',
      count: 10,
    },
  ],
};

export const ClosedVotingCard = Template.bind({});
ClosedVotingCard.args = {
  title: 'Is this the real life?',
  state: 'closed',
  votes: [
    {
      option: 'Yes',
      count: 30,
    },
    {
      option: 'No',
      count: 1,
    },
    {
      option: 'I do not know :(',
      count: 10,
    },
  ],
};
