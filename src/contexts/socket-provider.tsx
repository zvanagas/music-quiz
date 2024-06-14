'use client';

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '@/types/events';
import { endpoints } from '@/config/endpoints';

const SocketContext = createContext<Socket | undefined>(undefined);

export const useSocket = (): Socket<SocketEvents> | undefined =>
  useContext(SocketContext);

type SocketProviderProps = PropsWithChildren & {
  id: string;
  user: string;
  type: 'admin' | 'user';
};

export const SocketProvider = ({
  id,
  user,
  type,
  children,
}: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket<SocketEvents>>();

  const init = useCallback(async () => {
    await fetch(process.env.BASE_URL ?? '' + endpoints.socket);
    const newSocket = io({
      path: process.env.BASE_URL ?? '',
      query: { id, user, type },
    });
    setSocket(newSocket);
  }, [id, user, type]);

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
