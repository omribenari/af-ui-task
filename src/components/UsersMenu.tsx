import { useState } from 'react';
import { Loader, Menu } from '@mantine/core';
import { MoreIcon } from './MoreIcon';
import { User } from '../api/types';

const UsersMenu = ({
  loading,
  users,
  selectUserCallback,
}: {
  loading: boolean;
  users: Array<User>;
  selectUserCallback: (id: string) => void;
}) => {
  const [opened, setOpened] = useState(false);

  const userSelected = (id: string) => {
    setOpened(false);
    selectUserCallback(id);
  };
  return (
    <Menu width={200} opened={opened} data-testid="menu">
      <Menu.Target>
        <div onClick={() => setOpened((prev) => !prev)}>
          <MoreIcon />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        {loading ? (
          <Loader color="indigo" variant="dots" data-testid="loader" />
        ) : (
          users.map((user) => (
            <Menu.Item key={user.id} onClick={() => userSelected(user.id)}>
              {user.name}
            </Menu.Item>
          ))
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default UsersMenu;
