'use client';

import { SocketProvider } from '@/contexts/socket-provider';
import { Admin } from '@/components/admin';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { endpoints } from '@/config/endpoints';

type Params = {
  id: string;
};

const AdminWithSocket = ({ params }: { params: Params }) => {
  const [user] = useSessionStorage('user');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const roomId = params.id;

  useEffect(() => {
    async function loadRoom() {
      setIsLoading(true);
      try {
        const room = await fetch(`${endpoints.rooms}/${roomId}`);

        if (!room.ok) {
          router.push('/admin');
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (roomId) {
      loadRoom();
    }
  }, [router, roomId]);

  if (!roomId) {
    return null;
  }

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <SocketProvider id={roomId} user={user} type="admin">
      <Admin roomId={roomId} />
    </SocketProvider>
  );
};

export default AdminWithSocket;
