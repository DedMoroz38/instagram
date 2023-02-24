const catchAsync = require("../utils/catchAsync");
const Messanger = require("../models/messangerModel");
const AppError = require("../utils/appErrors");

exports.getConversationsAndBelongingMessages = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const conversations = await Messanger.getConversationsByUserId(userId);
  const conversationIds = conversations.rows.map(conversation => conversation.conversation_id);
  const messages = await Messanger.getMessagesByConversationIds(conversationIds);
  const fileMessageIds = messages.rows.filter(message => message.message_type).map(message => message.message_id);
  const messageAttachments = await Messanger.getMessageAttachments(fileMessageIds);

  res.status(200).json({
    status: "success",
    conversations: conversations.rows,
    messages: messages.rows,
    messageAttachments: messageAttachments.rows
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

exports.saveFilesAndSendMessage = catchAsync(async (req, res) => {
  let {message, conversationId} = req.body;
  conversationId = +conversationId;
  const userId = req.user.id;
  const files = req.files;
  let filesToSave = [];
  let i = 0;

  Object.keys(files).forEach(key => {
    let filePath;
    let filePathName;
    const file = files[key];
    const fileName = file.name;
    const fileSize = file.size;

    const fileType = file.mimetype;
    if(fileType.startsWith('image')){
      filePathName = `image-${userId}-${Date.now()}-${i}-${fileName}`
    } else {
      filePathName = `file-${userId}-${Date.now()}-${i}-${fileName}`
    }
    filesToSave.push({
      fileName,
      filePathName,
      fileSize
    });
    i++;
    filePath = `${__dirname}/../public/files/${filePathName}`
    
    file.mv(filePath, err => {
      if (err) {
        return next(new AppError("File was not saved!", 404));
      }
    })
  });

  const messageIdFromDB = await Messanger.sendFileMessage({
    conversation_id: conversationId, 
    sender_id: userId,
    message,
    filesToSave
  });
  const messageId = messageIdFromDB[1].rows[0].get_message_id;

  res.status(200).json({
    status: 'success',
    messageId
  })
});

exports.getFileNames = catchAsync(async (req, res) => {
  const messageId = req.params.messageId;
  const files = await Messanger.getFileNamesByMessageId(messageId);
  const messageData = await Messanger.getMessageDataId(messageId);

  res.status(200).json({
    status: 'success',
    files: files.rows,
    messageData: messageData.rows[0]
  })
});

exports.installFile = catchAsync(async (req, res, next) => {
  const {attachment_id} = req.params;
  const file = await Messanger.getAttachmentById(attachment_id);

  const filePath = __dirname + `/../public/files/${file.rows[0].path_name}`;
  res.download(
    filePath, 
    // "Steve Jobs.pdf", // Remember to include file extension
    (err) => {
      console.log(err);
      return next(new AppError("Problem downloading the file", 404));
    }
  );
});