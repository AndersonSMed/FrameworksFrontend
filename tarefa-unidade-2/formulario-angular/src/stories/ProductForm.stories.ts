// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { ProductForm } from '../components';
import { FormsModule }   from '@angular/forms';

export default {
  title: 'Examples/ProductForm',
  component: ProductForm,
  decorators: [
    moduleMetadata({
      imports: [FormsModule]
    })
  ],
  argTypes: {
    price: { control: { type: 'number' } },
    imageSrc: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
  }
} as Meta;

const Template: Story<ProductForm> = (args: ProductForm) => ({
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  price: 99.99,
  imageSrc: 'https://images-americanas.b2w.io/produtos/180303340/imagens/iwo-8-lite-prata-relogio-smartwatch-bluetooth-notificacoes-para-ios-e-android/180303340_1_large.jpg',
  title: 'Smart Watch',
  description: 'This is a nice smart watch used to monitor your life'
};

