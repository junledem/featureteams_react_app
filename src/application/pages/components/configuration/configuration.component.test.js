import React from 'react';
import { render } from '@testing-library/react';
import ConfigurationComponent from './configuration.component';

test('renders learn react link', () => {
  const { getByText } = render(<ConfigurationComponent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
