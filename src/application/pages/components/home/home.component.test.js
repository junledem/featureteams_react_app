import React from 'react';
import { render } from '@testing-library/react';
import HomeComponent from './home.component';

test('renders learn react link', () => {
  const { getByText } = render(<HomeComponent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
