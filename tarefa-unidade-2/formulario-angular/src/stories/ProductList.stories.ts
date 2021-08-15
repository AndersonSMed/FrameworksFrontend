// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule }   from '@angular/forms';
import { ProductList, EditableProduct, ProductDetails, ProductForm } from '../components';

export default {
  title: 'Examples/ProductList',
  component: ProductList,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [
        EditableProduct,
        ProductDetails,
        ProductForm
      ]
    })
  ],
  argTypes: {
    products: { control: { type: 'object' } },
  }
} as Meta;

const Template: Story<ProductList> = (args: ProductList) => ({
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  products: [
    {
      price: 100,
      imageSrc: 'https://images-americanas.b2w.io/produtos/180303340/imagens/iwo-8-lite-prata-relogio-smartwatch-bluetooth-notificacoes-para-ios-e-android/180303340_1_large.jpg',
      title: 'Smart Watch',
      description: 'This is a nice smart watch used to monitor your life',
    },
    {
      price: 2000,
      imageSrc: 'https://electrolux.vteximg.com.br/arquivos/ids/209554-1000-1000/Freezer_H330_Perspective_Electrolux_Frente.jpg?v=637570529605830000',
      title: 'Freezer',
      description: 'This is a freezer to keep your foods cold',
    }
  ]
};