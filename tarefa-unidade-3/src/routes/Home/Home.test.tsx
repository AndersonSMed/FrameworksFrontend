import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
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
