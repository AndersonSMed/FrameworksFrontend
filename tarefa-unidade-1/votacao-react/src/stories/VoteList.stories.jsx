import { VoteList } from '../components';

export default {
  title: 'Molecules/VoteList',
  component: VoteList
};

const Template = (args) => <VoteList {...args} />;

export const HorizontalList = Template.bind({});
HorizontalList.args = {
  display: 'horizontal',
  disabled: false,
  options: [
    'Yes',
    'No',
    'Maybe'
  ]
};

export const VerticalList = Template.bind({});
VerticalList.args = {
  display: 'vertical',
  disabled: false,
  options: [
    'Yes',
    'No',
    'Maybe'
  ]
};

export const DisabledList = Template.bind({});
DisabledList.args = {
  display: 'horizontal',
  disabled: true,
  options: [
    'Yes',
    'No',
    'Maybe'
  ]
};
