import { useState } from 'react';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { useRouter } from 'next/router';
import { Button, Flex, Input } from '@chakra-ui/react';
import { Logo } from '@/components/logo';
import { endpoints } from '@/config/endpoints';
import { useToast } from '@/contexts/toast-provider';

const Name = () => {
  const [name, setName] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [_, setUser] = useSessionStorage('user');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { show } = useToast();
  const router = useRouter();

  const join = async () => {
    if (!name.length || !roomId.length) {
      show(!roomId ? 'Room ID is missing!' : 'Name is required!', 'error');
      return;
    }

    setUser(name);
    setIsLoading(true);

    try {
      await fetch(`${endpoints.rooms}/${roomId}`).then((response) => {
        if (response.ok) {
          router.push(`/rooms/${roomId}`);
          return;
        }

        show(
          response.status === 404
            ? 'Room not found'
            : 'Unexpected error happened',
          'error'
        );
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px="10"
      height="full"
    >
      <Logo />
      <p className="mt-10">Room ID</p>
      <Input
        borderColor="white"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <p>Name</p>
      <Input
        borderColor="white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        width="full"
        colorScheme="blue"
        mt="4"
        onClick={join}
        isDisabled={isLoading}
      >
        Join
      </Button>
    </Flex>
  );
};

export default Name;
