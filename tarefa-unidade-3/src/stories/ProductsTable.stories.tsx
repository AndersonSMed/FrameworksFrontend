import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProductsTable } from '../components';

export default {
  title: 'Store/ProductsTable',
  component: ProductsTable,
  argTypes: {
    isLoading: { control: 'boolean' },
    items: { control: 'object' },
  },
} as ComponentMeta<typeof ProductsTable>;

const Template: ComponentStory<typeof ProductsTable> = (args) => <ProductsTable {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  isLoading: false,
  items: [
    {
      productId: '869c6d8f-1174-462f-bf31-5204c8e7f9ee',
      title: 'Iwo 8 lite smartwatch',
      description: 'This is a Iwo 8 lite smartwatch',
      price: 300.0,
      imageSrc:
        'https://images-americanas.b2w.io/produtos/180303340/imagens/iwo-8-lite-prata-relogio-smartwatch-bluetooth-notificacoes-para-ios-e-android/180303340_1_large.jpg',
      imageLabel: 'Iwo 8 lite smartwatch',
      outOfStock: false,
    },
    {
      productId: '7480f3cb-6de9-4b81-b514-544a3117cb86',
      title: 'Cooler',
      description: 'This is a Cooler',
      price: 2000.0,
      outOfStock: true,
    },
  ],
};

export const WithoutItems = Template.bind({});
WithoutItems.args = {
  isLoading: false,
  items: [],
};
