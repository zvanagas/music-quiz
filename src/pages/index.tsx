import { useState } from 'react';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { useRouter } from 'next/router';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { Logo } from '@/components/logo';

const Name: React.FC = () => {
  const [name, setName] = useState('');
  const [id, setId] = useSessionStorage('id');
  const router = useRouter();

  const join = () => setId(name);

  if (id) {
    router.push('/play');
  }

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px="10"
      height="full"
    >
      <Logo />
      <Text mt="10">Name</Text>
      <Input
        borderColor="white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button width="full" colorScheme="blue" mt="4" onClick={join}>
        Join
      </Button>
    </Flex>
  );
};

export default Name;
