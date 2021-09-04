import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductEditor from '../components/ProductEditor/ProductEditor';

export default {
  title: 'Store/ProductEditor',
  component: ProductEditor,
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    initialValues: { control: 'object' },
  },
} as ComponentMeta<typeof ProductEditor>;

const Template: ComponentStory<typeof ProductEditor> = (args) => <ProductEditor {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  isOpen: true,
  title: 'Creating New Product',
};

export const WithInitialValues = Template.bind({});
WithInitialValues.args = {
  isOpen: true,
  title: 'Editing Product',
  initialValues: {
    title: 'Product Title',
    description: 'Product Description',
    price: 1000,
    imageSrc: 'http://images.test.com/product.jpg',
    imageLabel: 'A product wrapped in paper',
    outOfStock: true,
  },
};
