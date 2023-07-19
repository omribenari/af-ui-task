import { Avatar, Loader, Paper, Text } from '@mantine/core';
import { User } from '../api/types';

const UserCard = ({
  user,
  loading,
}: {
  user: User | undefined;
  loading: boolean;
}) => {
  if (!user) return null;
  return loading ? (
    <Loader color="indigo" variant="dots" data-testid="loader" />
  ) : (
    <Paper radius="md" withBorder p="lg" data-testid="user-card">
      <Avatar src={user.avatar} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {user.name}
      </Text>
    </Paper>
  );
};

export default UserCard;
