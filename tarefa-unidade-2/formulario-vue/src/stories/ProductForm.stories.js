import { ProductForm } from '../components';

export default {
  title: 'Examples/ProductForm',
  component: ProductForm,
  argTypes: {
    price: { control: { type: 'number' } },
    imageSrc: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
  }
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ProductForm },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<product-form v-bind="args" />',
});

export const Basic = Template.bind({});
Basic.args = {
  price: 99.99,
  imageSrc: 'https://images-americanas.b2w.io/produtos/180303340/imagens/iwo-8-lite-prata-relogio-smartwatch-bluetooth-notificacoes-para-ios-e-android/180303340_1_large.jpg',
  title: 'Smart Watch',
  description: 'This is a nice smart watch used to monitor your life'
};
