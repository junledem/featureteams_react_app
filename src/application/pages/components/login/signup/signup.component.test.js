import React from 'react';
import { render } from '@testing-library/react';
import SignupComponent from './signup.component';

test('renders learn react link', () => {
  const { getByText } = render(<SignupComponent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
