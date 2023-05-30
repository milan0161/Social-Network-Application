import { NextFunction } from 'express';
import * as socketio from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

let io: socketio.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

let init = (httpServer: any, cors?: string) => {
  io = new socketio.Server(httpServer, {
    cors: {
      origin: cors,
    },
  });
  return io;
};

let getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

export { init, getIO };
