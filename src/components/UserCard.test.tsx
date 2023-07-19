import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides helpful DOM assertions
import UserCard from './UserCard';

describe('UserCard', () => {
  const user = {
    id: '1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
  };

  it('should render the loader when loading is true', () => {
    render(<UserCard user={user} loading={true} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render the user information when loading is false and user is provided', () => {
    render(<UserCard user={user} loading={false} />);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it('should return undefined when no user is provided', () => {
    render(<UserCard user={undefined} loading={false} />);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByText(user.name)).not.toBeInTheDocument();
  });
});
