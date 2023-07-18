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
      <UsersMenu loading={true} users={users} selectUserCallback={() => {}} />
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render the users list when loading is false', () => {
    render(
      <UsersMenu loading={false} users={users} selectUserCallback={() => {}} />
    );
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

    users.forEach((user) => {
      const userElement = screen.getByText(user.name);
      expect(userElement).toBeInTheDocument();

      // Simulate clicking on a user and check if the callback is called correctly
      fireEvent.click(userElement);
      expect(screen.getByTestId('menu')).toHaveAttribute('opened', 'false');
    });
  });

  it('should toggle the menu when the target element is clicked', () => {
    render(
      <UsersMenu loading={false} users={users} selectUserCallback={() => {}} />
    );

    const targetElement = screen.getByTestId('target-element');
    const menuElement = screen.getByTestId('menu');

    expect(menuElement).toHaveAttribute('opened', 'false');

    fireEvent.click(targetElement);
    expect(menuElement).toHaveAttribute('opened', 'true');

    fireEvent.click(targetElement);
    expect(menuElement).toHaveAttribute('opened', 'false');
  });
});
