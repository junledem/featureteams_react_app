import React from 'react';
import { render } from '@testing-library/react';
import FeedbackComponent from './feedback.component';

test('renders learn react link', () => {
  const { getByText } = render(<FeedbackComponent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
