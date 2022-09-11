const express = require("express");
const userRouter = require('./routes/userRoutes');
const messagesRouter = require('./routes/messagesRoutes');
const friendsRouter = require("./routes/friendsRoutes");
const postsRoutes = require("./routes/postsRoutes");
const cors = require("cors");
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path");
const {corsConfig} = require('./utils/serverConfig.js');


app.enable("trust proxy");


app.use(cors(corsConfig));

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(express.json({ limit: "10kb"}));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messagesRouter);
app.use('/api/v1/friends', friendsRouter);
app.use('/api/v1/posts', postsRoutes);


app.use(globalErrorHandler);


module.exports = app;