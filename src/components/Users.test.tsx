import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides helpful DOM assertions
import Users from './Users';
import UsersApi from '../api/UsersApi';

// Mock the UsersApi module to return mock data
jest.mock('../api/UsersApi', () => ({
  getUsers: jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) })),
  getUserById: jest.fn((id) =>
    Promise.resolve({ json: () => Promise.resolve({ id, name: 'Test User' }) })
  ),
}));

const mockUsers = [
  {
    name: 'Dr. Yvette Roob',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/713.jpg',
    id: '3',
  },
  {
    name: 'Courtney Padberg',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/599.jpg',
    id: '4',
  },
  {
    name: 'Matt Wehner',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/716.jpg',
    id: '5',
  },
];

describe('Users', () => {
  it('should render UsersMenu and UserCard components', async () => {
    render(<Users />);

    // Ensure UsersMenu is rendered
    expect(await screen.findByTestId('menu')).toBeInTheDocument();

    // Ensure UserCard is rendered (initially empty)
    expect(await screen.findByTestId('user-card')).toBeInTheDocument();
    expect(screen.getByText('Loading user...')).toBeInTheDocument();
  });

  it('should call getUsers when the component mounts', async () => {
    render(<Users />);
    expect(UsersApi.getUsers).toHaveBeenCalledTimes(1);
  });

  it('should load users and display them in the UsersMenu', async () => {
    (UsersApi.getUsers as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers),
    });

    render(<Users />);

    await waitFor(() =>
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument()
    );

    mockUsers.forEach((user) => {
      const userElement = screen.getByText(user.name);
      expect(userElement).toBeInTheDocument();
    });
  });

  it('should load a selected user and display it in the UserCard', async () => {
    const selectedUserId = '4';
    const selectedUser = {
      name: 'Courtney Padberg',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/599.jpg',
      id: '4',
    };
    (UsersApi.getUsers as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers),
    });
    (UsersApi.getUserById as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(selectedUser),
    });

    render(<Users />);

    // Click on the user in the UsersMenu
    const userElement = await screen.findByText(selectedUser.name);
    userElement.click();

    // Ensure the loading state is displayed in the UserCard before the user data loads
    expect(screen.getByText('Loading user...')).toBeInTheDocument();

    // Wait for the user data to be displayed in the UserCard
    await waitFor(() =>
      expect(screen.queryByText('Loading user...')).not.toBeInTheDocument()
    );
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
});
