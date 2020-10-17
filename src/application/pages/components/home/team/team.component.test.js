import React from 'react';
import { render } from '@testing-library/react';
import TeamComponent from './team.component';

test('renders learn react link', () => {
  const { getByText } = render(<TeamComponent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
