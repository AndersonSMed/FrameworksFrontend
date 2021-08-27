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
  title: 'Iwo 8 lite smartwatch',
  description: 'This is a Iwo 8 lite smartwatch',
  price: 300.00,
  imageSrc: 'https://images-americanas.b2w.io/produtos/180303340/imagens/iwo-8-lite-prata-relogio-smartwatch-bluetooth-notificacoes-para-ios-e-android/180303340_1_large.jpg',
  imageLabel: 'Iwo 8 lite smartwatch'
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  title: 'Iwo 8 lite smartwatch',
  description: 'This is a Iwo 8 lite smartwatch',
  price: 300.00
};
