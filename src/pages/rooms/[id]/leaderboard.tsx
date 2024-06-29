import { RoomLeaderboard } from '@/components/room-leaderboard';
import { SocketProvider } from '@/contexts/socket-provider';
import { useAdmin } from '@/hooks/use-admin.hook';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { useRouter } from 'next/router';

const RoomLeaderboardWithSocket = () => {
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
      <RoomLeaderboard roomId={Array.isArray(roomId) ? roomId[0] : roomId} />
    </SocketProvider>
  );
};

export default RoomLeaderboardWithSocket;
