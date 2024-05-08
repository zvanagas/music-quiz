import { NextApiResponse } from 'next';
import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Socket as NetSocket } from 'net';

type SocketServer = HTTPServer & {
  io?: Server | undefined;
};

type SocketWithIO = NetSocket & {
  server: SocketServer;
};

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: SocketWithIO;
};
