import { act, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import store from '../../store';
import Home from './Home';

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
              outOfStock: true,
            },
          },
        ],
      },
    }),
}));

const renderComponent = () => {
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

  act(() => {
    fireEvent.change(getByPlaceholderText('Search for product'), { target: { value: 'ano' } });
  });

  expect(getByText('Another Sample Product')).toBeVisible();
  expect(queryByText('Sample Product')).toBeNull();

  act(() => {
    userEvent.click(getByRole('button', { name: 'Clear Search Field' }));
  });

  expect(getByText('Sample Product')).toBeVisible();
  expect(getByText('Another Sample Product')).toBeVisible();
});
