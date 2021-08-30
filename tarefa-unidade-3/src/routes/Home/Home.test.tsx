import { act, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import store from '../../store';
import Home from './Home';

jest.mock('axios', () => ({
  get: () =>
    Promise.resolve({
      data: {
        records: [
          {
            id: 'recNzHfKPd44H4Mvm',
            fields: {
              title: 'Sample Product',
              price: 100.1,
              outOfStock: false,
            },
          },
          {
            id: 'recNzHfKPd4431Mvg',
            fields: {
              title: 'Another Sample Product',
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
  const { findByText, getByText } = renderComponent();

  expect(await findByText('Sample Product')).toBeVisible();
  expect(getByText('R$100.10')).toBeVisible();
  expect(getByText('Another Sample Product')).toBeVisible();
  expect(getByText('R$1,000.10')).toBeVisible();
});

it('Should show correct products after search', async () => {
  const { findByText, getByPlaceholderText, getByRole, getByText, queryByText } = renderComponent();

  await findByText('Sample Product');

  act(() => {
    userEvent.type(getByPlaceholderText('Search for product'), 'ano');
  });

  await waitFor(async () => {
    expect(getByText('Another Sample Product')).toBeVisible();
    expect(queryByText('Sample Product')).toBeNull();
  });

  act(() => {
    userEvent.click(getByRole('button', { name: 'Clear Search Field' }));
  });

  expect(getByText('Sample Product')).toBeVisible();
  expect(getByText('Another Sample Product')).toBeVisible();
});
