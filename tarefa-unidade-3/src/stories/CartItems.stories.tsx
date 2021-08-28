import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CartItems } from '../components';

export default {
  title: 'Store/CartItems',
  component: CartItems,
  argTypes: {
    items: { control: 'object' },
  },
} as ComponentMeta<typeof CartItems>;

const Template: ComponentStory<typeof CartItems> = (args) => <CartItems {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  items: [
    {
      title: 'Sample Item',
      uuid: '869c6d8f-1174-462f-bf31-5204c8e7f9ee',
      quantity: 5,
      price: 8,
    },
    {
      title: 'Another Sample Item',
      uuid: '7480f3cb-6de9-4b81-b514-544a3117cb86',
      quantity: 10,
      price: 5,
    },
  ],
};

export const WithoutItems = Template.bind({});
WithoutItems.args = {
  items: [],
};
