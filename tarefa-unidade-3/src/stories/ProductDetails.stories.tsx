import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProductDetails } from '../components';

export default {
  title: 'Store/ProductDetails',
  component: ProductDetails,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProductDetails>;

const Template: ComponentStory<typeof ProductDetails> = (args) => <ProductDetails {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: 'Basic Product',
};
