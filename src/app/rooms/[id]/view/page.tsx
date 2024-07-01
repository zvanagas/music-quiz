'use client';

import { RoomView } from '@/components/room-view';
import { SocketProvider } from '@/contexts/socket-provider';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';

type Params = {
  id: string;
};

export default function RoomViewWithSocket({ params }: { params: Params }) {
  const [user] = useSessionStorage('user');
  const roomId = params.id;

  if (!roomId) {
    return null;
  }

  return (
    <SocketProvider id={roomId} user={user} type="admin">
      <RoomView roomId={roomId} />
    </SocketProvider>
  );
}
