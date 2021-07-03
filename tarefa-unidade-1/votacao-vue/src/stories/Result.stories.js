import { Result } from '../components';

export default {
  title: 'Molecules/Result',
  component: Result,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Result },
  template: '<result v-bind="$props" />',
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
