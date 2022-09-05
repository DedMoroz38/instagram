const dotenv = require('dotenv');
const { Server } = require("socket.io"); //
const corsConfig = require('./utils/serverConfig.js');
const { authorizeUser } = require("./controllers/socketController");
const { dm } = require('./controllers/socketController');
// const session = require("express-session");
// const Redis = require('ioredis');
// const RedisStore = require('connect-redis')(session);

process.on('uncaughtException', err => {
    console.log("Uncaught Exception💥", err);
    process.exit(1);
});

dotenv.config({ path: './config.env' });

// const redisClient = new Redis();

const app = require('./app');

// app.use(session({
//     secret: process.env.COOKIE_SECRET,
//     credentials: true,
//     user: null,
//     name: "sid",
//     store: new RedisStore({ client: redisClient }),
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === "production" ? "true" : "auto",
//       httpOnly: true,
//       expires: 1000 * 60 * 60 * 24 * 7,
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//     }
// }));

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Run on port ${port}`);
});

const io = new Server(server, {
    // cors: corsConfig
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});



io.use(authorizeUser);

io.on('connect', socket => {
    console.log('USER ID:', socket.request.userId);
    console.log('user connected:' + socket.id);

    socket.on('dm', (message) => {
        dm(socket, message)
    })
});

// TODO helmet

process.on('unhandledRejection', err => {
    console.log("Unhandled Rejection💥", err);
    server.close(() => {
        process.exit(1);
    });
}); 

module.exports = io;
