import React from 'react';
import { render } from '@testing-library/react';
import SaveResourceComponent from './save-resource.component';

test('renders learn react link', () => {
  const { getByText } = render(<SaveResourceComponent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
