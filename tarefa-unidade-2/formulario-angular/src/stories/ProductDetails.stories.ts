// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ProductDetails } from '../components';

export default {
  title: 'Examples/ProductDetails',
  component: ProductDetails
} as Meta;

const Template: Story<ProductDetails> = (args: ProductDetails) => ({
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  price: 99.99,
  imageSrc: 'https://images-americanas.b2w.io/produtos/180303340/imagens/iwo-8-lite-prata-relogio-smartwatch-bluetooth-notificacoes-para-ios-e-android/180303340_1_large.jpg',
  title: 'Smart Watch',
  description: 'This is a nice smart watch used to monitor your life',
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  price: 2000,
  imageSrc: '',
  title: 'Freezer',
      description: 'This is a freezer to keep your foods cold',
};
