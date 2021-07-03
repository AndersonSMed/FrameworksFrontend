import { Button } from '../components';

export default {
  title: 'Atoms/Button',
  component: Button
};

const Template = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  text: 'Default Button',
  selected: false,
  disabled: false
};

export const SelectedButton = Template.bind({});
SelectedButton.args = {
  text: 'Selected Button',
  selected: true,
  disabled: false
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  text: 'Selected Button',
  selected: false,
  disabled: true
};
