'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '@/types/events';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

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
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    const socketIo = io({ query: { id, user, type } });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [id, type, user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
