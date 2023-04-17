const express = require("express");
const messangerController = require('../controllers/messangerController');
const authController = require("../controllers/authController.js");
const fileUpload = require('express-fileupload');

const router = express.Router();

router.use(authController.protect);


router.get("/getConversationsAndMessages", messangerController.getConversationsAndBelongingMessages);
router.get("/getPastMessages/:groupNumber/:conversationId", messangerController.getPastMessagesInARange);
router.post("/sendFiles",
    fileUpload({createParentPath: true}),
    messangerController.saveFilesAndSendMessage
  );
router.get("/getFileNames/:messageId", messangerController.getFileNames);
router.get("/installFile/:attachment_id", messangerController.installFile);
router.get('/createConversation/:senderId/:recieverId', messangerController.createConversation);
router.get('/getConversation/:conversationId/:userId', messangerController.getConversation)

module.exports = router;