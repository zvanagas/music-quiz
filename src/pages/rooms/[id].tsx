import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { SocketProvider } from '@/contexts/socket-provider';
import { Play } from '@/components/play';
import { useRouter } from 'next/router';

const PlayWithSocket = () => {
  const [user] = useSessionStorage('user');
  const router = useRouter();

  if (!router.query.id) {
    return null;
  }

  return (
    <SocketProvider
      id={Array.isArray(router.query.id) ? router.query.id[0] : router.query.id}
      user={user}
      type="user"
    >
      <Play />
    </SocketProvider>
  );
};

export default PlayWithSocket;
