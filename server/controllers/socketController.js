const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const catchAsync = require("./../utils/catchAsync");
const Messages = require('../models/messangerModel');
const cookie = require("cookie") //installed from npm;

module.exports.authorizeUser = catchAsync(async (socket, next) => {
  var JWTToken = cookie.parse(socket.handshake.headers.cookie).jwt;
  const decoded = await promisify(jwt.verify)(JWTToken, process.env.JWT_SECRET);
  socket.request.userId = decoded.id;
  socket.join(decoded.id);
  next();

  // TODO try use catchAsync and get rid of re-varification
});

exports.dm = async (socket, message) => {
  message.message_from = socket.request.userId;
  // const result = await Messages.sendMessage(message);
  await Messages.sendMessage(message);

  // TODO send message if result exists (try to use catchAsync)

  socket.to(message.message_to).emit('dm', message);
} 

