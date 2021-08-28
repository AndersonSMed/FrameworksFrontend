import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

it('Renders correctly', () => {
  const { getByText } = render(<ErrorMessage message="Holly Molly" />);

  expect(getByText('Holly Molly')).toBeVisible();
});
