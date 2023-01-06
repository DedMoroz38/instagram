const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const catchAsync = require("./../utils/catchAsync");
const Messages = require('../models/messangerModel');
const cookie = require("cookie") //installed from npm;

module.exports.authorizeUser = catchAsync(async (socket, next) => {
  var JWTToken = cookie.parse(socket.handshake.headers.cookie).jwt;
  const decoded = await promisify(jwt.verify)(JWTToken, process.env.JWT_SECRET);
  socket.request.userId = decoded.id;
  socket.join(+decoded.id);
  next();
  // TODO try use catchAsync and get rid of re-varification
});

exports.dm = async (socket, message) => {
  await Messages.sendMessage(message);
  let getter_id = await Messages.getSenderId(message.conversation_id, message.sender_id);
  getter_id = getter_id.rows[0].user_id;
  socket.to(getter_id).emit('dm', message);
} 

exports.onDisconnect = async (socket) => {

}

