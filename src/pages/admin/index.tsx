import { endpoints } from '@/config/endpoints';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AdminLogin = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [_, setUser] = useSessionStorage('user');

  const handleCreate = async () => {
    try {
      const { id } = await fetch(endpoints.rooms, {
        method: 'POST',
        body: JSON.stringify({ name }),
      }).then((response) => response.json());

      setUser(name);
      router.push(`/admin/rooms/${id}`);
    } catch {
      //
    }
  };

  return (
    <Flex flexDir="column" alignItems="center">
      <Text>Welcome to Admin</Text>
      <Input
        borderColor="white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button width="full" colorScheme="blue" mt="4" onClick={handleCreate}>
        Create room
      </Button>
    </Flex>
  );
};

export default AdminLogin;
