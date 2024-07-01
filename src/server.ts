import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';
import { Rooms } from './enums/rooms';
import { Events } from './enums/events';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const clients: Record<string, string> = {};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', async (socket) => {
    const { id, user, type } = socket.handshake.query;
    const adminRoom = `${id}-${Rooms.Admin}`;
    const userRoom = `${id}-${Rooms.Players}`;
    const room = type === 'admin' ? adminRoom : userRoom;

    if (id && typeof id === 'string' && typeof user === 'string') {
      await socket.join(room);

      if (type !== 'admin') {
        clients[socket.id] = user;
      }
    }

    if (type === 'admin' && Object.values(clients).length) {
      socket.emit(Events.Players, Object.values(clients));
    }

    socket.on(Events.Join, () => {
      socket.emit(Events.Players, Object.values(clients));
      socket
        .to([adminRoom, userRoom])
        .emit(Events.Players, Object.values(clients));
    });
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

      if (type === 'user') {
        socket
          .to([adminRoom, userRoom])
          .emit(Events.Players, Object.values(clients));
      }
    });
  });

  httpServer
    .once('error', (err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
