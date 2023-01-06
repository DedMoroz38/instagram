const dotenv = require('dotenv');
const { Server } = require("socket.io"); //
const {corsConfig} = require('./utils/serverConfig.js');
const { authorizeUser } = require("./controllers/socketController");
const Socket = require('./controllers/socketController');

process.on('uncaughtException', err => {
    console.log("Uncaught Exception💥", err);
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 5000;

process.env.NODE_ENV = 'production';
const server = app.listen(port, () => {
    console.log(`Run on port ${port}`);
});

const io = new Server(server, {
    cors: corsConfig
});

io.use(authorizeUser);

io.on('connect', socket => {

    socket.on('dm', (message) => {
        console.log(message);
        Socket.dm(socket, message)
    });

    socket.on('disconnect', () => {
        Socket.onDisconnect(socket)
        // console.log('disconnected');
    });
});
// TODO helmet and move 'io' to different file
process.on('unhandledRejection', err => {
    console.log("Unhandled Rejection💥", err);
    server.close(() => {
        process.exit(1);
    });
}); 

module.exports = io;
