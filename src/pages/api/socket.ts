import { Events } from '@/enums/events';
import { Rooms } from '@/enums/rooms';
import { NextApiResponseWithSocket } from '@/types/socket';
import { NextApiRequest } from 'next';
import { Server } from 'socket.io';

const clients: Record<string, string> = {};

export default function SocketHandler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket?.server.io) {
    // eslint-disable-next-line no-console
    console.log('Already set up');
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    const { id, user, type } = socket.handshake.query;
    const adminRoom = `${id}-${Rooms.Admin}`;
    const userRoom = `${id}-${Rooms.Players}`;
    const room = type === 'admin' ? adminRoom : userRoom;

    if (id && typeof id === 'string' && typeof user === 'string') {
      socket.join(room);
      if (type !== 'admin') {
        clients[socket.id] = user;
      }
    }

    socket.on(Events.Join, () =>
      io.sockets.emit(Events.Players, Object.values(clients))
    );
    socket.on(Events.PlayerGuess, (msg) =>
      socket.to(adminRoom).emit(Events.PlayerGuess, msg)
    );
    socket.on(Events.Start, (msg) =>
      socket.to(userRoom).emit(Events.Start, msg)
    );
    socket.on(Events.Wait, (msg) => socket.to(userRoom).emit(Events.Wait, msg));
    socket.on(Events.Guess, () => socket.to(userRoom).emit(Events.Guess));
    socket.on(Events.Results, (msg) =>
      socket.to(userRoom).emit(Events.Results, msg)
    );
    socket.on(Events.UpdateStages, (msg) =>
      socket.to(userRoom).emit(Events.UpdateStages, msg)
    );
    socket.on(Events.Reset, () => socket.to(userRoom).emit(Events.Reset));

    socket.on('disconnect', () => {
      socket.leave(room);
      delete clients[socket.id];
      io.sockets.emit(Events.Players, Object.values(clients));
    });
  });

  res.status(200).end();
}
