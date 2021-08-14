import React from 'react';
import { ProductForm } from '../components';

export default {
  title: 'Examples/ProductForm',
  component: ProductForm
};

const Template = (args) => <ProductForm {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  price: 99.99,
  imageSrc: '',
  title: 'Smart Watch',
  description: 'This is a nice smart watch used to monitor your life',
  onSave: () => {}
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  price: 99.99,
  imageSrc: '',
  title: '',
  description: '',
  onSave: () => {}
};