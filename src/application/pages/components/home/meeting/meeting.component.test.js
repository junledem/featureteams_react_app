import React from 'react';
import { render } from '@testing-library/react';
import MeetingComponent from './meeting.component';

test('renders learn react link', () => {
  const { getByText } = render(<MeetingComponent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
