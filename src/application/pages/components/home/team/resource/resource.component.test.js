import React from 'react';
import { render } from '@testing-library/react';
import ResourceComponent from './resource.component';

test('renders learn react link', () => {
  const { getByText } = render(<ResourceComponent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
