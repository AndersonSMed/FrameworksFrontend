import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProductDetails } from '../components';

export default {
  title: 'Store/ProductDetails',
  component: ProductDetails,
  argTypes: {
    price: { control: 'number' },
  },
} as ComponentMeta<typeof ProductDetails>;

const Template: ComponentStory<typeof ProductDetails> = (args) => <ProductDetails {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: 'Basic Product',
  description: 'This is a basic product',
  price: 100.00
};
