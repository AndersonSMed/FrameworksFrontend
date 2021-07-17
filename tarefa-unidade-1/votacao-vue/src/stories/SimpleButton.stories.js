import { SimpleButton } from '../components';

export default {
  title: 'Atoms/SimpleButton',
  component: SimpleButton,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SimpleButton },
  template: '<simple-button v-bind="$props" />',
});

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
