'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '@/interfaces/events';
import endpoints from '@/config/endpoints';

const SocketContext = createContext<Socket | undefined>(undefined);

export const useSocket = (): Socket<SocketEvents> | undefined =>
  useContext(SocketContext);

interface SocketProviderProps {
  id: string;
  children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ id, children }) => {
  const [socket, setSocket] = useState<Socket<SocketEvents>>();

  const init = useCallback(async () => {
    await fetch(process.env.BASE_URL + endpoints.socket);
    const newSocket = io({ path: process.env.BASE_URL, query: { id } });
    setSocket(newSocket);
  }, [id]);

  useEffect(() => {
    if (!socket && id) {
      init();
    }

    return () => {
      socket?.disconnect();
    };
  }, [id, init, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
