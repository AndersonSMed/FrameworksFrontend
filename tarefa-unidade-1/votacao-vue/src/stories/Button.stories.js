import { SimpleButton } from '../components';

export default {
  title: 'Atoms/SimpleButton',
  component: SimpleButton,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  //   size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  // },
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
  text: 'Selected Button',
  selected: false,
  disabled: true,
};

