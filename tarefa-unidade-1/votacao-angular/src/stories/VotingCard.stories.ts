// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { VotingCard, VoteList, Result, Button } from '../components';

export default {
  title: 'Organisms/VotingCard',
  component: VotingCard,
  decorators: [
    moduleMetadata({
      declarations: [
        VoteList,
        Result,
        Button
      ]
    })
  ],
  argTypes: {
    title: { control: { type: "text" } },
    state: {
      control: { type: 'radio' },
      options: ['open', 'closed']
    }
  }
} as Meta;

const Template: Story<VotingCard> = (args: VotingCard) => ({
  props: args,
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
