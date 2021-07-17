// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Button } from '../components';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    text: { control: { type: 'text' } },
    selected: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } }
  }
} as Meta;

const Template: Story<Button> = (args: Button) => ({
  props: args,
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

