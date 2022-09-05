const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const AppError = require('../utils/appErrors');
const catchAsync = require("./../utils/catchAsync");
const redisClient = require('../redis');
const Messages = require('../models/messagesModel');
const cookie = require("cookie") //installed from npm;

module.exports.authorizeUser = catchAsync(async (socket, next) => {
  // const headers = socket.request.rawHeaders;
  // let JWTToken = headers[headers.length - 1].split('=')[1];
  // console.log(headers);
  // JWTToken = JWTToken.split(';')[0];

  var JWTToken = cookie.parse(socket.handshake.headers.cookie).jwt;
  const decoded = await promisify(jwt.verify)(JWTToken, process.env.JWT_SECRET);
  console.log(decoded.id);
  console.log(JWTToken);

  // if (!decoded || !decoded.id) {
  //   console.log("Bad request!");
  //   next(new AppError("Not authorized"));
  // } else {
  //   socket.request.userId = decoded.id;
  // }
  socket.request.userId = decoded.id;
  socket.join(decoded.id);
  // redisClient.hset(
  //   `userId:${decoded.id}`,
  //   'userId',
  //   socket.request.userId
  // );
  next();
});

exports.dm = async (socket, message) => {
  message.messagefrom = socket.request.userId;
  const result = await Messages.sendMessage(message);


  // TODO send message if resuls(try to use catchAsync)

  socket.to(message.messageto).emit('dm', message);
} 

