import React from 'react';
import { render } from '@testing-library/react';
import DatePicker from './date-picker';

test('renders learn react link', () => {
  const { getByText } = render(<DatePicker />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
