const express = require("express");
const userRouter = require('./routes/userRoutes');
const messagesRouter = require('./routes/messagesRoutes');
const cors = require("cors");
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path");
const corsConfig = require('./utils/serverConfig.js');
const session = require("express-session");


app.enable("trust proxy");

app.use(cors({
  // corsConfig
  origin: "http://localhost:3000",
  credentials: true,
}));



// app.use(cors(corsConfig));

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(express.json({ limit: "10kb"}));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messagesRouter);

app.use(globalErrorHandler);

app.use(session({
  secret: process.env.COOKIE_SECRET,
  credentials: true,
  // user: null,
  // name: "jwt",
  // store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: process.env.NODE_ENV === "production" ? "true" : "auto",
    // httpOnly: true,
    // expires: 1000 * 60 * 60 * 24 * 7,
    // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  }
}));


module.exports = app;