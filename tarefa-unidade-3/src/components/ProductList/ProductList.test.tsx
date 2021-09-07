import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductList from './ProductList';

const renderComponent = (props = {}) => {
  const items = [
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
  ];

  return render(<ProductList items={items} {...props} />);
};

it('Renders correctly', () => {
  const { getByText } = renderComponent();

  expect(getByText('Iwo 8 lite smartwatch')).toBeVisible();
  expect(getByText('Cooler')).toBeVisible();
});

it('Should call handler with correct values', () => {
  const onAddToCart = jest.fn();
  const { queryAllByRole } = renderComponent({ onAddToCart });

  const buttons = queryAllByRole('button', { name: 'Add to Cart' });

  expect(buttons.length).toBe(2);

  act(() => {
    userEvent.click(buttons[0]);
  });

  expect(onAddToCart).toBeCalledWith('869c6d8f-1174-462f-bf31-5204c8e7f9ee');
});

it('Should show empty message when there are no items', () => {
  const { getByText } = renderComponent({ items: [] });

  expect(getByText('No products were found')).toBeVisible();
});
