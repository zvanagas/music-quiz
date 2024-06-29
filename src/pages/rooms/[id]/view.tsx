import { RoomView } from '@/components/room-view';
import { SocketProvider } from '@/contexts/socket-provider';
import { useAdmin } from '@/hooks/use-admin.hook';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { useRouter } from 'next/router';

const RoomViewWithSocket = () => {
  const router = useRouter();
  const [user] = useSessionStorage('user');
  const {} = useAdmin();
  const roomId = router.query.id;

  if (!roomId) {
    return null;
  }

  return (
    <SocketProvider
      id={Array.isArray(roomId) ? roomId[0] : roomId}
      user={user}
      type="admin"
    >
      <RoomView roomId={Array.isArray(roomId) ? roomId[0] : roomId} />
    </SocketProvider>
  );
};

export default RoomViewWithSocket;
