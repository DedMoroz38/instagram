const express = require("express");
const userController = require('../controllers/messagesController');
const authController = require("../controllers/authController.js");

const router = express.Router();

router.use(authController.protect);

router.get("/getMessages", userController.getMessages);


module.exports = router;