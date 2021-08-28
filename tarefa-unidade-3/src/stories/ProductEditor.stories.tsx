import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProductEditor } from '../components/ProductEditor/ProductEditor';

export default {
  title: 'Store/ProductEditor',
  component: ProductEditor,
  argTypes: {},
} as ComponentMeta<typeof ProductEditor>;

const Template: ComponentStory<typeof ProductEditor> = (args) => <ProductEditor {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
