const catchAsync = require("../utils/catchAsync");
const Messanger = require("../models/messangerModel");
const AppErrors = require("../utils/appErrors");

exports.getConversationsAndBelongingMessages = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const conversations = await Messanger.getConversationsByUserId(userId);
  const messages = await Messanger.getMessagesInARange(1, 20);

  res.status(200).json({
    status: "success",
    conversations: conversations.rows,
    messages: messages.rows
  });
});


exports.getPastMessagesInARange = catchAsync(async (req, res) => {
  const {groupNumber, conversationId} = req.params;
  const leftBound = groupNumber * 20 + 1;
  const rightBound = leftBound + 19;

  const messages = await Messanger.getPastMessagesByUserId(leftBound, rightBound, conversationId);
  res.status(200).json({
    status: "success",
    messages: messages.rows
  });
});

exports.saveFiles = catchAsync(async (req, res) => {
  const files = req.files;

  Object.keys(files).forEach(key => {
    const file = files[key];
    const filePath = `${__dirname}/../public/files/${file.name}`;
    file.mv(filePath, err => {
      if (err) {
        return next(new AppError("File was not saved!", 404));
      }
    })
  })

  res.status(200).json({
    status: 'success'
  })
});
