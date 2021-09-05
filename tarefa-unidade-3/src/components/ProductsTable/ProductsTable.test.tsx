import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsTable from './ProductsTable';

const renderComponent = (props = {}) => {
  const items = [
    {
      uuid: '869c6d8f-1174-462f-bf31-5204c8e7f9ee',
      title: 'Iwo 8 lite smartwatch',
      description: 'This is a Iwo 8 lite smartwatch',
      price: 300.0,
      imageSrc:
        'https://images-americanas.b2w.io/produtos/180303340/imagens/iwo-8-lite-prata-relogio-smartwatch-bluetooth-notificacoes-para-ios-e-android/180303340_1_large.jpg',
      imageLabel: 'Image of an Iwo 8 lite smartwatch',
      outOfStock: false,
    },
    {
      uuid: '7480f3cb-6de9-4b81-b514-544a3117cb86',
      title: 'Cooler',
      description: 'This is a Cooler',
      price: 2000.0,
      outOfStock: true,
    },
  ];

  return render(<ProductsTable items={items} {...props} />);
};

it('Renders correctly', () => {
  const { getByText, getByRole } = renderComponent();

  expect(getByText('Iwo 8 lite smartwatch')).toBeVisible();
  expect(getByText('This is a Iwo 8 lite smartwatch')).toBeVisible();
  expect(getByText('R$300.00')).toBeVisible();
  expect(
    getByText(
      'https://images-americanas.b2w.io/produtos/180303340/imagens/iwo-8-lite-prata-relogio-smartwatch-bluetooth-notificacoes-para-ios-e-android/180303340_1_large.jpg'
    )
  ).toBeVisible();
  expect(
    getByRole('img', { name: 'Product Iwo 8 lite smartwatch is not out of stock' })
  ).toBeVisible();
  expect(getByRole('button', { name: 'Edit Iwo 8 lite smartwatch' })).toBeVisible();
  expect(getByRole('button', { name: 'Delete Iwo 8 lite smartwatch' })).toBeVisible();

  expect(getByText('Cooler')).toBeVisible();
  expect(getByText('This is a Cooler')).toBeVisible();
  expect(getByText('R$2,000.00')).toBeVisible();
  expect(getByRole('img', { name: 'Product Cooler is out of stock' })).toBeVisible();
  expect(getByRole('button', { name: 'Edit Cooler' })).toBeVisible();
  expect(getByRole('button', { name: 'Delete Cooler' })).toBeVisible();
});

it('Should show message when there are no items', () => {
  const { getByText } = renderComponent({ items: [] });

  expect(getByText('No products were found')).toBeVisible();
});

it('Should show modal when clicking on edit action', async () => {
  const { getByRole, getByLabelText, getByText } = renderComponent();

  await act(async () => {
    userEvent.click(getByRole('button', { name: 'Edit Cooler' }));
  });

  expect(getByText('Editing Cooler')).toBeVisible();
  expect(getByLabelText('Title')).toHaveValue('Cooler');
  expect(getByLabelText('Description')).toHaveValue('This is a Cooler');
  expect(getByLabelText('Price')).toHaveValue(2000);
  expect(getByLabelText('Is Out of Stock?')).toBeChecked();

  userEvent.click(getByRole('button', { name: 'Close Editor' }));

  expect(getByText('Editing Cooler')).not.toBeVisible();
});

it('Should call handler after editing a product', async () => {
  const onEdit = jest.fn();
  const { getByRole, getByLabelText, getByText } = renderComponent({ onEdit });

  await act(async () => {
    userEvent.click(getByRole('button', { name: 'Edit Cooler' }));
  });

  await act(async () => {
    fireEvent.change(getByLabelText('Description'), {
      target: { value: 'Some test description' },
    });
  });

  await act(async () => {
    userEvent.click(getByRole('button', { name: 'Confirm' }));
  });

  expect(onEdit).toBeCalledWith('7480f3cb-6de9-4b81-b514-544a3117cb86', {
    title: 'Cooler',
    description: 'Some test description',
    price: 2000.0,
    outOfStock: true,
  });

  expect(getByText('Editing Cooler')).not.toBeVisible();
});

it('Should call handler after delete a product', () => {
  const onDelete = jest.fn();
  const { getByRole } = renderComponent({ onDelete });

  userEvent.click(getByRole('button', { name: 'Delete Iwo 8 lite smartwatch' }));

  expect(onDelete).toBeCalledWith('869c6d8f-1174-462f-bf31-5204c8e7f9ee');
});
