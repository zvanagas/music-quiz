import { useEffect } from 'react';
import SocketProvider from '@/contexts/socket-provider';
import { useSessionStorage } from '@/hooks/use-session-storage';
import Admin from '@/components/admin';

const adminId = 'ADMIN';

const AdminWithSocket = () => {
  const [_, setId] = useSessionStorage('id');

  useEffect(() => {
    setId(adminId);
  }, [setId]);

  return (
    <SocketProvider id={adminId}>
      <Admin />
    </SocketProvider>
  );
};

export default AdminWithSocket;
