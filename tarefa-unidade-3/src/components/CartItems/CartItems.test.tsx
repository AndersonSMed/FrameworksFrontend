import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartItems from './CartItems';

const renderComponent = (props = {}) => {
  const items = [
    {
      title: 'Sample Item',
      productId: '869c6d8f-1174-462f-bf31-5204c8e7f9ee',
      quantity: 5,
      price: 8,
    },
    {
      title: 'Another Sample Item',
      productId: '7480f3cb-6de9-4b81-b514-544a3117cb86',
      quantity: 10,
      price: 5,
    },
  ];

  return render(<CartItems items={items} {...props} />);
};

it('Renders correctly', () => {
  const { getByText, getByRole } = renderComponent();

  expect(getByText('2')).toBeVisible();
  expect(getByRole('button', { name: 'Open cart' })).toBeVisible();
});

it('Shows empty message when there are no items', () => {
  const { getByText, getByRole } = renderComponent({ items: [] });

  act(() => {
    userEvent.click(getByRole('button', { name: 'Open cart' }));
  });

  expect(getByText('There are no items on cart')).toBeVisible();
});

it('Shows correct values after opening cart', () => {
  const { getByText, getByRole } = renderComponent();

  act(() => {
    userEvent.click(getByRole('button', { name: 'Open cart' }));
  });

  expect(getByText('Sample Item')).toBeVisible();
  expect(getByText('Total: 5')).toBeVisible();
  expect(getByText('R$40.00')).toBeVisible();
  expect(getByText('Another Sample Item')).toBeVisible();
  expect(getByText('Total: 10')).toBeVisible();
  expect(getByText('R$50.00')).toBeVisible();
});

it('Should add handler with correct values after clicked on add item', () => {
  const onChange = jest.fn();
  const { getByRole } = renderComponent({ onChange });

  act(() => {
    userEvent.click(getByRole('button', { name: 'Open cart' }));
  });

  act(() => {
    userEvent.click(getByRole('button', { name: 'Add one more Sample Item' }));
  });

  expect(onChange).toBeCalledWith('add', '869c6d8f-1174-462f-bf31-5204c8e7f9ee');
});

it('Should add handler with correct values after clicked on remove item', () => {
  const onChange = jest.fn();
  const { getByRole } = renderComponent({ onChange });

  act(() => {
    userEvent.click(getByRole('button', { name: 'Open cart' }));
  });

  act(() => {
    userEvent.click(getByRole('button', { name: 'Remove one Sample Item' }));
  });

  expect(onChange).toBeCalledWith('remove', '869c6d8f-1174-462f-bf31-5204c8e7f9ee');
});

it('Should add handler with correct values after clicked on delete item', () => {
  const onChange = jest.fn();
  const { getByRole } = renderComponent({ onChange });

  act(() => {
    userEvent.click(getByRole('button', { name: 'Open cart' }));
  });

  act(() => {
    userEvent.click(getByRole('button', { name: 'Delete Sample Item from list' }));
  });

  expect(onChange).toBeCalledWith('delete', '869c6d8f-1174-462f-bf31-5204c8e7f9ee');
});
