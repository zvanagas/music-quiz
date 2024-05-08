import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { SocketProvider } from '@/contexts/socket-provider';
import { Play } from '@/components/play';

const PlayWithSocket = () => {
  const [id] = useSessionStorage('id');

  return (
    <SocketProvider id={id}>
      <Play />
    </SocketProvider>
  );
};

export default PlayWithSocket;
