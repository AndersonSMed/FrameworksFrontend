import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetails from './ProductDetails';

it('Renders correctly', () => {
  const { getByText } = render(<ProductDetails title="Sample Product" description="This is a sample product" price="10.45" />);

  expect(getByText('Sample Product')).toBeVisible();
  expect(getByText('This is a sample product')).toBeVisible();
  expect(getByText('R$10.45')).toBeVisible();
});

it('Renders correctly with numeric price', () => {
  const { getByText } = render(<ProductDetails title="Sample Product" description="This is a sample product" price={10.45} />);

  expect(getByText('Sample Product')).toBeVisible();
  expect(getByText('This is a sample product')).toBeVisible();
  expect(getByText('R$10.45')).toBeVisible();
});

it('Renders with image', () => {
  const { getByRole } = render(<ProductDetails title="Sample Product" description="This is a sample product" price={10.45} imageSrc="file://fancy-image.jpg" imageLabel="fancy image" />);

  expect(getByRole('img', { name: 'fancy image' })).toBeVisible();
});

it('Should call handler after click on add to cart', () => {
  const onAddToCart = jest.fn();
  const { getByRole } = render(<ProductDetails title="Sample Product" description="This is a sample product" price={10.45} onAddToCart={onAddToCart} />);
  
  userEvent.click(getByRole('button', { name: 'Add to Cart' }));
  expect(onAddToCart).toBeCalled();
});
