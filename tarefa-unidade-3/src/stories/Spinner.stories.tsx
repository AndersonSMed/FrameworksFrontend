import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Spinner } from '../components';

export default {
  title: 'Store/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = () => <Spinner />;

export const Basic = Template.bind({});
Basic.args = {};
