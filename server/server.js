const dotenv = require('dotenv');
const { Server } = require("socket.io"); //
const {corsConfig} = require('./utils/serverConfig.js');

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

let io = new Server(server, {
    cors: corsConfig
});

require('./socket.js')(io);

// TODO helmet 
process.on('unhandledRejection', err => {
    console.log("Unhandled Rejection💥", err);
    server.close(() => {
        process.exit(1);
    });
}); 

const socketIoObject = io;
module.exports.ioObject = socketIoObject;
