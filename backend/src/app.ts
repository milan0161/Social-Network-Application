import express from 'express';
import { createServer } from 'http';
import errorHandlerMiddleware from './middleware/error-handler';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import socialRoutes from './routes/socials';
import postRoutes from './routes/post';
import commentRoutes from './routes/comments';
import imagesRoutes from './routes/images';
import messageRoutes from './routes/messages';
import refreshRoute from './routes/refresh';
import path from 'path';
import * as socketio from 'socket.io';
import { init } from './utils/socket';
import { fileFilter, fileStorage } from './utils/configMulter';
//App Variables
require('dotenv').config();
const PORT = process.env.PORT;

// App Configuration
const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('images', 3));

app.use('/public', express.static(path.join(__dirname, '..', '/public')));

app.use('/auth/api/v1', authRoutes);
app.use('/user/api/v1', userRoutes);
app.use('/socials/api/v1', socialRoutes);
app.use('/post/api/v1', postRoutes);
app.use('/comment/api/v1', commentRoutes);
app.use('/images/api/v1', imagesRoutes);
app.use('/message/api/v1', messageRoutes);
app.use('/', refreshRoute);
app.use(errorHandlerMiddleware);

const io = init(httpServer, 'http://localhost:3000');
// const io = new socketio.Server(httpServer, {
//   cors: {
//     origin: 'http://localhost:3000',
//   },
// });
io.on('connection', (socket) => {
  console.log('Client connected');
});

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
