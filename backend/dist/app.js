"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const multer_1 = __importDefault(require("multer"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const socials_1 = __importDefault(require("./routes/socials"));
const post_1 = __importDefault(require("./routes/post"));
const comments_1 = __importDefault(require("./routes/comments"));
const images_1 = __importDefault(require("./routes/images"));
const messages_1 = __importDefault(require("./routes/messages"));
const refresh_1 = __importDefault(require("./routes/refresh"));
const path_1 = __importDefault(require("path"));
const socket_1 = require("./utils/socket");
const configMulter_1 = require("./utils/configMulter");
//App Variables
require('dotenv').config();
const PORT = process.env.PORT;
// App Configuration
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: {
        policy: 'cross-origin',
    },
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, multer_1.default)({ storage: configMulter_1.fileStorage, fileFilter: configMulter_1.fileFilter }).array('images', 3));
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '..', '/public')));
app.use('/auth/api/v1', auth_1.default);
app.use('/user/api/v1', user_1.default);
app.use('/socials/api/v1', socials_1.default);
app.use('/post/api/v1', post_1.default);
app.use('/comment/api/v1', comments_1.default);
app.use('/images/api/v1', images_1.default);
app.use('/message/api/v1', messages_1.default);
app.use('/', refresh_1.default);
app.use(error_handler_1.default);
const io = (0, socket_1.init)(httpServer, 'http://localhost:3000');
// const io = new socketio.Server(httpServer, {
//   cors: {
//     origin: 'http://localhost:3000',
//   },
// });
// global.onlineUsers = new Map()
io.on('connection', (socket) => {
    console.log('Client connected');
    // socket.on('messageSent', (data) => {
    //   console.log(data);
    //   socket.join(data.to);
    //   socket.to(data.to).emit('messages', {
    //     content: data.message,
    //   });
    // });
    socket.on('disconnect', () => {
        console.log('Client disconected');
    });
});
httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
