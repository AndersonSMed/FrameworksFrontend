import React from 'react';
import { ProductForm } from '../components';

export default {
  title: 'Forms/ProductForm',
  component: ProductForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <ProductForm {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
