import React from 'react';

import { ProductDetails } from '../components';

export default {
  title: 'Forms/ProductDetails',
  component: ProductDetails
};

const Template = (args) => <ProductDetails {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  price: 99.99,
  imageSrc: '',
  title: 'Smart Watch',
  description: 'This is a nice smart watch used to monitor your life',
};
