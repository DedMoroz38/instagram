const catchAsync = require("./../utils/catchAsync");
const Message = require("../models/messagesModel");

exports.getMessages = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  console.log('user',userId);

  const messages = await Message.getMessagesByUId(userId);

  res.status(200).json({
    status: "success",
    messages: messages.rows
  });
})