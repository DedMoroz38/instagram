const express = require("express");
const userRouter = require('./routes/userRoutes');
const messangerRouter = require('./routes/messangerRoutes');
const friendsRouter = require("./routes/friendsRoutes");
const postsRoutes = require("./routes/postsRoutes");
const cors = require("cors");
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path");
const {corsConfig} = require('./utils/serverConfig.js');
const compression = require('compression');
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");

app.enable("trust proxy");
app.use(cors(corsConfig));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(express.json({ limit: "10kb"}));
app.use(compression());
app.use(xss());
app.use(hpp({
  whitelist: [
      "duration"
  ]
}));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/messanger', messangerRouter);
app.use('/api/v1/friends', friendsRouter);
app.use('/api/v1/posts', postsRoutes);


app.use(globalErrorHandler);


module.exports = app;