const express = require("express");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login)
router.get('/logout', authController.logout);

router.use(authController.protect);

router.get("/me", userController.getMe);

router.patch("/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateUser
);

module.exports = router;