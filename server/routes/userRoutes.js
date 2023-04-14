const express = require("express");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login)
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword', authController.resetPassword);

router.use(authController.protect);

router.get("/me", userController.getMe);
router.get("/submitEmail/:userId", userController.submitEmail);
router.post("/resendLoginConfirmationEmail/", userController.resendLoginConfirmationEmail);
router.get("/getProfileInfo", userController.getProfileInfo);
router.get("/getProfileInfo/:userId", userController.getProfileInfo);

router.get('/:userId', userController.getUserInfo)
router.patch("/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateUser
);

module.exports = router;