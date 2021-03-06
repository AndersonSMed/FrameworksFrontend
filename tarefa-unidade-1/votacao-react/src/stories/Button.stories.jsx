import { Button } from '../components';

export default {
  title: 'Atoms/Button',
  component: Button,
};

const Template = (props) => <Button {...props} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  text: 'Default Button',
  selected: false,
  disabled: false,
};

export const SelectedButton = Template.bind({});
SelectedButton.args = {
  text: 'Selected Button',
  selected: true,
  disabled: false,
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  text: 'Disabled Button',
  selected: false,
  disabled: true,
};
