import axios from 'axios';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Admin from './Admin';
import { API_URL } from '../../api/products';
import adminSlice from '../../store/slices/adminSlice';

jest.mock('axios', () => ({
  defaults: {},
  post: jest.fn(() => Promise.resolve()),
  put: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
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
  const store = configureStore({
    reducer: { admin: adminSlice },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    </Provider>
  );
};

it('Renders correctly', async () => {
  const { findByText, getByText, getByRole } = renderComponent();

  expect(await findByText('Sample Product')).toBeVisible();
  expect(getByText('Another Sample Product')).toBeVisible();
  expect(getByRole('button', { name: 'Go back to marketplace' })).toBeVisible();
});

it('Should call api with correct values after create product', async () => {
  const { findByText, getByText, getByLabelText, getByRole } = renderComponent();

  await findByText('Sample Product');

  await act(async () => {
    userEvent.click(getByRole('button', { name: 'New Product' }));
  });

  expect(getByText('Creating New Product')).toBeVisible();

  await act(async () => {
    fireEvent.change(getByLabelText('Title'), { target: { value: 'New Product Title' } });
  });

  await act(async () => {
    fireEvent.change(getByLabelText('Description'), {
      target: { value: 'New Product Description' },
    });
  });

  await act(async () => {
    fireEvent.change(getByLabelText('Price'), { target: { value: 3000 } });
  });

  await act(async () => {
    userEvent.click(getByRole('button', { name: 'Confirm' }));
  });

  expect(axios.post).toHaveBeenLastCalledWith(API_URL, {
    records: [
      {
        fields: {
          title: 'New Product Title',
          description: 'New Product Description',
          price: 3000,
          imageLabel: '',
          imageSrc: '',
          outOfStock: false,
        },
      },
    ],
  });
});

it('Should call api with correct values after edition', async () => {
  const { findByRole, getByLabelText, getByRole } = renderComponent();

  await act(async () => {
    userEvent.click(await findByRole('button', { name: 'Edit Sample Product' }));
  });

  await act(async () => {
    fireEvent.change(getByLabelText('Title'), { target: { value: 'New Sample Product Title' } });
  });

  await act(async () => {
    userEvent.click(getByLabelText('Is Out of Stock?'));
  });

  await act(async () => {
    userEvent.click(getByRole('button', { name: 'Confirm' }));
  });

  expect(axios.put).toHaveBeenLastCalledWith(API_URL, {
    records: [
      {
        id: 'recNzHfKPd44H4Mvm',
        fields: {
          title: 'New Sample Product Title',
          description: 'Sample Product Description',
          price: 100.1,
          imageLabel: '',
          imageSrc: '',
          outOfStock: true,
        },
      },
    ],
  });
});

it('Should call api with correct values after deleting it', async () => {
  const { findByRole } = renderComponent();

  await act(async () => {
    userEvent.click(await findByRole('button', { name: 'Delete Sample Product' }));
  });

  expect(axios.delete).toHaveBeenLastCalledWith(API_URL, {
    params: { records: ['recNzHfKPd44H4Mvm'] },
  });
});
