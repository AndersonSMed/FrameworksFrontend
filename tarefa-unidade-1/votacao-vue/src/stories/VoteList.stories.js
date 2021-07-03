import { VoteList } from '../components';

export default {
  title: 'Molecules/VoteList',
  component: VoteList,
  argTypes: {
    display: { options: ['horizontal', 'vertical'], control: { type: 'radio' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VoteList },
  template: '<vote-list v-bind="$props" />',
});

export const HorizontalList = Template.bind({});
HorizontalList.args = {
  display: 'horizontal',
  disabled: false,
  options: [
    'Yes',
    'No',
    'Maybe',
  ],
};

export const VerticalList = Template.bind({});
VerticalList.args = {
  display: 'vertical',
  disabled: false,
  options: [
    'Yes',
    'No',
    'Maybe',
  ],
};

export const DisabledList = Template.bind({});
DisabledList.args = {
  display: 'horizontal',
  disabled: true,
  options: [
    'Yes',
    'No',
    'Maybe',
  ],
};
