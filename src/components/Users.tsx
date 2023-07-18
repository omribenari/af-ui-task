import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import UsersMenu from './UsersMenu';
import UsersApi from '../api/UsersApi';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState(null);

  const getUsers = () => {
    setLoadingUsers(true);
    UsersApi.getUsers()
      .then((response) => response.json())
      .then((response) => {
        setLoadingUsers(false);
        setUsers(response);
      });
  };

  const userSelected = (id: string) => {
    setLoadingUser(true);
    UsersApi.getUserById(id)
      .then((response) => response.json())
      .then((response) => {
        setLoadingUser(false);
        setUser(response);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <UsersMenu
        loading={loadingUsers}
        users={users}
        selectUserCallback={userSelected}
        data-testid="menu"
      />
      <UserCard user={user} loading={loadingUser} data-testid="user-card" />
    </div>
  );
};

export default Users;
