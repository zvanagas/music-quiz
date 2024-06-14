'use client';

import { SocketProvider } from '@/contexts/socket-provider';
import { Admin } from '@/components/admin';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { endpoints } from '@/config/endpoints';
import { Box } from '@chakra-ui/react';

const AdminWithSocket = () => {
  const [user] = useSessionStorage('user');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const roomId = router.query.id;

  useEffect(() => {
    if (!roomId) {
      router.push('/admin');
      return;
    }

    setIsLoading(true);

    async function loadRoom() {
      try {
        const room = await fetch(`${endpoints.rooms}/${roomId}`);

        if (!room.ok) {
          router.push('/admin');
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadRoom();
  }, [roomId, router]);

  if (!roomId) {
    return null;
  }

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <SocketProvider
      id={Array.isArray(roomId) ? roomId[0] : roomId}
      user={user}
      type="admin"
    >
      <Admin />
    </SocketProvider>
  );
};

export default AdminWithSocket;
