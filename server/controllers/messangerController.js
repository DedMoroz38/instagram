const catchAsync = require("../utils/catchAsync");
const Messanger = require("../models/messangerModel");

exports.getMessages = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  console.log('user',userId);

  const messages = await Messanger.getMessagesByUId(userId);

  res.status(200).json({
    status: "success",
    messages: messages.rows
  });
})

exports.getConversationsAndBelongingMessages = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const conversations = await Messanger.getConversationsByUserId(userId);
  const messages = await Messanger.getMessagesInARange(1, 20);

  res.status(200).json({
    status: "success",
    conversations: conversations.rows,
    messages: messages.rows
  });
})