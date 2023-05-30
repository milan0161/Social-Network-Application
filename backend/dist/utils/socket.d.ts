import * as socketio from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
declare let init: (httpServer: any, cors?: string) => socketio.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
declare let getIO: () => socketio.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export { init, getIO };
