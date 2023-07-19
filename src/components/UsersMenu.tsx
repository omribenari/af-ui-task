import { useState } from 'react';
import { Box, Flex, Loader, Menu } from '@mantine/core';
import { MoreIcon } from './MoreIcon';
import { User } from '../api/types';

const UsersMenu = ({
  loading,
  users,
  selectUserCallback,
}: {
  loading: boolean;
  users: Array<User> | undefined;
  selectUserCallback: (id: string) => void;
}) => {
  const [opened, setOpened] = useState(false);

  const userSelected = (id: string) => {
    setOpened(false);
    selectUserCallback(id);
  };
  return (
    <Flex justify="flex-start" align="flex-start" direction="row-reverse">
      <Menu position="bottom-end" offset={0} opened={opened} data-testid="menu">
        <Menu.Target>
          <Box
            onClick={() => setOpened((prev) => !prev)}
            sx={{ backgroundColor: '#2c2f3a', lineHeight: 1 }}
          >
            <MoreIcon size={30} data-testid="menu-icon" />
          </Box>
        </Menu.Target>

        <Menu.Dropdown
          sx={{
            backgroundColor: '#2c2f3a',
            border: 'none',
            borderRadius: 0,
            padding: 0,
            margin: 0,
          }}
        >
          {loading ? (
            <Loader color="indigo" variant="dots" data-testid="loader" />
          ) : (
            users?.map((user) => (
              <Menu.Item
                key={user.id}
                onClick={() => userSelected(user.id)}
                sx={{
                  border: 'none',
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: '#0154a8',
                  },
                }}
              >
                {user.name}
              </Menu.Item>
            ))
          )}
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default UsersMenu;
