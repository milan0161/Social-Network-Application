import { NextFunction } from 'express';
import * as socketio from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

let io: socketio.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;
// interface ServerToClientEvents {
//   noArg: () => void;
//   basicEmit: (a: number, b: string, c: Buffer) => void;
//   withAck: (d: string, callback: (e: number) => void) => void;
// }

// interface ClientToServerEvents {
//   hello: (data: string) => void;
// }

// interface InterServerEvents {
//   ping: () => void;
// }

// interface SocketData {
//   name: string;
//   age: number;
// }
// let io = new socketio.Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

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
