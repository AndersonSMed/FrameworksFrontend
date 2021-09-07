import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import Home from './Home';
import homeSlice from '../../store/slices/homeSlice';

jest.mock('axios', () => ({
  defaults: {},
  get: () =>
    Promise.resolve({
      data: {
        records: [
          {
            id: 'recNzHfKPd44H4Mvm',
            fields: {
              title: 'Sample Product',
              description: 'Sample Product Description',
              imageLabel: '',
              imageSrc: '',
              price: 100.1,
              outOfStock: false,
            },
          },
          {
            id: 'recNzHfKPd4431Mvg',
            fields: {
              title: 'Another Sample Product',
              description: 'Another Sample Product Description',
              imageLabel: '',
              imageSrc: '',
              price: 1000.1,
              outOfStock: false,
            },
          },
        ],
      },
    }),
}));

const renderComponent = () => {
  const store = configureStore({
    reducer: { home: homeSlice },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
};

it('Renders correctly', async () => {
  const { findByText, getByText, getByRole } = renderComponent();

  expect(await findByText('Sample Product')).toBeVisible();
  expect(getByText('R$100.10')).toBeVisible();
  expect(getByText('Another Sample Product')).toBeVisible();
  expect(getByText('R$1,000.10')).toBeVisible();
  expect(getByRole('button', { name: 'Go to admin page' })).toBeVisible();
  expect(getByRole('button', { name: 'Open cart' })).toBeVisible();
});

it('Should show correct products after search', async () => {
  const { findByText, getByPlaceholderText, getByRole, getByText, queryByText } = renderComponent();

  await findByText('Sample Product');

  fireEvent.change(getByPlaceholderText('Search for product'), { target: { value: 'ano' } });

  expect(getByText('Another Sample Product')).toBeVisible();
  expect(queryByText('Sample Product')).toBeNull();

  userEvent.click(getByRole('button', { name: 'Clear Search Field' }));

  expect(getByText('Sample Product')).toBeVisible();
  expect(getByText('Another Sample Product')).toBeVisible();
});

it('Should add products to cart', async () => {
  const { findAllByRole, getByRole } = renderComponent();

  const productButtons = await findAllByRole('button', { name: 'Add to Cart' });

  expect(productButtons.length).toEqual(2);

  userEvent.click(productButtons[0]);
  userEvent.click(productButtons[1]);
  userEvent.click(getByRole('button', { name: 'Open cart' }));

  expect(getByRole('button', { name: 'Add one more Sample Product' })).toBeVisible();
  expect(getByRole('button', { name: 'Add one more Another Sample Product' })).toBeVisible();
});

it('Should change cart products', async () => {
  const { findAllByRole, getByRole, queryByRole, getByText } = renderComponent();

  const productButtons = await findAllByRole('button', { name: 'Add to Cart' });

  expect(productButtons.length).toEqual(2);

  userEvent.click(productButtons[0]);
  userEvent.click(productButtons[1]);
  userEvent.click(getByRole('button', { name: 'Open cart' }));

  // Adding 6 more products to cart
  userEvent.click(getByRole('button', { name: 'Add one more Sample Product' }));
  userEvent.click(getByRole('button', { name: 'Add one more Sample Product' }));
  userEvent.click(getByRole('button', { name: 'Add one more Sample Product' }));
  userEvent.click(getByRole('button', { name: 'Add one more Sample Product' }));
  userEvent.click(getByRole('button', { name: 'Add one more Sample Product' }));
  userEvent.click(getByRole('button', { name: 'Add one more Sample Product' }));

  expect(getByText('Total: 7')).toBeVisible();
  expect(getByText('R$700.70')).toBeVisible();

  // Removing 4 products from cart
  userEvent.click(getByRole('button', { name: 'Remove one Sample Product' }));
  userEvent.click(getByRole('button', { name: 'Remove one Sample Product' }));
  userEvent.click(getByRole('button', { name: 'Remove one Sample Product' }));
  userEvent.click(getByRole('button', { name: 'Remove one Sample Product' }));

  expect(getByText('Total: 3')).toBeVisible();
  expect(getByText('R$300.30')).toBeVisible();

  // Removing all products from cart
  userEvent.click(getByRole('button', { name: 'Delete Sample Product from cart' }));
  userEvent.click(getByRole('button', { name: 'Remove one Another Sample Product' }));

  expect(queryByRole('button', { name: 'Add one more Sample Product' })).toBeNull();
  expect(queryByRole('button', { name: 'Add one more Another Sample Product' })).toBeNull();
});
