import { Result } from '../components';

export default {
  title: 'Molecules/Result',
  component: Result
};

const Template = (args) => <Result {...args} />;

export const DefaultResult = Template.bind({});
DefaultResult.args = {
  votes: [
    {
      option: "Yes",
      count: 60
    },
    {
      option: "Maybe",
      count: 15
    },
    {
      option: "No",
      count: 30
    }
  ]
};
