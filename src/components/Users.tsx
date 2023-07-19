import { useQuery, useQueryClient } from '@tanstack/react-query';
import UserCard from './UserCard';
import UsersMenu from './UsersMenu';
import UsersApi from '../api/UsersApi';
import { Stack } from '@mantine/core';
import { User } from '../api/types';
import { useState } from 'react';

const Users = () => {
  const [selectedId, setSelectedId] = useState('');

  const usersRes = useQuery({
    queryKey: ['users'],
    staleTime: 10000, // only eligible to refetch after 10 seconds
    queryFn: async () => {
      const { data } = await UsersApi.getUsers();
      return data as Array<User>;
    },
  });
  const userRes = useQuery({
    queryKey: ['user', selectedId],
    enabled: !!selectedId,
    staleTime: 10000, // only eligible to refetch after 10 seconds
    queryFn: async () => {
      const { data } = await UsersApi.getUserById(selectedId);
      return data as User;
    },
  });

  return (
    <Stack>
      <UsersMenu
        loading={usersRes.isLoading}
        users={usersRes.data}
        selectUserCallback={(id) => setSelectedId(id)}
        data-testid="menu"
      />
      <UserCard
        user={userRes.data}
        loading={userRes.isLoading}
        data-testid="user-card"
      />
    </Stack>
  );
};

export default Users;
