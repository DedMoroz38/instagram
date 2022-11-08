const express = require("express");
const messangerController = require('../controllers/messangerController');
const authController = require("../controllers/authController.js");

const router = express.Router();

router.use(authController.protect);


router.get("/getMessages", messangerController.getMessages);
router.get("/getConversationsAndMessages", messangerController.getConversationsAndBelongingMessages)

module.exports = router;