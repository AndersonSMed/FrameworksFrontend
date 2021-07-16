// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { VoteList, Button } from '../components';

export default {
  title: 'Molecules/VoteList',
  component: VoteList,
  decorators: [
    moduleMetadata({
      declarations: [Button]
    })
  ],
  argTypes: {
    display: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical']
    },
    disabled: { type: 'boolean' }
  }
} as Meta;

const Template: Story<VoteList> = (args: VoteList) => ({
  props: args,
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
