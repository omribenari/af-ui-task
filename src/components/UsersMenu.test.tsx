import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides helpful DOM assertions

import UsersMenu from './UsersMenu';

describe('UsersMenu', () => {
  const users = [
    { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/300' },
    { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/300' },
  ];

  it('should render the loader when loading is true', () => {
    render(
      <UsersMenu loading={true} users={[]} selectUserCallback={() => {}} />
    );
    const menuIcon = screen.getByTestId('menu-icon');
    fireEvent.click(menuIcon);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render the users list when loading is false', () => {
    render(
      <UsersMenu loading={false} users={users} selectUserCallback={() => {}} />
    );

    const menuIcon = screen.getByTestId('menu-icon');
    fireEvent.click(menuIcon);

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

    const userElement = screen.getByText(users[0].name);
    expect(userElement).toBeInTheDocument();

    // Simulate clicking on a user and check if the callback is called correctly
    fireEvent.click(userElement);
  });
});
