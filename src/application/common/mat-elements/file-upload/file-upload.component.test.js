import React from 'react';
import { render } from '@testing-library/react';
import ProjectDetailComponent from './project-detail.component';

test('renders learn react link', () => {
  const { getByText } = render(<ProjectDetailComponent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
