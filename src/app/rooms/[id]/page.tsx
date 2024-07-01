'use client';

import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { SocketProvider } from '@/contexts/socket-provider';
import { Play } from '@/components/play';

type Params = {
  id: string;
};

export default function PlayWithSocket({ params }: { params: Params }) {
  const [user] = useSessionStorage('user');

  if (!params.id) {
    return null;
  }

  return (
    <SocketProvider id={params.id} user={user} type="user">
      <Play />
    </SocketProvider>
  );
}
