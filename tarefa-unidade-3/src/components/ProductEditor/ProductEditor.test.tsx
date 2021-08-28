import { render, RenderResult, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { ProductEditor } from './ProductEditor';

const renderComponent = async (props = {}) => {
  let methods = {};

  await act(async () => {
    const renderMethods = render(<ProductEditor {...props} />);
    methods = { ...renderMethods };
  });

  return methods as RenderResult;
};

it('Renders correctly without initial values', async () => {
  const { getByLabelText, getByRole } = await renderComponent();

  expect(getByLabelText('Title')).toHaveValue('');
  expect(getByLabelText('Description')).toHaveValue('');
  expect(getByLabelText('Price')).toHaveValue(0);
  expect(getByLabelText('Image URL')).toHaveValue('');
  expect(getByLabelText('Image Description')).toHaveValue('');
  expect(getByLabelText('Is Out of Stock?')).not.toBeChecked();
  expect(getByRole('button')).toBeDisabled();
});

it('Renders correctly with initial values', async () => {
  const initialValues = {
    title: 'Smart Watch',
    description: 'This is a nice smart watch used to monitor things',
    price: 300.0,
    imageSrc: 'file://smartwatch.jpg',
    imageLabel: 'Smart watch floating on screen',
    outOfStock: true
  }

  const { getByLabelText, getByRole } = await renderComponent({ initialValues });

  expect(getByLabelText('Title')).toHaveValue(initialValues.title);
  expect(getByLabelText('Description')).toHaveValue(initialValues.description);
  expect(getByLabelText('Price')).toHaveValue(initialValues.price);
  expect(getByLabelText('Image URL')).toHaveValue(initialValues.imageSrc);
  expect(getByLabelText('Image Description')).toHaveValue(initialValues.imageLabel);
  expect(getByLabelText('Is Out of Stock?')).toBeChecked();
  expect(getByRole('button')).toBeEnabled();
});

it('Renders correct title', async () => {
  const { getByText } = await renderComponent({ title: "This is a form" });
  
  expect(getByText('This is a form')).toBeVisible();
});

it('Calls onSubmit handler with correct values', async () => {
  const onSubmit = jest.fn();
  const { getByRole, getByLabelText } = await renderComponent({ onSubmit });

  await act(async () => {
    fireEvent.change(getByLabelText('Title'), { target: { value: 'Product Title' } });
  });

  await act(async () => {
    fireEvent.change(getByLabelText('Description'), { target: { value: 'Product Description' } });
  });

  await act(async () => {
    fireEvent.change(getByLabelText('Price'), { target: { value: '1000' } });
  });

  await act(async () => {
    fireEvent.change(getByLabelText('Image URL'), { target: { value: 'file://product.jpg' } });
  });

  await act(async () => {
    fireEvent.change(getByLabelText('Image Description'), { target: { value: 'A product wrapped in paper' } });
  });

  await act(async () => {
    userEvent.click(getByLabelText('Is Out of Stock?'));
  });

  await act(async () => {
    userEvent.click(getByRole('button'));
  });

  expect(onSubmit).toBeCalledWith({
    title: 'Product Title',
    description: 'Product Description',
    price: 1000,
    imageSrc: 'file://product.jpg',
    imageLabel: 'A product wrapped in paper',
    outOfStock: true
  });
});
