// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Result } from '../components';

export default {
  title: 'Molecules/Result',
  component: Result
} as Meta;

const Template: Story<Result> = (args: Result) => ({
  props: args,
});

export const DefaultResult = Template.bind({});
DefaultResult.args = {
  votes: [
    {
      option: 'Yes',
      count: 60,
    },
    {
      option: 'Maybe',
      count: 15,
    },
    {
      option: 'No',
      count: 30,
    },
  ],
};

