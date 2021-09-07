import { render } from '@testing-library/react';
import Spinner from './Spinner';

it('Renders correctly', () => {
  const { getByRole } = render(<Spinner />);

  expect(getByRole('img', { name: 'Loading' })).toBeVisible();
});
