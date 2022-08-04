const express = require("express");
const userRouter = require('./routes/userRoutes');
const cors = require("cors");
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path");


// app.enable("trust proxy");

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(express.json({ limit: "10kb"}));

app.use('/api/v1/users', userRouter);

app.use(globalErrorHandler);

module.exports = app;